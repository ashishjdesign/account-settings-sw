import { ConceptSummaryAiV2AvaDetail } from './ConceptSummaryAiV2AvaDetail';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Restrict users from changing this setting
 * (Figma 2502-10410)
 *
 * Standalone canvas frame documenting the "Restrict users from changing this
 * setting?" modal. It renders the AVA detail inner page with that confirmation
 * open on mount. The modal appears after the Manage AVA dialog is saved with
 * "User access" unchecked: because AVA is a parent, restricting AVA also
 * restricts its 5 dependent features (Query, Messaging, Integrations, Actions,
 * Knowledge Bases). The full interaction lives in ConceptSummaryAiV2AvaDetail.
 * --------------------------------------------------------------------------- */

export function ConceptSummaryAiV2AvaManageRestrictAccessConfirm() {
  return <ConceptSummaryAiV2AvaDetail startRestrictAccessConfirmOpen />;
}
