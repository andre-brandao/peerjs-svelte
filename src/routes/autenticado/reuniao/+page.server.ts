import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const supabase = locals.supabase;
	const { data, error } = await  supabase.from('reuniao').select('*').order('data', { ascending: false });



	console.log(data);
	
	if (error) {
		console.log(error);
	}
	return { reunioes: data };
}) satisfies PageServerLoad;
