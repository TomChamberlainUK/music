<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';

  type Props = {
    onMenuButtonClick?: MouseEventHandler<HTMLButtonElement>;
  };

  let { onMenuButtonClick }: Props = $props();
</script>

<header class="container">
  <button
    class="button"
    onclick={onMenuButtonClick}
  >
    Menu
  </button>
  <h1 class="title">
    Music
  </h1>
</header>

<style lang="scss">
  @import './Header.scss';
</style>
