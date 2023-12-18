<script lang="ts">
	import { goto } from '$app/navigation';
	import { ArrowBigRightDashIcon, Trash } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	let reunioes = data.reunioes ?? [];

	async function delteReuniao(id: number) {
		const { error } = await supabase.from('reuniao').delete().eq('id', id);
		if (error) {
			console.log(error);
		} else {
			reunioes = reunioes.filter((reuniao) => reuniao.id !== id);
		}
	}
</script>

<!-- <h1 class="h1">reuniao</h1> -->

<a class="btn variant-outline-secondary" href="/autenticado/reuniao/new"
	>Nova Reuniao
</a>

<!-- Responsive Container (recommended) -->
<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Nome da sala</th>
				<th>Data Reuniao</th>
				<th>Created by</th>
				<th>Participantes</th>
				<th>Edit</th>
			</tr>
		</thead>
		<tbody>
			{#each reunioes ?? [] as row, i}
				<tr
					class="cursor-pointer"
					on:click={() => {
						goto(`/${row.id}/${session?.user.email?.split('@')[0]}`);
					}}
				>
					<td>{row.nome}</td>
					<td>{new Date(row.created_at)}</td>
					<td>{row.created_by}</td>
					<td>{row.info_user}</td>
					<td class="flex gap-1">
						<button 
						class="variant-outline-error btn"
							on:click={(e) => {
								e.stopPropagation();
								delteReuniao(row.id);
							}}
						>
							<Trash />
						</button>

						<button
						class="variant-outline-secondary btn"
							on:click={(e) => {
								e.stopPropagation();
								goto(`/autenticado/reuniao/new/${row.id}`);
							}}
						>
							<ArrowBigRightDashIcon />
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
