import { render, screen, waitFor } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Menu } from '@/components/Layout/subcomponents';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('<Menu />', () => {
  describe('Regular use', () => {
    beforeEach(() => {
      render(Menu);
    });

    it('Should render', () => {
      const menu = screen.getByRole('list');
      expect(menu).toBeInTheDocument();
    });

    it('Should render a Theme dropdown', () => {
      const dropdown = screen.getByRole('combobox', { name: 'Theme' });
      expect(dropdown).toBeInTheDocument();
    });

    it('Should default theme to user\'s system preferred settings', () => {
      const dropdown = screen.getByRole('combobox', { name: 'Theme' });
      expect(dropdown).toHaveValue('system');
    });
  });

  describe('When setting the theme', () => {
    beforeEach(() => {
      render(Menu);
    });

    it('Should save the theme in localstorage', async () => {
      const dropdown = screen.getByRole('combobox', { name: 'Theme' });
      userEvent.selectOptions(dropdown, 'light');
      const savedTheme = window.localStorage.getItem('theme');
      waitFor(() => expect(savedTheme).toBe('light'));
    });
  });

  describe('When a theme has been set in a previous session', () => {
    beforeEach(() => {
      window.localStorage.setItem('theme', 'light');
      render(Menu);
    });

    afterEach(() => {
      window.localStorage.removeItem('theme');
    });

    it('Should persist theme between sessions', () => {
      const dropdown = screen.getByRole('combobox', { name: 'Theme' });
      expect(dropdown).toHaveValue('light');
    });
  });
});
