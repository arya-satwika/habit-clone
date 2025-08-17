<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>
<svelte:head>
	<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?
    family=Material+Symbols+Outlined:
      opsz,wght,FILL,GRAD@
      20..48,100..700,0..1,-50..200
    &icon_names=add,check,psychology,pill,vape_free,self_improvement,content_copy"
  />
  <link rel="icon" type="image/svg" href="%sveltekit.assets%/favicon.svg" />
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
  </style>
</svelte:head>

{@render children()}

<style>
  
</style>
