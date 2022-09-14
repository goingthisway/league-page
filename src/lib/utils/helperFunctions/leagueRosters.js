import { leagueID } from '$lib/utils/leagueInfo';
import { get } from 'svelte/store';
import {rostersStore} from '$lib/stores';

export const getLeagueRosters = async (queryLeagueID = leagueID) => {
	if(get(rostersStore)[queryLeagueID]) {
		let x = get(rostersStore)[queryLeagueID];
		console.log(x);
		return x;
	}
	console.log("NEW ROSTER CALL")
    const res = await fetch(`https://api.sleeper.app/v1/league/${queryLeagueID}/rosters`, {compress: true}).catch((err) => { console.error(err); });
	const data = await res.json().catch((err) => { console.error(err); });
	
	if (res.ok) {
		const processedRosters = processRosters(data)
		rostersStore.update(r => {r[queryLeagueID] = processedRosters; return r});
		return processedRosters;
	} else {
		throw new Error(data);
	}
}

const processRosters = (rosters) => {
	const startersAndReserve = [];
	console.log(rosters)
	console.log("roster sorting...")
	rosters.sort((a, b) => {
		return a.roster_id - b.roster_id;
	});
	for(const roster of rosters) {
		for(const starter of roster.starters) {
			startersAndReserve.push(starter);
		}
		if(roster.reserve) {
			for(const ir of roster.reserve) {
				startersAndReserve.push(ir);
			}
		}
	}
	return {rosters, startersAndReserve};
}