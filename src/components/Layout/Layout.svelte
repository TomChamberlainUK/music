<script lang="ts">
  import { Header } from './subcomponents';

  let menuIsOpen: boolean = false;
  let theme: Theme = getTheme();

  type Theme = 'system' | 'light' | 'dark';

  $: setTheme(theme);

  function getTheme() {
    const savedTheme = localStorage.getItem('theme');

    switch (savedTheme) {
      case 'light':
      case 'dark':
        return savedTheme;
      default:
        return 'system';
    }
  }

  function setTheme(theme: string) {
    switch (theme) {
      case 'system': {
        const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (isDarkTheme) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.setAttribute('data-theme', 'light');
        }

        localStorage.removeItem('theme');
        break;
      }
      case 'light': {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        break;
      }
      case 'dark': {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        break;
      }
      default: {
        throw new Error(`Unknown theme received: ${theme}`);
      }
    }
  }

  function toggleMenu() {
    menuIsOpen = !menuIsOpen;
  }
</script>

<div class="container" data-testid="layout">
  <Header onMenuButtonClick={toggleMenu} />
  <menu
    class="menu"
    class:menu--open={menuIsOpen}
  >
    <label>
      <span>
        Theme
      </span>
      <select bind:value={theme}>
        <option value="system">
          System
        </option>
        <option value="light">
          Light
        </option>
        <option value="dark">
          Dark
        </option>
      </select>
    </label>
  </menu>
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