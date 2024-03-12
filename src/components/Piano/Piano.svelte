<script lang="ts">
  import type { SelectedNote } from '@/types';
  import { tooltip } from '@/actions';

  export let highlightedNotes: SelectedNote[] = [];

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
    highlightedNotes.some(({ value }) => value === note)
  );

  $: getHighlightedNote = (note: string) => (
    highlightedNotes.find(({ value }) => value === note)
  );

  $: getIntervalName = (note:string) => (
    getHighlightedNote(note)?.name
  );
</script>

<div class="container">
  <div class="piano">
    <div class="white-keys">
      {#each whiteKeys as note}
        <div class="white-keys__key"
          use:tooltip={{ text: getIntervalName(note) }}
        >
          <div
            class="white-keys__indicator"
            class:white-keys__indicator--highlighted={isHighlighted(note)}
            style={isHighlighted(note) ? `background-color: ${getHighlightedNote(note)?.color};` : undefined}
          >
            {note}
          </div>
        </div>
      {/each}
    </div>
    <div class="black-keys">
      {#each blackKeys as note}
        <div class="black-keys__key"
          use:tooltip={{ text: getIntervalName(note) }}
        >
          <div
            class="black-keys__indicator"
            class:black-keys__indicator--highlighted={isHighlighted(note)}
            style={isHighlighted(note) ? `background-color: ${getHighlightedNote(note)?.color};` : undefined}
          >
            {note}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import './Piano.scss';
</style>