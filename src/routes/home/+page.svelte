<script lang="ts">
	import { currentUser, pb } from '../../pocketbase';
	import Post from '$lib/Post.svelte';
	import UserFollow from '$lib/UserFollow.svelte';
	import { onDestroy, onMount } from 'svelte';

	let creatingPost: boolean = true;
	let postText: string;
	let postTags: string;

	let userList: any = [];
	let postList: any = [];
	let followIds: any = [];
	let followList: any = [];

	async function getRecentUsers() {
		userList = await (
			await pb.collection('users').getList(1, 5, {
				sort: '-created'
			})
		).items.filter((u: any) => u.id !== $currentUser?.id);
	}

	async function getRecentPosts() {
		postList = await (
			await pb.collection('posts').getList(1, 50, {
				sort: '-created',
				expand: 'author,comments'
			})
		).items;
	}

	async function getFollowing() {
		if ($currentUser == null) return;

		let user = await pb.collection('users').getOne($currentUser.id, {
			expand: 'following'
		});

		followIds = user.following;
		followList = user.expand.following || [];
	}

	async function createPost() {
		if ($currentUser == null) return;

		let date = new Date();

		const data = {
			content: postText,
			author: $currentUser.id,
			tags: postTags,
			date: date.toLocaleDateString('en-us')
		};

		await pb.collection('posts').create(data);

		postText = '';
		postTags = '';
	}

	async function likePost(id: string) {
		if ($currentUser == null) return;

		let post = await pb.collection('posts').getOne(id);

		let likes = [...post.likes, $currentUser.id];

		const data = {
			likes: likes
		};

		await pb.collection('posts').update(id, data);
	}

	async function commentPost(id: string, comment: string) {
		if ($currentUser == null) return;

		let post = await pb.collection('posts').getOne(id);

		let commentData = {
			text: comment,
			author: $currentUser.id,
			username: $currentUser.username
		};

		let newComment = await pb.collection('comments').create(commentData);

		let comments = [...post.comments, newComment.id];

		const updateData = {
			comments: comments
		};

		await pb.collection('posts').update(id, updateData);
	}

	async function followUser(id: string) {
		//follow user
		if ($currentUser == null) return;

		let user = await pb.collection('users').getOne(id);

		if (followIds.includes(user.id)) return;

		let following = [...followIds, user.id];

		const data = {
			following: following
		};

		await pb.collection('users').update($currentUser.id, data);

		getFollowing();
		
		//other user receives follow (CURRENTLY NOT PROTECTED AT ALL, super dumb and not safe***)

		let followers = [...user.followers, $currentUser.id]

		const receiveData = {
			followers: followers
		}

		await pb.collection('users').update(user.id, receiveData)
	}

	let unsubscribe: () => void;

	onMount(async () => {
		getRecentUsers();
		getRecentPosts();
		getFollowing();
		unsubscribe = await pb.collection('posts').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				const author = await pb.collection('users').getOne(record.author);
				record.expand = { author };
				postList = [record, ...postList];
			}
			if (action === 'delete') {
				postList = postList.filter((m: any) => m.id !== record.id);
			}
			if (action === 'update') {
				getRecentPosts();
			}
		});
	});

	onDestroy(() => {
		unsubscribe?.();
	});
</script>

<div class="flex justify-between mt-8 space-x-8 px-8 w-full">
	<div class="flex-1 max-w-md">
		<div class="bg-[#2e2e2e] rounded-md drop-shadow-md text-white p-5">
			<div class="flex justify-between mb-6 items-center">
				<p class="text-neutral-300">People you may know</p>
				<p class="font-semibold text-sm hover:underline hover:cursor-pointer">See All</p>
			</div>
			{#each userList as user (user.id)}
				<UserFollow
					name={user?.username}
					onClick={() => window.location.assign(`http://${window.location.host}/user/${user.id}`)}
					onFollow={() => followUser(user.id)}
				/>
			{/each}
		</div>
	</div>
	<div class="space-y-6 flex-1 mx-auto items-center flex flex-col">
		{#each postList as post (post.id)}
			<Post
				id={post.id}
				author={post.expand?.author?.username}
				date={post?.date}
				content={post?.content}
				tags={post?.tags}
				likes={post?.likes}
				comments={post?.expand?.comments}
				onLike={(id) => likePost(id)}
				onComment={(id, comment) => commentPost(id, comment)}
			/>
		{/each}
	</div>
	<div class="flex-1 text-white max-w-md">
		<div class="">
			<div class="flex justify-between items-center mb-4">
				<h3 class="font-semibold text-neutral-300">Following</h3>
				<img src="/dots.svg" alt="Dot Dot Dot" class="w-4 hover:cursor-pointer" />
			</div>
			{#each followList as follow (follow.id)}
				<button
					class="flex space-x-2 mb-4 hover:bg-neutral-700 p-2 rounded-md hover:cursor-pointer items-center w-full"
					on:click={() => window.location.assign(`http://${window.location.host}/user/${follow.id}`)}
				>
					<img src="/profile.svg" alt="Dot Dot Dot" class="w-6 bg-white rounded-full" />
					<p class="text-sm font-semibold">{follow.username}</p>
				</button>
			{/each}

			<h3 class="font-semibold text-neutral-300 mb-4">Create Post</h3>
			{#if creatingPost}
				<div class="flex flex-col mb-2">
					<label for="email" class="text-neutral-400 font-semibold mb-2 text-sm">Content</label>
					<textarea
						placeholder=""
						bind:value={postText}
						class="bg-[#1b1b1b] p-2 rounded-[4px] mb-4"
					/>
					<label for="email" class="text-neutral-400 font-semibold mb-2 text-sm"
						>Tags <span class="text-neutral-500">(separate by spaces)</span></label
					>
					<input
						placeholder=""
						type="text"
						bind:value={postTags}
						class="bg-[#1b1b1b] p-2 rounded-[4px] mb-4"
					/>
				</div>
			{/if}
			<button
				class="bg-[#378E8B] rounded-md p-2 font-semibold flex justify-center items-center w-full hover:bg-[#2d7e7b]"
				on:click={createPost}
			>
				Create Post
			</button>
		</div>
	</div>
</div>
