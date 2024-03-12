<script lang="ts">
  import type { Action } from 'svelte/action';
  import type { SelectedNote } from '@/types/SelectedNote';
  import Tooltip from '@/components/Tooltip';

  export let note = 'E';
  export let selectedNote: SelectedNote | null = null;
  export let highlightedNotes: SelectedNote[] = [];

  function selectNote(note: string) {
    if (selectedNote && selectedNote.value === note) {
      selectedNote = null;
    } else {
      selectedNote = {
        value: note,
        name: '',
        color: '#76a0ff'
      };
    }
  }

  $: isSelected = (note: string) => (
    selectedNote?.value === note
  );

  $: isHighlighted = (note: string) => (
    highlightedNotes.some(({ value }) => value === note)
  );

  $: getHighlightedNote = (note: string) => (
    highlightedNotes.find(({ value }) => value === note)
  );

  $: getIntervalName = (note:string) => (
    getHighlightedNote(note)?.name
  );

  const tooltip: Action<HTMLElement, { text?: string }> = (node, { text }) => {
    const tooltipElement = new Tooltip({
      props: { details: text },
      target: document.body
    });

    handleResize();

    node.addEventListener('mouseover', handleMouseOver);
    node.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    function handleResize() {
      const { x, y, width } = node.getBoundingClientRect();
      tooltipElement.$set({
        x: x + (width / 2),
        y
      });
    }

    function handleMouseOver() {
      handleResize();
      tooltipElement.$set({ isVisible: true });
    }

    function handleMouseLeave() {
      tooltipElement.$set({ isVisible: false });
    }

    return {
      update({ text }) {
        tooltipElement.$set({ details: text });
      },
      destroy() {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('resize', handleResize);
        tooltipElement.$destroy();
      }
    };
  };
</script>

<button
  class="fret"
  title={getHighlightedNote(note)?.name}
  on:click={() => selectNote(note)}
  use:tooltip={{ text: getIntervalName(note) }}
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