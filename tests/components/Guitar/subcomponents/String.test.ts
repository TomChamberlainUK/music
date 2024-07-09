import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import { String } from '@/components/Guitar/subcomponents';

describe('<String />', () => {
  const numberOfFrets = 12;
  const tuning = 'A';

  beforeEach(() => {
    render(String, {
      tuning,
      numberOfFrets
    });
  });

  it('Should render', () => {
    const string = screen.getByTestId('guitar-string');
    expect(string).toBeInTheDocument();
  });

  it('Should start with the correct tuning', () => {
    const frets = screen.getAllByRole('button');
    expect(frets[0]).toHaveTextContent(tuning);
  });

  it('Should render the correct number of frets, including open string', () => {
    const frets = screen.getAllByRole('button');
    expect(frets.length).toBe(numberOfFrets + 1);
  });
});