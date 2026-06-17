---
name: AI Feature Settings prototype
description: Conventions for the AI/Account Feature Settings click-through prototype in artifacts/mockup-sandbox.
---

# AI Feature Settings click-through prototype (mockup-sandbox)

Figma source file key: `xGbu5327bj9YvYed8lxZQk`. Components live in
`artifacts/mockup-sandbox/src/components/mockups/ai-feature-settings/`.

**Routing / discovery:** components are auto-discovered by `mockupPreviewPlugin` into
`src/.generated/mockup-components.ts` and routed by `App.tsx` at
`/preview/ai-feature-settings/<Component>`. Just create the `.tsx` file — no manual registration.

**Click-through pattern:** navigation between states is done with in-component React state
(e.g. `const [page, setPage] = useState<'main'|'ava'>`), NOT cross-iframe arrows. Parent rows
expose an `onOpen` callback; the inner page exposes optional `onBack`. Build the inner page as a
standalone component (so it can also be its own canvas frame with onBack omitted) and render it
conditionally from the parent.

**Shared primitives:** `_chrome.tsx` (SettingCard, ParentCard with "N features" badge + CaretRight,
SectionHeading, PillTabs) and `_shared.tsx` (FeatureSettingsShell, SpringSwitch, SpringSelect, SideNav).
Reuse these — match their exact Tailwind/`--sui-colors-*` tokens.

**Screenshot tool:** `artifact_dir_name: "mockup-sandbox"`, `path: "/ai-feature-settings/<Component>"`.
Do NOT prefix `/__mockup/preview` — it is auto-added; double-prefix errors out.

**User prefs:** never opacity-dim disabled/secondary content; exact Figma Spring icons only
(see figma-spring-icon-mapping.md); cascade parent→child state. Run architect code review after
each completed command.
