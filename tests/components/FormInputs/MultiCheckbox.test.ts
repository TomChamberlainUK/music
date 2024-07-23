import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { MultiCheckbox } from '@/components';

describe('<MultiCheckbox />', () => {
  const checkboxes = ['nut-free', 'gluten-free', 'vegetarian'];
  let group: string[] = [];

  beforeEach(() => {
    const { component } = render(MultiCheckbox, {
      checkboxes,
      group
    });
    component
  });

  it('Should render each input', () => {
    for (const checkbox of checkboxes) {
      const input = screen.getByRole('checkbox', { name: checkbox });
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