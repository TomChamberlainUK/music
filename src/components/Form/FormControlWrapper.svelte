<script lang="ts">
  export let label: string;
</script>

<label>
  <span>
    {label}
  </span>
  <slot />
</label>
