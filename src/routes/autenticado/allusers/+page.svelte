<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let users = data.users
</script>



<!-- Responsive Container (recommended) -->
<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Nome do user</th>
				<th>Data Reuniao</th>
				<!-- <th>Created by</th> -->
				<!-- <th>Weight</th> -->
			</tr>
		</thead>
		<tbody>
			{#each users ?? [] as row, i}
				<tr >
					<td>{row.email}</td>
					<!-- <td>{row.name}</td> -->
					<td>{new Date(row.created_at)}</td>
					<!-- <td>{row.created_by}</td> -->
				</tr>
			{/each}
		</tbody>

	</table>
</div>
