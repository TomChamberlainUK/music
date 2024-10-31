<script lang="ts">
  import FormControlWrapper from './FormControlWrapper.svelte';

  type Props = {
    label: string;
    value: string;
  };

  let { label, value = $bindable() }: Props = $props();
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
