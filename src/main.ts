import App from './App.svelte';
import { configureTheme } from './utils';
import './styles/global.scss';

configureTheme();

const app = new App({
  target: document.getElementById('app')!,
});

export default app;
