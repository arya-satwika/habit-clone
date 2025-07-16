<script lang="ts">
    import Container from "$lib/components/Container.svelte";
    import type { RoutineData } from "$lib/components/dates";

    const dictDate = new Map<number, string>([
        [1, "Monday"],
        [2, "Tuesday"],
        [3, "Wednesday"],
        [4, "Thursday"],
        [5, "Friday"],
        [6, "Saturday"],
        [7, "Sunday"]
    ]);
    let showForm: boolean = $state(false);
    let theName: string = $state("");
    function focusRoutineInput(node: HTMLElement) {
        $effect(()=> {
            const input = document.getElementById("routine-name");
            if (input) {
                input.focus();
            }
        })
    }

    let routineData: RoutineData[] = $state([
        {
            name: "Someload",
            id: "12345",
            startDate: "2025-01-25",
            checkedBlocks: {
                "2025-01-25": true,
                "2025-01-26": false,
                "2025-01-27": true,
                "2025-01-28": false,
                "2025-01-29": true,
                "2025-01-30": false,
                "2025-01-31": true
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
    <form action="" class="mb-4 p-4" use:focusRoutineInput>
        <label for="routine-name">Routine Name:</label>
        <input 
         type="text" 
         id="routine-name"
         bind:value={theName} 
         class="border p-2 rounded-lg w-full mb-2"
        />
        <button 
        class="cursor-pointer" 
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
    <button class="cursor-pointer bg-blue-500 p-2" type="button" onclick={() => { 
        theName = "";
        showForm = !showForm;
    }}>
        Add a new routine
    </button>
    {#if showForm}
        {@render addARoutine()}
    {/if}
</div>
