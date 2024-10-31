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
    type="text"
    bind:value={value}
  />
</FormControlWrapper>
