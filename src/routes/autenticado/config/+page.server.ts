import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.getSession();

	const supabase = locals.supabase;

	const userId = session?.user?.id;

	if (!userId) {
		console.log('no user id');

		throw redirect(303, '/');
	}

	const { data, error } = await supabase
		.from('info_user')
		.select('*')
		.eq('id', userId)
		.single();

		console.log(data);
		
	if (error) {
		console.log(error);
	}
	return { email: data?.email, nome: data?.nome };
}) satisfies PageServerLoad;
