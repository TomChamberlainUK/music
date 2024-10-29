import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Layout from '@/components/Layout';

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

describe('<Layout />', () => {
  beforeEach(() => {
    render(Layout);
  });

  it('Should render', () => {
    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();
  });

  it('Should render a header', () => {
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('Should render a menu', () => {
    const menu = screen.getByRole('list');
    expect(menu).toBeInTheDocument();
  });
});
