<script lang="ts">
	import { Peer } from 'peerjs';
	import { writable } from 'svelte/store';

	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Video from '$lib/Video.svelte';
	import { createPeerStore } from '$lib/rtc';
	import { page } from '$app/stores';
	export let data: PageData;
	// const peerStore = createPeerStore($page.params.roomID);
	onMount(async () => {
		// $roomStore.localStream = await getUserMedia();
	});
	// const configuration = {
	// 	iceServers: [
	// 		{
	// 			urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
	// 		}
	// 	],
	// 	iceCandidatePoolSize: 10
	// };

	// interface Room {
	// 	peerID: string;
	// 	localStream: MediaStream | undefined;
	// 	peers: Set<MediaStream>;
	// }
	// const roomStore = writable<Room>({
	// 	peerID: '',
	// 	localStream: undefined,
	// 	peers: new Set<MediaStream>()
	// });

	// let peer = new Peer({
	// 	config: configuration
	// });
	// // OPEN PEER CONECTION
	// peer.on('open', async (id) => {
	// 	console.log('PEER OPENED WITH ID: ' + id);

	// 	$roomStore.peerID = id;
	// });

	// //RECEIVE CALL
	// peer.on('call', async (call) => {
	// 	console.log('RECEIVING CALL FROM: ' + call.peer);

	// 	call.answer($roomStore.localStream!);
	// 	call.on('stream', (remoteStream) => {
	// 		console.log('STREAM RECEIVED FROM: ' + call.peer);

	// 		$roomStore.peers.add(remoteStream);
	// 	});

	// 	call.on('close', () => {
	// 		console.log('CALL CLOSED FROM: ' + call.peer);

	// 		$roomStore.peers.delete(call.remoteStream);
	// 	});
	// });
	// function callPeer(peerId: string) {
	// 	const call = peer.call(peerId, $roomStore.localStream!);
	// 	call.on('stream', (remoteStream) => {
	// 		$roomStore.peers.add(remoteStream);
	// 	});
	// }
	// async function getUserMedia() {
	// 	return await navigator.mediaDevices.getUserMedia({
	// 		video: true,
	// 		audio: true
	// 	});
	// }
	let input = '';
</script>
<!-- 
<h1>Your pier Id is : {$peerStore.peerID}</h1>
<div>
	<input type="text" bind:value={input} />
	<button class="btn" on:click={() => peerStore.callPeer(input)}>CallPier</button>
	<Video muted={true} src=} />
</div>

{#each $peerStore.peers as mediaStream}
	<Video muted={true} src={mediaStream} />
{/each} -->
