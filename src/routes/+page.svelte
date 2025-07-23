<script lang="ts">
    import Container from "$lib/components/Container.svelte";
    import type { RoutineData } from "$lib/dates";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button, buttonVariants } from "$lib/components/ui/button/index";
    import * as Dialog from "$lib/components/ui/dialog/index";

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
            id: Math.floor(Math.random()*100000),
            startAt: new Date().toISOString().slice(0, 10),
            userId : data.users ? data.users : "",
            checkedBlocks: new Map<string, boolean>(),
        };
    }

    
</script>


{#each routineData as routine}
    <div class="mb-4 py-2">
        <Container routineData={routine} />
    </div>
{/each}
<div class="min-w-screen text-center p-4">
    <Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "default" })}>Open</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
        <Dialog.Title>Add a new routine</Dialog.Title>
        </Dialog.Header>
            <form action="" class="mb-4 p-4" >
                <Label for="routine-name" class="mb-2 font-bold">Routine Name</Label>
                <Input 
                type="text" 
                id="routine-name"
                bind:value={theName} 
                class="border p-2 rounded-lg w-80 mb-2"
                />
                <Button 
                class="cursor-pointer bg-green-700 py-2 px-20 rounded-xl text-white" 
                type="submit" 
                onclick={() => { 
                    routineData.push(addRoutine(theName)); 
                    showForm = false;
                    theName = "";
                }}
                >Add Routine</Button>
            </form>
        </Dialog.Content>
</Dialog.Root>
</div>