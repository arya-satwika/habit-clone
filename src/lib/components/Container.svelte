<script lang="ts">
    let { children } = $props();
</script>

<div class ="container mx-auto p-4 flex flex-row items-start ">
    <h4 class="text-2xl font-bold mb-4 py-4 px-4">Mon</h4>
    <h4 class="text-2xl font-bold mb-4 py-4 px-4">Tue</h4>
    <h4 class="text-2xl font-bold mb-4 py-4 px-4">Wed</h4>
    <h4 class="text-2xl font-bold mb-4 py-4 px-4">Thu</h4>
    <h4 class="text-2xl font-bold mb-4 py-4 px-4">Fri</h4>
    <h4 class="text-2xl font-bold mb-4 py-4 px-4">Sat</h4>

    <div class="grid grid-rows-7 grid-flow-col justify-start gap-1 bg-gray-100 p-4 rounded-lg shadow-md">
        {@render children()}
    </div>
</div>