import { Instruments } from '@/components';
import { render, screen, within } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';

describe('<Instruments />', () => {
  const instruments = [
    {
      type: 'guitar',
      id: 0
    },
    {
      type: 'piano',
      id: 1
    }
  ];

  beforeEach(() => {
    render(Instruments);
  });

  it('Should render a list of instruments', () => {
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('Should render each instrument with a heading and remove button', () => {
    instruments.forEach(({ type, id }) => {
      const instrument = screen.getByRole('listitem', { name: `${type} (id: ${id})` });
      expect(instrument).toBeInTheDocument();
    });
  });

  it('Should render a remove instrument button with each instrument', () => {
    instruments.forEach(({ type, id }) => {
      const instrument = screen.getByRole('listitem', { name: `${type} (id: ${id})` });
      const button = within(instrument).getByRole('button', { name: /Remove/ });
      expect(button).toBeInTheDocument();
    });
  });

  it('Should render an add guitar button', () => {
    const button = screen.getByRole('button', { name: /Add Guitar/ });
    expect(button).toBeInTheDocument();
  });

  it('Should render an add piano button', () => {
    const button = screen.getByRole('button', { name: /Add Piano/ });
    expect(button).toBeInTheDocument();
  });
});