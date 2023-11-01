<script lang="ts">
	import { Peer } from 'peerjs';
	import { writable } from 'svelte/store';
	import { CameraOff, MicOff } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import Video from '$lib/Video.svelte';
	import { createPeerStore } from '$lib/rtc';
	import { page } from '$app/stores';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let data: PageData;
	let localStream: MediaStream | undefined;

	let peerStore: ReturnType<typeof createPeerStore> | undefined;
	async function getUserMedia() {
		return await navigator.mediaDevices.getUserMedia({
			video: { width: { exact: 640 }, height: { exact: 480 } },
			audio: true
		});
	}
	onMount(async () => {
		// add 2 media streams to test
		localStream = await getUserMedia();
		peerStore = createPeerStore($page.params.roomID, localStream, data.connections);
		console.log();
		// peerStore.callPeer();
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

<!-- 
<h1>Your pier Id is : {$peerStore?.peerID}</h1>
<input type="text" class="input" bind:value={input} />
<button class="btn" on:click={() => peerStore?.callPeer(input)}>CallPier</button> -->
<div class="pt-5 px-5">
	<div class=" w-full text-center">
		<div
			class="grid grid-cols-[repeat(auto-fill,minmax(350px,400px))] mx-auto gap-3 justify-items-center"
		>
			{#each $peerStore?.peers ?? [] as mediaStream, i (mediaStream)}
			<!-- {#each Array(8) as _, index (index)} -->
				<div class="">
					<Video size="w-[300px]" src={mediaStream} />
					<p>{i}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
<div class="fixed bottom-0 w-full flex justify-center">
	<div class=" rounded-lg card-hover bg-primary-500">
		{#if vidioON}
			<!-- content here -->
			<Video muted={true} src={localStream} />
		{/if}
		<div class="justify-around flex-row flex my-4">
			<button
				class="btn-icon mx-3 {audioON ? 'bg-green-500' : 'bg-red-400'}"
				on:click={() => {
					peerStore?.toggleMic();
					audioON = !audioON;
				}}
			>
				<MicOff />
			</button>
			<button
				class="btn-icon mx-3 {vidioON ? 'bg-green-500' : 'bg-red-400'}"
				on:click={() => {
					peerStore?.toggleVideo();
					vidioON = !vidioON;
				}}
			>
				<CameraOff />
			</button>
		</div>
	</div>
</div>

<form action="?/leave">
	<input type="hidden" bind:value={$page.params.roomID} />
	<button bind:this={but} />
</form>
