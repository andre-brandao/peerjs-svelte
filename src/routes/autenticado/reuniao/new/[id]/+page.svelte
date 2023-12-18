<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	let users = data.users ?? [];

	let selecionados = new Array<string>();

	async function addParticipante() {
		const { error } = await data.supabase
			.from('participantes')
			.insert(selecionados.map((user) => ({ reuniao: $page.params.id, user })));
		goto('/autenticado/reuniao/');
	}
</script>

<h1 class="h1 text-center">{data.reuniao?.nome}</h1>
<!-- <h1 class="h1">{selecionados}</h1> -->
<h2 class="h2">Adicione Participantes a Reuniao:</h2>
<select class="select" multiple bind:value={selecionados}>
	{#each users as user}
		<option value={user.id}>{user.email} </option>
	{/each}
</select>
<div class="flex justify-center items-center">
	<button class="btn variant-form-material" on:click={addParticipante}>
		Adicionar Participates</button
	>
</div>
