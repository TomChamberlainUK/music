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

<!-- TODO: aria-selected should be set to <td /> once Guitar, String, and Fret are an accessible grid -->
<!-- svelte-ignore a11y-role-supports-aria-props -->
<button
  class="fret"
  title={getHighlightedNote(note)?.name}
  on:click={() => selectedNote.select(note)}
  use:tooltip={{ text: getIntervalName(note) }}
  aria-current={isSelected(note) && 'location'}
  aria-selected={isHighlighted(note) ? 'true' : 'false'}
>
  <div
    class:fret__indicator={isHighlighted(note) || isSelected(note)}
    class:fret__indicator--selected={isSelected(note)}
    style={isHighlighted(note) ? `background-color: ${getHighlightedNote(note)?.color};` : undefined}
  >
    {note}
  </div>
</button>

<style lang="scss">
  @import './Fret.scss';
</style>