<script lang="ts">
  import { HighlightConfig } from '@/components/Guitar/subcomponents';
  import { Guitar, Layout } from '@/components';
  import { getScale, getUID, notes } from '@/utils';
  import type { SelectedNote } from '@/components/Guitar/types';

  
  let root = 'C';
  let type = 'diatonic';
  let modeName: string;
  let guitarIds: number[] = [getUID()];

  let selectedNote: SelectedNote | null = null;
  let highlightedNotes: SelectedNote[] = [];

  const listFormatter = new Intl.ListFormat();

  function addGuitar() {
    guitarIds = [...guitarIds, getUID()];
  }

  function removeGuitar(index: number) {
    guitarIds.splice(index, 1);
    guitarIds = guitarIds;
  }

  $: scale = getScale({ root, type });
  $: mode = scale.getMode(modeName);
</script>

<Layout>
  <main class="container">
    <h1>
      Music
    </h1>
    <label>
      <span>Root</span>
      <select bind:value={root}>
        {#each notes as note}
          <option>{note}</option>
        {/each}
      </select>
    </label>
    <label>
      <span>Scale</span>
      <select
        bind:value={type}
        on:change={() => modeName = scale.modes[0].name}
      >
        <option>diatonic</option>
        <option>pentatonic</option>
      </select>
    </label>
    <label>
      <span>Mode</span>
      <select bind:value={modeName}>
        {#each scale.modes as mode}
          {#if mode}
            <option>{mode.name}</option>
          {/if}
        {/each}
      </select>
    </label>
    <h2>
      The {root} major {scale.name} scale
    </h2>
    <p>
      Featuring the notes: {listFormatter.format(scale.notes)}.
    </p>
    {#if mode}
      <h3>
        Displaying the {mode.root} {mode.name} mode
      </h3>
      <p>
        Featuring the notes: {listFormatter.format(mode.notes)}.
      </p>
      <h2>
        Guitars
      </h2>
      <div>
        {#each guitarIds as id, i (id)}
          <Guitar
            scale={mode.notes}
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
    {/if}
    {#if selectedNote}
      <HighlightConfig
        {selectedNote}
        bind:highlightedNotes={highlightedNotes}
      />
    {/if}
  </main>
</Layout>
