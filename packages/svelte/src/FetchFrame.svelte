<script>
	import { onMount } from "svelte"
	import RenderFrame from "./RenderFrame.svelte"

	export let frame

	let status = "processing"
</script>

{#await frame.fetch()}
	<div>processing</div>
{:then _}
	<RenderFrame {frame} />
{:catch _}
	<div>failed</div>
{/await}
