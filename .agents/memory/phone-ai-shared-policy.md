---
name: Phone AI shared in-call policy
description: Product decision for where automatic in-call behavior lives and when it is locked.
---

Automatic in-call behavior belongs in a shared policy footer under the Live transcripts and Call notes group, not as a separate Phone AI feature. Its label is dynamic: Automatic live transcripts when only LT is on; Automatic live transcripts & call notes when both are on.

**Why:** The behavior affects both features simultaneously, so a separate card misrepresents it as an independent feature. The grouped footer shows shared scope without competing with feature-level controls.

**How to apply:** Restore User default/User access pills and Manage actions for Closed captioning, Live transcripts, Call notes, and AI voicemail summaries. If any enabled affected feature is User default On and User access Restricted, force the shared policy On and lock editing; otherwise keep it manageable. Show the deployment consequence confirmation only when this changes the effective automatic behavior from Off to forced On—skip it when the stored preference was already On.