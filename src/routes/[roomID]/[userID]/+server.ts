import type { RequestHandler } from './$types';

const connected = new Set<string>();

export const GET: RequestHandler = async ({ params }) => {
	const userID = params.userID;
	console.log(connected);
	connected.add(userID);

	return new Response(JSON.stringify(Array.from(connected)));
};

export const POST: RequestHandler = async ({ params }) => {
	const userID = params.userID;
	console.log(connected);
	connected.delete(userID);

	return new Response(JSON.stringify(Array.from(connected)));
};
