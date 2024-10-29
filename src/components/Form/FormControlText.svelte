<script lang="ts">
  import FormControlWrapper from './FormControlWrapper.svelte';

  export let label: string;
  export let value: string;
</script>

<FormControlWrapper
  {label}
>
  <input
    type="text"
    bind:value={value}
  />
</FormControlWrapper>
