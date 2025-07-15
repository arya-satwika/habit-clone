<script lang="ts">
    import Blocks from "$lib/components/Blocks.svelte";
    import Container from "$lib/components/Container.svelte";
    import { getCurrentDate } from "./index.ts";
    let date:string = getCurrentDate();

    const dictDate = new Map<number, string>([
        [1, "Monday"],
        [2, "Tuesday"],
        [3, "Wednesday"],
        [4, "Thursday"],
        [5, "Friday"],
        [6, "Saturday"],
        [7, "Sunday"]
    ]);


    let dummyDate: Date[] = [
        new Date("September 25, 2023"),
        new Date("October 2, 2023"),
        new Date("October 23, 2023"),
        new Date("October 19, 2023"),
        new Date("October 5, 2023"),
        new Date("October 6, 2023"),
        new Date("October 7, 2023")
    ];
    let someDate:Date = new Date();

    interface RoutineData {
        name: string,
        id: string,
        startDate: string
    }
    let routineData: RoutineData[] = $state([
        {
            name: "Someload",
            id: "12345",
            startDate: "2025-01-25",
        }
    ]);
</script>

<h1>Welcome to SvelteKit</h1>
{#each routineData as routine}
    <Container startDate={routine.startDate} routineName={routine.name} />
{/each}