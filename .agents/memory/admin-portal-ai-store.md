---
name: admin-portal AI feature store & parent→child cascade
description: How AVA/Closed-captioning parent→child cascades work in admin-portal, and the Undo-snapshot gotcha that forces atomic cascade dispatches.
---

**Two separate AI feature settings surfaces exist — don't confuse them.** The real product
is `artifacts/admin-portal` (the iframe the user reviews on canvas, route
`/feature-settings/ai`, detail views `?detail=ava` and `?detail=closedCaptioning`). The
`artifacts/mockup-sandbox` is only a click-through prototype. A request to "fix the
prototype / I don't see the change" while the user's viewport shows admin-portal means edit
admin-portal, NOT mockup-sandbox.
**Why:** a whole session was spent editing mockup-sandbox CC while the user was looking at
admin-portal CC — the change was real but invisible to them.

**Store Undo is single-level and snapshot-overwriting.** `store.tsx` `withSnapshot` stashes
the entire prior AppState into `undoSnapshot`, but EVERY dispatch overwrites it. So N
sequential dispatches make one `UNDO` revert only the LAST one. To change a parent + several
children atomically (and have one Undo revert them all), do it in a SINGLE reducer action.
This is why `CASCADE_AI_FEATURE` exists: it patches the parent key + a `childKeys[]` list
with a `childPayload` inside one `withSnapshot`.

**Parent→child cascade pattern (AVA = template, Closed captioning mirrors it).** Saving the
parent Manage dialog with User default Off and/or User access Restricted must first show a
confirm dialog (chained: default-off confirm → if also restricting, restrict confirm → then
commit) naming the dependent children, then cascade. Cascade rule: only the RESTRICTIVE
dimensions propagate — defaultVal:'Off' propagates only when Off; allowChange:false only when
restricted. Turning the parent back On/Allowed leaves children untouched (empty childPayload).
- AVA children (Query/Messaging/Integrations/Actions/Knowledge Base) are display-only LOCAL
  state (`avaChildCfg`), so its commit also snapshots that local state for the Undo toast.
- Closed captioning children (Live transcripts=`liveTranscripts`, AI notes=`aiNotes`) ARE in
  the global store, so CC uses `CASCADE_AI_FEATURE` (atomic Undo) instead of local snapshots.
- `renderWiredDetailRow` defaults a row's Manage to `setSubManageKey(key)`; the CC PARENT row
  passes an `onManageOverride` to open its dedicated cascade dialog instead.
