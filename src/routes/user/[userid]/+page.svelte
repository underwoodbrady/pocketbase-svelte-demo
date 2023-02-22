<script lang="ts">
	import { currentUser, pb } from '../../../pocketbase';
	import { page } from '$app/stores';
	import { beforeUpdate } from 'svelte';
	import EditModal from '$lib/EditModal.svelte';

	let viewedUser: any = '';
	let showModal: boolean = false;

	beforeUpdate(async()=>{
		if (!$currentUser) return;
		followIds = $currentUser.following;
		followList = $currentUser.expand.following || [];
		try {
			viewedUser = await pb.collection('users').getOne($page.params.userid);
		} catch (err) {
			console.error(err);
		}
	})

	function toCapitalize(string: string) {
		return string.charAt(0).toLocaleUpperCase() + string.slice(1).toLocaleLowerCase();
	}

	async function updateProfile(first: string, last: string, bio: string) {
		if ($currentUser == null) return;

		type profileData = {
			bio?: string;
			name?: string;
		};

		let data: profileData = {};

		if (bio) data.bio = bio;
		if (first && last) data.name = `${toCapitalize(first)} ${toCapitalize(last)}`;

		if (!data) return;

		await pb.collection('users').update($currentUser.id, data);
		closeModal();
	}

	function closeModal() {
		showModal = false;
	}

	function openModal() {
		showModal = true;
	}

	let followIds: any = [];
	let followList: any = [];

	async function followUser(id: string) {
		//follow user
		if ($currentUser == null) return;

		if (followIds.includes(viewedUser.id)) return;

		let following = [viewedUser.id, ...followIds];

		const data = {
			following: following
		};

		let newUser = await pb.collection('users').update($currentUser.id, data, {
			expand: 'following'
		});

		followIds = following;
		followList = newUser.expand.following;

		//other user receives follow (CURRENTLY NOT PROTECTED AT ALL, super dumb and not safe***)

		let followers = [...viewedUser.followers, $currentUser.id];

		const receiveData = {
			followers: followers
		};

		await pb.collection('users').update(viewedUser.id, receiveData);
	}
</script>

{#if viewedUser === ''}
	<!--Load state-->
{:else if viewedUser}
	{#if showModal}<EditModal
			onSave={(first, last, bio) => updateProfile(first, last, bio)}
			onClose={closeModal}
		/>
	{/if}
	<div class="">
		<div
			class="px-16 pt-24 pb-8 mb-4 bg-[#2e2e2e] flex justify-between items-center drop-shadow-sm"
		>
			<div class="flex space-x-6 items-center ">
				<img
					src="/profile.svg"
					alt="Profile Icon"
					class="w-20 hover:cursor-pointer bg-white rounded-full"
				/>
				<div>
					<h1 class="font-semibold text-white text-2xl">{viewedUser?.username}</h1>
					{#if viewedUser?.name}<h2 class=" text-neutral-300">
							{viewedUser?.name}
						</h2>
					{/if}
					<div class="text-[#49b4b1] text-sm font-semibold flex space-x-2 mt-1">
						<h2 class="hover:underline cursor-pointer">
							{viewedUser?.followers?.length} Followers
						</h2>
						<h2 class="hover:underline cursor-pointer">
							{viewedUser?.following?.length} Following
						</h2>
					</div>
				</div>
			</div>
			{#if $currentUser?.id == viewedUser?.id}
				<button
					class="flex space-x-2 items-center rounded-md bg-neutral-700 p-2 px-4"
					on:click={openModal}
				>
					<img src="/edit.svg" alt="Edit Pen" class="w-4" />
					<p class="text-neutral-300 font-semibold">Edit Profile</p></button
				>
			{:else if $currentUser?.following.includes(viewedUser?.id)}
				<button
					class="flex space-x-2 items-center rounded-md bg-[#378E8B] hover:bg-[#2d7e7b] p-2 px-4"
				>
					<img src="/follow.svg" alt="Edit Pen" class="w-5" />
					<p class="text-neutral-300 font-semibold">Following</p></button
				>
			{:else}
				<button
					class="flex space-x-2 items-center rounded-md bg-[#378E8B] hover:bg-[#2d7e7b] p-2 px-4"
					on:click={() => followUser(viewedUser?.id)}
				>
					<img src="/follow.svg" alt="Edit Pen" class="w-5" />
					<p class="text-neutral-300 font-semibold">Follow User</p></button
				>
			{/if}
		</div>
		<div class="px-16">
			<h3 class="text-white text-lg font-semibold mb-2">Bio:</h3>
			{#if $currentUser?.id == viewedUser?.id}
				<p class="text-neutral-300">{$currentUser?.bio || 'Nothing to see here yet'}</p>
			{:else}
				<p class="text-neutral-300">{viewedUser?.bio || 'Nothing to see here yet'}</p>
			{/if}
		</div>
	</div>
{:else}
	<div class="text-white flex justify-center items-center h-screen flex-col space-y-12">
		<h1 class="font-semibold text-3xl">This page can not be found</h1>
		<button
			class="rounded-md text-[#378E8B] underline text-lg hover:font-semibold"
			on:click={() => window.location.assign(`http://${window.location.host}/home`)}
			>Return home</button
		>
	</div>
{/if}
