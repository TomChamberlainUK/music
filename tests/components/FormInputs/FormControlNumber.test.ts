import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import { FormControlNumber } from '@/components';

describe('<FormControlNumber />', () => {
  const label = 'Age';
  const value = 31;

  beforeEach(() => {
    render(FormControlNumber, {
      label,
      value,
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
