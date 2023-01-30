<script lang="ts">
	import '../../app.css';
	import { currentUser, pb } from '../../pocketbase';
	import CircleIcon from '$lib/CircleIcon.svelte';
	import Dropdown from '$lib/Dropdown.svelte';
	import MediumDropdown from '$lib/MediumDropdown.svelte';

	let showProfileDropdown: boolean = false;
	let showAlertDropdown: boolean = false;
	let showChatsDropdown: boolean = false;

	function toggleProfileDropdown() {
		showAlertDropdown = false;
		showChatsDropdown = false;
		showProfileDropdown = !showProfileDropdown;
	}
	function toggleAlertDropdown() {
		showProfileDropdown = false;
		showChatsDropdown = false;
		showAlertDropdown = !showAlertDropdown;
	}
	function toggleChatsDropdown() {
		showProfileDropdown = false;
		showAlertDropdown = false;
		showChatsDropdown = !showChatsDropdown;
	}

	function logout() {
		pb.authStore.clear();
		window.location.replace(`http://${window.location.host}/auth`);
	}

	function dropDownClicked(dropdown: number) {
		if (dropdown == 2) logout();
	}
</script>

<header
	class="fixed w-full bg-[#2E2E2E] text-white h-14 flex justify-between items-center px-6 drop-shadow-md z-20"
>
	{#if $currentUser}
		<img src="/placeholder-logo.svg" alt="Placeholder logo" class="h-8" />
		<p class="text-neutral-500 text-sm text-center">
			This is a mock social media site for testing purposes
		</p>
		<div class="relative flex space-x-3 items-center group">
			<CircleIcon
				icon="message"
				onClick={() => {
					toggleChatsDropdown();
				}}
			/>
			<CircleIcon
				icon="bell"
				notifications={1}
				onClick={() => {
					toggleAlertDropdown();
				}}
			/>
			<div class="relative group">
				<button on:click={toggleProfileDropdown}>
					<img src="/profile.svg" alt="Default profile" class="h-10 bg-white rounded-full" />
					<div
						class="absolute -right-[2px] -bottom-[2px] border-[#2E2E2E] border-2 w-4 h-4 bg-neutral-700 rounded-full flex justify-center items-center group-hover:bg-neutral-600"
					>
						<img src="chevron.svg" alt="chevron down" class="w-2" />
					</div>
				</button>

				{#if showAlertDropdown}
					<MediumDropdown label="Notifications">
						<div class="flex items-center justify-between hover:bg-neutral-600 p-2 rounded-md select-none">
							<div class="flex items-center space-x-2">
								<div
									class="w-9 h-9 rounded-full bg-maroon-400 flex justify-center items-center bg-emerald-500"
								>
									<img src="/confetti.svg" alt="kaboom" class="w-5" />
								</div>
								<p class="text-sm font-semibold">Welcome to [placeholder]!</p>
							</div>
							<img src="/close.svg" alt="close that" class="w-3 hover:cursor-pointer" />
						</div>
					</MediumDropdown>
				{/if}
				{#if showChatsDropdown}
					<MediumDropdown label="Chats">
						<p class="text-center text-neutral-300 font-semibold mb-4">Coming Soon&#8482;</p>
					</MediumDropdown>
				{/if}
				{#if showProfileDropdown}
					<Dropdown username={$currentUser.username} onClick={(num) => dropDownClicked(num)} />
				{/if}
			</div>
		</div>
	{/if}
</header>
<main class="relative pt-14">
	<slot />
</main>