import { cleanup, render, screen, within } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Guitar from '@/components/NewGuitar';
import { getConsecutiveNotes } from '@/utils';

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
      const notes = getConsecutiveNotes(note, numberOfFrets);
      const frets = within(strings[i]).getAllByRole('checkbox');
      for (const [j, fret] of frets.entries()) {
        expect(fret).toBeInTheDocument();
        expect(fret).toHaveAccessibleName(notes[j]);
      }
    }
  });
});