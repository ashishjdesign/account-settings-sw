import { ConceptSummaryAiV2AvaDetail } from './ConceptSummaryAiV2AvaDetail';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Turn off an AVA dependent feature confirmation
 *
 * Standalone canvas frame documenting the user-level "Turn off {child}?" modal
 * shown when one of AVA's 5 dependent features (Query, Messaging, Integrations,
 * Actions, Knowledge Base) has its own switch turned off. It renders the AVA
 * detail inner page with the Query child's disable confirmation open on mount.
 * Confirming turns that child off and hides its user-deployment row; cancelling
 * dismisses the dialog and leaves the child on. The full interaction lives in
 * ConceptSummaryAiV2AvaDetail.
 * --------------------------------------------------------------------------- */

export function ConceptSummaryAiV2AvaChildDisableConfirm() {
  return <ConceptSummaryAiV2AvaDetail startChildDisableConfirm="Query" />;
}
