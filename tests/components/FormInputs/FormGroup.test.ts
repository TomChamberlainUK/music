import { FormGroup } from '@/components';
import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';

describe('<FormGroup />', () => {
  const label = 'Desserts';

  beforeEach(() => {
    render(FormGroup, {
      label,
    });
  });

  it('Should render', () => {
    const formGroup = screen.getByRole('group');
    expect(formGroup).toBeInTheDocument();
  });

  it('Should be associated with an accessible label', () => {
    const formGroup = screen.getByRole('group');
    expect(formGroup).toHaveAccessibleName();
  });
});
