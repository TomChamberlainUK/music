import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { Guitar } from '@/components';

describe('<Guitar />', () => {
  beforeEach(() => {
    render(Guitar);
  });

  it('Should render', () => {
    const guitar = screen.getByTestId('guitar');
    expect(guitar).toBeInTheDocument();
  });

  it('Should render fret markers', () => {
    const fretMarkers = screen.getAllByTestId('fret-marker');
    expect(fretMarkers.length).toBe(23);
    fretMarkers.forEach(fretMarker => {
      expect(fretMarker).toBeInTheDocument();
    });
  });
  
  it('Should render strings', () => {
    const strings = screen.getAllByTestId('guitar-string');
    expect(strings.length).toBe(6);
    strings.forEach(string => {
      expect(string).toBeInTheDocument();
    });
  });

  it('Should render a configure button', () => {
    const button = screen.getByRole('button', { name: /Configure/ });
    expect(button).toBeInTheDocument();
  });

  describe('When configure button is clicked', () => {
    beforeEach(async () => {
      const button = screen.getByRole('button', { name: /Configure/ });
      await userEvent.click(button);
    });
    
    it('Should render the guitar config', async () => {
      const config = screen.getByRole('form');
      expect(config).toBeInTheDocument();
    });
  });
});