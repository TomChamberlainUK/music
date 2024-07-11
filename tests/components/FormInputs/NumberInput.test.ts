import { NumberInput } from '@/components';
import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';

describe('<NumberInput />', () => {
  const label = 'Age';
  const value = 31;

  beforeEach(() => {
    render(NumberInput, {
      label,
      value
    });
  });

  it('Should render', () => {
    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
  });

  it('Should be associated with an accessible label', () => {
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAccessibleName(label);
  });

  it('Should bind a passed value', () => {
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(value);
  });
});