<script lang="ts">
  import { CircleOfFifths, Guitar, Layout, Piano, ScaleConfig } from '@/components';
  import { getUID } from '@/utils';
  import type { SelectedNote } from '@/types';

  type InstrumentTypes = 'guitar' | 'piano';

  type Instrument = {
    id: number;
    type: InstrumentTypes;
  };

  let instruments: Instrument[] = [
    {
      id: getUID(),
      type: 'guitar'
    },
    {
      id: getUID(),
      type: 'piano'
    }
  ];

  let root: string;
  let selectedNote: SelectedNote | null = null;
  let highlightedNotes: SelectedNote[] = [];

  function addInstrument(type: InstrumentTypes) {
    instruments = [
      ...instruments,
      {
        id: getUID(),
        type
      }
    ];
  }

  function removeInstrument(index: number) {
    instruments.splice(index, 1);
    instruments = instruments;
  }
</script>

<Layout>
  <main class="container">
    <div class="header">
      <div>
        <h1>
          Music
        </h1>
        <ScaleConfig
          {selectedNote}
          bind:root={root}
          bind:highlightedNotes={highlightedNotes}
        />
      </div>
      <CircleOfFifths {root} />
    </div>
    <hr>
    <h2>
      Instruments
    </h2>
    <div>
      {#each instruments as { id, type }, i (id)}
        {#if type === 'guitar'}
          <Guitar
            highlightedNotes={highlightedNotes}
            bind:selectedNote={selectedNote}
          />
        {:else if type === 'piano'}
          <Piano
            {highlightedNotes}
          />
        {/if}
        <button on:click={() => removeInstrument(i)}>
          Remove
        </button>
      {/each}
    </div>
    <button on:click={() => addInstrument('guitar')}>
      Add Guitar
    </button>
    <button on:click={() => addInstrument('piano')}>
      Add Piano
    </button>
  </main>
</Layout>

<style lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
  }
</style>
