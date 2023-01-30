<script lang="ts">
	import { currentUser, pb } from '../../pocketbase';
	import Post from '$lib/Post.svelte';
	import UserFollow from '$lib/UserFollow.svelte';
	import { onMount } from 'svelte';

	let creatingPost: boolean = true;
	let postText: number;
	let userList : any;

	async function getRecentUsers() {
		userList = await (await pb.collection('users').getList(1,5, {
			sort: '-created'
		})).items;
	}

	onMount(async () => {
		getRecentUsers();
	});
</script>

<div class="flex justify-between mt-8 space-x-8 px-8 w-full">
	<div class="flex-1 max-w-md">
		<div class="bg-[#2e2e2e] rounded-md drop-shadow-md text-white p-5">
			<div class="flex justify-between mb-6 items-center">
				<p class="text-neutral-300">People you may know</p>
				<p class="font-semibold text-sm hover:underline hover:cursor-pointer">See All</p>
			</div>
			{#if userList}
			{#each userList as user}
			<UserFollow name={user?.username}/>
			{/each}
			{/if}
		</div>
	</div>
	<div class="space-y-6 flex-1 mx-auto items-center flex flex-col">
		<Post />
		<Post />
		<Post />
		<Post />
		<Post />
		<Post />
	</div>
	<div class="flex-1 text-white max-w-md">
		<div class="">
			<div class="flex justify-between items-center mb-4">
				<h3 class="font-semibold text-neutral-300">Following</h3>
				<img src="/dots.svg" alt="Dot Dot Dot" class="w-4 cursor-pointer" />
			</div>

			<div class="flex space-x-2 mb-4 hover:bg-neutral-700 p-2 rounded-md hover:cursor-pointer items-center">
				<img src="/profile.svg" alt="Dot Dot Dot" class="w-6" />
				<p class="text-sm font-semibold">Name</p>
			</div>
			<h3 class="font-semibold text-neutral-300 mb-4">Create Post</h3>
			{#if creatingPost}
				<div class="flex flex-col mb-2">
					<label for="email" class="text-neutral-400 font-semibold mb-2 text-sm">Content</label>
					<textarea
						placeholder=""
						bind:value={postText}
						class="bg-[#1b1b1b] p-2 rounded-[4px] mb-4"
					/>
					<label for="email" class="text-neutral-400 font-semibold mb-2 text-sm">Tags</label>
					<input
						placeholder=""
						type="text"
						bind:value={postText}
						class="bg-[#1b1b1b] p-2 rounded-[4px] mb-4"
					/>
				</div>
			{/if}
			<button
				class="bg-[#378E8B] rounded-md p-2 font-semibold flex justify-center items-center w-full hover:bg-[#2d7e7b]"
			>
				Create Post
			</button>
		</div>
	</div>
</div>
