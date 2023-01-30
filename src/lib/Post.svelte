<script lang="ts">
	import { currentUser } from '../pocketbase';
	import Tag from '$lib/Tag.svelte';
	import Comment from '$lib/Comment.svelte';
	import { onMount, beforeUpdate } from 'svelte';

	export let id: string;
	export let content: string;
	export let tags: string;
	export let author: string;
	export let date: string;
	export let likes: string[] = [];
	export let comments: any = [];
	export let onLike: (id: string) => void;
	export let onComment: (id: string, comment: string) => void;

	let commentText: string;
	let commentInput: HTMLInputElement;

	let tagArr: string[] = [];
	let userLiked: boolean = false;

	function createComment() {
		onComment(id, commentText);
		commentText = '';
	}

	function focusCommentInput(){
		commentInput.focus();
	}

	onMount(() => {
		tagArr = tags.split(' ');
		if (tagArr[0] === '') tagArr = [];
	});

	beforeUpdate(() => {
		if (comments == undefined) comments = [];
		if ($currentUser == null) return;
		userLiked = likes.includes($currentUser.id);
	});
</script>

<div class="bg-[#333333] w-[500px] rounded-md drop-shadow-md text-white p-5">
	<div class="flex items-center justify-between mb-2">
		<div class="flex items-center">
			<img src="/profile.svg" alt="Profile Icon" class="h-10 mr-3 hover:cursor-pointer" />
			<div class="flex flex-col">
				<h3 class="font-semibold hover:underline cursor-pointer">{author}</h3>
				<h4 class="text-sm text-neutral-300">{date}</h4>
			</div>
		</div>
		<div class="flex space-x-4">
			<button on:click={() => onLike(id)}>
				{#if userLiked}<img
						src="/heart-full.svg"
						alt="Dot Dot Dot"
						class="w-4 hover:cursor-pointer"
					/>{:else}<img
						src="/heart.svg"
						alt="Dot Dot Dot"
						class="w-4 hover:cursor-pointer"
					/>{/if}</button
			>
			<img src="/dots.svg" alt="Dot Dot Dot" class="w-4 hover:cursor-pointer" />
		</div>
	</div>

	<p class="mb-4">
		{content}
	</p>

	<div class="text-sm flex text-neutral-300 justify-between mb-4">
		<p class="hover:underline cursor-pointer">{likes?.length} likes</p>
		<p class="hover:underline cursor-pointer">{comments?.length} comments</p>
	</div>

	{#if tagArr.length > 0}
		<div class=" flex space-x-2 mb-4 flex-wrap">
			{#each tagArr as tag}
				<Tag label={tag} />
			{/each}
		</div>
	{/if}

	<div
		class="flex justify-around font-semibold text-neutral-300 border-t-[1px] border-b-[1px] border-neutral-600 py-1 mb-4"
	>
		<button
			class="flex space-x-2 items-center hover:bg-neutral-600 flex-1 p-1 rounded-md mx-1 justify-center"
			on:click={() => onLike(id)}
		>
			{#if userLiked}<img
					src="/heart-full.svg"
					alt="Dot Dot Dot"
					class="w-4 hover:cursor-pointer"
				/>
				<p>Liked</p>{:else}<img
					src="/heart.svg"
					alt="Dot Dot Dot"
					class="w-4 hover:cursor-pointer"
				/>
				<p>Like</p>{/if}
		</button>
		<button
			class="flex space-x-2 items-center hover:bg-neutral-600 flex-1 p-1 rounded-md mx-1 justify-center"
			on:click={focusCommentInput}
		>
			<img src="/comment.svg" alt="Comment Icon" class="w-4" />
			<p>Comment</p></button
		>
	</div>

	<div class="flex flex-col mb-4 space-y-2">
		{#each comments as comment}
			<Comment author={comment.username} text={comment.text} />
		{/each}
	</div>

	<div>
		<div class="flex space-x-2">
			<input
				placeholder="Write a comment"
				class=" w-10/12 bg-[#2D2D2D] rounded-md p-2"
				bind:value={commentText}
				bind:this ={commentInput}
			/>
			<button
				class="bg-[#378E8B] rounded-md w-2/12 font-semibold flex justify-center items-center hover:bg-[#2d7e7b]"
				on:click={createComment}><img src="/send.svg" class="h-4" alt="Send Icon" /></button
			>
		</div>
	</div>
</div>
