import { getTheme } from '@/components/Layout/subcomponents/Menu/utils';
import { describe, expect, it, vi } from 'vitest';

describe('getTheme', () => {
  it('Should default to "system"', () => {
    const theme = getTheme();
    expect(theme).toBe('system');
  });

  it('Should attempt to get a theme from localStorage', () => {
    const mockedLocalStorageGetItem = vi.spyOn(
      Object.getPrototypeOf(window.localStorage),
      'getItem',
    );
    getTheme();
    expect(mockedLocalStorageGetItem).toHaveBeenCalledWith('theme');
  });

  describe('When dark theme is set in localStorage', () => {
    it('Should return dark theme', () => {
      const test = vi.spyOn(
        Object.getPrototypeOf(window.localStorage),
        'getItem',
      );
      test.mockImplementationOnce(() => 'dark');
      const theme = getTheme();
      expect(theme).toBe('dark');
    });
  });

  describe('When light theme is set in localStorage', () => {
    it('Should return light theme', () => {
      const test = vi.spyOn(
        Object.getPrototypeOf(window.localStorage),
        'getItem',
      );
      test.mockImplementationOnce(() => 'light');
      const theme = getTheme();
      expect(theme).toBe('light');
    });
  });
});
