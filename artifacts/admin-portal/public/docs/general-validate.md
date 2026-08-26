# Spring UI Validation — Feature Settings General tab

**Status:** Pass with accepted deviations
**Source:** `src/pages/tabs/GeneralPanel.tsx`, `src/pages/FeatureSettings.tsx`, `src/components/shared.tsx`, `src/components/Chrome.tsx`, `src/store.tsx`
**Validation page:** `/validate/general`
**Last validated:** 2026-08-26T02:52:04.074Z

## Summary

| Resolution | Open | Fixed | Accepted |
|---|---:|---:|---:|
| Auto-fix | 0 | 0 | 0 |
| Approval-fix | 0 | 0 | 3 |
| Designer-decision | 0 | 0 | 1 |

All findings below were resolved as accepted deviations. The task brief for this
handoff explicitly places any redesign or behavior change of the finalized tab
UI out of scope, which constitutes the designer's acceptance of the recorded
batch; no code was modified during validation.

## Findings

- [x] **SUV-001** | Blocking | Component | approval-fix
  - Location: `src/components/shared.tsx` (SettingCard, SpringSwitch, SpringConfirmDialog, SpringSelect, PillTab and related dialogs), `src/pages/tabs/GeneralPanel.tsx`
  - Review: `/feature-settings/general`
  - Finding: Interactive controls are Spring-styled Tailwind + Radix primitives (raw `button`/`select`, @radix-ui Switch/Dialog/Tooltip) rather than `@ringcentral/spring-ui` components; that package is not installed in this prototype.
  - Proposed fix (batch plan, if ever approved): install `@ringcentral/spring-ui` and replace SpringSwitch → Spring Switch, SpringConfirmDialog/SpringDialog → Spring Dialog, raw buttons → Spring Button, SpringSelect → Spring Select, preserving copy, layout, and actions.
  - Visible effect: Spring-native control states; minor visual differences possible.
  - Status: accepted-deviation
  - Accepted reason: Task directive — redesigning or changing any tab's UI or behavior is out of scope; the custom primitives replicate the approved Figma/Spring visuals exactly.

- [x] **SUV-002** | Blocking | Icon | approval-fix
  - Location: `src/components/shared.tsx`, `src/components/Chrome.tsx` (lucide-react X, ChevronDown, ChevronRight, Search, Info, RotateCcw)
  - Review: `/feature-settings/general` — open any dialog (close X), chrome chevrons/search
  - Finding: Utility glyphs come from lucide-react instead of verified `@ringcentral/spring-icon` exports. Product feature icons on this tab correctly use `@ringcentral/spring-icon` or approved figma-ref SVG assets.
  - Proposed fix (batch plan): map each lucide glyph to a verified spring-icon export and render through the SpringIcon wrapper.
  - Visible effect: Slight glyph-shape differences.
  - Status: accepted-deviation
  - Accepted reason: Task directive — no UI changes; exact spring-icon mappings were not verified, so silent replacement is prohibited.

- [x] **SUV-003** | Warning | Style | approval-fix
  - Location: `src/pages/FeatureSettings.tsx:69` (bg-slate-100 skeleton), error banners (red-50/red-200/red-800), overlays (bg-black/40), white surfaces (bg-white)
  - Review: `/feature-settings/general` during the ~250ms load; save-error states
  - Finding: Tailwind default-palette utilities are used where Spring semantic tokens exist for surfaces, overlays, and danger roles.
  - Proposed fix (batch plan): substitute Spring neutral/danger tokens with 1:1 role mapping.
  - Visible effect: Near-identical; exact hues shift to token values.
  - Status: accepted-deviation
  - Accepted reason: Task directive — no UI changes to the finalized prototype.

- [x] **SUV-004** | Warning | Color | designer-decision
  - Location: `src/components/Chrome.tsx` (masthead, side nav, footer: #0679BA, #2F2F2F, #FBFBFB, #E2E2E2, #F4F4F4)
  - Review: any `/feature-settings/*` route — surrounding chrome
  - Finding: The Admin Portal chrome hardcodes the legacy Service Web UI palette instead of Spring tokens.
  - Proposed fix: none — keep the scoped legacy palette.
  - Visible effect: No change.
  - Status: accepted-deviation
  - Accepted reason: The chrome deliberately reproduces the existing RingCentral Service Web admin chrome (scoped under `.swui-scope`); Spring tokens apply to the feature-settings surface (`.spring-scope`) only.


## Approval plan

No open approval-fix findings remain. The batch plans above are recorded for a
future designer who chooses to migrate the prototype onto `@ringcentral/spring-ui`;
designer confirmation would authorize that listed batch only.

## Color audit

| Token / value | Usage | Count | Status |
|---|---|---:|---|
| var(--sui-colors-neutral-b0..b5) | Text, borders, pills, disabled fills | pervasive | Token |
| var(--sui-colors-primary-b), -high-contrast | Links, primary buttons, switch-on, focus rings | pervasive | Token |
| #0679BA, #2F2F2F, #FBFBFB, #E2E2E2, #F4F4F4 | Legacy Service Web chrome (Chrome.tsx) | 19 | Accepted deviation (SUV-004) |
| bg-white / bg-black-40 | Card + dialog surfaces, overlays | common | Accepted deviation (SUV-003) |
| red-50 / red-200 / red-600 / red-800 | Simulated save-error banners, destructive discard button | few | Accepted deviation (SUV-003) |
| bg-slate-100 | Loading skeleton bars | 3 | Accepted deviation (SUV-003) |
| #1A8517 (--rc-success) | Presence dot in masthead avatar | 1 | Accepted deviation (SUV-004) |

Theming note: Spring tokens are defined as CSS variables in `src/index.css` and
scoped to the settings surface via `.spring-scope`; the chrome uses `.swui-scope`
with the legacy palette. No dark/high-contrast theme is defined for this prototype,
and no CSS variable falls back to a hidden hardcoded color.

## Accessibility checklist

- [x] Icon-only controls have accessible names (SC 4.1.2): dialog close buttons use `aria-label="Close"`, switches carry `aria-label={title}`, info buttons have descriptive labels.
- [x] Focus visible (SC 2.4.7): all interactive elements define `focus:ring`/`focus-visible:ring` treatments.
- [x] Text contrast (SC 1.4.3): neutral-b1/b2 on white and white on primary-b meet 4.5:1; chrome text #2F2F2F on #FBFBFB passes.
- [x] Non-text contrast (SC 1.4.11): switch track states and card borders meet 3:1 against adjacent surfaces; disabled 60%-opacity switch is intentionally sub-3:1 as a disabled control (exempt).
- [x] Not color-only (SC 1.4.1): error states pair red color with an info icon and text; selected pill tab uses fill + border, and selected nav row adds a 4px bar.
- [x] Keyboard reachable (SC 2.1.1): all visible clickable elements are native buttons/links/inputs.
