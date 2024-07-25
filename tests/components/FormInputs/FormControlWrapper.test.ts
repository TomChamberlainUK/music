import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import FormControlWrapper from '@/components/Form/FormControlWrapper.svelte';

describe('<FormControlWrapper />', () => {
  const labelText = 'Input';

  beforeEach(() => {
    render(FormControlWrapper, {
      label: labelText
    });
  });

  it('Should render a label', () => {
    const label = screen.getByText(labelText);
    expect(label).toBeInTheDocument();
  });
});