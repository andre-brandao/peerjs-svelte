<script lang="ts">
	import Login from '$lib/Login.svelte';
	import type { LayoutData } from './$types';
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	export let data: LayoutData;
	let currentTile: number = 0;
	let {supabase, session} = data;
	$: ({supabase, session} = data);
</script>


{#if session}


	<AppRail class="fixed pb-12 shadow-lg ">
		<svelte:fragment slot="lead">
			<AppRailAnchor href="/" >Home</AppRailAnchor>
		</svelte:fragment>

	<AppRailAnchor href="/autenticado/reuniao" >Reunioes</AppRailAnchor>

	<AppRailAnchor href="/autenticado/allusers" >Usuarios</AppRailAnchor>
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor href="/autenticado/config" title="Account">Config Conta</AppRailAnchor>
	</svelte:fragment>
</AppRail>

<div class="pl-20">

	<slot ><!-- optional fallback --></slot>
</div>

{:else}

<Login {data} />

{/if}