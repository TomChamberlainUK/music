<script lang="ts">
  export let label: string;
</script>

<fieldset>
  <legend>
    {label}
  </legend>
  <slot />
</fieldset>
