<script>
    import LinearProgress from '@smui/linear-progress';
    import { leagueID } from '$lib/utils/leagueInfo';
    import { getNflState, getLeagueData, getLeagueRosters, getLeagueTeamManagers, waitForAll, round } from '$lib/utils/helper';
    import { getAvatarFromTeamManagers, getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
    import { seedTeams, simulateOdds, scoringStats } from '$lib/utils/helperFunctions/playoffPicture';

    const getJSON = async (url) => {
        const res = await fetch(url, { compress: true });
        return res.ok ? res.json() : [];
    };

    const load = async () => {
        const [nflState, leagueData, rostersData, leagueTeamManagers] = await waitForAll(
            getNflState(),
            getLeagueData(),
            getLeagueRosters(),
            getLeagueTeamManagers(),
        );

        if (leagueData.status !== 'in_season' && leagueData.status !== 'post_season') return null;
        if (!['regular', 'post'].includes(nflState.season_type)) return null;

        const regularSeasonLength = leagueData.settings.playoff_week_start - 1;
        const playoffTeams = leagueData.settings.playoff_teams || 6;

        const teams = Object.values(rostersData.rosters).map((r) => ({
            rosterID: String(r.roster_id),
            wins: r.settings.wins,
            losses: r.settings.losses,
            ties: r.settings.ties,
            pf: r.settings.fpts + (r.settings.fpts_decimal || 0) / 100,
        }));
        const played = Math.max(...teams.map((t) => t.wins + t.losses + t.ties));
        if (played < 1) return null;

        const seeding = seedTeams(teams, playoffTeams);

        // regular season is over, so the field is final
        let odds = null;
        if (played < regularSeasonLength) {
            // every week's matchups: finished weeks give scoring history, future weeks give the schedule
            const weeks = await Promise.all(
                Array.from({ length: regularSeasonLength }, (_, i) =>
                    getJSON(`https://api.sleeper.app/v1/league/${leagueID}/matchups/${i + 1}`),
                ),
            );

            const weeklyPoints = Object.fromEntries(teams.map((t) => [t.rosterID, []]));
            for (let w = 0; w < played; w++) {
                for (const e of weeks[w]) {
                    if (e.points > 0 && weeklyPoints[e.roster_id]) weeklyPoints[e.roster_id].push(e.points);
                }
            }

            const remainingWeeks = [];
            for (let w = played; w < regularSeasonLength; w++) {
                const groups = {};
                for (const e of weeks[w]) {
                    if (e.matchup_id != null) (groups[e.matchup_id] ??= []).push(String(e.roster_id));
                }
                remainingWeeks.push(Object.values(groups).filter((g) => g.length === 2));
            }

            odds = simulateOdds(teams, remainingWeeks, scoringStats(weeklyPoints), { playoffTeams });
        }

        return { seeding, odds, played, regularSeasonLength, leagueTeamManagers };
    };

    const dataPromise = load().catch((err) => {
        // fail quietly, the rest of the homepage still works
        console.error(err);
        return null;
    });

    const name = (ltm, id) => getTeamFromTeamManagers(ltm, id).name;
    const avatar = (ltm, id) => getAvatarFromTeamManagers(ltm, id);
    const record = (t) => `${t.wins}-${t.losses}${t.ties ? `-${t.ties}` : ''}`;
    const pct = (p) => (p >= 0.995 ? '>99%' : p <= 0.005 ? '<1%' : `${Math.round(p * 100)}%`);
</script>

<style>
    .picture {
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

    .groupLabel {
        font-size: 0.75em;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--g555);
        margin: 14px 0 6px;
    }

    .row {
        display: grid;
        grid-template-columns: 24px 36px 1fr 56px 64px 90px;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        border-radius: 8px;
        background-color: var(--f3f3f3);
        border: 1px solid var(--ddd);
        margin-bottom: 4px;
    }

    .row.in {
        border-left: 4px solid #2e9d5b;
    }

    .row.wild {
        border-left: 4px solid #c9a227;
    }

    .row.out {
        opacity: 0.85;
    }

    .seed {
        font-weight: 700;
        text-align: center;
        color: var(--g555);
    }

    img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        background-color: var(--ddd);
    }

    .team {
        min-width: 0;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .num {
        text-align: right;
        font-size: 0.9em;
    }

    .oddsCell {
        display: flex;
        align-items: center;
        gap: 6px;
        justify-content: flex-end;
    }

    .bar {
        flex: 1;
        height: 6px;
        border-radius: 3px;
        background-color: var(--ddd);
        overflow: hidden;
    }

    .fill {
        height: 100%;
        background-color: #2e9d5b;
    }

    .pct {
        width: 38px;
        text-align: right;
        font-size: 0.85em;
        font-weight: 600;
    }

    .head {
        font-size: 0.7em;
        color: var(--g555);
        background: none;
        border: none;
        margin: 0;
        padding-top: 0;
        padding-bottom: 0;
    }

    .rule {
        text-align: center;
        font-size: 0.8em;
        color: var(--g555);
        margin-top: 10px;
    }

    @media (max-width: 520px) {
        .row {
            grid-template-columns: 20px 30px 1fr 50px 78px;
        }

        .pf {
            display: none;
        }

        img {
            width: 28px;
            height: 28px;
        }
    }
</style>

{#await dataPromise}
    <div class="picture">
        <LinearProgress indeterminate />
    </div>
{:then data}
    {#if data}
        {@const ltm = data.leagueTeamManagers}
        {@const s = data.seeding}
        <div class="picture">
            <h4>Playoff Picture</h4>
            <div class="sub">
                {#if data.odds}
                    After {data.played} of {data.regularSeasonLength} weeks. Odds come from simulating the rest of the schedule 5,000 times.
                {:else}
                    Final field after {data.regularSeasonLength} weeks.
                {/if}
            </div>

            <div class="groupLabel">In by record (top {s.inByRecord.length})</div>
            <div class="row head">
                <span></span><span></span><span>Team</span><span class="num">Record</span><span class="num pf">PF</span><span class="num">{data.odds ? 'Odds' : ''}</span>
            </div>
            {#each s.inByRecord as t, i}
                <div class="row in">
                    <span class="seed">{i + 1}</span>
                    <img alt="team avatar" src={avatar(ltm, t.rosterID)} />
                    <span class="team">{name(ltm, t.rosterID)}</span>
                    <span class="num">{record(t)}</span>
                    <span class="num pf">{round(t.pf)}</span>
                    {#if data.odds}
                        <span class="oddsCell"><span class="bar"><span class="fill" style="width: {data.odds[t.rosterID].playoff * 100}%"></span></span><span class="pct">{pct(data.odds[t.rosterID].playoff)}</span></span>
                    {:else}<span></span>{/if}
                </div>
            {/each}

            <div class="groupLabel">Last spot: most points among everyone else</div>
            {#each s.rest as t, i}
                <div class="row {i === 0 ? 'wild' : 'out'}">
                    <span class="seed">{i === 0 ? s.inByRecord.length + 1 : ''}</span>
                    <img alt="team avatar" src={avatar(ltm, t.rosterID)} />
                    <span class="team">{name(ltm, t.rosterID)}</span>
                    <span class="num">{record(t)}</span>
                    <span class="num pf">{round(t.pf)}</span>
                    {#if data.odds}
                        <span class="oddsCell"><span class="bar"><span class="fill" style="width: {data.odds[t.rosterID].playoff * 100}%"></span></span><span class="pct">{pct(data.odds[t.rosterID].playoff)}</span></span>
                    {:else}<span></span>{/if}
                </div>
            {/each}
            <div class="rule">Record ties are broken by points for.</div>
        </div>
    {/if}
{/await}
