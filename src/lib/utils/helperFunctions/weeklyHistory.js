// "This week in history": given the same week number from past seasons,
// find the closest game, biggest blowout, highest/lowest score and
// the biggest trade. Pure functions only (no fetching) so they're easy to test.

const pairUp = (entries) => {
    const pairs = {};
    for (const e of entries) {
        if (e.matchup_id == null || typeof e.points !== 'number') continue;
        (pairs[e.matchup_id] ??= []).push(e);
    }
    return Object.values(pairs).filter((p) => p.length === 2);
};

// What each side of a trade received (players and picks).
export const summarizeTrade = (trade) => {
    const sides = trade.roster_ids.map((rosterID) => {
        const players = Object.keys(trade.adds ?? {}).filter((id) => trade.adds[id] === rosterID);
        const picks = (trade.draft_picks ?? [])
            .filter((p) => p.owner_id === rosterID)
            .map((p) => `${p.season} round ${p.round}`);
        return { rosterID, players, picks };
    });
    const assets = sides.reduce((sum, s) => sum + s.players.length + s.picks.length, 0);
    return { sides, assets };
};

// Current streaks of winning (or losing) this same week, counted back from
// the most recent past season. managerOf(season, rosterID) must return a
// stable manager id, since roster ids can change between seasons.
export const computeStreaks = (seasonsData, managerOf) => {
    const seasons = [...seasonsData].sort((a, b) => parseInt(b.season) - parseInt(a.season));
    const results = {}; // managerID -> [{ season, rosterID, result: 'W' | 'L' | 'T' | null }] newest first
    for (const s of seasons) {
        const seen = new Set();
        for (const [a, b] of pairUp(s.matchups ?? [])) {
            if (a.points === 0 && b.points === 0) continue;
            for (const [me, them] of [[a, b], [b, a]]) {
                const id = managerOf(s.season, me.roster_id);
                if (!id) continue;
                seen.add(id);
                const result = me.points > them.points ? 'W' : me.points < them.points ? 'L' : 'T';
                (results[id] ??= []).push({ season: s.season, rosterID: me.roster_id, result });
            }
        }
        // anyone with no game this week that season breaks their streak
        for (const id in results) {
            if (!seen.has(id) && results[id].length === seasons.indexOf(s)) {
                results[id].push({ season: s.season, rosterID: null, result: null });
            }
        }
    }

    const best = { win: null, loss: null };
    for (const id in results) {
        const list = results[id];
        const first = list[0];
        // the streak has to run through the most recent past season
        if (!first || first.season !== seasons[0].season || !['W', 'L'].includes(first.result)) continue;
        let length = 0;
        while (length < list.length && list[length].result === first.result) length++;
        if (length < 2) continue;
        const key = first.result === 'W' ? 'win' : 'loss';
        if (!best[key] || length > best[key].length) {
            best[key] = { managerID: id, length, rosterID: first.rosterID, season: first.season, seasons: list.slice(0, length).map((r) => r.season) };
        }
    }
    return best;
};

// seasonsData: [{ season, week, playoffStart, matchups: [...], transactions: [...] }]
export const computeHistory = (seasonsData, managerOf = () => null) => {
    const games = [];
    const scores = [];
    let trade = null;

    for (const s of seasonsData) {
        for (const [a, b] of pairUp(s.matchups ?? [])) {
            if (a.points === 0 && b.points === 0) continue;
            const [winner, loser] = a.points >= b.points ? [a, b] : [b, a];
            games.push({ season: s.season, winner, loser, margin: winner.points - loser.points });
        }
        for (const e of s.matchups ?? []) {
            if (e.matchup_id != null && e.points > 0) {
                scores.push({ season: s.season, rosterID: e.roster_id, points: e.points });
            }
        }
        for (const t of s.transactions ?? []) {
            if (t.type !== 'trade' || t.status !== 'complete') continue;
            const summary = summarizeTrade(t);
            if (!trade || summary.assets > trade.assets) trade = { season: s.season, ...summary };
        }
    }

    if (!games.length && !trade) return null;

    const byMargin = [...games].sort((a, b) => a.margin - b.margin);
    const byScore = [...scores].sort((a, b) => b.points - a.points);
    return {
        seasons: seasonsData.length,
        closest: byMargin[0] ?? null,
        blowout: byMargin[byMargin.length - 1] ?? null,
        high: byScore[0] ?? null,
        low: byScore[byScore.length - 1] ?? null,
        trade,
        streaks: computeStreaks(seasonsData, managerOf),
    };
};
