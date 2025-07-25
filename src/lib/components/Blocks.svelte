<script lang="ts">
    import tippy, { type Instance } from 'tippy.js';
    let { 
        isChecked=$bindable(), 
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
                    theme: 'dark',
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
    class:bg-checked={isChecked && !isDummy}
    class:bg-unchecked={!isChecked && !isDummy}
    class:bg-dummy={isDummy}
    use:tooltip
>

</div>
