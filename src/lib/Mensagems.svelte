<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import type { Database } from './supabase-types';
	import { onMount } from 'svelte';

	const drawerStore = getDrawerStore();

	export let roomId: number;
	export let userId: string;

	export let supabase: SupabaseClient<Database>;

	let mensagems: any[] = [];

	onMount(async () => {
		const { data, error } = await supabase
			.from('mensagem')
			.select('*')
			.eq('reuniao', roomId);

		mensagems = data ?? [];

		const channels = supabase
			.channel('custom-all-channel')
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'mensagem' },
				async (payload) => {
					const { data, error } = await supabase
						.from('mensagem')
						.select('*')
						.eq('reuniao', roomId);

					mensagems = data ?? [];
				}
			)
			.subscribe();
	});

	export let mensagem = '';

	async function send_mensagem() {
		if (mensagem == '') {
			return;
		}

		const { error } = await supabase
			.from('mensagem')
			.insert({ reuniao: roomId, created_by: userId, text: mensagem });

		if (error) {
			console.log(error);
		} else {
			mensagem = '';
		}
	}

</script>

<div class="h-full flex flex-col relative">
	<dl class="list-dl">
		{#each mensagems as msg}
			<!-- content here -->
			<div>
				<span class="badge bg-primary-500"
					><img
						width="50"
						height="50"
						class="object-cover"
						src="https://robohash.org/{msg.created_by}.png"
						alt=""
					/></span
				>
				<span class="flex-auto">
					<dt class="bg-secondary-500 rounded-sm">{msg.created_by}</dt>
					<dd>{msg.text}</dd>
				</span>
			</div>
		{/each}
		<!-- ... -->
	</dl>

	<div class="flex gap-2 absolute bottom-0 inset-x-0 overflow-auto w-full">
		<input
			class="input variant-form-material"
			type="text"
			placeholder="Digite sua mensagem"
			bind:value={mensagem}
		/>

		<button
			class="btn variant-form-material"
			on:keydown={(e) => {
				if (e.key == 'Enter') {
					send_mensagem();
				}
			}}
			on:click={send_mensagem}
		>
			Send
		</button>
	</div>
</div>
