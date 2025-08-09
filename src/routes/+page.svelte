<script lang="ts">
    import Container from "$lib/components/Container.svelte";
    import type { RoutineData, IconType } from "$lib/dates";
    import { iconsList } from "$lib/dates";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button/index";
    import * as Dialog from "$lib/components/ui/dialog/index";
    
    
    
    let { data } = $props();
    let showForm: boolean = $state(false);
    let nameForm: string = $state('');
    let iconForm: IconType = $state(iconsList[0]);

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
            icon: iconForm
        };
    }

    
</script>
{#snippet iconSelect()}
    <div class="text-white flex flex-row items-center gap-1 justify-start py-2">
        {#each iconsList as icon}
            <button onclick={() => {
                iconForm = icon as typeof iconForm;
                }}
            class="cursor-pointer p-1 rounded-sm transition hover:bg-slate-600"
            class:bg-slate-600={iconForm === icon}
            class:bg-slate-800={!iconForm || iconForm !== icon}>
                <span  
                style="font-size: 32px;"
                class="material-symbols-outlined">{icon}</span>
            </button>
        {/each}
    </div>
{/snippet}

<div class="grid sm:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-2 auto-rows gap-1 items-center justify-start py-2">    
    {#each routineData as routine}
    <div class="py-2">
        <Container routineData={routine} />
    </div>
    {/each}
    
</div>

<div class="min-w-max text-center p-4">
    <Dialog.Root>
    <Dialog.Trigger>
        <Button class="cursor-pointer transition bg-slate-700 text-white hover:text-black hover:bg-white">
            <span class="material-symbols-outlined">add</span>
        </Button>
    </Dialog.Trigger>
    <Dialog.Content class="bg-slate-900 border-1 border-dummy">
        <Dialog.Header>
            <Dialog.Title class="text-white">Add a new routine</Dialog.Title>
        </Dialog.Header>
            <form action="" class="mb-4 p-4" >
                <Label for="routine-name" class="mb-2 font-bold text-white">Routine Name</Label>
                <Input 
                type="text" 
                id="routine-name"
                bind:value={nameForm} 
                class="border p-2 rounded-lg w-80 mb-2"
                />
                {@render iconSelect()}
                <Dialog.Close>
                    <Button 
                    class="cursor-pointer bg-green-700 py-2 px-20 rounded-xl text-white" 
                    type="submit" 
                    onclick={() => { 
                        routineData.push(addRoutine(nameForm)); 
                        showForm = false;
                        nameForm = "";
                    }}
                    >Add Routine</Button>
                </Dialog.Close>
            </form>
            
        </Dialog.Content>
</Dialog.Root>
</div>