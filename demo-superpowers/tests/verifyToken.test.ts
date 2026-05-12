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

  it('throws JsonWebTokenError when the signature is tampered', () => {
    const token = jwt.sign({ sub: 'user-1' }, SECRET, { algorithm: 'HS256' });
    const tampered = token.slice(0, -1) + (token.endsWith('A') ? 'B' : 'A');

    expect(() => verifyToken(tampered, SECRET)).toThrow(jwt.JsonWebTokenError);
  });

  it('throws TokenExpiredError when the token is expired', () => {
    const token = jwt.sign({ sub: 'user-1' }, SECRET, {
      algorithm: 'HS256',
      expiresIn: '-1s',
    });

    expect(() => verifyToken(token, SECRET)).toThrow(jwt.TokenExpiredError);
  });

  it('throws JsonWebTokenError when the secret is wrong', () => {
    const token = jwt.sign({ sub: 'user-1' }, SECRET, { algorithm: 'HS256' });

    expect(() => verifyToken(token, 'wrong-secret')).toThrow(jwt.JsonWebTokenError);
  });

  it('throws JsonWebTokenError when the token is malformed', () => {
    expect(() => verifyToken('not.a.jwt', SECRET)).toThrow(jwt.JsonWebTokenError);
  });

  it('throws when the token is signed with alg: none', () => {
    // jwt.sign with algorithm 'none' requires passing null as secret.
    const token = jwt.sign({ sub: 'user-1' }, null as unknown as string, {
      algorithm: 'none',
    });

    expect(() => verifyToken(token, SECRET)).toThrow(jwt.JsonWebTokenError);
  });

  it('throws when the token is signed with HS512 (not in allow-list)', () => {
    const token = jwt.sign({ sub: 'user-1' }, SECRET, { algorithm: 'HS512' });

    expect(() => verifyToken(token, SECRET)).toThrow(jwt.JsonWebTokenError);
  });
});
