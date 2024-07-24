import { Form } from '@/components';
import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';

describe('<Form />', () => {
  const label = 'Menu Selection';

  beforeEach(() => {
    render(Form, {
      label
    });
  });

  it('Should render', () => {
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

  it('Should be associated with an accessible label', () => {
    const dropdown = screen.getByRole('form');
    expect(dropdown).toHaveAccessibleName(label);
  });
});