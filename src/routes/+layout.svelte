<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, Drawer, Modal } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import {
		computePosition,
		autoUpdate,
		flip,
		shift,
		offset,
		arrow
	} from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	import { initializeStores } from '@skeletonlabs/skeleton';
	import Mensagems from '$lib/Mensagems.svelte';

	initializeStores();

	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();
</script>

<Modal />
<Drawer>
	{#if $drawerStore.id === 'msgs' && session}
		<Mensagems
			roomId={$drawerStore.meta.roomId}
			userId={$drawerStore.meta.userId}
			{supabase}
		/>
	{/if}
</Drawer>

<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Fake-Meet</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/andre-brandao/peerjs-svelte"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>

				{#if session}
					<div class="flex items-center h-fit">
						<a href="/autenticado">
							{session?.user.email}
						</a>
						<form method="post" action="/auth?/logout">
							<button
								class="h-fit px-2 ml-1 card variant-glass-error card-hover"
								>Logout</button
							>
						</form>
					</div>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
