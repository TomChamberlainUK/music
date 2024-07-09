import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import { CircleOfFifths } from '@/components';

describe('<CircleOfFifths />', () => {
  const majorFifths = [
    'C',
    'G',
    'D',
    'A',
    'E',
    'B',
    'G♭/F♯',
    'D♭',
    'A♭',
    'E♭',
    'B♭',
    'F'
  ];

  const minorFifths = [
    'a',
    'e',
    'b',
    'f♯',
    'c♯',
    'g♯',
    'e♭/d♯',
    'b♭',
    'f',
    'c',
    'g',
    'd'
  ];

  const diminishedFifths = [
    'B°',
    'F♯°',
    'C♯°',
    'G♯°',
    'D♯°',
    'A♯°',
    'E♯°',
    'C°',
    'G°',
    'D°',
    'A°',
    'E°',
  ];

  const cScaleDiatonicChords = [
    'C',
    'd',
    'e',
    'F',
    'G',
    'a',
    'B°'
  ];

  beforeEach(() => {
    render(CircleOfFifths);
  });

  it('Should render', () => {
    const circleOfFifths = screen.getByRole('graphics-document');
    expect(circleOfFifths).toBeInTheDocument();
  });

  it('Should render all major chords', () => {
    majorFifths.forEach(note => {
      const chord = screen.getByRole('gridcell', { name: note });
      expect(chord).toBeInTheDocument();
    });
  });

  it('Should render all minor chords', () => {
    minorFifths.forEach(note => {
      const chord = screen.getByRole('gridcell', { name: note });
      expect(chord).toBeInTheDocument();
    });
  });

  it('Should render all diminished chords', () => {
    diminishedFifths.forEach(note => {
      const chord = screen.getByRole('gridcell', { name: note });
      expect(chord).toBeInTheDocument();
    });
  });

  it('Should highlight chords available in the current diatonic scale', () => {
    cScaleDiatonicChords.forEach(note => {
      const chord = screen.getByRole('gridcell', { name: note });
      expect(chord).toHaveAttribute('aria-selected', 'true');
    });
  });

  it('Should not highlight chords not available in the current diatonic scale', () => {
    [...majorFifths, ...minorFifths, ...diminishedFifths]
      .filter(note => !cScaleDiatonicChords.includes(note))
      .forEach(note => {
        const chord = screen.getByRole('gridcell', { name: note });
        expect(chord).toHaveAttribute('aria-selected', 'false');
      });
  });
});