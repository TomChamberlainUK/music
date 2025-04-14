import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import { FormControlDropdown } from '@/components';

describe('<FormControlDropdown />', () => {
  const label = 'Dish';

  const simpleValueOptions = [
    'lasagne',
    'bolognese',
    'carbonara',
  ];

  const namedValueOptions = [
    {
      name: 'cacio e pepe',
      value: 'cacio-e-pepe',
    },
    {
      name: 'fettuccine alfredo',
      value: 'fettuccine-alfredo',
    },
  ];

  const selectedValue = 'carbonara';

  beforeEach(() => {
    render(FormControlDropdown, {
      label,
      value: selectedValue,
      options: [
        ...simpleValueOptions,
        ...namedValueOptions,
      ],
    });
  });

  it('Should render', () => {
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();
  });

  it('Should be associated with an accessible label', () => {
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveAccessibleName(label);
  });

  it('Should bind a passed value', () => {
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveValue(selectedValue);
  });

  it('Should render simple value options', () => {
    for (const value of simpleValueOptions) {
      const option = screen.getByRole('option', { name: value });
      expect(option).toBeInTheDocument();
      expect(option).toHaveValue(value);
    }
  });

  it('Should render named value options', () => {
    for (const { name, value } of namedValueOptions) {
      const option = screen.getByRole('option', { name });
      expect(option).toBeInTheDocument();
      expect(option).toHaveValue(value);
    };
  });
});
