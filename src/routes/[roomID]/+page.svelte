<script lang="ts">
	import { Peer } from 'peerjs';
	import { writable } from 'svelte/store';
	import { CameraOff, MicOff } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import Video from '$lib/Video.svelte';
	import { createPeerStore } from '$lib/rtc';
	import { page } from '$app/stores';
	export let data: PageData;
	let localStream: MediaStream | undefined;

	let peerStore: ReturnType<typeof createPeerStore> | undefined;
	async function getUserMedia() {
		return await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true
		});
	}
	onMount(async () => {
		// add 2 media streams to test
		localStream = await getUserMedia();
		peerStore = createPeerStore($page.params.roomID, localStream, data.connections);
		console.log();

		console.log(data.connections);
		peerStore;
	});
	onDestroy(() => {
		peerStore?.closePeer();
		// trigger button click
		but.click();
	});

	// $: console.log(data);

	let vidioON = true;
	let audioON = true;
	let input = '';

	let but: HTMLButtonElement;

</script>

<h1>Your pier Id is : {$peerStore?.peerID}</h1>
<input type="text" class="input" bind:value={input} />
<button class="btn" on:click={() => peerStore?.callPeer(input)}>CallPier</button>
<div class="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-3">
	{#each $peerStore?.peers ?? [] as mediaStream, i (mediaStream)}
		<div class="">
			<Video muted={true} src={mediaStream} />
			<p>{i}</p>
		</div>
	{/each}
</div>

<div class="fixed rounded-lg bottom-0 right-0 card-hover bg-primary-500">
	<Video muted={true} src={localStream} />
	<div class="justify-around flex-row flex my-4">
		<button
			class="btn-icon {audioON ? 'bg-green-500' : 'bg-red-400'}"
			on:click={() => {
				peerStore?.toggleMic();
				audioON = !audioON;
			}}
		>
			<MicOff />
		</button>
		<button
			class="btn-icon {vidioON ? 'bg-green-500' : 'bg-red-400'}"
			on:click={() => {
				peerStore?.toggleVideo();
				vidioON = !vidioON;
			}}
		>
			<CameraOff />
		</button>
	</div>
</div>
<form action="?/leave">
	<input type="hidden" bind:value={$page.params.roomID} />
	<button bind:this={but}/>
</form>
