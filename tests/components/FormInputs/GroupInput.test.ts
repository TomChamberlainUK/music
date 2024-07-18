import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { GroupInput } from '@/components';

describe('<GroupInput />', () => {
  const label = 'Dietary Requirements';
  const checkboxes = ['nut-free', 'gluten-free', 'vegetarian'];
  let group: string[] = [];

  beforeEach(() => {
    const { component } = render(GroupInput, {
      label,
      checkboxes,
      group
    });
    component
  });

  it('Should render', () => {
    const fieldset = screen.getByRole('group');
    expect(fieldset).toBeInTheDocument();
  });

  it('Should be associated with an accessible label', () => {
    const fieldset = screen.getByRole('group');
    expect(fieldset).toHaveAccessibleName(label);
  });

  it('Should render a group of inputs', () => {
    const fieldset = screen.getByRole('group');
    for (const checkbox of checkboxes) {
      const input = within(fieldset).getByRole('checkbox', { name: checkbox });
      expect(input).toBeInTheDocument();
    }
  });

  // Currently Svelte does not expose the bind: directive via the API
  // - so bind:group cannot accurately be tested here
  it.skip('Should bind and update a passed group', async () => {
    const fieldset = screen.getByRole('group');
    const input = within(fieldset).getByRole('checkbox', { name: checkboxes[2] });
    await userEvent.click(input);
    expect(group).toContain(checkboxes[2]);
  });
});