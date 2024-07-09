import { ScaleConfig } from '@/components';
import { getModeNames, getScaleNames } from '@/components/ScaleConfig/utils';
import { notes } from '@/utils';
import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

describe('<ScaleConfig />', () => {
  beforeEach(() => {
    render(ScaleConfig);
  });

  it('Should render', () => {
    const scaleConfig = screen.getByRole('form');
    expect(scaleConfig).toBeInTheDocument();
  });

  it('Should render a heading displaying the current scale', () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /The C ionian mode of the diatonic scale/
    });
    expect(heading).toBeInTheDocument();
  });

  it('Should render a control for the root', () => {
    const control = screen.getByRole('combobox', { name: /Root/ });
    expect(control).toBeInTheDocument();
  });

  it('Should render an option for each note in root control', () => {
    const control = screen.getByRole('combobox', { name: /Root/ });
    notes.forEach(note => {
      const option = within(control).getByRole('option', { name: note });
      expect(option).toBeInTheDocument();
    });
  });

  it('Should render a control for the scale', () => {
    const control = screen.getByRole('combobox', { name: /Scale/ });
    expect(control).toBeInTheDocument();
  });

  it('Should render an option for each scale in scale control', () => {
    const control = screen.getByRole('combobox', { name: /Scale/ });
    const scales = getScaleNames();
    scales.forEach(scale => {
      const option = within(control).getByRole('option', { name: scale });
      expect(option).toBeInTheDocument();
    });
  });

  it('Should render a control for the mode', () => {
    const control = screen.getByRole('combobox', { name: /Mode/ });
    expect(control).toBeInTheDocument();
  });

  it('Mode control should feature all modes for each scale', async () => {
    const scaleControl = screen.getByRole('combobox', { name: /Scale/ });
    const modeControl = screen.getByRole('combobox', { name: /Mode/ });
    const scales = getScaleNames();
    for await (const scale of scales) {
      const scaleOption = within(scaleControl).getByRole('option', { name: scale });
      await userEvent.selectOptions(scaleControl, scaleOption);
      const modes = getModeNames(scale);
      modes.forEach(mode => {
        const modeOption = within(modeControl).getByRole('option', { name: mode });
        expect(modeOption).toBeInTheDocument();
      });
    }
  });

  it('Should render the current notes in the given scale and mode', async () => {
    const rootControl = screen.getByRole('combobox', { name: /Root/ });
    const scaleControl = screen.getByRole('combobox', { name: /Scale/ });
    const modeControl = screen.getByRole('combobox', { name: /Mode/ });
    {
      const text = screen.getByText(/Featuring the notes: C, D, E, F, G, A, and B./);
      expect(text).toBeInTheDocument();
    }
    {
      const rootOption = within(rootControl).getByRole('option', { name: /^A$/i });
      await userEvent.selectOptions(rootControl, rootOption);
      const scaleOption = within(scaleControl).getByRole('option', { name: /Pentatonic/i });
      await userEvent.selectOptions(scaleControl, scaleOption);
      const modeOption = within(modeControl).getByRole('option', { name: /Minor/i });
      await userEvent.selectOptions(modeControl, modeOption);
      const text = screen.getByText(/Featuring the notes: A, C, D, E, and G./);
      expect(text).toBeInTheDocument();
    }
  });
});