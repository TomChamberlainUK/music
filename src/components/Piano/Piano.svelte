<script lang="ts">
  import type { SelectedNote } from '@/types';

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
</script>

<div class="container">
  <div class="piano">
    <div class="white-keys">
      {#each whiteKeys as note}
        <div class="white-keys__key">
          <p
            class="white-keys__text"
            class:white-keys__text--highlighted={isHighlighted(note)}
          >
            {note}
          </p>
        </div>
      {/each}
    </div>
    <div class="black-keys">
      {#each blackKeys as note}
        <div class="black-keys__key">
          <p
            class="black-keys__text"
            class:black-keys__text--highlighted={isHighlighted(note)}
          >
            {note}
          </p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import './Piano.scss';
</style>