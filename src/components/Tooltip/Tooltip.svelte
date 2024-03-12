<script lang="ts">
  export let details: string | undefined;
  export let isVisible = false;
  export let x = 0;
  export let y = 0;
</script>

{#if isVisible && details}
  <div
    class="tooltip"
    style="left: {x}px; top: {y}px;"
  >
    {details}
  </div>
{/if}

<style lang="scss">
  @import './Tooltip.scss';
</style>