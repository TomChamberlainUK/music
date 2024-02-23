<script lang="ts">
  let menuIsOpen: boolean = false;

  function toggleMenu() {
    menuIsOpen = !menuIsOpen;
  }

  function toggleDarkMode() {
    const darkModeIsEnabled = document.documentElement.getAttribute('data-theme') === 'dark';
    if (!darkModeIsEnabled) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
</script>

<div class="container">
  <header class="header">
    <button
      class="header__button"
      on:click={toggleMenu}
    >
      Menu
    </button>
    Music
    <button
      on:click={toggleDarkMode}
      class="header__button"
    >
      Toggle dark mode
    </button>
  </header>
  <menu
    class="menu"
    class:menu--open={menuIsOpen}
  />
  <div class="body">
    <slot />
  </div>
  <footer class="footer">
    Tom Chamberlain
  </footer>
</div>

<style lang="scss">
  @import './Layout.scss';
</style>