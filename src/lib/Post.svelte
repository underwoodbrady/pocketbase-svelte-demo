<script lang="ts">
	import Tag from "$lib/Tag.svelte";

	export let name:string;
	export let date:string;
	export let content:string;
	export let likes:number;
	export let userLiked:boolean;
	export let comments:[];
</script>

<div class="bg-[#333333] w-[500px] rounded-md drop-shadow-md text-white p-5">
	<div class="flex items-center justify-between mb-2">
		<div class="flex items-center">
			<img src="/profile.svg" alt="Profile Icon" class="h-10 mr-3 hover:cursor-pointer" />
			<div class="flex flex-col">
				<h3 class="font-semibold hover:underline cursor-pointer">Name</h3>
				<h4 class="text-sm text-neutral-300">Date</h4>
			</div>
		</div>
		<div class="flex space-x-4">
			<img src="/heart.svg" alt="Dot Dot Dot" class="w-4 hover:cursor-pointer" />
			<img src="/dots.svg" alt="Dot Dot Dot" class="w-4 hover:cursor-pointer" />
		</div>
	</div>

	<p class="mb-4">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed elit nec tortor elementum
		eleifend vel ac odio. Curabitur vehicula sapien non massa maximus, non cursus nisi convallis. Ut
		lacinia vehicula dui, id mattis nulla. Curabitur suscipit vulputate imperdiet. Nullam laoreet
		vulputate iaculis. Ut semper nec massa non pretium. Integer bibendum, tellus non suscipit
		placerat, magna massa laoreet nisi, in ultricies orci mauris et erat.
	</p>

	<div class="text-sm flex text-neutral-300 justify-between mb-4">
		<p class="hover:underline cursor-pointer">1 like</p>
		<p class="hover:underline cursor-pointer">2 comments</p>
	</div>

	<div class=" flex space-x-2 mb-4 flex-wrap">
		<Tag label="Tagged"/>
		<Tag label="DogMom"/>
		<Tag label="Blessed"/>
	</div>

	<div
		class="flex justify-around font-semibold text-neutral-300 border-t-[1px] border-b-[1px] border-neutral-600 py-1 mb-4"
	>
		<button
			class="flex space-x-2 items-center hover:bg-neutral-600 flex-1 p-1 rounded-md mx-1 justify-center"
		>
			<img src="/heart.svg" alt="Dot Dot Dot" class="w-4" />
			<p>Like</p></button
		>
		<button
			class="flex space-x-2 items-center hover:bg-neutral-600 flex-1 p-1 rounded-md mx-1 justify-center"
		>
			<img src="/comment.svg" alt="Dot Dot Dot" class="w-4" />
			<p>Comment</p></button
		>
	</div>

	<div class="flex mb-4 space-x-2">
		<img src="/profile.svg" alt="Profile Icon" />
		<div class="flex flex-col bg-neutral-700 rounded-md p-2">
			<h5 class="text-sm leading-4">Name</h5>
			<h5>Comment of text!!</h5>
		</div>
	</div>

	<div>
		<div class="flex space-x-2">
			<input placeholder="Write a comment" class=" w-10/12 bg-[#2D2D2D] rounded-md p-2" />
			<button class="bg-[#378E8B] rounded-md w-2/12 font-semibold flex justify-center items-center hover:bg-[#2d7e7b]"><img src="/send.svg" class="h-4"></button>
		</div>
	</div>
</div>
