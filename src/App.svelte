<script lang="ts">
  import { Guitar, Layout, ScaleConfig } from '@/components';
  import { getNotesFromRoot, getUID, notes } from '@/utils';
  import type { SelectedNote } from '@/types';

  let root = 'C';
  let type = 'diatonic';
  let modeName: string;
  let guitarIds: number[] = [getUID()];
  let selectedNote: SelectedNote | null = null;
  let highlightedNotes: SelectedNote[] = [];

  $: setHighlightedNotes(root, pattern);

  const listFormatter = new Intl.ListFormat();

  type ScaleModePatterns = Record<string, number[]>;

  const patterns: Record<string, ScaleModePatterns> = {
    diatonic: {
      ionian: [0, 2, 4, 5, 7, 9, 11],
      dorian: [0, 2, 3, 5, 7, 9, 10],
      phrygian: [0, 1, 3, 5, 7, 8, 10],
      lydian: [0, 2, 4, 6, 7, 9, 11],
      mixolydian: [0, 2, 4, 5, 7, 9, 10],
      aeolian: [0, 2, 3, 5, 7, 8, 10],
      locrian: [0, 1, 3, 5, 6, 8, 10],
    },
    pentatonic: {
      major: [0, 2, 4, 7, 9],
      minor: [0, 3, 5, 7, 10]
    }
  };

  const scaleNames = Object.keys(patterns);

  $: modeNames = Object.keys(patterns[type]);
  $: pattern = patterns[type][modeName] as number[];

  function setHighlightedNotes(root: string, pattern: number[] = []) {
    const notes = getNotesFromRoot(root);
    const describedNotes = [
      {
        value: notes[0],
        name: 'Root'
      },
      {
        value: notes[1],
        name: 'Minor 2nd'
      },
      {
        value: notes[2],
        name: 'Major 2nd'
      },
      {
        value: notes[3],
        name: 'Minor 3rd'
      },
      {
        value: notes[4],
        name: 'Major 3rd'
      },
      {
        value: notes[5],
        name: 'Perfect 4th'
      },
      {
        value: notes[6],
        name: 'Augmented 4th/Diminished 5th'
      },
      {
        value: notes[7],
        name: 'Perfect 5th'
      },
      {
        value: notes[8],
        name: 'Minor 6th'
      },
      {
        value: notes[9],
        name: 'Major 6th'
      },
      {
        value: notes[10],
        name: 'Minor 7th'
      },
      {
        value: notes[11],
        name: 'Major 7th'
      },
    ];
    const scale = describedNotes.filter((note, i) => pattern.includes(i));
    const colouredScale = scale.map(({ value, name }, i) => (
      i === 0
        ? {
          color: '#ff0000',
          name,
          value
        }
        : {
          color: '#ffffff',
          name,
          value
        }
    ));
    highlightedNotes = colouredScale;
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
        on:change={() => modeName = modeNames[0]}
      >
        {#each scaleNames as scaleName}
          <option>{scaleName}</option>
        {/each}
      </select>
    </label>
    <label>
      <span>Mode</span>
      <select bind:value={modeName}>
        {#each modeNames as modeName}
          <option>{modeName}</option>
        {/each}
      </select>
    </label>
    <h2>
      The {root} {modeName} mode of the {type} scale
    </h2>
    <p>
      Featuring the notes: {listFormatter.format(highlightedNotes.map(({ value }) => value))}.
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
    {#if selectedNote}
      <ScaleConfig
        {selectedNote}
        bind:highlightedNotes={highlightedNotes}
      />
    {/if}
  </main>
</Layout>
