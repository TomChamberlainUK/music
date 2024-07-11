<script lang="ts">
  import InputWrapper from './InputWrapper.svelte';

  export let label: string;
  export let value: string;
</script>

<InputWrapper
  {label}
>
  <input
    type="text"
    bind:value={value}
  />
</InputWrapper>