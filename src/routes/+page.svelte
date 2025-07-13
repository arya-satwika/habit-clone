<script lang="ts">
    import Blocks from "$lib/components/Blocks.svelte";
    import Container from "$lib/components/Container.svelte";
    import { getCurrentDate } from "index.ts";
    let date:string = getCurrentDate();
</script>

<h1>Welcome to SvelteKit</h1>

    <Container>
        <Blocks checked={true} tgl="soasodk" day="Monday" />
        <Blocks checked={true} tgl="dwdqweqw" day="shit" />
    </Container>
