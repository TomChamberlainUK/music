<script lang="ts">
  import FormControlWrapper from './FormControlWrapper.svelte';

  type Props = {
    label: string;
    isChecked?: boolean;
  };

  let { label, isChecked = $bindable(false) }: Props = $props();
</script>

<FormControlWrapper
  {label}
>
  <input
    type="checkbox"
    bind:checked={isChecked}
  />
</FormControlWrapper>
