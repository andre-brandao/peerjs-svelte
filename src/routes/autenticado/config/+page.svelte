<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let email = data.email;
	let nome = data.nome;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	let userId = session?.user.id;

	async function updateInfo_User() {
		if (!userId) {
			return;
		}
		let { error } = await supabase
			.from('info_user')
			.update({ nome, email })
			.match({ id: userId });
	}
</script>

<h1 class="h1 text-center">Configuracoes conta</h1>

<div class=" justify-center items-center flex">
	<div class="flex flex-col w-[600px] gap-2">
		<p>Nome</p>
		<input class="input" type="text" bind:value={nome} />
		<p>Email</p>
		<input class="input" type="text" bind:value={email} />
		<p>Senha</p>
		<input class="input" type="password" />
		<button on:click={updateInfo_User} class="btn variant-form-material"> Salvar </button>
	</div>
</div>
