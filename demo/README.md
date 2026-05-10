# JWT Verifier Demo

This is the project used during the "AI Workflows for Coding" talk.

## The point

We added a `verifyToken` function using a workflow with verification gates:

1. **Spec** — what the function should do
2. **Plan** — break into steps
3. **TDD** — tests written first
4. **Implementation** — Claude writes the code
5. **Review** — code-reviewer agent inspects the result

The reviewer caught a classic JWT mistake: the implementation **decoded** the token without **verifying** the signature. Tests passed. Skim-reading would have shipped it. The gate caught it.

## Run

```bash
npm install
npm test
```
