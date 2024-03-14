<script lang="ts">
  export let details: string | undefined;
  export let x = 0;
  export let y = 0;
</script>

{#if details}
  <div
    class="tooltip"
    style="left: {x}px; top: {y}px;"
  >
    {details}
    <div class="tooltip__tail" />
  </div>
{/if}

<style lang="scss">
  @import './Tooltip.scss';
</style>