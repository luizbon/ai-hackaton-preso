# `verifyToken` — Design

## Purpose

Provide a small, hardened helper for verifying HS256-signed JWTs. The function returns the decoded payload on success and throws on any failure (invalid signature, expired token, disallowed algorithm, malformed input).

## Signature

```ts
export function verifyToken(token: string, secret: string): Record<string, unknown>
```

- `token`: the encoded JWT string.
- `secret`: the HMAC secret used to sign the token.
- Returns: the decoded payload as `Record<string, unknown>`.

## Behavior

1. Calls `jwt.verify(token, secret, { algorithms: ['HS256'] })` from `jsonwebtoken@9`.
2. On success, returns the decoded payload object.
3. On failure, re-throws the original `jsonwebtoken` error unchanged (e.g. `TokenExpiredError`, `JsonWebTokenError`, `NotBeforeError`). No wrapping, no swallowing.
4. If `jwt.verify` returns a `string` payload (token whose body is not a JSON object), throw `new JsonWebTokenError('payload must be an object')`.

### Why pin `algorithms: ['HS256']`

Without an explicit allow-list, `jsonwebtoken` will accept the algorithm declared in the token header. That allows two well-known attacks:

- `alg: none` — verification is skipped entirely.
- Algorithm confusion — an attacker substitutes a different algorithm (e.g. RS256→HS256) and forges a valid token using the public key as the HMAC secret.

Pinning the algorithm closes both.

## Module Layout

- `src/verifyToken.ts` — single named export `verifyToken`. No default export.

## Tests (`tests/verifyToken.test.ts`, vitest)

1. Valid HS256 token signed with the secret → returns decoded payload object.
2. Tampered signature → throws `JsonWebTokenError`.
3. Expired token (`exp` in the past) → throws `TokenExpiredError`.
4. Wrong secret → throws `JsonWebTokenError`.
5. Token signed with `alg: none` → throws (algorithm not allowed).
6. Token signed with HS512 (allowed alg list does not include it) → throws.
7. Malformed token string (e.g. `"not.a.jwt"`) → throws `JsonWebTokenError`.

## Out of Scope

- Issuer (`iss`) and audience (`aud`) validation.
- Clock-skew tolerance configuration.
- Async / Promise-returning variant.
- Custom error types or error wrapping.
- RS256 / asymmetric keys.
