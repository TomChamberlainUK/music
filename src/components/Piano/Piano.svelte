<script lang="ts">
  import { intervalNames, scale } from '@/stores';
  import { tooltip } from '@/actions';

  let keyElements: HTMLInputElement[] = [];
  let focusIndex: number | null = null;

  $: (() => {
    if (focusIndex === null) return;
    keyElements[focusIndex]?.focus();
  })();

  function handleKeyboardEvent(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowRight':
        if (focusIndex === null) return;
        focusIndex = focusIndex < keyElements.length - 1
          ? focusIndex + 1
          : 0;
        break;
      case 'ArrowLeft':
        if (focusIndex === null) return;
        focusIndex = focusIndex > 0
          ? focusIndex - 1
          : keyElements.length - 1;
        break;
    }
  }
</script>

<fieldset class="piano">
  {#each ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'] as note, i}
    <label
      class="key"
      class:key--sharp={note.includes('♯')}
      use:tooltip={{ text: $intervalNames[i] }}
    >
      <input
        class="key__input"
        type="checkbox"
        tabindex="0"
        value={note}
        bind:group={$scale.notes}
        bind:this={keyElements[i]}
        on:focus={() => focusIndex = i}
        on:blur={() => focusIndex = null}
        on:keydown={event => handleKeyboardEvent(event)}
      />
      <span class="key__label">
        {note}
      </span>
    </label>
  {/each}
</fieldset>

<style lang="scss">
  @import './Piano.scss';
</style>