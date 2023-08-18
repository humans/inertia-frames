<script>
	import { getContext } from "svelte"
	import { TheFrameDrawerContextKey } from "./TheFrameDrawer.svelte"

	export let frame

	const { pages } = getContext(TheFrameDrawerContextKey)

	const resolvePage = () => pages[`${frame.path}.svelte`]().then((module) => module.default)
</script>

{#await resolvePage()}
	<div>Loading</div>
{:then page}
	<svelte:component this={page} {...frame.properties} />
{:catch _}
	<div>Error</div>
{/await}
