import { ConceptSummaryAiV2AvaDetail } from './ConceptSummaryAiV2AvaDetail';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Turn on an AVA dependent feature confirmation
 *
 * Standalone canvas frame documenting the user-level "Turn on {child}?" modal
 * shown when one of AVA's 5 dependent features (Query, Messaging, Integrations,
 * Actions, Knowledge Base) is switched back on. Unlike the disable confirm, the
 * re-enable confirmation carries the User-deployment card (User default / User
 * access) plus the custom-users disposition so the admin re-picks how the child
 * deploys to users. It renders the AVA detail inner page with the Query child
 * starting off and its re-enable confirmation open on mount; confirming turns
 * the child back on and applies the chosen deployment to its pills. The full
 * interaction lives in ConceptSummaryAiV2AvaDetail.
 * --------------------------------------------------------------------------- */

export function ConceptSummaryAiV2AvaChildEnableConfirm() {
  return <ConceptSummaryAiV2AvaDetail startChildEnableConfirm="Query" />;
}
