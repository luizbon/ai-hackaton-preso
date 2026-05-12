# Speaker Notes — AI Workflows for Coding

**Total target: 7:55. Hard cap: 8:00.** (Tight — see Cuts.)

| # | Slide | Time | Talking points |
|---|---|---|---|
| 1 | Title | 0:10 | Greet, name + topic. Don't linger. |
| 2 | Hook | 0:30 | "Coding is changing. The hard part isn't writing code — it's trusting code you didn't write." Pause. |
| 3 | Traditional SDLC | 0:25 | Walk the list. "Each of these is a TRUST GATE — a different person/role verifying before work moves on." |
| 4 | Compression (centerpiece) | 1:20 | THE slide. Walk row by row. Land the takeaway: "The gates didn't disappear — they got compressed and partially automated." |
| 5 | Trust problem | 0:10 | One line: "Most devs jumped here — AI writes, I skim, ship. Every gate skipped." |
| 6 | The fix | 0:20 | "Reading harder doesn't scale. Rebuild the gates inside your loop." Read the 5 items. |
| 7 | Demo title | 0:10 | Short pivot. "Let me show you." Switch to Claude Code. |
| — | **DEMO I** (live, `demo/`) | 2:30 | See `demo/DEMO_SCRIPT.md`. Manual prompts per gate. Punchline = code-reviewer catches the JWT bug. |
| 8 | Bake the gates in | 0:25 | "Each step is an auto-triggering skill — `brainstorming`, `writing-plans`, `test-driven-development`, `subagent-driven-development`, plus the `code-reviewer` agent. They fire without being asked." Point at github.com/obra/superpowers. **Transition:** "Here's what that looks like in a real session." |
| 9 | Proof I — first prompt | 0:20 | "Same task, but watch the second line — `Skill(superpowers:brainstorming)` loaded automatically. No slash command. The skill detected the intent." |
| 10 | Proof II — clarifying Q | 0:15 | "Before any code, `brainstorming` asks one question with three ranked options — Minimal, Hardened, Full. The planning phase closes the gap. No assumptions become silent bugs." |
| 11 | Proof III — per-task loop | 0:20 | "For each task, Claude dispatched three subagents: an implementer, a spec compliance reviewer, and the code-reviewer agent. Parallel gates. Zero steering from me." |
| 12 | Proof IV — done | 0:20 | "Final whole-feature review. Eight tests, all passing. `finishing-a-development-branch` skill closed the work for me — git status, branch comparison. Four commits, zero gate prompts." |
| 13 | Closing | 0:20 | Read both lines slowly. Pause between them. |
| 14 | Thanks | 0:15 | Open Q&A. |

**Sum:** 7:50 talking + ~0:05 transitions ≈ **7:55**. Buffer to hard cap = 5s.

## Cuts (in priority order if running long)

1. **Slide 11 (Proof III — per-task loop)** → drop entirely (-0:20). Slides 9, 10, 12 still tell the arc: skill auto-fires, gap closed, done with 8/8.
2. **Slide 6 (The fix)** → 0:10, just read the 5 items, drop staged reveals (-0:10).
3. **Slide 4 (Compression)** → 1:10, drop one row of voiceover (-0:10).
4. **Demo I bail-out** at Step 4 (skip reviewer punchline, narrate it) — see DEMO_SCRIPT.md (-0:20).
5. Worst case: cut Demo I to fallback video, or drop slides 9-12 entirely (return to 6:30 deck).

**Do not cut slide 10 (clarifying Q) — it's the planning-phase proof.**

## Boosts (if running short)

- Slide 4: add an aside on parallel agents = parallel gates.
- Slide 11: zoom on the three subagent banners and call out token counts (~22-38k per subagent).
- Q&A — encourage "what gate do you skip the most?"

## Pre-talk checklist

- [ ] `npm run slides` running on http://localhost:4321
- [ ] Browser at slide 1, full-screen
- [ ] Claude Code open in `preso/demo/` on a second window/desktop (for Demo I)
- [ ] `cmd+tab` rehearsed
- [ ] Slides 9-12 screenshots render (test at http://localhost:4321/#/8 then arrow-right 4×)
- [ ] Notifications off
- [ ] Water nearby
- [ ] Fallback recording paused at 0:00

## Why no live superpowers demo?

The full superpowers run (brainstorming → clarifying Q → plan → 4 TDD subagent tasks → finishing) takes ~10–15 min end-to-end. Screenshots from a rehearsed run preserve the punchlines (skills firing by name, clarifying question asked, subagents dispatched, 8/8 green) without burning the time budget. The audience still SEES the auto-fire — that's what the screenshots are for.
