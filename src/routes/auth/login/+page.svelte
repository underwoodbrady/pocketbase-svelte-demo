<script lang="ts">
    import { currentUser, pb } from "../../../pocketbase";
    import Button from "$lib/Button.svelte";

    let username: string;
    let password: string;

    let loading: boolean;

    async function login() {
        try{
            loading = true;
            await pb.collection("users").authWithPassword(username, password);
            window.location.assign(`http://${window.location.host}/home`);
            loading = false;
        }catch(err){
            console.error(err);
            alert(err);
            pb.cancelAllRequests();
            loading = false;
        }
    }

    function signOut() {
        pb.authStore.clear();
    }
</script>


<div class="sm:hidden inline-block relative h-[20rem] w-full">
    <img class="w-full h-full object-cover" src="/backdrop2.png" alt="desert scene">
    <div class="absolute left-0 top-0 w-full h-full bg-black/[0.15]"></div>
</div>
<div class="bg-[#363636] text-white sm:rounded-md p-8 sm:w-[500px] w-full drop-shadow-md h-full sm:h-auto sm:mt-0 z-10 select-none">
    <h2 class="mt-2 sm:mt-0 text-xl sm:text-2xl font-semibold text-center mb-5">Sign In</h2>
    <form on:submit|preventDefault class="flex flex-col">
        <label for="email" class="text-[#C3C3C3] font-semibold mb-2 text-sm">Username</label>
        <input placeholder="" type="text" bind:value={username} class="bg-[#232323] p-2 rounded-[4px] mb-4"/>
        <label for="password" class="text-[#C3C3C3] font-semibold mb-2 text-sm">Password</label>
        <input placeholder="" type="password" bind:value={password} class="bg-[#232323] p-2 rounded-[4px] mb-4" />
        <!--<button on:click={login}>Login</button>-->
        <Button label="Continue" onClick={login} loading={loading}/>
    </form>
    <p class="text-sm text-[#B1B1B1] text-center">Need an account? <a class="text-[#65C0BD] font-semibold underline" href="/auth/register">Sign up Now</a></p>
</div>
<p class="hidden sm:inline-block text-sm text-center absolute left-1/2 bottom-4 -translate-x-1/2 text-white">By continuing you agree to the <span class="underline">Terms of Service</span> and <span class="underline">Privacy Policy</span></p>
