<script lang="ts">
    export let onClick: () =>{};
    export let label: string;
    export let loading: boolean;
</script>

<button on:click={onClick} class="bg-[#378E8B] p-3 rounded-[4px] font-semibold mt-5 mb-3">
    {#if loading}
        <img class="w-6 animate-spin mx-auto" src="/spinner.svg" alt="loading spinner">
    {:else}
        {label}
    {/if}
</button>
