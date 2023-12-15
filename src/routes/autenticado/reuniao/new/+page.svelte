<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	let { supabase,session } = data;
	$: ({ supabase, session } = data);
	let nome = '';
	let data_reuniao: any;

	async function create_reuniao() {
		try {
			let { error } = await supabase
				.from('reuniao')
				.insert({ nome, data: data_reuniao, duration: 50, created_by: session?.user.id })
				
		} catch (err) {
			console.log(err);

			return;
		}
		goto('/autenticado/reuniao');
	}
</script>

<div class="container">
	<h1>Nova Reuniao</h1>
	<div class="flex gap-2">
		<input class="input" placeholder="Nome Reuniao" type="text" bind:value={nome} />
		<input class="input" type="date" bind:value={data_reuniao} />
	</div>

	<button class="btn variant-outline-secondary m-2" on:click={create_reuniao}> Criar</button>
</div>
