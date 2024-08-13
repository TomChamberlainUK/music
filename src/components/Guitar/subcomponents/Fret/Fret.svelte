<script lang="ts">
  import { tooltip } from '@/actions';
  import { highlightedNotes, selectedNote } from '@/stores';

  export let note = 'E';
  export let fretNumber: number;
  export let stringNumber: number;

  $: isSelected = (note: string) => (
    $selectedNote?.value === note
  );

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

<td
  class="fret"
  role="gridcell"
  tabindex="-1"
  title={getHighlightedNote(note)?.name}
  on:click
  on:focusin={() => selectedNote.select(note)}
  on:focusout={() => selectedNote.reset()}
  use:tooltip={{ text: getIntervalName(note) }}
  aria-current={isSelected(note) && 'location'}
  aria-selected={isHighlighted(note) ? 'true' : 'false'}
  data-row={stringNumber}
  data-column={fretNumber}
>
  <div
    class="fret__indicator"
    style={isHighlighted(note) ? `background-color: ${getHighlightedNote(note)?.color};` : undefined}
  >
    {note}
  </div>
</td>

<style lang="scss">
  @import './Fret.scss';
</style>