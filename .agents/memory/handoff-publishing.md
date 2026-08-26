---
name: Handoff v2 publishing for admin-portal
description: Durable constraints for publishing/verifying Replit Handoff specs in this project.
---

- The Handoff MCP receiving tools (list_features, get_feature_context, get_source_slice, check_handoff_integrity) are NOT available as sandbox callbacks. **How to apply:** verify published specs by emulating those operations over HTTP against the dev-preview URL, checking JSON shape and content — plain 200s are insufficient.
- Source closure must be truly complete: include every transitive dependency of published files (fonts referenced by CSS, pages added during the handoff task itself) and byte-compare published copies against current source before finishing. **Why:** completion review rejects any stale or missing closure member.
- Spring UI validation stance: the prototype intentionally uses Spring tokens/icons but custom Tailwind/Radix components (no @ringcentral/spring-ui installed); component/icon/palette findings are accepted deviations because the finalized UI must not be redesigned. Keep this basis or re-run the validation passes when regenerating.
