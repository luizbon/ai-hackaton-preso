# verifyToken Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a hardened `verifyToken(token, secret)` helper that returns the decoded payload of a valid HS256 JWT or throws the underlying `jsonwebtoken` error on any failure.

**Architecture:** Single-file, single-export TypeScript module wrapping `jsonwebtoken@9`'s `jwt.verify`. The wrapper pins `algorithms: ['HS256']` (rejecting `alg: none` and algorithm confusion) and narrows the return type to `Record<string, unknown>` by throwing on string payloads. Errors from `jsonwebtoken` are propagated unchanged.

**Tech Stack:** TypeScript 5.4 (ESM, strict mode), `jsonwebtoken@9`, vitest 1.4 (globals enabled).

**Spec:** `docs/superpowers/specs/2026-05-12-verify-token-design.md`

**File Structure:**
- Create: `src/verifyToken.ts` — single named export `verifyToken`.
- Create: `tests/verifyToken.test.ts` — all behavioral tests.

---

### Task 1: Happy path — valid HS256 token returns decoded payload

**Files:**
- Create: `src/verifyToken.ts`
- Test: `tests/verifyToken.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/verifyToken.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/verifyToken.test.ts`
Expected: FAIL with a module resolution error (e.g. `Failed to resolve import "../src/verifyToken.js"`).

- [ ] **Step 3: Write minimal implementation**

Create `src/verifyToken.ts`:

```ts
import jwt from 'jsonwebtoken';

export function verifyToken(token: string, secret: string): Record<string, unknown> {
  const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
  return decoded as Record<string, unknown>;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/verifyToken.test.ts`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/verifyToken.ts tests/verifyToken.test.ts
git commit -m "feat: verifyToken happy path with HS256"
```

---

### Task 2: Re-throw `jsonwebtoken` errors unchanged (tampered, expired, wrong secret, malformed)

These cases should already pass with the Task 1 implementation because `jwt.verify` throws and we don't catch. We are adding tests to **lock in** that behavior.

**Files:**
- Modify: `tests/verifyToken.test.ts`

- [ ] **Step 1: Add the failing tests**

Append inside the `describe('verifyToken', ...)` block in `tests/verifyToken.test.ts`:

```ts
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
```

- [ ] **Step 2: Run tests to verify all pass**

Run: `npm test -- tests/verifyToken.test.ts`
Expected: PASS (5 tests total). No implementation change needed — `jwt.verify` already throws these.

- [ ] **Step 3: Commit**

```bash
git add tests/verifyToken.test.ts
git commit -m "test: lock in error re-throwing for verifyToken"
```

---

### Task 3: Algorithm pinning — reject `alg: none` and non-HS256 algorithms

**Files:**
- Modify: `tests/verifyToken.test.ts`

- [ ] **Step 1: Add the failing tests**

Append inside the `describe('verifyToken', ...)` block:

```ts
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
```

- [ ] **Step 2: Run tests to verify all pass**

Run: `npm test -- tests/verifyToken.test.ts`
Expected: PASS (7 tests total). Both cases throw because `algorithms: ['HS256']` is pinned in the Task 1 implementation.

- [ ] **Step 3: Commit**

```bash
git add tests/verifyToken.test.ts
git commit -m "test: verify HS256 algorithm pinning rejects none and HS512"
```

---

### Task 4: Reject string payloads (non-JSON token body)

`jwt.verify` returns `string | JwtPayload`. If the token body is a raw string (e.g. signed from a string instead of an object), the return is a `string` and our `Record<string, unknown>` contract is broken. This task closes that gap.

**Files:**
- Modify: `tests/verifyToken.test.ts`
- Modify: `src/verifyToken.ts`

- [ ] **Step 1: Write the failing test**

Append inside the `describe('verifyToken', ...)` block:

```ts
  it('throws JsonWebTokenError when the payload is a string, not an object', () => {
    const token = jwt.sign('plain-string-payload', SECRET, { algorithm: 'HS256' });

    expect(() => verifyToken(token, SECRET)).toThrow(jwt.JsonWebTokenError);
    expect(() => verifyToken(token, SECRET)).toThrow(/payload must be an object/);
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/verifyToken.test.ts`
Expected: FAIL — the new test fails because the current implementation returns the string instead of throwing.

- [ ] **Step 3: Add the string-payload guard**

Replace the full contents of `src/verifyToken.ts` with:

```ts
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

export function verifyToken(token: string, secret: string): Record<string, unknown> {
  const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
  if (typeof decoded === 'string') {
    throw new JsonWebTokenError('payload must be an object');
  }
  return decoded as Record<string, unknown>;
}
```

- [ ] **Step 4: Run all tests to verify they pass**

Run: `npm test`
Expected: PASS (8 tests total).

- [ ] **Step 5: Verify the build is clean**

Run: `npm run build`
Expected: exits 0 with no TypeScript errors. `dist/verifyToken.js` and `dist/verifyToken.d.ts` are produced.

- [ ] **Step 6: Commit**

```bash
git add src/verifyToken.ts tests/verifyToken.test.ts
git commit -m "feat: reject string payloads in verifyToken"
```

---

## Done

After Task 4, the module satisfies every behavior in the spec:

- Valid HS256 token → returns decoded payload ✓ (Task 1)
- Tampered signature → `JsonWebTokenError` ✓ (Task 2)
- Expired token → `TokenExpiredError` ✓ (Task 2)
- Wrong secret → `JsonWebTokenError` ✓ (Task 2)
- Malformed token → `JsonWebTokenError` ✓ (Task 2)
- `alg: none` → throws ✓ (Task 3)
- HS512 token → throws ✓ (Task 3)
- String payload → `JsonWebTokenError('payload must be an object')` ✓ (Task 4)
