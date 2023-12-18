import type { PageServerLoad } from './$types';

export const load = (async ({ locals,params }) => {
	const supabase = locals.supabase;

	const roomId = params.id;
	const { data: reuniao } = await supabase.from('reuniao').select('*').eq('id', roomId).single();
	const { data } = await supabase.from('info_user').select('*');
	return { users: data, reuniao };
}) satisfies PageServerLoad;
