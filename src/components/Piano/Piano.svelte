<script lang="ts">
  import { intervalNames, scale } from '@/stores';
  import { tooltip } from '@/actions';
</script>

<div
  class="piano"
  tabindex="0"
  role="listbox"
>
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
      />
      <span class="key__label">
        {note}
      </span>
    </label>
  {/each}
</div>

<style lang="scss">
  @import './Piano.scss';
</style>