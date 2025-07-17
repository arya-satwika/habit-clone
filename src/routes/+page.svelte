<script lang="ts">
    import Container from "$lib/components/Container.svelte";
    import type { RoutineData } from "$lib/dates";

    let { data } = $props();
    let showForm: boolean = $state(false);
    let theName: string = $state("");

    function focusOnThis(node: HTMLElement) {
        $effect(()=> {
            node.focus();
        })
    }

    let routineData: RoutineData[] = $state([
        {
            name: "Morning Routine",
            id: "1",
            startDate: "2025-06-01",
            checkedBlocks: {
                "2025-06-10": true,
                "2025-06-20": true
            }
        },
        {
            name: "Evening Routine",
            id: "2",
            startDate: "2025-06-01",
            checkedBlocks: {
                "2025-06-11": true,
                "2025-06-21": true
            }
        }
    ]);
    
    function addRoutine( name:string ): RoutineData {   
        return {
            name: name,
            id: Math.random().toString(36).substring(2, 15),
            startDate: new Date().toISOString().slice(0, 10),
            checkedBlocks: {}
        };
    }
</script>

{#snippet addARoutine()}
    <form action="" class="mb-4 p-4" >
        <label for="routine-name">Routine Name:</label>
        <input 
         type="text" 
         id="routine-name"
         bind:value={theName} 
         use:focusOnThis
         class="border p-2 rounded-lg w-full mb-2"
        />
        <button 
        class="cursor-pointer bg-green-400 py-2 px-20 rounded-xl text-white" 
        type="submit" 
        onclick={() => { 
            routineData.push(addRoutine(theName)); 
            showForm = false;
            theName = "";
        }}
        >Add Routine</button>
    </form>
{/snippet}


{#each routineData as routine}
    <div class="mb-4 py-4">
        <Container 
        startDate={routine.startDate} 
        routineName={routine.name} 
        checkedBlocks={routine.checkedBlocks} />
    </div>
{/each}
<div class="text-center min-w-screen p-4">
    <button 
     class="cursor-pointer bg-blue-500 py-2 px-6 text-white rounded-lg"
     type="button" 
     onclick={() => { 
        theName = "";
        showForm = !showForm;
     }}
    >
        Add a new routine
    </button>
    {#if showForm}
        {@render addARoutine()}
    {/if}
</div>
