export default function getTheme() {
  const savedTheme = localStorage.getItem('theme');

  switch (savedTheme) {
    case 'light':
    case 'dark':
      return savedTheme;
    default:
      return 'system';
  }
}
