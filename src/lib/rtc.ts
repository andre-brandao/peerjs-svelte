import { Peer } from 'peerjs';
import { writable } from 'svelte/store';

interface Room {
	peerID: string;
	// localStream: MediaStream | undefined;
	peers: MediaStream[];
}
const configuration = {
	iceServers: [
		{
			urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
		}
	],
	iceCandidatePoolSize: 10
};
async function getUserMedia() {
	return await navigator.mediaDevices.getUserMedia({
		video: true,
		audio: true
	});
}

export function createPeerStore(
	peerID: string,
	localStream: MediaStream,
	conectTO?: Array<string>
) {
	const { update, subscribe } = writable<Room>({
		peerID: '',
		peers: []
	});
	const peer = new Peer(peerID, {
		config: configuration
	});
	// OPEN PEER CONECTION
	peer.on('open', async (id) => {
		console.log('PEER OPENED WITH ID: ' + id);
		// const userMedia = await getUserMedia();

		update((room) => {
			room.peerID = id;
			if (conectTO) {
				conectTO.forEach((peerID) => {
					if (peerID !== id) {
						callPeer(peerID);
					}
				});
			}
			// localStream = userMedia;
			return room;
		});
	});

	//RECEIVE CALL
	peer.on('call', async (call) => {
		// const userMedia = await getUserMedia();

		console.log('RECEIVING CALL FROM: ' + call.peer);
		console.log('Metadata: ' + call.metadata);

		call.answer(localStream);

		call.on('stream', (remoteStream) => {
			console.log('STREAM RECEIVED FROM: ' + remoteStream.id);
			update((room) => {
				if (!room.peers.find((peer) => peer.id === remoteStream.id)) {
					room.peers = [...room.peers, remoteStream];
				}
				return room;
			});
			// room.peers.push(remoteStream);
		});

		call.on('close', () => {
			console.log('CALL CLOSED FROM: ' + call.peer);
			console.log('Metadata: ' + call.metadata);
			update((room) => {
				room.peers = room.peers.filter((peer) => peer.id !== call.peer);
				return room;
			});
		});
	});
	//ON DISCONECT
	peer.on('disconnected', (disconnectedID) => {
		console.log('PEER DISCONNECTED' + disconnectedID);
		update((room) => {
			room.peers = room.peers.filter((peer) => peer.id !== disconnectedID);
			return room;
		});
	});
	async function callPeer(peerId: string) {
		const userMedia = await getUserMedia();
		const call = peer.call(peerId, userMedia);
		console.log('CALLING PEER: ' + peerId);

		console.log('Metadata: ' + call.metadata);

		call.on('stream', (remoteStream) => {
			console.log('Metadata: ' + call.metadata);
			update((room) => {
				if (!room.peers.find((peer) => peer.id === remoteStream.id)) {
					// room.peers.push(remoteStream);
					room.peers = [...room.peers, remoteStream];
				}
				return room;
			});
		});
	}

	function closePeer() {
		peer.destroy();
		
	}

	function toggleMic() {
		update((room) => {
			if (localStream) {
				localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0].enabled;
			}
			return room;
		});
	}

	function toggleVideo() {
		update((room) => {
			if (localStream) {
				localStream.getVideoTracks()[0].enabled = !localStream.getVideoTracks()[0].enabled;
			}
			return room;
		});
	}

	return {
		subscribe,
		callPeer,
		closePeer,
		toggleMic,
		toggleVideo
	};
}
