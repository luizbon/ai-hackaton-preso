import { describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../src/verifyToken.js';

const SECRET = 'test-secret';

describe('verifyToken', () => {
  it('returns the decoded payload for a valid HS256 token', () => {
    const token = jwt.sign({ sub: 'user-1', role: 'admin' }, SECRET, {
      algorithm: 'HS256',
    });

    const payload = verifyToken(token, SECRET);

    expect(payload).toMatchObject({ sub: 'user-1', role: 'admin' });
  });
});
