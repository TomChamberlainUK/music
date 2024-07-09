<script lang="ts">
  import { Guitar, Piano } from '@/components';
  import { instruments } from '@/stores';
</script>

<div>
  {#each $instruments as { id, type } (id)}
    {#if type === 'guitar'}
      <Guitar />
    {:else if type === 'piano'}
      <Piano />
    {/if}
    <button on:click={() => instruments.remove(id)}>
      Remove
    </button>
  {/each}
</div>
<button on:click={() => instruments.add('guitar')}>
  Add Guitar
</button>
<button on:click={() => instruments.add('piano')}>
  Add Piano
</button>