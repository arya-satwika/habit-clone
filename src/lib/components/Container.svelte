<script lang="ts">
    import { getArrOfDates, dictDate } from "../dates";
    import Blocks from "$lib/components/Blocks.svelte";
    import type { RoutineData } from "$lib/dates";

    let { routineData=$bindable() }: { routineData: RoutineData } = $props();

    function focusOnThis(node: HTMLElement) {
        $effect(()=> {
            node.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center"
            });
        })
    }

    const currentDate = new Date();  
    const key = currentDate.toISOString().slice(0, 10);
    let todayChecked: boolean = $state(routineData.checkedBlocks.get(key) || false);
    async function pushToDB(routines: RoutineData) {
        const blocksJson = Object.fromEntries(routines.checkedBlocks.entries());
        const routinesJson = {
            id: routines.id,
            title: routines.title,
            startAt: routines.startAt,
            userId: routines.userId,
            checkedBlocks: routineData.checkedBlocks.size > 0 ? blocksJson : {}
        };
        console.log("Pushing to DB:", routinesJson);
        await fetch("/api", {
            method: "POST",
            body: JSON.stringify({routinesJson})
        });
    };

    $effect(() => {
        if (todayChecked) {
            routineData.checkedBlocks.set(key, true);
            console.log("Today is checked:", routineData.checkedBlocks);
            pushToDB(routineData);
        } else if (!todayChecked && routineData.checkedBlocks.has(key)) {
            routineData.checkedBlocks.delete(key);
            console.log("Today is unchecked:", routineData.checkedBlocks);
            pushToDB(routineData);
        }
    });

    const yesterday:Date = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    const start:Date = new Date(routineData.startAt);
    
    const arrayOfDates:Date[] = getArrOfDates(start, yesterday);

</script>

<div class ="container mx-auto z-30 p-4 flex-flow-col items-start bg-slate-300 rounded-lg">
    <h1 class= "text-xl font-bold pb-3">{routineData.title}</h1>
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
                        isChecked={routineData.checkedBlocks?.has(date.toISOString().slice(0, 10)) || false}
                        tgl={date.toDateString()} 
                        day={ dictDate.get(date.getDay()) || "Unknown" }
                        isDummy={false}
                        />
                    {/if}
                {/each}
                <div id="today-block" use:focusOnThis>
                <Blocks
                    bind:isChecked={todayChecked}
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