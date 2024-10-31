<script lang="ts">
  type Props = {
    label: string;
    children?: import('svelte').Snippet;
  };

  let { label, children }: Props = $props();
</script>

<form aria-label={label}>
  {@render children?.()}
</form>
