import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import Tooltip from '@/components/Tooltip';

describe('<Tooltip />', () => {
  describe('When given a description', () => {
    beforeEach(() => {
      render(Tooltip, {
        details: 'Test',
      });
    });

    it('Should render', () => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
    });

    it('Should render a description', () => {
      const description = screen.getByText(/Test/);
      expect(description).toBeInTheDocument();
    });
  });

  describe('When not given a description', () => {
    beforeEach(() => {
      render(Tooltip);
    });

    it('Should not render', () => {
      const tooltip = screen.queryByRole('tooltip');
      expect(tooltip).toBeNull();
    });
  });
});
