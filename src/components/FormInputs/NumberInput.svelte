<script lang="ts">
  import InputWrapper from './InputWrapper.svelte';

  export let label: string;
  export let value: number;
</script>

<InputWrapper
  {label}
>
  <input
    type="number"
    bind:value={value}
    on:input
  />
</InputWrapper>