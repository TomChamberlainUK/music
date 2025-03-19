<script lang="ts">
  import { intervalNames, scale } from '@/stores';
  import { tooltip } from '@/actions';

  let keyElements: HTMLInputElement[] = $state([]);
  let focusIndex: number | null = $state(null);

  $effect(() => {
    if (focusIndex === null) return;
    keyElements[focusIndex]?.focus();
  });

  function handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
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
  {#each ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'] as note, i (note)}
    <label
      class="key"
      class:isRoot={$scale.root === note}
      class:key--sharp={note.includes('♯')}
      use:tooltip={{ text: intervalNames.getIntervalName($scale.root, note) }}
    >
      <input
        class="key__input"
        type="checkbox"
        tabindex="0"
        value={note}
        bind:group={$scale.notes}
        bind:this={keyElements[i]}
        onfocus={() => focusIndex = i}
        onblur={() => focusIndex = null}
        onkeydown={event => handleKeyboardEvent(event)}
      />
      <span class="key__label">
        {note}
      </span>
    </label>
  {/each}
</fieldset>

<style lang="scss">
  @use './Piano.scss';
</style>
