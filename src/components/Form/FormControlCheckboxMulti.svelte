<script lang="ts">
  import FormControlWrapper from './FormControlWrapper.svelte';

  export let values: string[];
  export let checked: string[];
</script>

{#each values as value}
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
