<script lang="ts">
    import { getArrOfDates, dictDate } from "../dates";
    import Blocks from "$lib/components/Blocks.svelte"; 
    import type { RoutineData } from "$lib/dates";
    import { Button } from "$lib/components/ui/button";
    import { Dialog } from "bits-ui";
	import { onDestroy } from "svelte";
	import { browser } from "$app/environment";

    let { routineData=$bindable(), handleDelete }: { routineData: RoutineData, handleDelete:any } = $props();

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
            checkedBlocks: routineData.checkedBlocks.size > 0 ? blocksJson : {},
            icon: routines.icon

        };
        console.log("Pushing to DB:", routinesJson);
        await fetch("/api", {
            method: "POST",
            body: JSON.stringify({routinesJson})
        });
       
    };

    // async function deleteRoutine(){
        
    // };

    $effect(() => {
        pushToDB(routineData);
            if (todayChecked) {
                routineData.checkedBlocks.set(key, true);
                console.log("Today is checked:", routineData.checkedBlocks);
                pushToDB(routineData);
                return;
            } else if (!todayChecked && routineData.checkedBlocks.has(key)) {
                routineData.checkedBlocks.delete(key);
                console.log("Today is unchecked:", routineData.checkedBlocks);
                pushToDB(routineData);
                return;
            
        }
        // return (()=>{
        //     deleteRoutine();
        // })
    });

    const yesterday:Date = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    const start:Date = new Date(routineData.startAt);
    const arrayOfDates:Date[] = getArrOfDates(yesterday);

</script>

{#snippet gridBlocks()}
    <div class="flex flex-cols-2 flex-rows-1 gap-1 text-white">
        <span class="grid grid-rows-7 grid-cols-1 align-middle text-center grid-flow-col justify-start py-3 px-2">
            <h4 class="pt-2  px-1 h-10">Mon</h4>
            <h4 class="pt-2 px-1 h-10">Tue</h4>
            <h4 class="pt-2 px-1 h-10">Wed</h4>
            <h4 class="pt-2 px-1 h-10">Thu</h4>
            <h4 class="pt-2 px-1 h-10">Fri</h4>
            <h4 class="pt-2 px-1 h-10">Sat</h4>
            <h4 class="pt-2 px-1 h-10">Sun</h4>
        </span>
        <div id="grid-container" class="overflow-x-auto bg-gray-900 p-4 rounded-lg w-full">
            <div 
            id="grid-of-blocks" 
            class="grid grid-rows-7 grid-flow-col justify-start place-items-center gap-1 min-w-max"
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
                        isChecked={routineData.checkedBlocks?.get(date.toISOString().slice(0, 10)) || false}
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
{/snippet}

<div class ="mx-auto z-30 p-4 flex-flow-row items-start bg-slate-700 rounded-lg w-183.5">
    <div id="routine-header" class ="flex flex-row gap-2 justify-between w-full mb-4">
        <div class="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-lg">
            <span class="material-symbols-outlined">{routineData.icon}</span>
        </div>
        <h1 class= "text-2xl font-bold text-white cursor-pointer">{routineData.title}</h1>
        <Button
        onclick={() => { todayChecked = !todayChecked }}
        class="w-10 h-10 bg-blue-500 order-03 cursor-pointer transition text-white hover:text-black"
        variant="ghost"
        size="lg"
        ><i class="material-symbols-outlined">check</i></Button>
    </div>
    {@render gridBlocks()}
    <Dialog.Root>
        <Dialog.Trigger>
            <div class="pt-4 flex min-w-full justify-end">
                <Button class="bg-red-500 text-white cursor-pointer hover:bg-red-700">Delete</Button>
            </div>
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay
                class="data-[state=open]:animate-in fade-in-0 data-[state=closed]:animate-out fade-out-0  fixed inset-0 z-50 bg-black/40"
            />
            <Dialog.Content class="bg-slate-700 border-1 border-slate-800 rounded-lg 
                            data-[state=open]:animate-in fade-in-0 zoom-in-95 
                            data-[state=closed]:animate-out fade-out-0 zoom-out-95 
                            outline-hidden fixed left-[50%] top-[50%] z-50 w-full max-w-screen translate-x-[-50%] translate-y-[-50%] p-5 sm:w-45 md:w-120">
                <Dialog.Title class="flex flex-row justify-between pb-3">
                    <h1 class="text-2xl text-white font-bold">Delete Routine</h1>
                </Dialog.Title>
                <Dialog.Description class="text-lg text-white">
                    Are you sure you want to delete this routine?
                </Dialog.Description>
                <div class="flex justify-end gap-2 py-2">
                    <Dialog.Close>
                        <Button class="text-white cursor-pointer bg-transparent hover:bg-transparent hover:underline">
                            Cancel
                        </Button>
                        <Button class="bg-red-500 text-white cursor-pointer hover:bg-red-700" 
                            onclick={()=>{ handleDelete(routineData.id) }}>
                            Confirm
                        </Button>
                    </Dialog.Close>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    
    </Dialog.Root>
    
</div>