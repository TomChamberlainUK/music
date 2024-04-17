<script lang="ts">
  import { tooltip } from '@/actions';
  import { highlightedNotes, selectedNote } from '@/stores';

  const whiteKeys = [
    'C',
    'D',
    'E',
    'F',
    'G',
    'A',
    'B'
  ];

  const blackKeys = [
    'C#',
    'D#',
    'F#',
    'G#',
    'A#'
  ];

  $: isHighlighted = (note: string) => (
    $highlightedNotes.some(({ value }) => value === note)
  );

  $: getHighlightedNote = (note: string) => (
    $highlightedNotes.find(({ value }) => value === note)
  );

  $: getIntervalName = (note:string) => (
    getHighlightedNote(note)?.name
  );
</script>

<div class="container">
  <div class="piano">
    <div class="white-keys">
      {#each whiteKeys as note}
        <button class="white-keys__key"
          on:click={() => selectedNote.set(note)}
          use:tooltip={{ text: getIntervalName(note) }}
        >
          <div
            class="white-keys__indicator"
            class:white-keys__indicator--highlighted={isHighlighted(note)}
            style={isHighlighted(note) ? `background-color: ${getHighlightedNote(note)?.color};` : undefined}
          >
            {note}
          </div>
        </button>
      {/each}
    </div>
    <div class="black-keys">
      {#each blackKeys as note}
        <button class="black-keys__key"
          on:click={() => selectedNote.set(note)}
          use:tooltip={{ text: getIntervalName(note) }}
        >
          <div
            class="black-keys__indicator"
            class:black-keys__indicator--highlighted={isHighlighted(note)}
            style={isHighlighted(note) ? `background-color: ${getHighlightedNote(note)?.color};` : undefined}
          >
            {note}
          </div>
        </button>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import './Piano.scss';
</style>