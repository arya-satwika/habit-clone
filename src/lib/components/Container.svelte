<script lang="ts">
    import { onMount, type Snippet } from "svelte"
    import { getArrOfDates } from "./dates";
    import Blocks from "$lib/components/Blocks.svelte";
    import type { CheckedBlocksMap } from "$lib/components/dates";

    const dictDate = new Map<number, string>([
        [1, "Monday"],
        [2, "Tuesday"],
        [3, "Wednesday"],
        [4, "Thursday"],
        [5, "Friday"],
        [6, "Saturday"],
        [0, "Sunday"]
       ]);
    
    let { 
        routineName = "My Routine",
        startDate,
        checkedBlocks
     }: {
        routineName: string
        startDate: string
        checkedBlocks: CheckedBlocksMap
     } = $props();

    
    let currentDateCheck: boolean = $state(false);
    const currentDate:Date = new Date();
    
    
    $effect(() => {
        const key:string = currentDate.toISOString().slice(0, 10);
        if (currentDateCheck) {
            checkedBlocks[key] = true;
        } else {
            delete checkedBlocks[key];
        }
    });
    
    const yesterday:Date = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    const start:Date = new Date(startDate);
    
    
    const arrayOfDates:Date[] = getArrOfDates(start, yesterday);

    onMount(() => {
        // This will run when the component is mounted
        console.log("Container component mounted");
    });

</script>

<div class ="container mx-auto z-30 p-4 grid-flow-col items-start bg-slate-300 rounded-lg">
    <h1 class= "text-xl font-bold pb-3">{routineName}</h1>
    <div class="overflow-x-auto bg-gray-100 p-4 rounded-lg">
        <div 
         id="grid-of-blocks" 
         class="grid grid-rows-7 grid-flow-col justify-end place-items-center gap-1 min-w-max"
         >
            <!-- <h4 class="text-sm font-bold mb-1 py-1 px-1">Mon</h4>
            <h4 class="text-sm font-bold mb-1 py-1 px-1">Tue</h4>
            <h4 class="text-sm font-bold mb-1 py-1 px-1">Wed</h4>
            <h4 class="text-sm font-bold mb-1 py-1 px-1">Thu</h4>
            <h4 class="text-sm font-bold mb-1 py-1 px-1">Fri</h4>
            <h4 class="text-sm font-bold mb-1 py-1 px-1">Sat</h4>
            <h4 class="text-sm font-bold mb-1 py-1 px-1">Sun</h4> -->
            {#each arrayOfDates as date}
                <Blocks 
                checked={false}
                tgl={date.toDateString()} 
                day={ dictDate.get(date.getDay()) || "Unknown" }
                />
            {/each}

            <Blocks checked={currentDateCheck} tgl={currentDate.toDateString()} day={ dictDate.get(currentDate.getDay()) || "Unknown" }/>
        </div>
    </div>
    <button
     onclick={() => { currentDateCheck = !currentDateCheck }}
     class="mt-4 px-4 py-2 bg-blue-500 cursor-pointer"
     >Toggle</button>
</div>