<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	let reunioes = data.reunioes
</script>


<!-- <h1 class="h1">reuniao</h1> -->

<a class="btn variant-outline-secondary" href="/autenticado/reuniao/new">Nova Reuniao </a>

<!-- Responsive Container (recommended) -->
<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Nome da sala</th>
				<th>Data Reuniao</th>
				<th>Created by</th>
				<!-- <th>Weight</th> -->
			</tr>
		</thead>
		<tbody>
			{#each reunioes ?? [] as row, i}
				<tr class="cursor-pointer" on:click={()=>{
					goto(`/${row.id}/${session?.user.email}`)
				}}>
					<td>{row.nome}</td>
					<!-- <td>{row.name}</td> -->
					<td>{new Date(row.created_at)}</td>
					<td>{row.created_by}</td>
				</tr>
			{/each}
		</tbody>

	</table>
</div>
