<script>
	import '../../app.css';
	import { webVitals } from '$lib/vitals';
	// @ts-ignore
	import { page } from '$app/stores';
	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;
	$: if (analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}
</script>

<main>
	<div class="flex justify-center items-center bg-black/10 h-screen flex-col">
		<slot />
	</div>
</main>

<style>
	main {
		background: url(/backdrop.png) no-repeat center center fixed;
		background-size: cover;
		background-attachment: fixed;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
</style>
