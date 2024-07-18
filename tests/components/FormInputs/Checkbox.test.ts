import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import { Checkbox } from '@/components';

describe('<Checkbox />', () => {
  const label = 'Vegetarian';
  const isChecked = true;

  beforeEach(() => {
    render(Checkbox, {
      label,
      isChecked
    });
  });

  it('Should render', () => {
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
  });

  it('Should be associated with an accessible label', () => {
    const input = screen.getByRole('checkbox');
    expect(input).toHaveAccessibleName(label);
  });

  it('Should bind a passed checked state', () => {
    const input = screen.getByRole('checkbox');
    expect(input).toBeChecked();
  });
});