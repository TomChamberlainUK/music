<script lang="ts">
  import { tooltip } from '@/actions';
  import { highlightedNotes, selectedNote } from '@/stores';

  export let note = 'E';

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
  title={getHighlightedNote(note)?.name}
  on:click={() => selectedNote.select(note)}
  use:tooltip={{ text: getIntervalName(note) }}
  aria-current={isSelected(note) && 'location'}
  aria-selected={isHighlighted(note) ? 'true' : 'false'}
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