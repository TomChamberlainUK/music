import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FormControlNumber } from '@/components';

describe('<FormControlNumber />', () => {
  const label = 'Age';
  const value = 31;

  let inputComponent: FormControlNumber;

  beforeEach(() => {
    const { component } = render(FormControlNumber, {
      label,
      value
    });
    inputComponent = component;
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

  it('Should foward on:input events to the native html input', async () => {
    const input = screen.getByRole('spinbutton');
    const inputCallback = vi.fn();
    inputComponent.$on('input', inputCallback);
    await userEvent.type(input, '29');
    expect(inputCallback).toHaveBeenCalled();
  });
});