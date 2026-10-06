---
name: AI retention after feature shutdown
description: Retention remains active when organization AI features are turned off.
---

Turning off AI features must not itself delete stored AI data or suspend existing retention periods.

**Why:** The user explicitly requires feature availability and stored-data retention to remain independent. Existing data still expires under the previously configured policy.

**How to apply:** Keep existing retention settings when disabling AI and explain both data preservation and continued retention in the organization-level turn-off confirmation.

Shortening retention deletes previously stored AI data outside the new limit in the next daily cleanup.

**Why:** The user specified daily cleanup as the product's deletion timing, rather than immediate deletion or a possible deletion.

**How to apply:** Preserve this timing in retention warnings and future retention-enforcement work; copy edits alone do not implement cleanup.

Phone AI notes and transcripts retention does not affect call recordings or call log retention.

**Why:** The user explicitly separated the Phone AI data policy from recording and call-log policies.

**How to apply:** Keep these policies independent in descriptions and future enforcement; do not extend this rule to Meetings.