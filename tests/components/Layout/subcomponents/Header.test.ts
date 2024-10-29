import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Header } from '@/components/Layout/subcomponents';

describe('<Header />', () => {
  const menuButtonClickHandler = vi.fn();

  beforeEach(() => {
    render(Header, {
      onMenuButtonClick: menuButtonClickHandler,
    });
  });

  it('Should render', () => {
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('Should render a title', () => {
    const title = screen.getByRole('heading', {
      level: 1,
      name: 'Music',
    });
    expect(title).toBeInTheDocument();
  });

  it('Should render a menu button', () => {
    const menuButton = screen.getByRole('button', { name: 'Menu' });
    expect(menuButton).toBeInTheDocument();
  });

  describe('When menu button is clicked', () => {
    it('Should call onMenuButtonClick callback function', async () => {
      const user = userEvent.setup();
      const menuButton = screen.getByRole('button', { name: 'Menu' });
      await user.click(menuButton);
      expect(menuButtonClickHandler).toHaveBeenCalledOnce();
    });
  });
});
