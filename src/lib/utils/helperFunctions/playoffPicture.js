// Playoff picture for a league where the top (playoffTeams - 1) teams make it
// by regular season record, and the last spot goes to the team with the most
// points for (PF) among everyone else. Pure functions only so they're testable.

export const winPct = (t) => {
    const games = t.wins + t.losses + t.ties;
    return games ? (t.wins + 0.5 * t.ties) / games : 0;
};

// teams: [{ rosterID, wins, losses, ties, pf }]
// Record ties are broken by PF.
export const seedTeams = (teams, playoffTeams = 6) => {
    const direct = Math.max(playoffTeams - 1, 0);
    const byRecord = [...teams].sort((a, b) => winPct(b) - winPct(a) || b.pf - a.pf);
    const inByRecord = byRecord.slice(0, direct);
    const rest = byRecord.slice(direct).sort((a, b) => b.pf - a.pf);
    return { inByRecord, rest, wildcard: rest[0] ?? null };
};

const gaussian = (rng) => {
    const u = 1 - rng();
    const v = rng();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

// How many points each team tends to score, nudged toward the league average
// so a couple of weeks of data doesn't swing things too hard.
export const scoringStats = (weeklyPoints) => {
    const all = Object.values(weeklyPoints).flat();
    const leagueMean = all.length ? all.reduce((s, x) => s + x, 0) / all.length : 100;
    const leagueVar = all.length > 1 ? all.reduce((s, x) => s + (x - leagueMean) ** 2, 0) / (all.length - 1) : 400;
    const k = 3;
    const stats = {};
    for (const rosterID in weeklyPoints) {
        const pts = weeklyPoints[rosterID];
        const n = pts.length;
        const mean = n ? pts.reduce((s, x) => s + x, 0) / n : leagueMean;
        const variance = n > 1 ? pts.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1) : leagueVar;
        stats[rosterID] = {
            mean: (n * mean + k * leagueMean) / (n + k),
            sd: Math.sqrt((n * variance + k * leagueVar) / (n + k)),
        };
    }
    return stats;
};

// remainingWeeks: [[[rosterIDa, rosterIDb], ...], ...]  (one array per week)
// Returns { [rosterID]: { playoff, direct, wildcard } } as fractions 0..1
export const simulateOdds = (teams, remainingWeeks, stats, { sims = 5000, playoffTeams = 6, rng = Math.random } = {}) => {
    const ids = teams.map((t) => t.rosterID);
    const index = Object.fromEntries(ids.map((id, i) => [id, i]));
    const tally = Object.fromEntries(ids.map((id) => [id, { playoff: 0, direct: 0, wildcard: 0 }]));
    const direct = Math.max(playoffTeams - 1, 0);

    for (let s = 0; s < sims; s++) {
        const state = teams.map((t) => ({ rosterID: t.rosterID, wins: t.wins, losses: t.losses, ties: t.ties, pf: t.pf }));
        for (const week of remainingWeeks) {
            for (const [a, b] of week) {
                const A = state[index[a]];
                const B = state[index[b]];
                if (!A || !B) continue;
                const sa = stats[a].mean + stats[a].sd * gaussian(rng);
                const sb = stats[b].mean + stats[b].sd * gaussian(rng);
                A.pf += sa;
                B.pf += sb;
                if (sa > sb) { A.wins++; B.losses++; }
                else if (sb > sa) { B.wins++; A.losses++; }
                else { A.ties++; B.ties++; }
            }
        }
        const { inByRecord, wildcard } = seedTeams(state, playoffTeams);
        for (const t of inByRecord) {
            tally[t.rosterID].direct++;
            tally[t.rosterID].playoff++;
        }
        if (wildcard && direct < state.length) {
            tally[wildcard.rosterID].wildcard++;
            tally[wildcard.rosterID].playoff++;
        }
    }

    for (const id of ids) {
        tally[id].playoff /= sims;
        tally[id].direct /= sims;
        tally[id].wildcard /= sims;
    }
    return tally;
};
