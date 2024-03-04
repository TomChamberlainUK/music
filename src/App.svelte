<script lang="ts">
  import { Guitar, Layout, Piano, ScaleConfig } from '@/components';
  import { getUID } from '@/utils';
  import type { SelectedNote } from '@/types';

  let guitarIds: number[] = [getUID()];
  let selectedNote: SelectedNote | null = null;
  let highlightedNotes: SelectedNote[] = [];

  function addGuitar() {
    guitarIds = [...guitarIds, getUID()];
  }

  function removeGuitar(index: number) {
    guitarIds.splice(index, 1);
    guitarIds = guitarIds;
  }
</script>

<Layout>
  <main class="container">
    <h1>
      Music
    </h1>
    <ScaleConfig
      {selectedNote}
      bind:highlightedNotes={highlightedNotes}
    />
    <h2>
      Guitars
    </h2>
    <div>
      {#each guitarIds as id, i (id)}
        <Guitar
          highlightedNotes={highlightedNotes}
          bind:selectedNote={selectedNote}
        />
        <button on:click={() => removeGuitar(i)}>
          Remove
        </button>
      {/each}
    </div>
    <button on:click={addGuitar}>
      Add Guitar
    </button>
    <Piano
      {highlightedNotes}
    />
  </main>
</Layout>
