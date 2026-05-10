# AI Coding Workflows — Presentation Design

**Date:** 2026-05-10
**Author:** Luiz Bon
**Duration:** 5–8 minutes (target: ~6.5 min)
**Audience:** Software engineers and AI enthusiasts (mixed depth)

## Goal

Convince the audience that:

1. Coding is changing — the developer's role is shifting from *writer* to *architect/verifier*.
2. The way to **trust** AI-built code is not to read every line, but to **rebuild the traditional SDLC gates inside the AI loop**.

The single sentence the audience should remember:

> *"You don't trust AI code by reading it. You trust it through a workflow that verifies it for you."*

## Framing

**Industry-level framing**, not a personal story or before/after vibe-code drama.

The narrative spine is **The Compression**: the traditional SDLC (planning → refinement → implementation → QA → code review → deploy) used to take days or weeks and rely on multiple humans. AI compresses that pipeline into a single developer's loop — but the gates haven't disappeared. They got compressed and partially automated. Trust comes from keeping the gates in place, not from reading harder.

## Structure (~6.5 min)

### 1. Hook + Industry framing (1 min)

- Open: *"Coding is changing. The hard part is no longer writing code — it's trusting code you didn't write."*
- Set up the SDLC reference point: planning → story refinement → spec → implementation → QA → code review → merge → deploy.
- Each handoff was a **trust gate** — a different person/role verifying before work moved on. That's how teams have always scaled trust.
- Cliffhanger: that pipeline used to take days/weeks. AI just compressed it into minutes.

### 2. The Compression — visual centerpiece (1.5 min)

The slide that anchors the talk. Two pipelines side-by-side:

| Traditional (days/weeks) | AI workflow (minutes) |
|---|---|
| PM writes ticket | Brainstorm spec with AI |
| Refinement meeting | Planner agent breaks it down |
| Dev implements | TDD: tests first, AI implements |
| QA tests it | Tests run automatically |
| Peer code review | Code-reviewer agent |
| Deploy | Deploy |

**Key insight delivered out loud:** *The gates didn't disappear. They got compressed and partially automated. Skip a gate, lose trust.*

### 3. The Trust Problem (45s)

- Most devs jumped straight to "AI writes code → I skim it → ship it." That removes every gate at once.
- Reading harder doesn't scale. The fix is to **rebuild the gates inside your AI loop**, not to inspect output line-by-line.
- Each gate is a chance to catch the AI being wrong — and AI *will* be wrong.

### 4. Live demo (2–3 min)

**Format:** pre-built scenario in Claude Code. The repo, the task, and the agents are prepared in advance for stage safety, but the workflow demonstrated is the real one Luiz uses daily.

**Demo flow** (showing each gate from the table):

1. **Spec gate** — show a short brainstorm/spec for the task.
2. **Plan gate** — planner agent (or TodoWrite) breaks the work into steps.
3. **QA gate (TDD)** — tests written *first*, before any implementation.
4. **Implementation** — Claude writes the code to make the tests pass.
5. **Review gate** — code-reviewer agent runs and **flags something real** (a bug, a security issue, a smell). This is the punchline of the demo: a gate catching what a skim-read would have missed.

**Stage safety:**

- Pre-built repo with the task already scoped.
- All agents/skills pre-configured.
- Pre-recorded fallback ready in case live execution fails.
- Demo timed to ~2.5 min in rehearsal; bail-out point identified after the review-agent step if running long.

### 5. Close (30s)

Restate the takeaway tied back to the compression metaphor:

> *"You don't trust AI code by reading it. You trust it the same way teams have always trusted code — through gates. AI just lets one developer run all of them in minutes."*

Optional one-line CTA: *"Audit your own loop. Which gates did you skip?"*

## Tooling

- **Claude Code (CLI)** as the live environment.
- **Superpowers / agents / skills** already configured in Luiz's setup: planner, tdd-guide, code-reviewer at minimum.
- Slide deck format: TBD in the implementation plan (likely HTML-based slides given the `frontend-slides` skill is available, but format choice is deferred).

## Success Criteria

- Talk fits inside 8 minutes with comfortable pacing (target 6.5).
- The "compression" slide is visually clear and self-explanatory even without narration.
- The demo's review-agent step catches something real and visible to the audience.
- At least one audience member can repeat the takeaway sentence afterward.

## Out of Scope

- Deep dive into specific agents, MCP servers, or skill internals.
- Comparison of Claude Code vs. Cursor / Copilot / other tools.
- Prompt engineering tactics.
- Cost / pricing / model-selection discussion.
- Teaching the audience to set up their own Claude Code workflow — this is a *why*, not a *how-to*.

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Live demo fails on stage | Pre-recorded video fallback ready; presenter can narrate over it. |
| Demo runs long | Pre-defined bail-out points after each gate; review-agent step is the must-show moment. |
| Audience too senior — content feels obvious | Lean harder on the "compression" framing; experienced devs find the SDLC analogy fresh even if the workflow isn't. |
| Audience too junior — workflow feels abstract | The demo grounds it; the SDLC table makes each gate concrete. |
| Time overrun | Section 2 (compression) and section 4 (demo) are protected. Section 1 and 3 can each be cut by ~20s if needed. |

## Open Questions for Implementation Plan

- Slide deck technology choice (HTML/Reveal.js vs. Keynote vs. other).
- Specific demo task to use in the pre-built repo.
- Whether to record the fallback demo video before or after the slide deck is built.
