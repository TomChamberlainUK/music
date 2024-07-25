import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import { FormControlText } from '@/components';

describe('<FormControlText />', () => {
  const label = 'Name';
  const value = 'Louis Theroux';

  beforeEach(() => {
    render(FormControlText, {
      label,
      value
    });
  });

  it('Should render', () => {
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('Should be associated with an accessible label', () => {
    const input = screen.getByRole('textbox');
    expect(input).toHaveAccessibleName(label);
  });

  it('Should bind a passed value', () => {
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(value);
  });
});