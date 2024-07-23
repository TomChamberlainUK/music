<script lang="ts">
  import InputWrapper from './InputWrapper.svelte';

  export let checkboxes: string[];
  export let group: string[];
</script>

{#each checkboxes as checkbox}
  <InputWrapper
    label={checkbox}
  >
    <input
      type="checkbox"
      value={checkbox}
      bind:group
    />
  </InputWrapper>
{/each}