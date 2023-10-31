import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const connected = new Set<string>();

export const load = (async ({ params }) => {
	const roomID = params.roomID;
	console.log(connected);
	connected.add(roomID);

	return { roomID, connected };
}) satisfies PageServerLoad;

export const actions: Actions = {
	leave: async ({ params }) => {
		const roomID = params.roomID;
		if (roomID) {
			connected.delete(roomID);
		}
		return { roomID, connected };
	}
};
