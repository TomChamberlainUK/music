import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { MultiCheckbox } from '@/components';

describe('<MultiCheckbox />', () => {
  const values = ['nut-free', 'gluten-free', 'vegetarian'];
  let checked: string[] = [];

  beforeEach(() => {
    const { component } = render(MultiCheckbox, {
      values,
      checked
    });
    component
  });

  it('Should render each input', () => {
    for (const value of values) {
      const input = screen.getByRole('checkbox', { name: value });
      expect(input).toBeInTheDocument();
    }
  });

  // Currently Svelte does not expose the bind: directive via the API
  // - so bind:group cannot accurately be tested here
  it.skip('Should bind and update a passed group', async () => {
    const fieldset = screen.getByRole('group');
    const input = within(fieldset).getByRole('checkbox', { name: values[2] });
    await userEvent.click(input);
    expect(checked).toContain(values[2]);
  });
});