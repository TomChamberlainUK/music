<!-- TODO: Split this out into checkbox and group checkbox -->
<script lang="ts">
  import InputWrapper from './InputWrapper.svelte';

  export let label: string;
  export let isChecked: boolean = false;
</script>

<InputWrapper
  {label}
>
  <input
    type="checkbox"
    bind:checked={isChecked}
  />
</InputWrapper>
