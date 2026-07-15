# Next Recommended Action Highlight (4-Step Path)

**Date:** 2026-07-15  
**Status:** Approved (Approach 1 — shared `NextActionButton`)  
**Scope:** Steps 1–4 earning path pages (`/search`, `/analysis`, `/radar`, `/replies`)

## Goal

Make the user’s **next recommended action** obvious on each step page via a **subtle** visual treatment (accent ring/glow + “Next” label) on that page’s primary forward CTA — without sticky banners, nav spotlights, or redesigning the flow.

## Non-goals

- `/onboarding` signup wizard (preparing / beta / qualification)
- Sticky “Next: …” banners or coach marks / spotlights
- Sidebar or mobile-nav highlighting beyond what already exists
- Tracking or persisting `completedSteps` (dashboard `StartHereSection` progress wiring stays out of scope)
- Changing step order, copy of page titles, or dopamine celebrations
- Strong pulse / oversized sticky CTAs

## Decisions (locked)

| Decision | Choice |
|----------|--------|
| Surface | 4-step earning path only |
| Mechanism | Emphasize each page’s primary CTA |
| Intensity | Subtle: accent ring/glow + “Next” label |
| Implementation | Shared `NextActionButton` wrapper |

## Approach

Add a reusable `NextActionButton` that wraps (or renders as) the existing primary button styles (`btn-primary` where already used) and adds:

1. A compact **Next** badge/label adjacent to or above the control  
2. A subtle **accent ring** and soft gold glow (reuse `--shadow-gold` / accent border tokens — no new brand colors)

Disabled state: keep current disabled styling; ring/glow muted; “Next” label still visible so the recommended action remains identifiable even when blocked (e.g. no ads selected).

## Architecture

```
src/components/ui/NextActionButton.tsx
  └── wraps children / button props + Next badge + ring/glow classes

Page wiring:
  /search   → primary search submit
  /analysis → single footer “Step 3: Find Ads” (remove duplicate header CTA)
  /radar    → footer “Step 4: Create Replies”
  /replies  → empty-state “Go to Step 3”; else per-card “Create Replies” when that card has no replies yet
```

No new context or progress store. Highlighting is **presentational** and **page-local**.

## Per-page next action

| Page | Next action control | Notes |
|------|---------------------|--------|
| Step 1 `/search` | “Find Ad Ideas” (or current primary submit) | Already `btn-primary` + `shadow-gold`; wrap with `NextActionButton` for consistent badge + ring |
| Step 2 `/analysis` | Footer “Go to Step 3: Find Ads” | **Remove** the duplicate header “Step 3: Find Ads” button; keep Selected count in the header (same pattern as Radar after Create Replies move) |
| Step 3 `/radar` | Footer “Step 4: Create Replies” | Already bottom-placed; wrap with `NextActionButton` |
| Step 4 `/replies` (no selected ads) | Empty-state “Go to Step 3: Find Ads” | Highlight that CTA |
| Step 4 `/replies` (has ads) | Each card’s **Create Replies** when `replies.length === 0` | Do **not** highlight Copy / Regenerate / Go to Post — next action is generate first. Once a card has replies, that card’s Create control is no longer wrapped |

## Component API

```tsx
<NextActionButton
  onClick={...}
  disabled={...}
  className="..." // merges with base + highlight styles
>
  {/* existing label + icon, e.g. Step 4: Create Replies + ArrowRight */}
</NextActionButton>
```

- Renders a `<button>` (same default as current CTAs).  
- Visually: existing `btn-primary` look + outer accent ring (`ring-1` / `ring-accent/40`) + soft glow + a small “Next” chip (uppercase, accent, ~10px tracking) so the control reads as recommended without shouting.  
- Accessible name: do not rely on the chip alone; keep the full action text in the button. Optional `aria-describedby` pointing at a visually associated “Next recommended action” text if needed for screen readers.

## Visual spec

- **Badge:** `Next` — `text-[10px] font-bold uppercase tracking-widest text-accent`  
- **Ring:** `ring-1 ring-accent/40` (or equivalent border) on the button  
- **Glow:** existing `shadow-gold` or `0 0 20px rgba(234, 179, 8, 0.15)`  
- **No** continuous strong pulse animation  
- Layout (one pattern everywhere): a leading **Next** chip inside the button, left of the existing label/icon row (not a separate floating label above). Full-width and compact footer buttons share this layout.

## Error / edge cases

- **CTA disabled:** Highlight remains but muted (lower opacity ring/glow); click still blocked.  
- **Analysis with no keyword / gate screens:** Existing “Go to Step 1” empty gates stay as normal `btn-primary` — not wrapped (user’s next action is recovery, not forward path). Same for Radar/Replies gate screens that send users back to an earlier step **except** Replies empty “Go to Step 3”, which *is* the recommended recovery and **is** wrapped.  
- **Duplicate CTAs:** Analysis must have exactly one forward next-action control after the change.

## Verification

1. Search: primary submit shows Next badge + ring.  
2. Analysis: one forward CTA at bottom with highlight; header has title + selected only.  
3. Radar: bottom Create Replies has highlight; disabled when selection empty.  
4. Replies empty: Go to Step 3 highlighted.  
5. Replies with ads: Create Replies highlighted only on cards without replies; after generate, highlight gone on that card.  
6. No sticky banner; sidebar unchanged; `/onboarding` unchanged.

## File touch list

| File | Change |
|------|--------|
| `src/components/ui/NextActionButton.tsx` | New shared wrapper |
| `src/app/search/page.tsx` | Wrap primary submit |
| `src/app/analysis/page.tsx` | Remove header forward CTA; wrap footer CTA |
| `src/app/radar/page.tsx` | Wrap footer Create Replies CTA |
| `src/app/replies/page.tsx` | Wrap empty-state CTA; wrap per-card Create when no replies |

## Out of scope follow-ups (explicit)

- Wire real `completedSteps` into `StartHereSection`  
- Nav “next step” glow in `Sidebar`  
- Highlight Copy as post-generate next action on Replies  
