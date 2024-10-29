import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import { FormControlColor } from '@/components';

describe('<FormControlColor />', () => {
  const label = 'Color';
  const value = '#ffffff';

  beforeEach(() => {
    render(FormControlColor, {
      label,
      value,
    });
  });

  it('Should render', () => {
    const input = screen.getByTestId('color-input');
    expect(input).toBeInTheDocument();
  });

  it('Should be associated with an accessible label', () => {
    const input = screen.getByTestId('color-input');
    expect(input).toHaveAccessibleName(label);
  });

  it('Should bind a passed value', () => {
    const input = screen.getByTestId('color-input');
    expect(input).toHaveValue(value);
  });
});
