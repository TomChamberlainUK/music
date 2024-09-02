import { Piano } from '@/components/PianoNew';
import { render, screen } from '@testing-library/svelte';
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
    for (const note of ['C', 'D', 'E', 'F', 'G', 'A', 'B']) {
      const key = screen.getByRole('checkbox', { name: note });
      expect(key).toBeInTheDocument();
    }
  });
});