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
    render(Guitar);
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
    const tuning = ['E', 'A', 'D', 'G', 'B', 'E'].reverse();
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

  it('Should render labelled fret markers above the guitar', () => {
    const fretMarkers = screen.getAllByTestId('fret-marker-top');
    expect(fretMarkers.length).toBe(numberOfFrets);
    for (const [index, fretMarker] of fretMarkers.entries()) {
      expect(fretMarker).toBeInTheDocument();
      expect(fretMarker).toHaveTextContent(`${index}`);
    }
  });

  it('Should render fret markers below the guitar', () => {
    const fretMarkers = screen.getAllByTestId('fret-marker-bottom');
    expect(fretMarkers.length).toBe(numberOfFrets);
    for (const fretMarker of fretMarkers) {
      expect(fretMarker).toBeInTheDocument();
    }
  });

  it('Should render a configure button', () => {
    const button = screen.getByRole('button', { name: 'Configure' });
    expect(button).toBeInTheDocument();
  });

  it('Should not render configuration controls by default', () => {
    const config = screen.queryByTestId('guitar-config');
    expect(config).not.toBeInTheDocument();
  });

  it('Should render configuration controls when the configure button is clicked', async () => {
    const button = screen.getByRole('button', { name: 'Configure' });
    await userEvent.click(button);
    const config = screen.getByTestId('guitar-config');
    expect(config).toBeInTheDocument();
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

  it('Should focus the next fret when focused and the right arrow key is pressed', async () => {
    const string = screen.getAllByTestId('string')[0];
    const frets = within(string).getAllByRole('checkbox');
    const fret = frets.at(0)!;
    const nextFret = frets.at(1)!;
    await userEvent.click(fret);
    await userEvent.keyboard('{arrowright}');
    expect(nextFret).toHaveFocus();
  });

  it('Should focus the first fret when the last fret is focused and the right arrow key is pressed', async () => {
    const string = screen.getAllByTestId('string')[0];
    const frets = within(string).getAllByRole('checkbox');
    const lastFret = frets.at(-1)!;
    const firstFret = frets.at(0)!;
    await userEvent.click(lastFret);
    await userEvent.keyboard('{arrowright}');
    expect(firstFret).toHaveFocus();
  });

  it('Should focus the previous fret when focused and the left arrow key is pressed', async () => {
    const string = screen.getAllByTestId('string')[0];
    const frets = within(string).getAllByRole('checkbox');
    const fret = frets.at(1)!;
    const previousFret = frets.at(0)!;
    await userEvent.click(fret);
    await userEvent.keyboard('{arrowleft}');
    expect(previousFret).toHaveFocus();
  });

  it('Should focus the last fret when the first fret is focused and the left arrow key is pressed', async () => {
    const string = screen.getAllByTestId('string')[0];
    const frets = within(string).getAllByRole('checkbox');
    const firstFret = frets.at(0)!;
    const lastFret = frets.at(-1)!;
    await userEvent.click(firstFret);
    await userEvent.keyboard('{arrowleft}');
    expect(lastFret).toHaveFocus();
  });

  it('Should focus the next string when focused and the down arrow key is pressed', async () => {
    const strings = screen.getAllByTestId('string');
    const fret = within(strings[0]).getAllByRole('checkbox', { name: 'E' })[0];
    const nextString = within(strings[1]).getAllByRole('checkbox', { name: 'B' })[0];
    await userEvent.click(fret);
    await userEvent.keyboard('{arrowdown}');
    expect(nextString).toHaveFocus();
  });

  it('Should focus the first string when the last string is focused and the down arrow key is pressed', async () => {
    const strings = screen.getAllByTestId('string');
    const lastString = strings.at(-1)!;
    const firstString = strings.at(0)!;
    const lastFret = within(lastString).getAllByRole('checkbox', { name: 'E' })[0];
    const firstFret = within(firstString).getAllByRole('checkbox', { name: 'E' })[0];
    await userEvent.click(lastFret);
    await userEvent.keyboard('{arrowdown}');
    expect(firstFret).toHaveFocus();
  });

  it('Should focus the previous string when focused and the up arrow key is pressed', async () => {
    const strings = screen.getAllByTestId('string');
    const fret = within(strings[1]).getAllByRole('checkbox', { name: 'B' })[0];
    const previousString = within(strings[0]).getAllByRole('checkbox', { name: 'E' })[0];
    await userEvent.click(fret);
    await userEvent.keyboard('{arrowup}');
    expect(previousString).toHaveFocus();
  });

  it('Should focus the last string when the first string is focused and the up arrow key is pressed', async () => {
    const strings = screen.getAllByTestId('string');
    const firstString = strings.at(0)!;
    const lastString = strings.at(-1)!;
    const firstFret = within(firstString).getAllByRole('checkbox', { name: 'E' })[0];
    const lastFret = within(lastString).getAllByRole('checkbox', { name: 'E' })[0];
    await userEvent.click(firstFret);
    await userEvent.keyboard('{arrowup}');
    expect(lastFret).toHaveFocus();
  });
});