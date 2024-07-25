<script lang="ts">
  import FormControlWrapper from './FormControlWrapper.svelte';

  export let label: string;
  export let isChecked: boolean = false;
</script>

<FormControlWrapper
  {label}
>
  <input
    type="checkbox"
    bind:checked={isChecked}
  />
</FormControlWrapper>
