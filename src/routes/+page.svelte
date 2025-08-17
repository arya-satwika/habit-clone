<script lang="ts">
    import Container from "$lib/components/Container.svelte";
    import type { RoutineData, IconType } from "$lib/dates";
    import tippy, { type Instance } from 'tippy.js';
    import { iconsList } from "$lib/dates";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button/index";
    import * as Dialog from "$lib/components/ui/dialog/index";
	import { invalidateAll } from "$app/navigation";
    
    let { data } = $props();
    let showForm: boolean = $state(false);
    let nameForm: string = $state('');
    let iconForm: IconType = $state(iconsList[0]);
    const userId = data.users ? data.users : "undefined";

    function focusOnThis(node: HTMLElement) {
        $effect(()=> {
            node.focus();
        })
    }

    function tooltip(node: HTMLElement, content: string) {
        $effect(() => {
            const tooltip:Instance = tippy(node, {
                duration: 20,
                content: content,
                placement: 'bottom',
                theme: 'dark',
                arrow: true
            });
            return tooltip.destroy;
        });
    }
    async function handleDelete(id:number){
        const toDelete = routineData.find(routine => routine.id === id);
        if (toDelete) {
            routineData.splice(routineData.indexOf(toDelete), 1);
            routineData = routineData;
            console.log("Deleted routine:", toDelete);
        }
        else {
            console.error("Routine not found for deletion:", id);
        }
        await fetch("/api", {
            method: "DELETE",
            body: JSON.stringify({ id })
        });
        await invalidateAll();
        console.log("Delete routine with ID:", id);
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
            <button type="button" onclick={() => {
                iconForm = icon;
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


<div id="routine-header" class="w-screen bg-slate-700 flex flex-row justify-between">
    <h1 class="text-white px-4 py-3 font-bold text-3xl"style="font-family: 'Roboto Mono'">habitclone</h1>
    <div class="px-4 py-3 text-white flex flex-row items-center gap-2">
        <button 
            class="cursor-pointer pt-1 text-blue-200"
            onclick={() => {
                        navigator.clipboard.writeText(userId);
                    }}
            use:tooltip={"Copy UserID"}
            >
            <i class="material-symbols-outlined">content_copy</i>
        </button>
        <form method="POST" action="?/login">
            <h1><span class="font-bold">User ID: </span>
                <input 
                name="userId"
                class= "w-30 underline active:hover:border-0" 
                type="text"
                value={userId}
                >
            </h1>
        </form>
    </div>
</div>

<div class="grid sm:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-2 auto-rows gap-1 items-center justify-start py-2">    
    {#each routineData as routine}
    <div class="py-2">
        <Container routineData={routine} handleDelete={()=>{handleDelete(routine.id)}} />
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