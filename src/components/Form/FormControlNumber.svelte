<script lang="ts">
  import FormControlWrapper from './FormControlWrapper.svelte';

  export let label: string;
  export let value: number;
</script>

<FormControlWrapper
  {label}
>
  <input
    type="number"
    bind:value={value}
    on:input
  />
</FormControlWrapper>