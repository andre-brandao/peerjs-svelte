<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);
	let nome = '';
	let data_reuniao: any;

	let duration: number;

	async function create_reuniao() {
		try {
			let { data:room } = await supabase
				.from('reuniao')
				.insert({
					nome,
					data: data_reuniao,
					duration,
					created_by: session?.user.id
				})
				.select('*').single();

				console.log(room);
				
				goto('/autenticado/reuniao/new/' + room?.id);
		} catch (err) {
			console.log(err);

			return;
		}
	}

	async function addParticipante(idSala: number, idUser: string) {
		let { error } = await supabase
			.from('participantes')
			.insert({ reuniao: idSala, user: idUser });
	}
</script>

<div class="container flex flex-col gap-5">
	<h1 class="h1 text-center">Nova Reuniao</h1>
	<div class="flex gap-2">
		<input
			class="input"
			placeholder="Nome Reuniao"
			type="text"
			bind:value={nome}
		/>
		<input class="input" type="datetime-local" bind:value={data_reuniao} />
	</div>

	<input
		class="input"
		type="number"
		placeholder="Duracao"
		bind:value={duration}
	/>
	<button class="btn variant-outline-secondary m-2" on:click={create_reuniao}>
		Criar</button
	>
</div>
