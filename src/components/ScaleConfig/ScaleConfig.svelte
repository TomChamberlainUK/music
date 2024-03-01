<script lang="ts">
  import type { SelectedNote } from '@/types';
  import { getNotesFromRoot, notes } from '@/utils';
  import { getModeNames, getScaleNames, getScalePattern } from './utils';

  export let highlightedNotes: SelectedNote[] = [];
  export let selectedNote: SelectedNote | null;

  let root = 'C';
  let scaleName: string = 'diatonic';
  let modeName: string;
  
  const listFormatter = new Intl.ListFormat();
  
  const scaleNames = getScaleNames();
  
  $: modeNames = getModeNames(scaleName);
  $: pattern = getScalePattern(scaleName, modeName);

  $: setHighlightedNotes(root, pattern);
  $: selectedNoteIsHighlighted = highlightedNotes.some(({ value }) => value === selectedNote?.value);
  
  function highlightNote(note: SelectedNote) {
    const noteIndex = highlightedNotes.findIndex(highlightedNote => highlightedNote.value === note.value);
    const noteIsAlreadyHighlighted = noteIndex > -1;
    if (!noteIsAlreadyHighlighted) {
      highlightedNotes = [...highlightedNotes, note];
    } else {
      highlightedNotes = [
        ...highlightedNotes.slice(0, noteIndex),
        ...highlightedNotes.slice(noteIndex + 1)
      ];
    }
  }

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
</script>

<div>
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
      bind:value={scaleName}
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
    The {root} {modeName} mode of the {scaleName} scale
  </h2>
  <p>
    Featuring the notes: {listFormatter.format(highlightedNotes.map(({ value }) => value))}.
  </p>
  {#if selectedNote}
    <h1>
      {selectedNote.value}
    </h1>
    <div>
      <label>
        <span>Colour</span>
        <input type="color" bind:value={selectedNote.color} />
      </label>
      <div
        class="colour-block"
        style="background-color: {selectedNote.color};"
      />
      <span>
        {selectedNote.color}
      </span>
    </div>
    <div>
      <label>
        <span>Name</span>
        <input type="text" bind:value={selectedNote.name} />
      </label>
    </div>
    <button on:click={() => selectedNote && highlightNote(selectedNote)}>
      {selectedNoteIsHighlighted ? 'Remove' : 'Add'}
    </button>
  {/if}
  <hr>
</div>

<style lang="scss">
  @import './ScaleConfig.scss';
</style>