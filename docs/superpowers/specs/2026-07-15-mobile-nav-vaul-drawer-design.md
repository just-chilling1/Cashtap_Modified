# Mobile Navigation Vaul Drawer

**Date:** 2026-07-15  
**Status:** Approved (Approach 1 — Vaul)  
**Scope:** Authenticated app shell mobile navigation (`Shell`, `Sidebar`, `MobileBottomNav`)

## Goal

Replace the custom CSS `translate-x` mobile sidebar with a proper **Vaul** left drawer so mobile menu open/close gets focus trap, Escape, body scroll lock, and swipe-to-dismiss — without changing desktop rail behavior or nav content.

## Non-goals

- Redesigning nav items, colors, or branding
- Changing `MobileBottomNav` tabs or labels
- Aligning the `md` (bottom nav) vs `lg` (sidebar/top bar) breakpoint mismatch
- Auth/onboarding routes (shell already skipped)
- Adding a full shadcn UI kit

## Approach

Add the `vaul` package. Below `lg`, open the full sidebar nav inside a controlled left `Drawer`. At `lg+`, keep a static sidebar rail. Share one nav body between both surfaces.

## Architecture

```
Shell (sidebarOpen state)
├── MobileNavDrawer (vaul, < lg only)
│     └── SidebarNav (shared content)
├── Sidebar (static rail, lg+ only)
│     └── SidebarNav (shared content)
├── main (hamburger toggles drawer on < lg)
└── MobileBottomNav (More opens drawer)
```

- `Shell` remains the single source of `sidebarOpen` / `setSidebarOpen`.
- Close on pathname change stays in `Shell`.
- Custom backdrop `div` is removed; Vaul overlay replaces it.
- Mobile fixed/`-translate-x-full` positioning is removed from the desktop `Sidebar`.

## Components

### `SidebarNav` (new shared extract)

Current sidebar body: brand link, steps, promo links, premium upgrades, `LiveActivityTicker`, logout. Accepts optional `onNavigate` (or `onClose`) so links close the drawer on mobile.

### `Sidebar`

Desktop rail only: static, visible at `lg+`, no open/close props required for transform. Renders `SidebarNav`.

### `MobileNavDrawer` (new)

Thin Vaul wrapper:

- `Drawer.Root` controlled via `open` / `onOpenChange`
- `direction="left"`
- `Drawer.Overlay` styled to match current `bg-black/60 backdrop-blur-sm`
- `Drawer.Content`: `w-72 max-w-[85vw]`, existing sidebar colors/borders, contains `SidebarNav`
- Portal so drawer escapes layout overflow

### `Shell` changes

- Wire hamburger and `MobileBottomNav` `onMore` to drawer open state
- Remove custom backdrop
- Mount `MobileNavDrawer` for mobile; mount static `Sidebar` in the existing `lg:w-72` spacer for desktop
- Keep route-change close effect

### `MobileBottomNav`

Unchanged API (`onMore`); still opens the same `sidebarOpen` state.

## Behavior

| Action | Result |
|--------|--------|
| Hamburger (top bar) | Toggle drawer |
| Bottom **More** | Open drawer |
| Overlay click | Close |
| Escape | Close |
| Swipe dismiss | Close (Vaul) |
| Nav link / brand link | Navigate + close |
| Route change | Close |
| Body scroll while open | Locked (Vaul) |
| Desktop `lg+` | Static sidebar; drawer not used |

## Dependencies

- Add `vaul` (runtime). No Radix Sheet / shadcn required.

## File touch list

| File | Change |
|------|--------|
| `package.json` / lockfile | Add `vaul` |
| `src/components/layout/Sidebar.tsx` | Extract `SidebarNav`; desktop-only `Sidebar`; keep `MobileBottomNav` |
| `src/components/layout/MobileNavDrawer.tsx` | New Vaul drawer wrapper |
| `src/components/layout/Shell.tsx` | Use drawer on mobile; drop custom backdrop; keep desktop rail |

## Verification

1. **Mobile (below lg):** Open via hamburger and More; close via overlay, swipe, Escape, and after navigation; background does not scroll.
2. **Desktop (lg+):** Static sidebar always visible; no drawer overlay/chrome.
3. **Auth routes:** Still no shell chrome.
4. **Visual:** Nav content, width (`w-72` / `max-w-[85vw]`), and colors match pre-change sidebar.

## Risks / notes

- Vaul is bottom-sheet–oriented; left `direction` is supported but should be smoke-tested on iOS Safari (safe area, swipe).
- Avoid double-mounting heavy sidebar content if both desktop and mobile trees render in the same viewport — use responsive mounting (`lg:hidden` / `hidden lg:…`) so only one surface is active.
