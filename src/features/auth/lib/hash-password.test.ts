/** @vitest-environment node */
import { hashPassword } from './hash-password';

describe('hashPassword', () => {
  it('returns deterministic sha256 hash for same input', async () => {
    const first = await hashPassword('secret');
    const second = await hashPassword('secret');
    expect(first).toHaveLength(64);
    expect(first).toBe(second);
  });

  it('returns different hashes for different inputs', async () => {
    const first = await hashPassword('secret');
    const second = await hashPassword('wrong-secret');
    expect(first).not.toBe(second);
  });
});
