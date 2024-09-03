import { Piano } from '@/components/PianoNew';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

describe('<Piano />', () => {
  beforeEach(() => {
    render(Piano);
  });

  it('Should render', () => {
    const piano = screen.getByRole('listbox');
    expect(piano).toBeInTheDocument();
  });

  it('Should render each key for natural notes', () => {
    for (const note of ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']) {
      const key = screen.getByRole('checkbox', { name: note });
      expect(key).toBeInTheDocument();
    }
  });

  it('Should check notes in the current scale', () => {
    for (const note of ['C', 'D', 'E', 'F', 'G', 'A', 'B']) {
      const key = screen.getByRole('checkbox', { name: note });
      expect(key).toBeChecked();
    }
  });

  it('Should render an interval name in a tooltip when hovered', async () => {
    const key = screen.getByRole('checkbox', { name: 'C' });
    await userEvent.hover(key);
    const tooltip = screen.getByRole('tooltip', { name: 'Root' });
    expect(tooltip).toBeInTheDocument();
  });
});