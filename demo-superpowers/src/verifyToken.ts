import jwt from 'jsonwebtoken';

export function verifyToken(token: string, secret: string): Record<string, unknown> {
  const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
  return decoded as Record<string, unknown>;
}
