import { cleanup, render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { get } from 'svelte/store';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ScaleConfig } from '@/components';
import { getModeNames, getScaleNames } from '@/components/ScaleConfig/utils';
import { notes, scale } from '@/stores';

describe('<ScaleConfig />', () => {
  beforeEach(() => {
    render(ScaleConfig);
  });
  
  afterEach(() => {
    scale.reset();
    cleanup();
  });

  it('Should render a scale config form', () => {
    const scaleConfig = screen.getByRole('form', { name: 'Scale Config' });
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
    get(notes).forEach(note => {
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

  it('Should render the current notes', () => {
    const text = screen.getByText("Featuring the notes: C, D, E, F, G, A, and B.");
    expect(text).toBeInTheDocument();
  });

  it('Should update the current notes in the given scale and mode', async () => {
    const rootControl = <HTMLSelectElement>screen.getByRole('combobox', { name: /Root/ });
    const scaleControl = screen.getByRole('combobox', { name: /Scale/ });
    const modeControl = screen.getByRole('combobox', { name: /Mode/ });
    const rootOption = within(rootControl).getByRole('option', { name: 'A' });
    // TODO: Investigate why the root needs to be selected twice
    await userEvent.selectOptions(rootControl, rootOption); // Not sure why but the root needs to be selected twice
    await userEvent.selectOptions(rootControl, rootOption); // Not sure why but the root needs to be selected twice
    const scaleOption = within(scaleControl).getByRole('option', { name: 'pentatonic' });
    await userEvent.selectOptions(scaleControl, scaleOption);
    const modeOption = within(modeControl).getByRole('option', { name: 'minor' });
    await userEvent.selectOptions(modeControl, modeOption);
    const text = screen.getByText('Featuring the notes: A, C, D, E, and G.');
    expect(text).toBeInTheDocument();
  });
});