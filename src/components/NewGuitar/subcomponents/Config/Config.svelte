<script lang="ts">
  import FormControlNumber from '@/components/Form/FormControlNumber.svelte';

  export let numberOfStrings = 6;
  export let numberOfFrets = 22;
</script>

<div data-testId="guitar-config">
  <FormControlNumber
    label="Number of Strings"
    bind:value={numberOfStrings}
  />
  <FormControlNumber
    label="Number of Frets"
    bind:value={numberOfFrets}
  />
</div>