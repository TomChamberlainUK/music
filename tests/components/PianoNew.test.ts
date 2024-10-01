import { cleanup, render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { get } from 'svelte/store';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Piano } from '@/components/PianoNew';
import { scale } from '@/stores';


describe('<Piano />', () => {
  beforeEach(() => {
    render(Piano);
  });
  
  afterEach(() => {
    cleanup();
    scale.reset();
  });

  it('Should render', () => {
    const piano = screen.getByRole('listbox');
    expect(piano).toBeInTheDocument();
  });

  it('Should render a key for each note', () => {
    for (const note of ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']) {
      const key = screen.getByRole('checkbox', { name: note });
      expect(key).toBeInTheDocument();
    }
  });

  it('Should select notes in the current scale', () => {
    const { notes } = get(scale);
    for (const note of notes) {
      const key = screen.getByRole('checkbox', { name: note });
      expect(key).toBeChecked();
    }
  });

  it('Should add a note to the current scale when clicked', async () => {
    let { notes } = get(scale);
    expect(notes).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
    const key = screen.getByRole('checkbox', { name: 'C♯' });
    await userEvent.click(key);
    notes = get(scale).notes;
    expect(notes).toEqual(['C', 'C♯', 'D', 'E', 'F', 'G', 'A', 'B']);
  });

  it('Should remove a note from the current scale when clicked', async () => {
    let { notes } = get(scale);
    expect(notes).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
    const key = screen.getByRole('checkbox', { name: 'B' });
    await userEvent.click(key);
    notes = get(scale).notes;
    expect(notes).toEqual(['C', 'D', 'E', 'F', 'G', 'A']);
  });

  it('Should render an interval name in a tooltip when hovered', async () => {
    const key = screen.getByRole('checkbox', { name: 'C' });
    await userEvent.hover(key);
    const tooltip = screen.getByRole('tooltip', { name: 'Root' });
    expect(tooltip).toBeInTheDocument();
  });
});