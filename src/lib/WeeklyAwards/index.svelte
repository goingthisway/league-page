<script>
    import LinearProgress from '@smui/linear-progress';
    import { leagueID } from '$lib/utils/leagueInfo';
    import { getNflState, getLeagueData, getLeagueTeamManagers, loadPlayers, waitForAll, round } from '$lib/utils/helper';
    import { getAvatarFromTeamManagers, getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
    import { computeAwards } from '$lib/utils/helperFunctions/weeklyAwards';

    const load = async () => {
        const [nflState, leagueData, leagueTeamManagers, playersInfo] = await waitForAll(
            getNflState(),
            getLeagueData(),
            getLeagueTeamManagers(),
            loadPlayers(null),
        );

        // only show once the season is underway
        if (!['regular', 'post'].includes(nflState.season_type)) return null;
        const week = Math.min(nflState.week - 1, 18);
        if (week < 1) return null;

        const res = await fetch(`https://api.sleeper.app/v1/league/${leagueID}/matchups/${week}`, { compress: true });
        if (!res.ok) return null;
        const entries = await res.json();

        const rosterPositions = leagueData.roster_positions;
        const starterSlots = rosterPositions.slice(0, rosterPositions.indexOf('BN'));
        const awards = computeAwards(entries, playersInfo.players, starterSlots);
        if (!awards) return null;

        return { week, awards, leagueTeamManagers, players: playersInfo.players };
    };

    const dataPromise = load().catch((err) => {
        // fail quietly, the rest of the homepage still works
        console.error(err);
        return null;
    });

    const avatar = (ltm, rosterID) => getAvatarFromTeamManagers(ltm, rosterID);
    const teamName = (ltm, rosterID) => getTeamFromTeamManagers(ltm, rosterID).name;
    const playerName = (players, id) => {
        const p = players[id];
        return p ? (p.pos === 'DEF' ? `${id} D/ST` : `${p.fn?.[0] ?? ''}. ${p.ln}`) : 'Unknown';
    };
    const headshot = (players, id) =>
        players[id]?.pos === 'DEF'
            ? `https://sleepercdn.com/images/team_logos/nfl/${id.toLowerCase()}.png`
            : `https://sleepercdn.com/content/nfl/players/thumb/${id}.jpg`;
</script>

<style>
    .awards {
        padding: 0 30px;
        max-width: 620px;
        margin: 40px auto 10px;
    }

    h4 {
        text-align: center;
        font-size: 1.5em;
        margin: 0 0 14px;
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
</style>

{#await dataPromise}
    <div class="awards">
        <LinearProgress indeterminate />
    </div>
{:then data}
    {#if data}
        {@const a = data.awards}
        {@const ltm = data.leagueTeamManagers}
        <div class="awards">
            <h4>Week {data.week} Awards</h4>
            <div class="grid">
                <div class="card">
                    <div class="avatars"><img alt="team avatar" src={avatar(ltm, a.horse.roster_id)} /></div>
                    <div class="text">
                        <div class="title">🏇 Horse of the Week</div>
                        <div class="name">{teamName(ltm, a.horse.roster_id)}</div>
                        <div class="stat">{round(a.horse.points)} pts, top score</div>
                    </div>
                </div>

                <div class="card">
                    <div class="avatars"><img alt="team avatar" src={avatar(ltm, a.glue.roster_id)} /></div>
                    <div class="text">
                        <div class="title">🧴 Glue Factory</div>
                        <div class="name">{teamName(ltm, a.glue.roster_id)}</div>
                        <div class="stat">{round(a.glue.points)} pts, lowest score</div>
                    </div>
                </div>

                {#if a.blowout}
                    <div class="card">
                        <div class="avatars">
                            <img alt="winner avatar" src={avatar(ltm, a.blowout.winner.roster_id)} />
                            <img alt="loser avatar" src={avatar(ltm, a.blowout.loser.roster_id)} />
                        </div>
                        <div class="text">
                            <div class="title">💥 Blowout</div>
                            <div class="name">{teamName(ltm, a.blowout.winner.roster_id)}</div>
                            <div class="stat">beat {teamName(ltm, a.blowout.loser.roster_id)} by {round(a.blowout.margin)}</div>
                        </div>
                    </div>
                {/if}

                {#if a.nailBiter}
                    <div class="card">
                        <div class="avatars">
                            <img alt="winner avatar" src={avatar(ltm, a.nailBiter.winner.roster_id)} />
                            <img alt="loser avatar" src={avatar(ltm, a.nailBiter.loser.roster_id)} />
                        </div>
                        <div class="text">
                            <div class="title">😬 Nail-Biter</div>
                            <div class="name">{teamName(ltm, a.nailBiter.winner.roster_id)}</div>
                            <div class="stat">edged {teamName(ltm, a.nailBiter.loser.roster_id)} by {round(a.nailBiter.margin)}</div>
                        </div>
                    </div>
                {/if}

                {#if a.blunder && a.blunder.left > 0}
                    <div class="card">
                        <div class="avatars"><img alt="team avatar" src={avatar(ltm, a.blunder.team.roster_id)} /></div>
                        <div class="text">
                            <div class="title">🪑 Bench Blunder</div>
                            <div class="name">{teamName(ltm, a.blunder.team.roster_id)}</div>
                            <div class="stat">
                                left {round(a.blunder.left)} pts on the bench{#if a.blunder.topBench}, led by {playerName(data.players, a.blunder.topBench)} ({round(a.blunder.topBenchPts)}){/if}
                            </div>
                        </div>
                    </div>
                {/if}

                {#if a.stud}
                    <div class="card">
                        <div class="avatars"><img alt="player" src={headshot(data.players, a.stud.id)} /></div>
                        <div class="text">
                            <div class="title">⭐ Stud of the Week</div>
                            <div class="name">{playerName(data.players, a.stud.id)}</div>
                            <div class="stat">{round(a.stud.pts)} pts for {teamName(ltm, a.stud.team.roster_id)}</div>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    {/if}
{/await}
