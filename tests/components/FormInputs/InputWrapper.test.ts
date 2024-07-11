import InputWrapper from '@/components/FormInputs/InputWrapper.svelte';
import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';

describe('<InputWrapper />', () => {
  const labelText = 'Input';

  beforeEach(() => {
    render(InputWrapper, {
      label: labelText
    });
  });

  it('Should render a label', () => {
    const label = screen.getByText(labelText);
    expect(label).toBeInTheDocument();
  });
});