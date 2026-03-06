import { vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthGate } from './AuthGate';

const mockHashPassword = vi.hoisted(() => vi.fn());
vi.mock('../lib/hash-password', () => ({
  hashPassword: mockHashPassword,
}));

describe('AuthGate', () => {
  beforeEach(() => {
    sessionStorage.clear();
    mockHashPassword.mockReset();
  });

  it('shows error on invalid password', async () => {
    mockHashPassword.mockResolvedValue('invalid-hash');
    render(
      <AuthGate>
        <div>protected content</div>
      </AuthGate>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Your email password')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Your email password'), {
      target: { value: 'wrong-pass' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Enter' }));

    await waitFor(() => {
      expect(screen.getByText('Wrong password')).toBeInTheDocument();
    });
  });

  it('renders protected content on valid password', async () => {
    mockHashPassword.mockResolvedValue('631b94b7432ce4279bb1cef3bc8610aaedb2c361dfacaeb8d1b66d8666f6b7d2');
    render(
      <AuthGate>
        <div>protected content</div>
      </AuthGate>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Your email password')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Your email password'), {
      target: { value: 'correct-pass' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Enter' }));

    await waitFor(() => {
      expect(screen.getByText('protected content')).toBeInTheDocument();
    });
  });
});
