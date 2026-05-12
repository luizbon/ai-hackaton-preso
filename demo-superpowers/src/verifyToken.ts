import jwt, { JsonWebTokenError } from 'jsonwebtoken';

export function verifyToken(token: string, secret: string): Record<string, unknown> {
  const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
  if (typeof decoded === 'string') {
    throw new JsonWebTokenError('payload must be an object');
  }
  return decoded as Record<string, unknown>;
}
