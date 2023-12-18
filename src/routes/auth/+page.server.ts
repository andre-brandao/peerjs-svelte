import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	logout: async ({ locals }) => {
		const supabase = locals.supabase;
		const { error } = await supabase.auth.signOut();

		console.log('logout action');

		if (error) {
			console.log(error);
		}

		throw redirect(303, '/');
	},
	login: async ({ locals, request }) => {
		const supabase = locals.supabase;
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		console.log('login action');

		console.log(email, password);

		console.log(formData);

		const resp = await supabase.auth.signInWithPassword({
			email,
			password
		});

		console.log(resp);

		throw redirect(303, '/autenticado');
	},
	register: async ({ locals, request }) => {
		const supabase = locals.supabase;
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		console.log('register action');

		console.log(email, password);

		console.log(formData);

		const resp = await supabase.auth.signUp({
			email,
			password
		});

		console.log(resp);

		const resp2 = await supabase.auth.signInWithPassword({
			email,
			password
		});

		console.log(resp2);

		throw redirect(303, '/autenticado');
	}
};
