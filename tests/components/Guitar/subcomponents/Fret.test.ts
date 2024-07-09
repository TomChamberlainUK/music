import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { Fret } from '@/components/Guitar/subcomponents';
import { highlightedNotes, selectedNote } from '@/stores';
import type { SelectedNote } from '@/types';

vi.mock('@/stores/highlightedNotes', async () => {
  const { writable } = await import('svelte/store');
  return {
    default: writable<SelectedNote[]>([])
  };
});

describe('<Fret />', () => {
  describe('Default behaviour', () => {
    beforeEach(() => {
      render(Fret, { note: 'C' });
    });
  
    afterEach(() => {
      selectedNote.reset();
    });
  
    it('Should render', () => {
      const fret = screen.getByRole('button', { name: /C/ });
      expect(fret).toBeInTheDocument();
    });
  
    it('Should set aria-current to false', () => {
      const fret = screen.getByRole('button', { name: /C/ });
      expect(fret).toHaveAttribute('aria-current', 'false');
    });
  
    it('Should set aria-current to location when clicked', async () => {
      const fret = screen.getByRole('button', { name: /C/ });
      expect(fret).toHaveAttribute('aria-current', 'false');
      await userEvent.click(fret);
      expect(fret).toHaveAttribute('aria-current', 'location');
    });

    it('Should set aria-selected to false', () => {
      const fret = screen.getByRole('button', { name: /C/ });
      expect(fret).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('When the note is selected', () => {
    beforeEach(async () => {
      render(Fret, { note: 'C' });
      const fret = screen.getByRole('button', { name: /C/ });
      await userEvent.click(fret);
    });
  
    afterEach(() => {
      selectedNote.reset();
    });

    it('Should set aria-current to location', () => {
      const fret = screen.getByRole('button', { name: /C/ });
      expect(fret).toHaveAttribute('aria-current', 'location');
    });
  
    it('Should set aria-current to false when clicked', async () => {
      const fret = screen.getByRole('button', { name: /C/ });
      await userEvent.click(fret);
      expect(fret).toHaveAttribute('aria-current', 'false');
    });
  });

  describe('When the note is highlighted', () => {
    beforeEach(() => {
      render(Fret, { note: 'C' });
      highlightedNotes.set([
        {
          color: '#ff0000',
          name: 'Root',
          value: 'C'
        }
      ]);
    });
  
    afterEach(() => {
      selectedNote.reset();
      vi.clearAllMocks();
    });
  
    it('Should describe the note\'s name', () => {
      const description = screen.getByTitle('Root');
      expect(description).toBeInTheDocument();
    });
  
    it('Should display a tooltip when hovered', async () => {
      const fret = screen.getByRole('button', { name: /C/ });
      await userEvent.hover(fret);
      const tooltip = screen.getByRole('tooltip', { name: 'Root' });
      expect(tooltip).toBeInTheDocument();
    });

    it('Should set aria-selected to true', () => {
      const fret = screen.getByRole('button', { name: /C/ });
      expect(fret).toHaveAttribute('aria-selected', 'true');
    });
  });
});