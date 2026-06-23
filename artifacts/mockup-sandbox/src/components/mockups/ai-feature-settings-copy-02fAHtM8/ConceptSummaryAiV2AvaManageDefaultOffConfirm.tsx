import { ConceptSummaryAiV2AvaDetail } from './ConceptSummaryAiV2AvaDetail';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Turn off default for users (Figma 2454-9526)
 *
 * Standalone canvas frame documenting the "Turn off default for users?" modal.
 * It renders the AVA detail inner page with that confirmation open on mount.
 * The modal appears after the Manage AVA dialog is saved with the user default
 * set to Off: because AVA is a parent, defaulting AVA off also defaults its 5
 * dependent features (Query, Messaging, Integrations, Actions, Knowledge Bases)
 * off in user settings. Confirming applies the off default; cancelling returns
 * to the Manage AVA dialog. The full interaction lives in
 * ConceptSummaryAiV2AvaDetail.
 * --------------------------------------------------------------------------- */

export function ConceptSummaryAiV2AvaManageDefaultOffConfirm() {
  return <ConceptSummaryAiV2AvaDetail startDefaultOffConfirmOpen />;
}
