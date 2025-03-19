<script lang="ts">
  import FormControlWrapper from './FormControlWrapper.svelte';

  type Props = {
    values: string[];
    checked: string[];
  };

  let { values, checked = $bindable() }: Props = $props();
</script>

{#each values as value (value)}
  <FormControlWrapper
    label={value}
  >
    <input
      type="checkbox"
      {value}
      bind:group={checked}
    />
  </FormControlWrapper>
{/each}
