import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthGate } from './AuthGate';

jest.mock('../lib/hash-password', () => ({
  hashPassword: jest.fn(),
}));

const { hashPassword } = jest.requireMock('../lib/hash-password') as {
  hashPassword: jest.Mock;
};

describe('AuthGate', () => {
  beforeEach(() => {
    sessionStorage.clear();
    hashPassword.mockReset();
  });

  it('shows error on invalid password', async () => {
    hashPassword.mockResolvedValue('invalid-hash');
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
    hashPassword.mockResolvedValue('631b94b7432ce4279bb1cef3bc8610aaedb2c361dfacaeb8d1b66d8666f6b7d2');
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
