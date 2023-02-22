<script lang="ts">
	export let onSave: (first: string, last:string, bio:string) => void;
	export let onClose: () => void;

	let firstName: string;
	let lastName: string;
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
		<p class="font-semibold mb-4 text-neutral-300">Name</p>
		<div class="flex space-x-4">
			<div class="flex flex-col flex-1">
				<label for="firstName" class="text-neutral-400 font-semibold mb-2 text-sm">First</label>
				<input class="bg-[#1b1b1b] p-2 rounded-[4px] mb-4" bind:value={firstName} maxlength="24" />
			</div>
			<div class="flex flex-col flex-1">
				<label for="lastName" class="text-neutral-400 font-semibold mb-2 text-sm">Last</label>
				<input class="bg-[#1b1b1b] p-2 rounded-[4px] mb-4" bind:value={lastName} maxlength="24" />
			</div>
		</div>
		<p class="font-semibold mb-4 text-neutral-300">Bio</p>
		<textarea
			class="bg-[#1b1b1b] p-2 rounded-[4px] mb-4"
			rows="4"
			bind:value={bioText}
			maxlength="512"
		/>
		<button
			class="rounded-md bg-[#378E8B] hover:bg-[#2d7e7b] p-2 px-4"
			on:click={() => onSave(firstName || "", lastName || "", bioText || "")}>Save Changes</button
		>
	</div>
</div>
