export default function setTheme(theme: string) {
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