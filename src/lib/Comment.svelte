<script lang="ts">
	export let author: string;
	export let text: string;
</script>

<div class="flex space-x-2 items-center">
	<img src="/profile.svg" alt="Profile Icon" class="rounded-full bg-white" />
	<div class="flex flex-col bg-neutral-700 rounded-md p-2">
		<h5 class="text-sm leading-4 font-semibold">{author}</h5>
		<h5 class="text-neutral-200">{text}</h5>
	</div>
</div>
