<script>
	import { onMount } from 'svelte';
	
	export let size = 'w-[300px] ';
	export let muted = false;
	/**
	 * @type {HTMLVideoElement}
	 */
	let videoElement;

	/**
	 * @type {MediaProvider | undefined}
	 */
	export let src;

	$: {
		if (src && videoElement) {
			videoElement.srcObject = src;
		}
	}

	let loading = true;
	onMount(() => {
		if (src && videoElement) {
			videoElement.srcObject = src;
		}
	});
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
	bind:this={videoElement}
	class="m-1 rounded-lg block transform scale-x-[-1] {size} bg-slate-500"
	autoplay
	playsinline
	{muted}
/>
