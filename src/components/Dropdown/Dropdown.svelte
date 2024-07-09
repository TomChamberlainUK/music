<script lang="ts">
  export let label: string;
  export let options: string[] = [];
  export let value: string = options[0];
</script>

<label>
  <span>
    {label}
  </span>
  <select
    bind:value={value}
    on:change
  >
    {#each options as option}
      <option value={option}>
        {option}
      </option>
    {/each}
  </select>
</label>