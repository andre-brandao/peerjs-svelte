import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const connected = new Set<string>();

export const load = (async ({ params }) => {
	const userID = params.userID;
	console.log(connected);
	connected.add(userID);

	return { userID, connected };
}) satisfies PageServerLoad;

export const actions: Actions = {
	leave: async ({ params }) => {
		const userID = params.userID;
		if (userID) {
			connected.delete(userID);
		}
		return { userID, connected };
	}
};
