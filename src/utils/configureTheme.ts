export default function configureTheme() {
  const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (isDarkTheme) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}