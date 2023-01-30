<script>
	import '../../app.css';
</script>

<style>
    main{
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

<main>
    <div class="flex justify-center items-center bg-black/10 h-screen flex-col">
        <slot />
    </div>
</main>