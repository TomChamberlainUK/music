<script lang="ts">
  type Props = {
    label: string;
    children?: import('svelte').Snippet;
  };

  let { label, children }: Props = $props();
</script>

<label>
  <span>
    {label}
  </span>
  {@render children?.()}
</label>
