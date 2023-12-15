import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load = (async () => {
	return {}
}) satisfies PageServerLoad

export const actions: Actions = {
	logout: async ({ locals }) => {
		const supabase = locals.supabase
		const { error } = await supabase.auth.signOut()

		console.log('logout action')

		if (error) {
			console.log(error)
		}

		throw redirect(303, '/')
	},
}