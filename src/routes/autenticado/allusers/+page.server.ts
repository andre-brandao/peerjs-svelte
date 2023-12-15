import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const supabase = locals.supabase;
	const { data } = await supabase.from('info_user').select('*');
	return { users: data };
}) satisfies PageServerLoad;
