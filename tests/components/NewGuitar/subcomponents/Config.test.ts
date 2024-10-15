import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import { Config } from '@/components/NewGuitar/subcomponents';

describe('<Config />', () => {
  beforeEach(() => {
    render(Config);
  });

  it('Should render', () => {
    const config = screen.getByTestId('guitar-config');
    expect(config).toBeInTheDocument();
  });
  
  it('Should render a form control for the number of strings', () => {
    const control = screen.getByRole('spinbutton', {
      name: 'Number of Strings'
    });
    expect(control).toBeInTheDocument();
  });

  it('Should render a form control for the number of frets', () => {
    const control = screen.getByRole('spinbutton', {
      name: 'Number of Frets'
    });
    expect(control).toBeInTheDocument();
  });
});