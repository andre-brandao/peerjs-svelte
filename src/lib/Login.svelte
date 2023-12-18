<script>
	// import { dev } from '$app/environment';

	/**
	 * @type {{ session: any; supabase: any;}}
	 */
	export let data;

	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	let email = '';
	let password = '';

	async function signInWithEmail() {

		try {
			
			await supabase.auth.signInWithPassword({
				email,
				password
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function entrar() {

		try {
			await supabase.auth.signUp({
			email,
			password
			// options: {
			//   emailRedirectTo: 'https//example.com/welcome'
			// }
		});			
		} catch (error) {
			console.log(error);
			
			await signInWithEmail();
		}

	}
</script>

<main class="text-center h-screen flex justify-center items-center">
	<form method="post" action="/auth?/login" class="flex flex-col gap-2">
		<p>Email</p>
		<input type="text" name="email" class="input" bind:value={email} />
		<p>Senha</p>
		<input type="password" name="password" class="input" bind:value={password} />
		<button class="btn variant-glass-secondary shadow-lg">Entrar</button>
		<button class="btn variant-glass-tertiary shadow-lg" formaction="/auth?/register">Register</button>
	</form>
</main>
