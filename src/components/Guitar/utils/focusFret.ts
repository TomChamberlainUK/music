import { focussedFret } from '../stores';

export default function focusFret({ string, fret }: { string: number, fret: number }) {
  const target = document.querySelector<HTMLTableCellElement>(
    `[data-row="${string}"][data-column="${fret}"]`
  );
  if (!target) {
    return;
  }
  focussedFret.set({
    string,
    fret
  });
  target.focus();
}