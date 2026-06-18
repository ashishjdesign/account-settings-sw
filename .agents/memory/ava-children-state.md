---
name: AVA dependent features are local-state, not store-backed
description: Why AVA's 5 child features in admin-portal use local component state instead of the AI feature store
---

In admin-portal `AiPanel.tsx`, AVA's 5 dependent features (Query, Messaging, Integrations, Actions, Knowledge Base) are toggled/configured via **local component state** (`avaChildOn`, `avaChildCfg`, `avaChildDisable`, `avaChildEnable`), NOT the AI feature store.

**Why:** They are new Figma concepts with no `AiFeatureKey` in the store. Contrast with Closed Captioning children (Live transcripts, AI notes) which ARE store-backed (`liveTranscripts`/`aiNotes`) and use the `toggleSubFeature`/`CASCADE_AI_FEATURE` path. Don't try to route AVA children through the store unless store keys are added for them.

**How to apply:** When wiring AVA child behavior, mirror the sub-feature UX (turn-off → SpringConfirmDialog, turn-on → FeatureEnableConfirmDialog with User deployment card) but commit to local state. User pref: when a child is OFF, HIDE its summary pills + Manage button (remove from DOM), never opacity-dim.
