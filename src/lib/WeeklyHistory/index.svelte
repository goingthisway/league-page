<script>
    import LinearProgress from '@smui/linear-progress';
    import { leagueID } from '$lib/utils/leagueInfo';
    import { getNflState, getLeagueData, getLeagueTeamManagers, loadPlayers, waitForAll, round } from '$lib/utils/helper';
    import { getAvatarFromTeamManagers, getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
    import { computeHistory } from '$lib/utils/helperFunctions/weeklyHistory';

    const getJSON = async (url) => {
        const res = await fetch(url, { compress: true });
        return res.ok ? res.json() : [];
    };

    const load = async () => {
        const [nflState, leagueData, leagueTeamManagers, playersInfo] = await waitForAll(
            getNflState(),
            getLeagueData(),
            getLeagueTeamManagers(),
            loadPlayers(null),
        );

        if (!['regular', 'post'].includes(nflState.season_type)) return null;
        const week = nflState.week;
        if (week < 1) return null;

        // walk back through every previous season of the league
        const pastLeagues = [];
        let previousID = leagueData.previous_league_id;
        while (previousID && previousID != 0) {
            const past = await getLeagueData(previousID);
            pastLeagues.push(past);
            previousID = past.previous_league_id;
        }
        if (!pastLeagues.length) return null;

        const seasonsData = await Promise.all(
            pastLeagues.map(async (past) => ({
                season: past.season,
                playoffStart: past.settings.playoff_week_start,
                matchups: await getJSON(`https://api.sleeper.app/v1/league/${past.league_id}/matchups/${week}`),
                transactions: await getJSON(`https://api.sleeper.app/v1/league/${past.league_id}/transactions/${week}`),
            })),
        );

        const managerOf = (season, rosterID) => leagueTeamManagers.teamManagersMap?.[season]?.[rosterID]?.managers?.[0];
        const history = computeHistory(seasonsData, managerOf);
        if (!history) return null;

        const playoffStarts = {};
        for (const s of seasonsData) playoffStarts[s.season] = s.playoffStart;

        return { week, history, playoffStarts, leagueTeamManagers, players: playersInfo.players };
    };

    const dataPromise = load().catch((err) => {
        // fail quietly, the rest of the homepage still works
        console.error(err);
        return null;
    });

    const avatar = (ltm, rosterID, year) => {
        try {
            return getAvatarFromTeamManagers(ltm, rosterID, year);
        } catch (e) {
            return 'https://sleepercdn.com/images/v2/icons/player_default.webp';
        }
    };
    const teamName = (ltm, rosterID, year) => {
        try {
            return getTeamFromTeamManagers(ltm, rosterID, year).name;
        } catch (e) {
            return 'Unknown team';
        }
    };
    const playerName = (players, id) => {
        const p = players[id];
        return p ? (p.pos === 'DEF' ? `${id} D/ST` : `${p.fn?.[0] ?? ''}. ${p.ln}`) : `Player ${id}`;
    };
    const received = (players, side) => {
        const items = [...side.players.map((id) => playerName(players, id)), ...side.picks];
        return items.length ? items.join(', ') : 'nothing';
    };
    // find the manager's current team (falls back to the team from their streak)
    const streakTeam = (ltm, streak) => {
        const current = ltm.teamManagersMap?.[ltm.currentSeason] ?? {};
        for (const rosterID in current) {
            if (current[rosterID].managers?.includes(streak.managerID)) return { rosterID, season: ltm.currentSeason };
        }
        return { rosterID: streak.rosterID, season: streak.season };
    };
    const span = (streak) => `${streak.seasons[streak.seasons.length - 1]}–${streak.seasons[0]}`;
    const tag = (data, season) => (data.week >= data.playoffStarts[season] ? ' (playoffs)' : '');
</script>

<style>
    .history {
        padding: 0 30px;
        max-width: 620px;
        margin: 40px auto 10px;
    }

    h4 {
        text-align: center;
        font-size: 1.5em;
        margin: 0;
    }

    .sub {
        text-align: center;
        font-size: 0.85em;
        color: var(--g555);
        margin: 2px 0 14px;
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }

    @media (max-width: 520px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }

    .card {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: 10px;
        background-color: var(--f3f3f3);
        border: 1px solid var(--ddd);
        min-height: 64px;
    }

    .card.wide {
        grid-column: 1 / -1;
        align-items: flex-start;
    }

    .avatars {
        display: flex;
        flex-shrink: 0;
    }

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        background-color: var(--ddd);
    }

    .avatars img + img {
        margin-left: -12px;
        border: 2px solid var(--f3f3f3);
    }

    .text {
        min-width: 0;
        line-height: 1.25em;
    }

    .title {
        font-size: 0.75em;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--g555);
    }

    .name {
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .stat {
        font-size: 0.85em;
        color: var(--g555);
    }

    .tradeSide {
        font-size: 0.9em;
        margin-top: 4px;
    }
</style>

{#await dataPromise}
    <div class="history">
        <LinearProgress indeterminate />
    </div>
{:then data}
    {#if data}
        {@const h = data.history}
        {@const ltm = data.leagueTeamManagers}
        <div class="history">
            <h4>This Week in History</h4>
            <div class="sub">Week {data.week}, across {h.seasons} past {h.seasons === 1 ? 'season' : 'seasons'}</div>
            <div class="grid">
                {#if h.closest}
                    <div class="card">
                        <div class="avatars">
                            <img alt="winner avatar" src={avatar(ltm, h.closest.winner.roster_id, h.closest.season)} />
                            <img alt="loser avatar" src={avatar(ltm, h.closest.loser.roster_id, h.closest.season)} />
                        </div>
                        <div class="text">
                            <div class="title">😬 Closest Game, {h.closest.season}{tag(data, h.closest.season)}</div>
                            <div class="name">{teamName(ltm, h.closest.winner.roster_id, h.closest.season)}</div>
                            <div class="stat">edged {teamName(ltm, h.closest.loser.roster_id, h.closest.season)} by {round(h.closest.margin)}</div>
                        </div>
                    </div>
                {/if}

                {#if h.blowout}
                    <div class="card">
                        <div class="avatars">
                            <img alt="winner avatar" src={avatar(ltm, h.blowout.winner.roster_id, h.blowout.season)} />
                            <img alt="loser avatar" src={avatar(ltm, h.blowout.loser.roster_id, h.blowout.season)} />
                        </div>
                        <div class="text">
                            <div class="title">💥 Biggest Blowout, {h.blowout.season}{tag(data, h.blowout.season)}</div>
                            <div class="name">{teamName(ltm, h.blowout.winner.roster_id, h.blowout.season)}</div>
                            <div class="stat">beat {teamName(ltm, h.blowout.loser.roster_id, h.blowout.season)} by {round(h.blowout.margin)}</div>
                        </div>
                    </div>
                {/if}

                {#if h.high}
                    <div class="card">
                        <div class="avatars"><img alt="team avatar" src={avatar(ltm, h.high.rosterID, h.high.season)} /></div>
                        <div class="text">
                            <div class="title">🏇 Highest Score, {h.high.season}{tag(data, h.high.season)}</div>
                            <div class="name">{teamName(ltm, h.high.rosterID, h.high.season)}</div>
                            <div class="stat">{round(h.high.points)} pts</div>
                        </div>
                    </div>
                {/if}

                {#if h.low}
                    <div class="card">
                        <div class="avatars"><img alt="team avatar" src={avatar(ltm, h.low.rosterID, h.low.season)} /></div>
                        <div class="text">
                            <div class="title">🧴 Lowest Score, {h.low.season}{tag(data, h.low.season)}</div>
                            <div class="name">{teamName(ltm, h.low.rosterID, h.low.season)}</div>
                            <div class="stat">{round(h.low.points)} pts</div>
                        </div>
                    </div>
                {/if}

                {#if h.streaks?.win}
                    {@const t = streakTeam(ltm, h.streaks.win)}
                    <div class="card">
                        <div class="avatars"><img alt="team avatar" src={avatar(ltm, t.rosterID, t.season)} /></div>
                        <div class="text">
                            <div class="title">🔥 Win Streak</div>
                            <div class="name">{teamName(ltm, t.rosterID, t.season)}</div>
                            <div class="stat">has won Week {data.week} {h.streaks.win.length} years running ({span(h.streaks.win)})</div>
                        </div>
                    </div>
                {/if}

                {#if h.streaks?.loss}
                    {@const t = streakTeam(ltm, h.streaks.loss)}
                    <div class="card">
                        <div class="avatars"><img alt="team avatar" src={avatar(ltm, t.rosterID, t.season)} /></div>
                        <div class="text">
                            <div class="title">🥶 Loss Streak</div>
                            <div class="name">{teamName(ltm, t.rosterID, t.season)}</div>
                            <div class="stat">has lost Week {data.week} {h.streaks.loss.length} years running ({span(h.streaks.loss)})</div>
                        </div>
                    </div>
                {/if}

                {#if h.trade}
                    <div class="card wide">
                        <div class="avatars">
                            {#each h.trade.sides as side}
                                <img alt="team avatar" src={avatar(ltm, side.rosterID, h.trade.season)} />
                            {/each}
                        </div>
                        <div class="text">
                            <div class="title">🤝 Blockbuster Trade, {h.trade.season}{tag(data, h.trade.season)}</div>
                            {#each h.trade.sides as side}
                                <div class="tradeSide"><b>{teamName(ltm, side.rosterID, h.trade.season)}</b> got {received(data.players, side)}</div>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    {/if}
{/await}
