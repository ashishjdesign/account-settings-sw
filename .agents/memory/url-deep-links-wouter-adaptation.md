---
name: URL deep-links gate — wouter adaptation
description: How to satisfy the mandatory url-deep-links routing gate in apps that use wouter instead of React Router v6 (e.g. admin-portal).
---

# URL deep-links gate in a wouter app

The workspace `url-deep-links` skill is a mandatory routing gate: every meaningful
structural UI state (page, tab, list/detail selection, modal) must be deep-linkable
via the URL, not held only in local `useState`. The skill's code prescribes
**React Router v6** hooks (`useUrlParam`, `useUrlFlag`, `useSearchParams`).

**Rule:** Honor the gate's *intent* (shareable, back/forward-able structural state),
but use the app's *existing* router. The admin-portal uses **wouter**, not React
Router v6 — do NOT introduce React Router v6 into a wouter app (two routers conflict).

**Why:** The skill is about deep-linkability, not a specific library. Forcing
react-router-dom alongside wouter is a large, risky, unrequested change.

**How to apply (wouter):**
- Path = page (already done via wouter `Route`, e.g. `/feature-settings/:tab`).
- Sub-page / detail / overlay = query param. Read with `useSearch()` +
  `new URLSearchParams(search).get('key')`; write with `useLocation()`'s
  `setLocation('/path?key=value')`. Use `setLocation(path, { replace: true })`
  for redirect/normalization (invalid params), not a history push.
- Derive the active view from the URL param each render (no `useState` for it).
- Guard deep links: in a `useEffect`, if a detail param is invalid for the
  current state (e.g. parent feature is off), `setLocation(main, {replace:true})`.
  Cascade gating (parent off → child hidden/off) must also apply on the detail
  route, not just the main list — a direct deep link must not bypass the cascade.
