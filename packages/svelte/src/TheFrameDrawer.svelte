<script context="module">
	export const TheFrameDrawerContextKey = Symbol()
</script>

<script>
	import { setContext } from "svelte"
	import { useFramesStore } from "./use-frames-store"
	import FetchFrame from "./FetchFrame.svelte"

	export let pages

	setContext(TheFrameDrawerContextKey, {
		pages,
	})

	const frames = useFramesStore()
</script>

<div>
	{#each $frames as frame}
		<svelte:component this={frame.component}>
			<FetchFrame {frame} />
		</svelte:component>
	{/each}
</div>
