<script context="module">
	import { getLeagueData, getLeagueRosters, getLeagueUsers, loadPlayers, waitForAll } from '$lib/utils/helper';

    export async function load() {
        const rostersInfo = waitForAll(
			getLeagueData(),
			getLeagueRosters(),
			getLeagueUsers(),
			loadPlayers(),
		);

    const manager = page.query.get('manager');
	
    const props = {
    	rostersInfo,
    	manager: null,
    }

		if(manager && (manager >= 0 && manager < managersObj.length)) {
            props.manager = manager;
    }
		return { props };
	}
</script>

<script>
	import LinearProgress from '@smui/linear-progress';
	import { Rosters } from '$lib/components'

	export let rostersInfo, manager;
</script>

<style>
	.holder {
		position: relative;
		z-index: 1;
	}
	.loading {
		display: block;
		width: 85%;
		max-width: 500px;
		margin: 80px auto;
	}
</style>

<div class="holder">
	{#await rostersInfo}
		<div class="loading">
			<p>Retrieving roster data...</p>
			<br />
			<LinearProgress indeterminate />
		</div>
	{:then [leagueData, rosterData, users, playersInfo]}
		<!-- promise was fulfilled -->
		<Rosters {leagueData} {rosterData} {users} {playersInfo} /> <!-- displays rosters -->
	{:catch error}
		<!-- promise was rejected -->
		<p>Something went wrong: {error.message}</p>
	{/await}
</div>
