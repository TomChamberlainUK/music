import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { Piano } from '@/components';
import { notes } from '@/utils';

describe('<Piano />', () => {
  beforeEach(() => {
    render(Piano);
  });

  it('Should render', () => {
    const piano = screen.getByTestId('piano');
    expect(piano).toBeInTheDocument();
  });

  it('Should render all notes as keys', () => {
    notes.forEach(note => {
      const key = screen.getByRole('button', { name: note });
      expect(key).toBeInTheDocument();
    });
  });

  it('Should indicate selected keys', () => {
    ['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach(note => {
      const key = screen.getByRole('button', { name: note });
      expect(key).toHaveAttribute('aria-selected', 'true');
    });
  });

  it('Should not indicate non-selected keys', () => {
    ['C#', 'D#', 'F#', 'G#', 'A#'].forEach(note => {
      const key = screen.getByRole('button', { name: note });
      expect(key).toHaveAttribute('aria-selected', 'false');
    });
  });

  it('When clicked, should toggle and indicate current key', async () => {
    const key = screen.getByRole('button', { name: 'C' });
    expect(key).toHaveAttribute('aria-current', 'false');
    await userEvent.click(key);
    expect(key).toHaveAttribute('aria-current', 'location');
    await userEvent.click(key);
    expect(key).toHaveAttribute('aria-current', 'false');
  });
});