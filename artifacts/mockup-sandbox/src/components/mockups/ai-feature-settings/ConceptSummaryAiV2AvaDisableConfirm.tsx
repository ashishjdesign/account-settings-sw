import { ConceptSummaryAiV2AvaDetail } from './ConceptSummaryAiV2AvaDetail';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Turn off AVA confirmation (Figma 2454-8876)
 *
 * Standalone canvas frame documenting the "Turn off AVA for your organization?"
 * modal. It renders the AVA detail inner page with the confirmation open on
 * mount. Confirming turns AVA off and hides its 5 dependent features; cancelling
 * dismisses the dialog and leaves AVA on. The full interaction lives in
 * ConceptSummaryAiV2AvaDetail.
 * --------------------------------------------------------------------------- */

export function ConceptSummaryAiV2AvaDisableConfirm() {
  return <ConceptSummaryAiV2AvaDetail startConfirmOpen />;
}
