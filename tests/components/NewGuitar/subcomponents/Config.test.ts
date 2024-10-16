import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { Config } from '@/components/NewGuitar/subcomponents';
import { formatOrdinal } from '@/utils';

describe('<Config />', () => {
  const numberOfStrings = 6;
  const numberOfFrets = 22;
  const stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];
  const fretMarkers = ['3', '5', '7', '9', '12', '15', '17', '19', '21'];

  beforeEach(() => {
    render(Config, {
      numberOfStrings,
      numberOfFrets,
      stringTunings,
      fretMarkers
    });
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

  it('Should render a set of controls for fret markers', () => {
    const group = screen.getByRole('group', {
      name: 'Fret Markers'
    });
    expect(group).toBeInTheDocument();
    for (let i = 0; i <= numberOfFrets; i++) {
      const fretMarkerControl = within(group).getByRole('checkbox', {
        name: `${i}`
      });
      expect(fretMarkerControl).toBeInTheDocument();
    }
  });

  it('Should render fret marker controls equal to the number of frets', async () => {
    const newNumberOfFrets = 10;
    const numberOfFretsControl = screen.getByRole('spinbutton', {
      name: 'Number of Frets'
    });
    await userEvent.clear(numberOfFretsControl);
    await userEvent.type(numberOfFretsControl, `${newNumberOfFrets}`);
    const group = screen.getByRole('group', {
      name: 'Fret Markers'
    });
    const fretMarkerControls = within(group).getAllByRole('checkbox');
    expect(fretMarkerControls.length).toBe(newNumberOfFrets + 1);
  });

  it('Should render a set of controls for string tunings', () => {
    const group = screen.getByRole('group', {
      name: 'String Tunings'
    });
    expect(group).toBeInTheDocument();
    for (let i = 0; i < numberOfStrings; i++) {
      const stringTuningControl = within(group).getByRole('combobox', {
        name: formatOrdinal(i + 1)
      });
      expect(stringTuningControl).toBeInTheDocument();
    }
  });

  it('Should render string tuning controls equal to the number of strings', async () => {
    const newNumberOfStrings = 12;
    const numberOfStringsControl = screen.getByRole('spinbutton', {
      name: 'Number of Strings'
    });
    await userEvent.clear(numberOfStringsControl);
    await userEvent.type(numberOfStringsControl, `${newNumberOfStrings}`);
    const group = screen.getByRole('group', {
      name: 'String Tunings'
    });
    const stringTuningControls = within(group).getAllByRole('combobox');
    expect(stringTuningControls.length).toBe(newNumberOfStrings);
  });
});