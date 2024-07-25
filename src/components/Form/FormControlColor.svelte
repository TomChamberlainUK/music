<script lang="ts">
  import FormControlWrapper from './FormControlWrapper.svelte';

  export let label: string;
  export let value: string;
</script>

<FormControlWrapper
  {label}
>
  <input
    type="color"
    bind:value={value}
    data-testId="color-input"
  />
</FormControlWrapper>