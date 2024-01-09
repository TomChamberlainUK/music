<script lang="ts">
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
    <button class="header__button">
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
  <div class="body">
    <slot />
  </div>
  <footer class="footer">
    Tom Chamberlain
  </footer>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--background-light);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3rem;

    &__button {
      all: unset;
      border: solid 0.25rem white;
      padding: 0 1rem;
      height: 100%;
    }
  }

  .body {
    flex-grow: 1;
  }

  .footer {
    background-color: var(--background-dark);
    color: var(--text-light-contrast);
  }
</style>