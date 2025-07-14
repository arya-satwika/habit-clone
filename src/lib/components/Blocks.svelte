<script lang="ts">
    import tippy, { type Instance } from 'tippy.js';
    let { 
        checked=false, 
        tgl, 
        day
    } : {
        checked: boolean, 
        tgl: string,
        day: string
    }= $props();

    function tooltip(node: HTMLElement) {
        $effect(() => {
            const tooltip:Instance = tippy(node, {
                content: `${tgl} - ${day}`,
                placement: 'right',
                // trigger: 'click',
                // hideOnClick: true,
            });
            return tooltip.destroy;
        });
    }

</script>

<div 
    class="w-10 h-10 rounded-lg flex items-center justify-center"
    id="Block"
    class:bg-red-900={checked}
    class:bg-red-100={!checked}
    use:tooltip
>
</div>
