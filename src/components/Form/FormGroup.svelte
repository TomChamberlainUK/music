<script lang="ts">
  type Props = {
    label: string;
    children?: import('svelte').Snippet;
  };

  let { label, children }: Props = $props();
</script>

<fieldset>
  <legend>
    {label}
  </legend>
  {@render children?.()}
</fieldset>
