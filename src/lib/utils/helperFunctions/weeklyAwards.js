// Computes "last week's awards" from a single week of Sleeper matchup data.
// Pure functions only (no fetching) so they're easy to test.

const FLEX_ELIGIBILITY = {
    FLEX: ['RB', 'WR', 'TE'],
    REC_FLEX: ['WR', 'TE'],
    WRRB_FLEX: ['WR', 'RB'],
    SUPER_FLEX: ['QB', 'RB', 'WR', 'TE'],
    IDP_FLEX: ['DL', 'LB', 'DB'],
};

const eligibleFor = (slot) => FLEX_ELIGIBILITY[slot] ?? [slot];

// Best possible lineup using actual points scored. Fills the narrowest slots
// first (QB, RB, ... then REC_FLEX, FLEX, SUPER_FLEX), taking the top
// remaining eligible player each time.
export const optimalScore = (playerIDs, playersPoints, players, starterSlots) => {
    const pool = playerIDs
        .map((id) => ({ id, pos: players[id]?.pos, pts: playersPoints[id] ?? 0 }))
        .filter((p) => p.pos)
        .sort((a, b) => b.pts - a.pts);
    const used = new Set();
    let total = 0;
    const slots = [...starterSlots].sort((a, b) => eligibleFor(a).length - eligibleFor(b).length);
    for (const slot of slots) {
        const eligible = eligibleFor(slot);
        const pick = pool.find((p) => !used.has(p.id) && eligible.includes(p.pos));
        if (pick) {
            used.add(pick.id);
            total += pick.pts;
        }
    }
    return total;
};

export const computeAwards = (entries, players, starterSlots) => {
    // only teams that actually played a game this week
    const teams = entries
        .filter((e) => e.matchup_id != null && typeof e.points === 'number')
        .map((e) => ({ ...e }));
    if (teams.length < 2 || teams.every((t) => t.points === 0)) return null;

    const byPoints = [...teams].sort((a, b) => b.points - a.points);
    const horse = byPoints[0];
    const glue = byPoints[byPoints.length - 1];

    // head to head results
    const pairs = {};
    for (const t of teams) (pairs[t.matchup_id] ??= []).push(t);
    const games = Object.values(pairs)
        .filter((p) => p.length === 2)
        .map(([a, b]) => {
            const [winner, loser] = a.points >= b.points ? [a, b] : [b, a];
            return { winner, loser, margin: winner.points - loser.points };
        });
    const blowout = [...games].sort((a, b) => b.margin - a.margin)[0];
    const nailBiter = [...games].sort((a, b) => a.margin - b.margin)[0];

    // bench blunder: optimal lineup minus what was actually started
    let blunder = null;
    for (const t of teams) {
        const best = optimalScore(t.players ?? [], t.players_points ?? {}, players, starterSlots);
        const left = best - t.points;
        if (!blunder || left > blunder.left) {
            const starters = new Set(t.starters ?? []);
            const topBench = (t.players ?? [])
                .filter((id) => !starters.has(id))
                .sort((a, b) => (t.players_points[b] ?? 0) - (t.players_points[a] ?? 0))[0];
            blunder = { team: t, left, topBench, topBenchPts: t.players_points?.[topBench] ?? 0 };
        }
    }

    // stud of the week: top individual starter
    let stud = null;
    for (const t of teams) {
        (t.starters ?? []).forEach((id, i) => {
            const pts = t.starters_points?.[i] ?? 0;
            if (id && id !== '0' && (!stud || pts > stud.pts)) stud = { team: t, id, pts };
        });
    }

    return { horse, glue, blowout, nailBiter, blunder, stud };
};
