<script lang="ts">
  import { Guitar, Layout, ScaleConfig } from '@/components';
  import { getNotesFromRoot, getScale, getUID, notes } from '@/utils';
  import type { SelectedNote } from '@/types';

  let root = 'C';
  let type = 'diatonic';
  let modeName: string;
  let guitarIds: number[] = [getUID()];
  let selectedNote: SelectedNote | null = null;
  let highlightedNotes: SelectedNote[] = [];

  $: setHighlightedNotes(root);
  $: scale = getScale({ root, type });
  $: mode = scale.getMode(modeName);

  const listFormatter = new Intl.ListFormat();

  function setHighlightedNotes(root: string) {
    const scalePattern = [0, 2, 4, 5, 7, 9, 11];
    const notes = getNotesFromRoot(root);
    const scale = notes.filter((note, i) => scalePattern.includes(i));
    highlightedNotes = [
      {
        value: scale[0],
        name: 'Tonic',
        color: '#ff0000'
      },
      {
        value: scale[1],
        name: 'Major 2nd',
        color: '#ffffff'
      },
      {
        value: scale[2],
        name: 'Major 3nd',
        color: '#ffffff'
      },
      {
        value: scale[3],
        name: 'Perfect 4th',
        color: '#ffffff'
      },
      {
        value: scale[4],
        name: 'Perfect 5th',
        color: '#ffffff'
      },
      {
        value: scale[5],
        name: 'Major 6th',
        color: '#ffffff'
      },
      {
        value: scale[6],
        name: 'Major 7th',
        color: '#ffffff'
      }
    ];
  }

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
      <ScaleConfig
        {selectedNote}
        bind:highlightedNotes={highlightedNotes}
      />
    {/if}
  </main>
</Layout>
