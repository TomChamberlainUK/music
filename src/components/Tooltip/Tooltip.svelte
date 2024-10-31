<script lang="ts">
  type Props = {
    details: string | undefined;
    x?: number;
    y?: number;
  };

  let { details, x = 0, y = 0 }: Props = $props();
</script>

{#if details}
  <div
    class="tooltip"
    style="left: {x}px; top: {y}px;"
    role="tooltip"
  >
    {details}
    <div class="tooltip__tail"></div>
  </div>
{/if}

<style lang="scss">
  @import './Tooltip.scss';
</style>
