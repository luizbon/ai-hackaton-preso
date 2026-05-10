# AI Coding Workflows — Presentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 5–8 minute talk on "AI Workflows for Coding" with Reveal.js slides, a live JWT-verifier demo in Claude Code, and a recorded fallback — ready to deliver.

**Architecture:** Single repo with three concerns: `slides/` (Reveal.js HTML deck), `demo/` (Node/TypeScript repo used as the live demo target — starts mostly empty, gets populated on stage), `recording/` (pre-recorded fallback video and screenshots).

**Tech Stack:** Reveal.js 5.x for slides, Node 20+ / TypeScript / Vitest / `jsonwebtoken` for the demo, Claude Code as the live coding environment, screen-recording via macOS QuickTime or `cmd+shift+5`.

---

## File Structure

Files this plan creates/modifies:

```
preso/
├── README.md                                   # Repo overview + how to present
├── package.json                                # Root: dev server for slides
├── .gitignore
├── slides/
│   ├── index.html                              # Reveal.js entry, all slides inline
│   ├── styles.css                              # Custom theming
│   └── speaker-notes.md                        # Per-slide talking points & timing
├── demo/
│   ├── package.json                            # Demo project deps
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   ├── .env.example
│   ├── README.md                               # What this demo IS (for the audience to read post-talk)
│   ├── DEMO_SCRIPT.md                          # Memorized stage sequence
│   ├── src/                                    # EMPTY at demo start; filled live
│   │   └── .gitkeep
│   └── tests/                                  # EMPTY at demo start; filled live
│       └── .gitkeep
└── recording/
    └── README.md                               # Where the fallback video lives + how it was captured
```

The `demo/src` and `demo/tests` directories are intentionally empty in the committed state — the whole point of the demo is the audience watching them get populated.

---

## Phase 1: Repo Scaffolding

### Task 1: Initialize repo and root files

**Files:**
- Create: `.gitignore`
- Create: `README.md`
- Create: `package.json`

- [ ] **Step 1: Initialize git**

```bash
cd /Users/luizb/code/personal/ai-hackathon/preso
git init
git branch -M main
```

- [ ] **Step 2: Write `.gitignore`**

```
node_modules/
dist/
.DS_Store
*.log
.env
recording/*.mp4
recording/*.mov
```

- [ ] **Step 3: Write root `package.json`**

```json
{
  "name": "ai-coding-workflows-preso",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "slides": "npx serve slides -l 4321",
    "demo:install": "cd demo && npm install"
  },
  "devDependencies": {
    "serve": "^14.2.4"
  }
}
```

- [ ] **Step 4: Write `README.md`**

```markdown
# AI Coding Workflows — Talk

5–8 min talk + live demo on trust-via-verification-gates in AI-driven coding.

## Run the slides

\`\`\`bash
npm install
npm run slides
\`\`\`

Open http://localhost:4321.

## Run the demo project

\`\`\`bash
cd demo
npm install
npm test
\`\`\`

## Layout

- `slides/` — Reveal.js deck
- `demo/` — JWT verifier project used live on stage
- `recording/` — Pre-recorded fallback video (gitignored)
- `docs/superpowers/` — Spec + plan
```

- [ ] **Step 5: Install root deps**

```bash
npm install
```

Expected: `serve` installed, no errors.

- [ ] **Step 6: Commit**

```bash
git add .gitignore README.md package.json package-lock.json docs/
git commit -m "chore: initial repo scaffold with spec and plan"
```

---

## Phase 2: Demo Project Scaffold

The demo project's job: be ready for a live `npm test` and Claude Code session, with **empty `src/` and `tests/`** so the audience watches the workflow create them.

### Task 2: Demo project setup

**Files:**
- Create: `demo/package.json`
- Create: `demo/tsconfig.json`
- Create: `demo/vitest.config.ts`
- Create: `demo/.env.example`
- Create: `demo/src/.gitkeep`
- Create: `demo/tests/.gitkeep`

- [ ] **Step 1: Write `demo/package.json`**

```json
{
  "name": "jwt-verifier-demo",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "build": "tsc"
  },
  "dependencies": {
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "@types/jsonwebtoken": "^9.0.6",
    "@types/node": "^20.11.0",
    "typescript": "^5.4.0",
    "vitest": "^1.4.0"
  }
}
```

- [ ] **Step 2: Write `demo/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true
  },
  "include": ["src/**/*"]
}
```

- [ ] **Step 3: Write `demo/vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    globals: true,
  },
});
```

- [ ] **Step 4: Write `demo/.env.example`**

```
JWT_SECRET=replace-with-32-byte-random-string
```

- [ ] **Step 5: Write `.gitkeep` placeholders**

```bash
mkdir -p demo/src demo/tests
touch demo/src/.gitkeep demo/tests/.gitkeep
```

- [ ] **Step 6: Install demo deps**

```bash
cd demo && npm install && cd ..
```

Expected: clean install, no audit errors.

- [ ] **Step 7: Verify Vitest runs (no tests found is OK)**

```bash
cd demo && npx vitest run --reporter=basic; cd ..
```

Expected: "No test files found" — that's correct, the demo creates them live.

- [ ] **Step 8: Commit**

```bash
git add demo/
git commit -m "chore: scaffold demo project (empty src/tests)"
```

### Task 3: Write the demo README (for post-talk readers)

**Files:**
- Create: `demo/README.md`

- [ ] **Step 1: Write `demo/README.md`**

```markdown
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

\`\`\`bash
npm install
npm test
\`\`\`
```

- [ ] **Step 2: Commit**

```bash
git add demo/README.md
git commit -m "docs: explain the demo's punchline for post-talk readers"
```

---

## Phase 3: The Demo Script

The on-stage sequence. This file is the rehearsed choreography — what to type, what to expect, where the punchline lands.

### Task 4: Write `demo/DEMO_SCRIPT.md`

**Files:**
- Create: `demo/DEMO_SCRIPT.md`

- [ ] **Step 1: Write the demo script**

```markdown
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

\`\`\`bash
npm test
\`\`\`

Tests **fail** (no implementation yet). Say out loud: *"Red. Good. That's the QA gate."*

## Step 4 — Implementation (~30s)

> Now implement `src/verifyToken.ts` to make the tests pass.

Expected: Claude writes the function. Run:

\`\`\`bash
npm test
\`\`\`

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
```

- [ ] **Step 2: Commit**

```bash
git add demo/DEMO_SCRIPT.md
git commit -m "docs: add memorized demo script with bail-out points"
```

---

## Phase 4: Slide Deck

Build the Reveal.js deck. One slide per task, with full content inline so a future engineer (or future-you) can read this plan in any order and write the slide.

### Task 5: Reveal.js scaffold

**Files:**
- Create: `slides/index.html`
- Create: `slides/styles.css`

- [ ] **Step 1: Write `slides/index.html` skeleton**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>AI Workflows for Coding</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reset.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/theme/black.css" id="theme" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        <!-- Slides go here, added in subsequent tasks -->
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.js"></script>
    <script>
      Reveal.initialize({
        hash: true,
        transition: 'fade',
        controls: true,
        progress: true,
        center: true,
      });
    </script>
  </body>
</html>
```

- [ ] **Step 2: Write `slides/styles.css`**

```css
.reveal {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
.reveal h1, .reveal h2, .reveal h3 {
  text-transform: none;
  letter-spacing: -0.02em;
}
.reveal .compression-table {
  width: 90%;
  margin: 1em auto;
  font-size: 0.7em;
  border-collapse: collapse;
}
.reveal .compression-table th,
.reveal .compression-table td {
  padding: 0.4em 0.8em;
  border-bottom: 1px solid #444;
  text-align: left;
}
.reveal .compression-table th {
  background: #1a1a1a;
}
.reveal .compression-table tr.divider td {
  border-bottom: 2px solid #ffd166;
}
.reveal .takeaway {
  margin-top: 0.8em;
  font-size: 0.7em;
  color: #ffd166;
  font-style: italic;
}
.reveal .gate-list li {
  margin: 0.3em 0;
}
.reveal .strike {
  text-decoration: line-through;
  opacity: 0.6;
}
.reveal .accent {
  color: #ffd166;
}
```

- [ ] **Step 3: Verify slides server starts**

```bash
npm run slides
```

Expected: server on http://localhost:4321 — page is mostly empty for now (no slides yet). Stop with `Ctrl+C`.

- [ ] **Step 4: Commit**

```bash
git add slides/index.html slides/styles.css
git commit -m "feat: reveal.js scaffold + base styling"
```

### Task 6: Slide 1 — Title

**Files:**
- Modify: `slides/index.html` (insert inside `<div class="slides">`)

- [ ] **Step 1: Add the title slide**

Insert as the FIRST slide inside `<div class="slides">`:

```html
<section data-transition="fade">
  <h1 style="font-size: 2.2em;">AI Workflows for Coding</h1>
  <h3 class="accent" style="margin-top: 0.5em;">How to trust code you didn't write</h3>
  <p style="margin-top: 2em; opacity: 0.6;">Luiz Bon · 2026</p>
</section>
```

- [ ] **Step 2: Open in browser, confirm rendering**

Run `npm run slides`, open http://localhost:4321, verify title slide. Stop server.

- [ ] **Step 3: Commit**

```bash
git add slides/index.html
git commit -m "feat: slide 1 - title"
```

### Task 7: Slide 2 — Hook

- [ ] **Step 1: Append after slide 1**

```html
<section>
  <h2 style="font-size: 1.8em;">Coding is changing.</h2>
  <p class="fragment" style="margin-top: 1em;">
    The hard part isn't <span class="strike">writing</span> code anymore.
  </p>
  <p class="fragment accent" style="margin-top: 0.4em;">
    It's <strong>trusting</strong> code you didn't write.
  </p>
</section>
```

- [ ] **Step 2: Verify in browser** (server, refresh, check fragments reveal in order)

- [ ] **Step 3: Commit**

```bash
git add slides/index.html
git commit -m "feat: slide 2 - hook"
```

### Task 8: Slide 3 — How teams have always trusted code

- [ ] **Step 1: Append**

```html
<section>
  <h3>How teams have always trusted code</h3>
  <ol class="gate-list" style="margin-top: 1em;">
    <li>Planning</li>
    <li>Story refinement</li>
    <li>Spec</li>
    <li>Implementation</li>
    <li>QA</li>
    <li>Code review</li>
    <li>Merge &amp; deploy</li>
  </ol>
  <p class="takeaway">Each handoff is a <strong>trust gate</strong>.</p>
</section>
```

- [ ] **Step 2: Verify, commit**

```bash
git add slides/index.html
git commit -m "feat: slide 3 - traditional SDLC gates"
```

### Task 9: Slide 4 — The Compression (centerpiece)

- [ ] **Step 1: Append**

```html
<section>
  <h3>The compression</h3>
  <table class="compression-table">
    <thead>
      <tr>
        <th>Traditional · days/weeks</th>
        <th>AI workflow · minutes</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>PM writes ticket</td><td>Brainstorm spec with AI</td></tr>
      <tr><td>Refinement meeting</td><td>Planner agent breaks it down</td></tr>
      <tr><td>Dev implements</td><td>TDD: tests first, AI implements</td></tr>
      <tr><td>QA tests it</td><td>Tests run automatically</td></tr>
      <tr><td>Peer code review</td><td>Code-reviewer agent</td></tr>
      <tr class="divider"><td>Deploy</td><td>Deploy</td></tr>
    </tbody>
  </table>
  <p class="takeaway">The gates didn't disappear. They got compressed.</p>
</section>
```

- [ ] **Step 2: Verify, commit**

```bash
git add slides/index.html
git commit -m "feat: slide 4 - compression table (centerpiece)"
```

### Task 10: Slide 5 — The trust problem

- [ ] **Step 1: Append**

```html
<section>
  <h3>What most devs do</h3>
  <p style="font-size: 1.4em; margin-top: 1em;">
    AI writes it &nbsp;→&nbsp; <span class="accent">I skim it</span> &nbsp;→&nbsp; Ship it
  </p>
  <p class="fragment takeaway" style="margin-top: 1.5em;">
    Every gate skipped. No wonder it feels untrustworthy.
  </p>
</section>
```

- [ ] **Step 2: Verify, commit**

```bash
git add slides/index.html
git commit -m "feat: slide 5 - the trust problem"
```

### Task 11: Slide 6 — The fix

- [ ] **Step 1: Append**

```html
<section>
  <h3>The fix</h3>
  <p style="font-size: 1.3em; margin-top: 0.5em;">
    Rebuild the gates <span class="accent">inside your loop</span>.
  </p>
  <ol class="gate-list" style="margin-top: 1.2em; font-size: 0.9em;">
    <li class="fragment">Spec</li>
    <li class="fragment">Plan</li>
    <li class="fragment">TDD</li>
    <li class="fragment">Implement</li>
    <li class="fragment">Review</li>
  </ol>
</section>
```

- [ ] **Step 2: Verify, commit**

```bash
git add slides/index.html
git commit -m "feat: slide 6 - the fix"
```

### Task 12: Slide 7 — Demo title card

- [ ] **Step 1: Append**

```html
<section data-background-color="#1a1a1a">
  <h2 class="accent">Demo</h2>
  <p style="font-size: 1.2em; margin-top: 0.5em;">
    One developer. All the gates.
  </p>
  <p style="margin-top: 2em; opacity: 0.5; font-size: 0.6em;">
    Switching to Claude Code →
  </p>
</section>
```

- [ ] **Step 2: Verify, commit**

```bash
git add slides/index.html
git commit -m "feat: slide 7 - demo title card"
```

### Task 13: Slide 8 — Closing

- [ ] **Step 1: Append**

```html
<section>
  <h2 style="font-size: 1.5em;">
    You don't trust AI code <br/>by reading it.
  </h2>
  <p class="fragment accent" style="font-size: 1.2em; margin-top: 1em;">
    You trust it through a workflow <br/>that verifies it for you.
  </p>
</section>
```

- [ ] **Step 2: Verify, commit**

```bash
git add slides/index.html
git commit -m "feat: slide 8 - closing"
```

### Task 14: Slide 9 — Thanks / questions

- [ ] **Step 1: Append**

```html
<section>
  <h2>Thanks.</h2>
  <p style="margin-top: 1em;">Questions?</p>
  <p style="margin-top: 2em; opacity: 0.6; font-size: 0.7em;">
    Luiz Bon · luiz.bon@gmail.com
  </p>
</section>
```

- [ ] **Step 2: Verify, commit**

```bash
git add slides/index.html
git commit -m "feat: slide 9 - thanks"
```

---

## Phase 5: Speaker Notes

### Task 15: Per-slide speaker notes with timing

**Files:**
- Create: `slides/speaker-notes.md`

- [ ] **Step 1: Write speaker notes**

```markdown
# Speaker Notes — AI Workflows for Coding

**Total target: 6:30. Hard cap: 8:00.**

| # | Slide | Time | Talking points |
|---|---|---|---|
| 1 | Title | 0:15 | Greet, name + topic. Don't linger. |
| 2 | Hook | 0:30 | "Coding is changing. The hard part isn't writing code — it's trusting code you didn't write." Pause. |
| 3 | Traditional SDLC | 0:45 | Walk the list. "Each of these is a TRUST GATE — a different person/role verifying before work moves on." |
| 4 | Compression (centerpiece) | 1:30 | THE slide. Walk row by row. Land the takeaway: "The gates didn't disappear — they got compressed and partially automated." |
| 5 | Trust problem | 0:30 | "Most devs jumped here. AI writes, I skim, ship. That removes EVERY gate at once." |
| 6 | The fix | 0:30 | "Reading harder doesn't scale. Rebuild the gates inside your loop." Read the 5 items. |
| 7 | Demo title | 0:10 | Short pivot. "Let me show you." Switch to Claude Code. |
| — | **DEMO** | 2:30 | See `demo/DEMO_SCRIPT.md` |
| 8 | Closing | 0:30 | Read both lines slowly. Pause between them. |
| 9 | Thanks | 0:20 | Open Q&A. |

## Cuts (if running long)

- Slide 5 → 0:15 (just one line)
- Slide 6 → 0:15 (drop the staged reveals)
- Demo bail-out — see DEMO_SCRIPT.md

## Boosts (if running short)

- Slide 4: add an aside on parallel agents = parallel gates
- Q&A — encourage "what gate do you skip the most?"

## Pre-talk checklist

- [ ] `npm run slides` running on http://localhost:4321
- [ ] Browser at slide 1, full-screen
- [ ] Claude Code open in `preso/demo/` on a second window/desktop
- [ ] `cmd+tab` rehearsed
- [ ] Notifications off
- [ ] Water nearby
- [ ] Fallback recording paused at 0:00
```

- [ ] **Step 2: Commit**

```bash
git add slides/speaker-notes.md
git commit -m "docs: speaker notes with timing and cuts"
```

---

## Phase 6: Fallback Recording

### Task 16: Capture fallback video

**Files:**
- Create: `recording/README.md`

- [ ] **Step 1: Rehearse the demo end-to-end** (in private), at least twice. Confirm:
  - The reviewer agent surfaces a real security issue.
  - End-to-end runs in 2:00–2:45.
  - Tests fail then pass at the right moments.

- [ ] **Step 2: Record the demo**

Use `cmd+shift+5` → "Record Selected Portion" around the Claude Code window. Save as `recording/fallback.mov`.

- [ ] **Step 3: Trim the video** in QuickTime (`cmd+T`) so it starts at the spec step and ends right after the reviewer's catch + 1 sentence of narration.

- [ ] **Step 4: Write `recording/README.md`**

```markdown
# Fallback Recording

`fallback.mov` (gitignored — too big for git) is the pre-recorded demo to play if the live demo fails.

## How it was captured

- macOS `cmd+shift+5` → Record Selected Portion
- Trimmed in QuickTime
- ~2:30 length
- Audio: none (narrate over it live)

## How to use

1. Have it open in QuickTime, paused at frame 1.
2. If live demo dies after step 3+ — switch to it, hit play, narrate.
3. After it finishes, click back to slide 8 and close the talk normally.
```

- [ ] **Step 5: Commit (note: video is gitignored)**

```bash
git add recording/README.md
git commit -m "docs: fallback recording README (video gitignored)"
```

---

## Phase 7: Rehearsal & Final Checks

### Task 17: End-to-end timed rehearsal

- [ ] **Step 1: Full timed run** — slides + live demo, with a stopwatch.

Target: 6:00–7:00. Hard cap: 8:00.

- [ ] **Step 2: If over 8:00** — apply cuts from `slides/speaker-notes.md` and `demo/DEMO_SCRIPT.md`. Re-time.

- [ ] **Step 3: If under 5:00** — slow down on slide 4 and the demo punchline. Add the parallel-agents aside on slide 4.

- [ ] **Step 4: Verify pre-talk checklist** in `slides/speaker-notes.md` works mechanically.

- [ ] **Step 5: Commit any tweaks**

```bash
git add -u
git commit -m "chore: post-rehearsal timing tweaks"
```

### Task 18: Tag the ready-to-deliver state

- [ ] **Step 1: Tag**

```bash
git tag -a v1.0-ready -m "Talk ready to deliver"
```

- [ ] **Step 2: Final smoke test**

```bash
npm run slides   # confirm slides serve
cd demo && npm test 2>&1 | head; cd ..   # confirm vitest available, "no tests" is correct
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ Hook + industry framing → slides 1–3 (Tasks 6–8)
- ✅ Compression centerpiece → slide 4 (Task 9)
- ✅ Trust problem → slide 5 (Task 10)
- ✅ Live demo with all gates + reviewer punchline → Tasks 4 + 16, demo project Tasks 2–3
- ✅ Closing tied to compression metaphor → slide 8 (Task 13)
- ✅ Stage-safety: pre-built repo, fallback recording, bail-out points → Tasks 4 + 16
- ✅ Time fits 5–8 min → Task 17 enforces with timed rehearsal
- ✅ Tooling: Reveal.js (Q1=A) + JWT verifier (Q2=D) → Tasks 5–14 (slides), Tasks 2–4 (demo)

**Risks from spec mapped to plan:**
- ✅ Live demo fails → fallback recording (Task 16)
- ✅ Demo runs long → bail-out points (Task 4)
- ✅ Audience mismatch → SDLC analogy lands for any depth (Task 9)
- ✅ Time overrun → cuts & boosts (Task 15) + rehearsal (Task 17)
