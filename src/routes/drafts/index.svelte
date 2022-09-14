<script context="module">
	import { getPreviousDrafts } from '$lib/utils/helper';

    export async function load() {
        const previousDraftsData = getPreviousDrafts();
		return {
			props: {
        previousDraftsData
			}
		};
	}
</script>

<script>
	import { Drafts } from '$lib/components';

    export let previousDraftsData;
</script>

<style>
    #main {
        position: relative;
        z-index: 1;
    }
</style>

<div id="main">
	<Drafts {previousDraftsData} />
</div>