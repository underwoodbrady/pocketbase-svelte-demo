<script lang="ts">
	export let name:string;
</script>

<div
class="flex justify-between mb-2 items-center hover:bg-neutral-700 p-2 rounded-md hover:cursor-pointer"
>
<div class="flex items-center space-x-2">
    <img src="/profile.svg" alt="profile Icon" />
    <p>{name}</p>
</div>
<p class="font-semibold text-[#378E8B] hover:underline hover:cursor-pointer">Follow</p>
</div>