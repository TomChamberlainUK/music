<script lang="ts">
  import FormControlWrapper from './FormControlWrapper.svelte';

  export let label: string;
  export let options: Option[] = [];
  export let value: string = getOptionValue(options[0]);

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
  <select
    bind:value={value}
    on:change
  >
    {#each options as option}
      <option value={getOptionValue(option)}>
        {getOptionName(option)}
      </option>
    {/each}
  </select>
</FormControlWrapper>