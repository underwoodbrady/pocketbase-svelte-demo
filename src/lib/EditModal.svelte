<script lang="ts">
	export let onSave: (text: string) => void;
	export let onClose: () => void;

	let bioText: string;
</script>

<div
	class="absolute left-0 top-0 w-screen h-screen bg-black/20 z-50 flex justify-center items-center"
>
	<div class="relative bg-[#333333] w-[500px] rounded-md text-white p-5 flex flex-col">
		<h3 class="text-center text-lg font-semibold mb-4 ">Edit Profile</h3>
		<button on:click={onClose}>
			<img
				src="/close.svg"
				alt="Close modal"
				class="absolute top-4 right-4 bg-neutral-600 rounded-full h-8 p-2"
			/>
		</button>
		<div class="w-[500px] h-[1px] bg-neutral-700 mb-4 -ml-5" />
		<p class="font-semibold mb-4 text-neutral-300">Bio</p>
		<textarea class="bg-[#1b1b1b] p-2 rounded-[4px] mb-4" rows="4" bind:value={bioText} />
		<button
			class="rounded-md bg-[#378E8B] hover:bg-[#2d7e7b] p-2 px-4"
			on:click={() => onSave(bioText)}>Save Changes</button
		>
	</div>
</div>
