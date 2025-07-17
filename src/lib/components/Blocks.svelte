<script lang="ts">
    import tippy, { type Instance } from 'tippy.js';
    let { 
        isChecked=false, 
        tgl, 
        day,
        isDummy=false
    } : {
        isChecked: boolean, 
        tgl: string,
        day: string,
        isDummy: boolean
    } = $props();

    function tooltip(node: HTMLElement) {
        if (!isDummy){
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
    class:bg-red-900={isChecked && !isDummy}
    class:bg-red-100={!isChecked && !isDummy}
    class:bg-transparent={isDummy}
    use:tooltip
>

</div>
