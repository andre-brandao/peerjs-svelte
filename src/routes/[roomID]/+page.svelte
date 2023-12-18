<script lang="ts">

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let name = '';

	function redrectUser() {
		if (name.length === 0) {
			const characters = 'abcdefghijklmnopqrstuvwxyz';
			let name = '';
			for (let i = 0; i < 10; i++) {
				name += characters.charAt(Math.floor(Math.random() * characters.length));
			}
		}
		goto(`/${$page.params.roomID}/${name}`);
	}
	let but;
</script>

<div class="center flex gap-2">


	<input
		class="input w-40 border rounded-md px-4 py-2"
		bind:value={name}
		placeholder="Enter your name"
		on:keydown={(e) => {
			// name+=e.key;
			console.log(e.key);
			if (e.key === 'Enter') {
				redrectUser();
				// goto(`/1/${name}`);
			}
		}}
	/>
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-4 px-4 rounded"
		
		on:click={() => {
			redrectUser();
		}}>JoinCall</button
	>
</div>

<style>
	.center {
		@apply flex flex-col items-center justify-center h-screen;
	}
</style>
