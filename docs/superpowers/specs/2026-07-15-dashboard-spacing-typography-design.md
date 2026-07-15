# Dashboard Spacing & Typography Consistency

**Date:** 2026-07-15  
**Status:** Approved (Approach 1 chosen)  
**Scope:** All authenticated shell pages

## Goal

Fix inconsistent spacing and typography across dashboard shell pages so the app feels like one product, without flattening marketing heroes to match standard page titles.

## Non-goals

- Visual redesign (colors, cards, layouts, marketing copy)
- Auth pages (`/login`, `/signup`, `/forgot-password`, `/reset-password`, `/onboarding`)
- Changing Shell chrome padding (`px-3 sm:px-8 lg:px-16`, `pt-6 lg:pt-10`)
- Building a full design-token system

## Approach

**Shared CSS utilities in `globals.css`**, applied across pages. Optional thin header markup reuse only where headers already look alike. Marketing heroes keep larger title sizes.

## Page categories

### A — Standard pages

Home (`/dashboard`), Search, Analysis, Radar, Replies, Training.

### B — Marketing / promo pages

Instant, Autopilot, DFY, Scale Training.

Hero titles stay large. Outer stack, section gaps, and section headings align to the shared scale.

## Shared scale

| Role | Utility / class | Tailwind equivalent |
|------|-----------------|---------------------|
| Page stack | `.page-stack` | `flex flex-col gap-8 max-w-5xl mx-auto w-full min-w-0` |
| Wide page stack | `.page-stack-wide` | same as `.page-stack` but `max-w-6xl` (Analysis, Radar) |
| Page title (H1) | `.page-title` | `text-2xl sm:text-3xl text-text-primary font-black tracking-tight` |
| Page subtitle | `.subtitle` (existing) | `text-text-secondary text-base leading-relaxed` |
| Section title (H2) | `.section-title` | `text-xl font-bold text-text-primary` |
| Section stack gap | use `gap-6` or `mt-10` between major sections | — |

### Marketing hero exception

Hero H1s keep current large sizes, e.g.:

- Instant / Autopilot: `text-2xl sm:text-4xl md:text-5xl font-black …`
- DFY: existing `text-[28px] sm:text-[40px] …`
- Scale Training: existing large brand-font H1

Do **not** apply `.page-title` to those hero H1s.

## Rules to apply

1. **No double vertical padding.** Remove page-level `py-6` / `py-6 sm:py-10` / `pb-10` that fight Shell padding. Exception: intentional bottom spacing for long marketing pages may stay as `pb-*` only if needed for scroll end, not top.
2. **One stack gap.** Standard and marketing outer wrappers use `gap-8` (via `.page-stack`), not mixed `gap-0` / `gap-6` / `gap-8 sm:gap-12` / `gap-6 sm:gap-10`.
3. **One content width.** Prefer `max-w-5xl`. Analysis and Radar use `.page-stack-wide` (`max-w-6xl`). Search may keep a narrower centered column (`max-w-xl`) for the form, but title/subtitle classes still apply.
4. **One H1 scale for standard pages.** Replace one-offs (`text-3xl sm:text-4xl`, `text-xl sm:text-2xl`, bare `text-2xl`) with `.page-title`.
5. **One subtitle scale.** Prefer `.subtitle` over `text-sm text-text-muted` for page-level supporting copy. Keep `text-sm text-text-muted` for secondary/meta lines under cards or steps.
6. **One section H2 scale.** Prefer `.section-title` over mixed `text-lg` / `text-2xl font-black` for in-page section headers (not marketing heroes).
7. **Card padding.** Prefer existing `.card-base` / `.glass-card` defaults; avoid inventing new `p-5 sm:p-10` / `p-4 sm:p-8` variants unless a hero panel needs it.

## File touch list

### Add utilities

- `src/app/globals.css` — `.page-stack`, `.page-stack-wide`, `.page-title`, `.section-title`

### Apply on pages

- `src/app/dashboard/page.tsx`
- `src/app/search/page.tsx`
- `src/app/analysis/page.tsx`
- `src/app/radar/page.tsx`
- `src/app/replies/page.tsx`
- `src/app/training/page.tsx`
- `src/app/instant/page.tsx`
- `src/app/autopilot/page.tsx`
- `src/app/dfy/page.tsx`
- `src/app/scale-training/page.tsx`

No new shared React components required for v1 (utilities are enough). A `PageHeader` component is out of scope unless duplication remains painful after utility adoption.

## Success criteria

- Standard pages share the same H1, subtitle, stack gap, and (where applicable) max-width classes.
- Marketing pages keep larger heroes but share outer stack / section heading rhythm.
- No page adds top padding that duplicates Shell padding.
- Visual scan of all listed routes shows consistent type hierarchy without layout breakage on mobile.

## Risks

- Tightening Analysis/Radar headers may make dense tables feel slightly roomier or tighter; keep `max-w-6xl`.
- Marketing pages with `gap-0` + `mt-10` sections may need careful conversion so hero-to-first-section spacing does not collapse or balloon.
