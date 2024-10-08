import { cleanup, render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { get } from 'svelte/store';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Guitar from '@/components/NewGuitar';
import { notes as notesStore, scale } from '@/stores';

describe('<Guitar />', () => {
  const numberOfFrets = 22;
  const numberOfStrings = 6;

  beforeEach(() => {
    render(Guitar, {
      numberOfFrets
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('Should render', () => {
    const guitar = screen.getByRole('group');
    expect(guitar).toBeInTheDocument();
  });

  it('Should render each string', () => {
    const strings = screen.getAllByTestId('string');
    expect(strings.length).toBe(numberOfStrings);
    for (const string of strings) {
      expect(string).toBeInTheDocument();
    }
  });

  it('Should render each fret of each string', () => {
    const tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
    const strings = screen.getAllByTestId('string');
    for (const [i, note] of tuning.entries()) {
      const notes = notesStore.getConsecutiveNotes(note, numberOfFrets);
      const frets = within(strings[i]).getAllByRole('checkbox');
      for (const [j, fret] of frets.entries()) {
        expect(fret).toBeInTheDocument();
        expect(fret).toHaveAccessibleName(notes[j]);
      }
    }
  });

  it('Should select notes in the current scale', () => {
    const { notes } = get(scale);
    for (const note of notes) {
      const frets = screen.getAllByRole('checkbox', { name: note });
      for (const fret of frets) {
        expect(fret).toBeChecked();
      }
    }
  });

  it('Should render an interval name in a tooltip when hovered', async () => {
    const fret = screen.getAllByRole('checkbox', { name: 'C' })[0];
    await userEvent.hover(fret);
    const tooltip = screen.getByRole('tooltip', { name: 'Root' });
    expect(tooltip).toBeInTheDocument();
  });

  it('Should update an interval name in a tooltip when the root note changes', async () => {
    scale.set({ root: 'A' });
    const fret = screen.getAllByRole('checkbox', { name: 'C' })[0];
    await userEvent.hover(fret);
    const tooltip = screen.getByRole('tooltip', { name: 'Minor 3rd' });
    expect(tooltip).toBeInTheDocument();
  });
});