import { render, screen, within } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Config } from '@/components/Guitar/subcomponents';
import { notes } from '@/utils';

describe('<Config />', () => {
  const numberOfStrings = 6;
  const numberOfFrets = 12;

  beforeEach(() => {
    render(Config, {
      numberOfStrings,
      numberOfFrets
    });
  });

  it('Should render', () => {
    const config = screen.getByRole('form');
    expect(config).toBeInTheDocument();
  });

  it('Should render a control for number of strings', () => {
    const control = screen.getByRole('spinbutton', { name: /Number of Strings:/ });
    expect(control).toBeInTheDocument();
  });

  it('Should set a default number of strings via props', () => {
    const control = screen.getByRole('spinbutton', { name: /Number of Strings:/ });
    expect(control).toHaveValue(numberOfStrings);
  });

  it('Should render a control for number of frets', () => {
    const control = screen.getByRole('spinbutton', { name: /Number of Frets:/ });
    expect(control).toBeInTheDocument();
  });

  it('Should set a default number of frets via props', () => {
    const control = screen.getByRole('spinbutton', { name: /Number of Frets:/ });
    expect(control).toHaveValue(numberOfFrets);
  });

  it('Should render a group of controls for tuning', () => {
    const group = screen.getByRole('group', { name: /Tuning/ });
    expect(group).toBeInTheDocument();
  });

  it('Should render a control for tuning presets', () => {
    const control = screen.getByRole('combobox', { name: /Presets:/ });
    expect(control).toBeInTheDocument();
  });

  it('Should render a control for tuning each string', () => {
    const labels = ['6th', '5th', '4th', '3rd', '2nd', '1st'];
    const controls = labels.map(label => (
      screen.getByRole('combobox', { name: label })
    ));
    controls.forEach(control => {
      expect(control).toBeInTheDocument();
    });
  });

  it('Should render an option for every note for tuning controls', () => {
    const control = screen.getByRole('combobox', { name: '1st' });
    const options = notes.map(note => (
      within(control).getByRole('option', { name: note })
    ));
    options.forEach(option => {
      expect(option).toBeInTheDocument();
    });
  });

  it('Should render a group of controls for fret markers', () => {
    const group = screen.getByRole('group', { name: /Fret Markers/ });
    expect(group).toBeInTheDocument();
  });

  it('Should render a control for a fret marker for each fret', () => {
    const labels = new Array(numberOfFrets + 1)
      .fill(null)
      .map((_, i) => i.toString());
    const controls = labels.map(label => (
      screen.getByRole('checkbox', { name: label })
    ));
    controls.forEach(control => {
      expect(control).toBeInTheDocument();
    });
  });
});