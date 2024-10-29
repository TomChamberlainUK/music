<script lang="ts">
  export let label: string;
</script>

<form aria-label={label}>
  <slot />
</form>
