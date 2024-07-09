import { cleanup, render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Dropdown } from '@/components';
import userEvent from '@testing-library/user-event';

describe('<Dropdown />', () => {
  let component: Dropdown;

  beforeEach(() => {
    const { component: renderedComponent } = render(Dropdown, {
      label: 'Test Dropdown',
      options: [
        'Test Option 01',
        'Test Option 02',
        'Test Option 03'
      ],
      value: 'Test Option 02'
    });
    component = renderedComponent;
  });

  it('Should render', () => {
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();
  });

  it('Should render a label', () => {
    const label = screen.getByLabelText(/Test Dropdown/);
    expect(label).toBeInTheDocument();
  });

  it('Should render a list of options', () => {
    const options = screen.getAllByText(/Test Option/);
    options.forEach(option => (
      expect(option).toBeInTheDocument()
    ));
  });

  it('Should allow users to set a value', () => {
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveValue('Test Option 02');
  });

  it('Should pass an on:change event to the native html element', async () => {
    const dropdown = screen.getByRole('combobox');
    const option = screen.getByRole('option', { name: 'Test Option 03' });
    const onChangeMock = vi.fn();
    component.$on('change', onChangeMock);
    await userEvent.selectOptions(dropdown, option);
    expect(onChangeMock).toHaveBeenCalled();
  });
});