---
name: Figma → Spring icon mapping
description: How to translate Figma icon instance names to @ringcentral/spring-icon exports in the admin-portal / mockup-sandbox prototypes.
---

# Figma icon instance name → Spring DS export

Figma icon instances are named loosely (e.g. `AISearch`, `Messages`, `Puzzle`). The real
export in `@ringcentral/spring-icon` is usually the same word(s) in PascalCase + `Md` suffix,
but casing/pluralization differ — **always grep the package before using a name.**

**Why:** User requires exact Figma Spring icons only; guessing a name that doesn't exist
breaks the build (TS error / missing export). Casing traps: Figma `AISearch` → export `AiSearchMd`
(not `AISearchMd`).

**How to apply:** Pull instance names from `mcpFigma_getMetadata`, then grep the installed
package's `src/index.d.ts` for the `*Md` export, e.g.
`grep -oE "\\bAiSearch[A-Za-z]*Md\\b" <pkg>/src/index.d.ts`.
Package path lives under `node_modules/.pnpm/@ringcentral+spring-icon@<ver>.../node_modules/@ringcentral/spring-icon`.

Verified mappings (AVA feature set, Figma node 2445-6666):
- AVA → `AvaMd`
- AISearch (Query) → `AiSearchMd`
- Messages (Messaging) → `MessagesMd`
- Puzzle (Integrations) → `PuzzleMd`
- AiAsAgent (Actions) → `AiAsAgentMd`
- ResourceCenter (Knowledge Base) → `ResourceCenterMd`
- ClosedCaptions → `ClosedCaptionsMd`; back arrow → `ArrowLeftMd`
