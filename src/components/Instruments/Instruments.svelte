<script lang="ts">
  import { Guitar, Piano } from '@/components';
  import { instruments } from '@/stores';
</script>

<ul class="list">
  {#each $instruments as { id, type } (id)}
    <li aria-labelledby="instrument-label-{id}">
      <h3
        class="heading"
        id="instrument-label-{id}"
      >
        {type}
        <span class="heading__id">
          (id: {id})
        </span>
      </h3>
      {#if type === 'guitar'}
        <Guitar />
      {:else if type === 'piano'}
        <Piano />
      {/if}
      <button onclick={() => instruments.remove(id)}>
        Remove
      </button>
    </li>
  {/each}
</ul>
<button onclick={() => instruments.add('guitar')}>
  Add Guitar
</button>
<button onclick={() => instruments.add('piano')}>
  Add Piano
</button>
<button onclick={() => instruments.reset()}>
  Reset to Default
</button>

<style lang="scss">
  @use './Instruments.scss';
</style>
