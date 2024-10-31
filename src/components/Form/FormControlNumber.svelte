<script lang="ts">
  import FormControlWrapper from './FormControlWrapper.svelte';

  type Props = {
    label: string;
    value: number;
  };

  let { label, value = $bindable() }: Props = $props();
</script>

<FormControlWrapper
  {label}
>
  <input
    type="number"
    bind:value={value}
  />
</FormControlWrapper>
