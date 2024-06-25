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

<!-- TODO: replace testId with accessible role -->
<div class="container" data-testId="piano">
  <div class="piano">
    <div class="white-keys">
      {#each whiteKeys as note}
        <!-- TODO: aria-selected should be set to <td /> once Piano is an accessible grid -->
        <!-- svelte-ignore a11y-role-supports-aria-props -->
        <button class="white-key"
          on:click={() => selectedNote.select(note)}
          use:tooltip={{ text: getIntervalName(note) }}
          aria-selected={isHighlighted(note)}
          aria-current={$selectedNote?.value === note ? 'location' : 'false'}
        >
          <div
            class="white-key__indicator"
            style={isHighlighted(note) ? `background-color: ${getHighlightedNote(note)?.color};` : undefined}
          >
            {note}
          </div>
        </button>
      {/each}
    </div>
    <div class="black-keys">
      {#each blackKeys as note}
        <!-- TODO: aria-selected should be set to <td /> once Piano is an accessible grid -->
        <!-- svelte-ignore a11y-role-supports-aria-props -->
        <button class="black-key"
          on:click={() => selectedNote.select(note)}
          use:tooltip={{ text: getIntervalName(note) }}
          aria-selected={isHighlighted(note)}
          aria-current={$selectedNote?.value === note ? 'location' : 'false'}
        >
          <div
            class="black-key__indicator"
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