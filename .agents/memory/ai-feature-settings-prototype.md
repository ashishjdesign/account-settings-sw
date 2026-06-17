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

**AVA dependency model (real admin-portal AiPanel.tsx):** AVA's ONLY children are the 5 features
shown inside the AVA detail page (Query, Messaging, Integrations, Actions, Knowledge Base). Phone /
Chat / SMS features (Closed captioning, AI voicemail summaries, AI writer, AI summary, AI translation,
AI writer for SMS) are INDEPENDENT — they depend ONLY on the master "AI features" toggle (`masterOn`),
NOT on AVA (`avaActive`). Turning AVA off must hide ONLY its 5 own children; everything else stays.
`avaActive = masterOn && aiAssistant.on` should gate ONLY the AVA detail page's children. Disable-confirm
modal copy: AVA → "Query, Messaging, Integrations, Actions and Knowledge Bases will also be turned off.";
Closed captioning → "Live transcripts and AI notes will also be turned off." (CC's children, not AVA's).

**AVA re-enable modal (real admin-portal):** turning AVA back ON shows the deployment-config form
modal (`AssistantEnableConfirmDialog`, Figma node `2495-9986`: "Turn on AVA for your organization?" +
"User deployment" card + "Default in user settings:" radio), NOT the simple `AssistantReEnableConfirmDialog`.
On confirm, `confirmAssistantOn(AssistantEnableResult)` persists `defaultVal`/`allowChange`/`customUsers`
(customAction 'reset' → 0) via `PATCH_AI_ASSISTANT`. AVA store carries those deployment fields.

**User prefs:** never opacity-dim disabled/secondary content (hide/cascade instead of greying out); exact Figma Spring icons only. NOTE: "never opacity-dim" is about disabled/secondary *content* — it does NOT forbid the standard modal scrim. Every dialog in this prototype uses the shared `DialogShell` `bg-black/40` backdrop; new confirm dialogs should reuse it for consistency.
(see figma-spring-icon-mapping.md); cascade parent→child state. Run architect code review after
each completed command.

**Confirm-modal conventions (mockup prototype):** Manage dialogs here are non-persisting click-throughs
— `onSave`/`onConfirm` just close (`setOpen(false)`); they do NOT lift/persist deployment state. Don't
add production-grade state management (architect may suggest it — out of scope, inconsistent with siblings).
Confirmation Cancel should simply dismiss (matches `AvaDisableConfirm`), NOT reopen the Manage dialog
(reopening resets the form, losing the selection — self-contradictory). Standalone canvas frames document
a modal by rendering the detail page with a `start<X>Open` prop (e.g. `startManageOpen`,
`startDefaultOffConfirmOpen`). New: "Turn off default for users?" (Figma 2454-9526) fires from Manage AVA
Save when User default = Off; copy: "AVA will default to off in user settings." + "Query, Messaging,
Integrations, Actions and Knowledge Bases will also default to off." confirm label "Turn default off",
width 600.

**AVA Manage cascade confirms (2 triggers):** Manage AVA onSave checks both fields with priority:
defaultVal==='Off' -> "Turn off default for users?" (Figma 2454-9526); else !allowChange -> "Restrict
users from changing this setting?" (Figma 2502-10410, width 600, copy "Users will no longer be able to
change AVA." + "This restriction will also apply to Query, Messaging, Integrations, Actions and Knowledge
Bases", confirm label "Restrict access"). Each has a standalone frame via a start<X>Open prop.

**admin-portal AVA children (real app, AiPanel.tsx):** the 5 AVA dependents (Query, Messaging,
Integrations, Actions, Knowledge Base) have NO global store entry — they are display-only concepts.
Their Manage dialogs are wired via LOCAL component state (avaChildManage + avaChildCfg keyed by title),
reusing SpringFeatureManageDialog; saves persist in-page only (no dispatch, toast without undo). Gotcha:
FeatureDetailRow renders the "Manage" button whenever `summary` is set but wires onClick to `onManage`,
so a row with a summary and no onManage shows an INERT Manage CTA — always pass onManage when summary is set.

**admin-portal AVA cascade confirms (AiPanel.tsx):** saving the AVA parent Manage dialog with
"User default: Off" or "User access: Restricted" opens a SpringConfirmDialog ("Turn off default for
users?" / "Restrict users from changing this setting?"). On confirm, commitAvaManage cascades the
restrictive state to all 5 children in avaChildCfg (Off forces children Off; Restricted forces
children Restricted; the OTHER dimension is preserved; turning parent back On/Allowed leaves children
untouched). Both-restrictive saves chain: default-off confirm first, then restrict confirm. Cancel
discards (applies nothing). Gotcha: store UNDO only reverts AVA's parent state, so the toast undo must
ALSO restore a pre-commit snapshot of avaChildCfg or the child cascade won't roll back. The AVA parent
FeatureDetailRow summary must derive from aiAssistant.defaultVal/allowChange (a static ALLOWED constant
was a latent bug — it never reflected real state).
