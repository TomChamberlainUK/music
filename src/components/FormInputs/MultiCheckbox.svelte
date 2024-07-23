<script lang="ts">
  import InputWrapper from './InputWrapper.svelte';

  export let values: string[];
  export let checked: string[];
</script>

{#each values as value}
  <InputWrapper
    label={value}
  >
    <input
      type="checkbox"
      {value}
      bind:group={checked}
    />
  </InputWrapper>
{/each}