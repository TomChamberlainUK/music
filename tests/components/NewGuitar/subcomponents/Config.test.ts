import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { Config } from '@/components/NewGuitar/subcomponents';

describe('<Config />', () => {
  render(Config);

  it('Should render', () => {
    const config = screen.getByTestId('guitar-config');
    expect(config).toBeInTheDocument();
  });
});