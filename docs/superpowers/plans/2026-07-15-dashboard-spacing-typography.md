# Dashboard Spacing & Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify spacing and typography across all authenticated shell pages while keeping marketing heroes large.

**Architecture:** Add shared utility classes in `globals.css` (`.page-stack`, `.page-stack-wide`, `.page-title`, `.section-title`), then apply them across dashboard pages. Marketing hero H1s stay custom/large; section titles and outer stacks normalize.

**Tech Stack:** Next.js App Router, Tailwind CSS v4 (`@layer components` in `globals.css`), React client pages.

## Global Constraints

- Do not restyle auth pages.
- Do not change Shell chrome padding in `Shell.tsx`.
- Keep marketing hero H1 sizes on Instant, Autopilot, DFY, Scale Training.
- Prefer utilities over new React components.
- Do not invent new card padding variants.
- Do not commit unless the user asks.

---

## File map

| File | Responsibility |
|------|----------------|
| `src/app/globals.css` | Define `.page-stack`, `.page-stack-wide`, `.page-title`, `.section-title` |
| `src/app/dashboard/page.tsx` | Apply `.page-stack` + `.page-title` |
| `src/app/search/page.tsx` | Apply `.page-title` + `.subtitle`; keep narrow centered layout |
| `src/app/analysis/page.tsx` | Apply `.page-stack-wide` + `.page-title`; drop `py-6` |
| `src/app/radar/page.tsx` | Apply `.page-stack-wide` + `.page-title`; drop `py-6` |
| `src/app/replies/page.tsx` | Apply `.page-stack` + `.page-title`; drop `py-6` |
| `src/app/training/page.tsx` | Apply `.page-stack` + `.page-title`; drop `py-6` / uneven gaps |
| `src/app/instant/page.tsx` | Apply `.page-stack`; normalize section H2s; drop `py-6` / `mt-*` that duplicate gap |
| `src/app/autopilot/page.tsx` | Same as Instant |
| `src/app/dfy/page.tsx` | Apply `.page-stack`; keep hero H1; normalize section H2 |
| `src/app/scale-training/page.tsx` | Apply `.page-stack`; keep hero H1; normalize outer gap |

---

### Task 1: Add typography/spacing utilities

**Files:**
- Modify: `src/app/globals.css` (Typography Utilities section near `.subtitle`)

**Interfaces:**
- Produces: `.page-stack`, `.page-stack-wide`, `.page-title`, `.section-title`

- [x] **Step 1: Add utilities after `.subtitle`**

In `@layer components`, after the existing `.subtitle` block, add:

```css
  .page-stack {
    @apply flex flex-col gap-8 max-w-5xl mx-auto w-full min-w-0;
  }

  .page-stack-wide {
    @apply flex flex-col gap-8 max-w-6xl mx-auto w-full min-w-0;
  }

  .page-title {
    @apply text-2xl sm:text-3xl text-text-primary font-black tracking-tight;
  }

  .section-title {
    @apply text-xl font-bold text-text-primary;
  }
```

- [ ] **Step 2: Verify CSS parses**

Run: `npx --yes tsc --noEmit` is optional here; visual/build check comes later. Confirm the file still has balanced braces and `.subtitle` remains unchanged.

- [ ] **Step 3: Do not commit** (unless user requests)

---

### Task 2: Standard workflow pages (Home, Search, Analysis, Radar, Replies, Training)

**Files:**
- Modify: `src/app/dashboard/page.tsx`
- Modify: `src/app/search/page.tsx`
- Modify: `src/app/analysis/page.tsx`
- Modify: `src/app/radar/page.tsx`
- Modify: `src/app/replies/page.tsx`
- Modify: `src/app/training/page.tsx`

**Interfaces:**
- Consumes: `.page-stack`, `.page-stack-wide`, `.page-title`, `.subtitle`

- [x] **Step 1: Dashboard**

Replace root `className="flex flex-col gap-8 max-w-5xl mx-auto w-full"` with `className="page-stack"`.

Replace H1 classes with `className="page-title"`.

Keep `.subtitle` on the supporting paragraph.

- [ ] **Step 2: Search**

Keep centered narrow layout (`max-w-xl`, `items-center`, `min-h-[70vh]`), but set stack gap to `gap-8` (remove `gap-6 sm:gap-10`).

Replace H1 classes with `className="page-title flex flex-wrap items-center justify-center gap-2"`.

Replace page subtitle `text-sm text-text-muted max-w-md` with `className="subtitle max-w-md text-center"`.

- [ ] **Step 3: Analysis**

Replace root classes with `className="page-stack-wide"` (drops `gap-6`, `py-6`, `max-w-6xl` inline).

Replace H1 with `className="page-title"`. Keep the meta line as `text-sm text-text-muted` (not page subtitle — it's contextual metadata).

- [ ] **Step 4: Radar**

Same as Analysis: root → `page-stack-wide`, H1 → `page-title`, keep meta as `text-sm text-text-muted`.

- [ ] **Step 5: Replies**

Root → `page-stack` (drop `gap-6 py-6`). H1 → `page-title`. Keep selection meta as `text-sm text-text-muted`.

- [ ] **Step 6: Training**

Root → `page-stack` (drop `gap-8 sm:gap-12 py-6`). H1 → `page-title`. Replace section headers that use ad-hoc `text-lg font-bold text-white` with `section-title` where they are true section H2s (Video Training, etc.). Keep short uppercase labels as-is.

- [ ] **Step 7: Spot-check**

Grep for leftover `py-6` / `text-3xl sm:text-4xl` on these six pages; none should remain on page roots/H1s.

---

### Task 3: Marketing pages (Instant, Autopilot, DFY, Scale Training)

**Files:**
- Modify: `src/app/instant/page.tsx`
- Modify: `src/app/autopilot/page.tsx`
- Modify: `src/app/dfy/page.tsx`
- Modify: `src/app/scale-training/page.tsx`

**Interfaces:**
- Consumes: `.page-stack`, `.section-title`
- Must NOT apply `.page-title` to hero H1s

- [ ] **Step 1: Instant**

Root: replace `flex flex-col gap-0 max-w-5xl mx-auto w-full py-6` with `page-stack`.

Remove redundant `mt-10` / `mt-14` on direct child sections (stack gap handles spacing).

Keep hero H1 large classes unchanged.

Replace section H2s such as `text-2xl font-bold text-text-primary` and `text-2xl font-black text-text-primary` with `section-title` (except anything that is clearly part of the hero).

- [ ] **Step 2: Autopilot**

Mirror Instant changes exactly for root stack, margin cleanup, and section titles. Keep hero H1 large.

- [ ] **Step 3: DFY**

Root: replace `flex flex-col gap-6 sm:gap-10 py-6 sm:py-10 max-w-5xl mx-auto w-full min-w-0` with `page-stack`.

Keep hero H1 `text-[28px] sm:text-[40px] …` unchanged.

Replace `How to Use Done-For-You` H2 with `section-title` (may keep `text-white` if needed via `section-title text-white` — prefer plain `section-title` since it already uses `text-text-primary`).

- [ ] **Step 4: Scale Training**

Root: replace `flex flex-col gap-10 pb-10` with `page-stack` (optionally keep `pb-10` only if scroll-end spacing is needed; prefer relying on Shell `pb-24 md:pb-16`, so drop `pb-10`).

Keep large brand-font H1 unchanged.

- [ ] **Step 5: Verify heroes untouched**

Confirm Instant/Autopilot still have `text-2xl sm:text-4xl md:text-5xl` on hero H1; DFY still has `text-[28px] sm:text-[40px]`; Scale Training still has `text-2xl sm:text-4xl md:text-5xl lg:text-6xl`.

---

### Task 4: Verification

**Files:** none new

- [ ] **Step 1: Grep audit**

```bash
rg -n "page-stack|page-title|section-title" src/app
rg -n "py-6|gap-0 max-w-5xl|gap-8 sm:gap-12|text-3xl sm:text-4xl text-text-primary" src/app/dashboard src/app/search src/app/analysis src/app/radar src/app/replies src/app/training src/app/instant src/app/autopilot src/app/dfy src/app/scale-training
```

Expected: utilities present on all target pages; old inconsistent root patterns gone (hero sizes may still match some patterns — that's OK).

- [ ] **Step 2: Lint touched files if available**

Use IDE lints / `ReadLints` on modified files; fix any introduced issues.

- [ ] **Step 3: Manual checklist**

- Home H1 uses `.page-title` (smaller than old `text-3xl sm:text-4xl`)
- Analysis/Radar use wide stack
- Instant/Autopilot heroes still large; sections no longer double-spaced
- No auth pages changed

---

## Spec coverage self-review

| Spec requirement | Task |
|------------------|------|
| Add utilities | Task 1 |
| Standard pages aligned | Task 2 |
| Marketing heroes kept large | Task 3 |
| No double vertical padding | Tasks 2–3 |
| Analysis/Radar max-w-6xl | Task 2 |
| Success criteria / grep | Task 4 |
