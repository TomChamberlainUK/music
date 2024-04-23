<script lang="ts">
  export let onMenuButtonClick = () => {};
</script>

<header class="container">
  <button
    class="button"
    on:click={onMenuButtonClick}
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