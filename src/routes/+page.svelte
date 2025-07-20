<script lang="ts">
    import Container from "$lib/components/Container.svelte";
    import type { RoutineData } from "$lib/dates";

    let { data } = $props();
    let showForm: boolean = $state(false);
    let theName: string = $state('');

    function focusOnThis(node: HTMLElement) {
        $effect(()=> {
            node.focus();
        })
    }

    let routineData = $state(data.routines || []);

    function addRoutine( name:string ): RoutineData {   
        return {
            title: name,
            id: 100002,
            startAt: new Date().toISOString().slice(0, 10),
            userId : data.users ? data.users : "",
            checkedBlocks: null
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
        <Container routineData={routine} />
    </div>
{/each}
<div class="text-center min-w-screen p-4">
    <button 
     class="cursor-pointer bg-blue-500 py-2 px-6 text-white rounded-lg"
     type="button" 
     onclick={() => { 
        theName = "";
        showForm = !showForm;
        console.log("clicked")
     }}
    >
        Add a new routine
    </button>
    {#if showForm}
        {@render addARoutine()}
    {/if}
</div>
