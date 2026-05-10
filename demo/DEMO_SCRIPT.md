# Demo Script — JWT Verifier

**Total time target:** 2:30. Hard cap: 3:00.

**Pre-stage checklist:**
- [ ] `cd preso/demo && npm install` already run
- [ ] Claude Code session open in `preso/demo/`
- [ ] Terminal font size bumped (cmd+ a few times)
- [ ] Slack/notifications muted
- [ ] Recording running (just in case)

---

## The narrative on stage

> "Same task a back-end dev gets every day: add a JWT verifier. Watch the gates."

## Step 1 — Spec gate (~20s)

In Claude Code, paste:

> Brainstorm a small spec: a function `verifyToken(token, secret)` that returns the decoded payload of a valid JWT, or throws on invalid/expired tokens. Keep it tiny.

Expected: Claude returns a 4–6 bullet spec. **Don't refine it for long.** Move on.

## Step 2 — Plan gate (~20s)

> Make a tiny TodoWrite plan to implement this with TDD.

Expected: Claude lists ~4 todos: write tests, implement, run, review.

## Step 3 — QA gate: tests first (~40s)

> Write the tests in `tests/verifyToken.test.ts` first. Cover: valid token returns payload, invalid signature throws, expired token throws.

Expected: Claude writes ~3 test cases. Run:

```bash
npm test
```

Tests **fail** (no implementation yet). Say out loud: *"Red. Good. That's the QA gate."*

## Step 4 — Implementation (~30s)

> Now implement `src/verifyToken.ts` to make the tests pass.

Expected: Claude writes the function. Run:

```bash
npm test
```

Tests **pass**. Say: *"Green. Tests pass. Are we done?"* (rhetorical pause)

## Step 5 — Review gate — THE PUNCHLINE (~45s)

> Run the code-reviewer agent on `src/verifyToken.ts`.

(Or: `> Use the code-reviewer agent to review src/verifyToken.ts for security issues.`)

**Expected catch (rehearsed scenarios — at least one MUST surface):**

- The implementation used `jwt.decode()` instead of `jwt.verify()`, **OR**
- The implementation didn't pass `secret` through, **OR**
- The implementation accepted `alg: none`, **OR**
- Some other security smell.

If the reviewer flags it: **stop, point at the screen, say:**

> "Tests passed. Skim-reading would have shipped this. The review gate caught it. THIS is what trust looks like."

If the reviewer doesn't catch anything (rare but possible): pivot to:

> "Even when the reviewer is happy, you've now got tests + types + an independent review. That's three gates, not zero. Trust at scale."

Then close the demo:

> "Same workflow teams have always used. One developer. A few minutes."

---

## Bail-out points (if running long)

- After Step 3 (tests fail, red): can skip implementation and jump straight to "imagine the rest — same loop, every gate."
- After Step 4 (tests pass, green): can skip the reviewer and tell the punchline narratively.
- Worst case: cut to fallback video.

## Common failure modes & fixes

| Failure | Fix |
|---|---|
| Claude rambles in spec/plan steps | Cut it off with "good enough, move on" |
| Tests don't fail meaningfully | Pre-stage rehearsal verifies they do |
| Reviewer is silent | Use the pivot script above |
| `npm install` needed live | DO NOT — must be pre-installed |
