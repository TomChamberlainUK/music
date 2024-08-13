import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import { String } from '@/components/Guitar/subcomponents';

describe('<String />', () => {
  const numberOfFrets = 12;
  const tuning = 'A';

  beforeEach(() => {
    render(String, {
      tuning,
      numberOfFrets,
      stringNumber: 0
    });
  });

  it('Should render', () => {
    const string = screen.getByRole('row');
    expect(string).toBeInTheDocument();
  });

  it('Should start with the correct tuning', () => {
    const frets = screen.getAllByRole('gridcell');
    expect(frets[0]).toHaveTextContent(tuning);
  });

  it('Should render the correct number of frets, including open string', () => {
    const frets = screen.getAllByRole('gridcell');
    expect(frets.length).toBe(numberOfFrets + 1);
  });
});