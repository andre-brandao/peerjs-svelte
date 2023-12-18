import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const supabase = locals.supabase;
	const { data, error } = await  supabase.from('reuniao').select('*, info_user(email)').order('data', { ascending: false });



	const formated = data?.map((reuniao) => {

		//@ts-ignore
		const info_user = reuniao.info_user?.map((user) => {
			return user.email;
		});

		return {...reuniao, info_user}
	});

	console.log(formated);
	
	if (error) {
		console.log(error);
	}
	return { reunioes: formated };
}) satisfies PageServerLoad;
