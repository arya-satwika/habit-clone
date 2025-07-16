<script lang="ts">
    import tippy, { type Instance } from 'tippy.js';
    let { 
        checked=false, 
        tgl, 
        day,
        dummy=false
    } : {
        checked: boolean, 
        tgl: string,
        day: string,
        dummy: boolean
    } = $props();

    function tooltip(node: HTMLElement) {
        if (!dummy){
            $effect(() => {
                const tooltip:Instance = tippy(node, {
                    duration: 10,
                    content: tgl,
                    placement: 'right',
                    theme: 'light',
                    arrow: true
                });
                return tooltip.destroy;
            });
        }
    }

</script>

<div 
    class="w-10 h-10 rounded-lg flex items-center justify-center"
    id="Block"
    class:bg-red-900={checked && !dummy}
    class:bg-red-100={!checked && !dummy}
    class:bg-transparent={dummy}
    use:tooltip
>

</div>
