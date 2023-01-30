<script>
    export const prerender = false;
    export const ssr = false;
    import { onMount } from 'svelte'

    onMount(async () => {
        window.location.replace(`${document.URL}/register`);
    })
</script>