<script lang="ts">
	type errorTypes = 'error' | 'warning';
	export let onClick: () => void;
	export let type: errorTypes;
	export let label: string;
	export let shown: boolean = false;
</script>

<div class={"text-white bg-[#e06363] border-[#db5454] w-[400px] p-4 flex rounded-md border-2 space-x-4 relative drop-shadow-md translate-y-0 duration-450 transition-transform" + (!shown && " translate-y-32 flex")}>
    <img src="/error.svg" alt="Error Icon" class="w-10">
	<div class="flex flex-col">
		<h2 class="capitalize font-semibold">{type}</h2>
		<p class="text-[#e6e6e6] text-sm">{label}</p>
	</div>
	<button on:click={onClick} class="absolute top-4 right-4 p-2 hover:bg-white/30 rounded-full">
        <img src="/close-thick.svg" alt="Close X" class="w-3"/>
    </button>
</div>
