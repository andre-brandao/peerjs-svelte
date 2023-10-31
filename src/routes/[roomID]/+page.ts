import type { PageLoad } from './$types';
export const ssr = false;
export const load = (async (e) => {
	const resp =await fetch(e.url.href);
	const con = await resp.json();
	return { connections: con };
}) satisfies PageLoad;
