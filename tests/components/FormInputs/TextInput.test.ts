import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import { TextInput } from '@/components';

describe('<TextInput />', () => {
  const labelText = 'Name';
  const value = 'Louis Theroux';

  beforeEach(() => {
    render(TextInput, {
      label: labelText,
      value
    });
  });

  it('Should render', () => {
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('Should render a label', () => {
    const label = screen.getByLabelText(labelText);
    expect(label).toBeInTheDocument();
  });

  it('Should bind a passed value', () => {
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(value);
  });
});