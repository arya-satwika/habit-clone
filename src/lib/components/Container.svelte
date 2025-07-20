<script lang="ts">
    import { onMount, type Snippet } from "svelte"
    import { getArrOfDates, dictDate } from "../dates";
    import Blocks from "$lib/components/Blocks.svelte";

 
    let { 
        routineName = "example routine",
        startDate,
        checkedBlocks
     }: {
        routineName: string
        startDate: string
        checkedBlocks: {[key: string]: boolean}
     } = $props();

    function focusOnThis(node: HTMLElement) {
        $effect(()=> {
            node.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center"
            });
        })
    }
    let todayChecked: boolean = $state(false);
    const currentDate:Date = new Date();
    
    
    $effect(() => {
        const key:string = currentDate.toISOString().slice(0, 10);
        if (todayChecked) {
            checkedBlocks[key] = true;
        } else {
            delete checkedBlocks[key];
        }
    });

    const yesterday:Date = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    const start:Date = new Date(startDate);
    
    const arrayOfDates:Date[] = getArrOfDates(start, yesterday);

</script>

<div class ="container mx-auto z-30 p-4 flex-flow-col items-start bg-slate-300 rounded-lg">
    <h1 class= "text-xl font-bold pb-3">{routineName}</h1>
    <div class="flex flex-cols-2 flex-rows-1 gap-1">
        <span class="grid grid-rows-7 grid-cols-1 grid-flow-col justify-start py-3 px-2">
            <h4 class="font-bold mb-1 py-1 px-1">Mon</h4>
            <h4 class="font-bold mb-1 py-1 px-1">Tue</h4>
            <h4 class="font-bold mb-1 py-1 px-1">Wed</h4>
            <h4 class="font-bold mb-1 py-1 px-1">Thu</h4>
            <h4 class="font-bold mb-1 py-1 px-1">Fri</h4>
            <h4 class="font-bold mb-1 py-1 px-1">Sat</h4>
            <h4 class="font-bold mb-1 py-1 px-1">Sun</h4>
        </span>
        <div id="grid-container" class="overflow-x-auto bg-gray-100 p-4 rounded-lg w-full">
            <div 
            id="grid-of-blocks" 
            class="grid grid-rows-7 grid-flow-col justify-end place-items-center gap-1 min-w-max"
            >
                {#each arrayOfDates as date}
                    {#if date < start}
                        <Blocks
                        isChecked={false}
                        tgl={date.toDateString()} 
                        day={ dictDate.get(date.getDay()) || "Unknown" }
                        isDummy={true}
                        />
                    {:else}
                        <Blocks
                        isChecked={checkedBlocks[date.toISOString().slice(0, 10)] || false}
                        tgl={date.toDateString()} 
                        day={ dictDate.get(date.getDay()) || "Unknown" }
                        isDummy={false}
                        />
                    {/if}
                {/each}
                <div id="today-block" use:focusOnThis>
                <Blocks
                    isChecked={todayChecked}
                    tgl={currentDate.toDateString()} 
                    day={ dictDate.get(currentDate.getDay()) || "Unknown" }
                    isDummy={false}
                /></div>
            </div>
        </div>
    </div>
    <button
     onclick={() => { todayChecked = !todayChecked }}
     class="mt-4 px-4 py-2 bg-blue-500 cursor-pointer"
     >Toggle</button>
</div>