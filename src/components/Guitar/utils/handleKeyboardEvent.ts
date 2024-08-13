import focusFret from './focusFret';
import { focussedFret } from '../stores';
import { get } from 'svelte/store';

export default function handleKeyboardEvent(event: KeyboardEvent, element: HTMLElement) {
  const { string, fret } = get(focussedFret);

  switch (event.key) {
    case 'Enter': {
      event.preventDefault();
      focusFret({
        string,
        fret
      });
      break;
    }
    case 'Escape': {
      event.preventDefault();
      element.focus();
      break;
    }
    case 'ArrowLeft': {
      event.preventDefault();
      focusFret({
        string,
        fret: fret - 1
      });
      break;
    }
    case 'ArrowRight': {
      event.preventDefault();
      focusFret({
        string,
        fret: fret + 1
      });
      break;
    }
    case 'ArrowUp': {
      event.preventDefault();
      focusFret({
        string: string - 1,
        fret
      });
      break;
    }
    case 'ArrowDown': {
      event.preventDefault();
      focusFret({
        string: string + 1,
        fret
      });
      break;
    }
  }
}