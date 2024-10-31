<script lang="ts">
  import FormControlWrapper from './FormControlWrapper.svelte';

  type Props = {
    label: string;
    options?: Option[];
    value?: string;
  };

  let {
    label,
    options = [],
    value = $bindable(getOptionValue(options[0])),
  }: Props = $props();

  type Option = string | {
    name: string;
    value: string;
  };

  function getOptionValue(option: Option) {
    return typeof option === 'string'
      ? option
      : option.value;
  }

  function getOptionName(option: Option) {
    return typeof option === 'string'
      ? option
      : option.name;
  }
</script>

<FormControlWrapper
  {label}
>
  <select bind:value={value}>
    {#each options as option}
      <option value={getOptionValue(option)}>
        {getOptionName(option)}
      </option>
    {/each}
  </select>
</FormControlWrapper>
