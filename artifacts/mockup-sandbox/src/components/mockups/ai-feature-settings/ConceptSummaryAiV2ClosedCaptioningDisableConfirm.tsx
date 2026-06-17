import { ConceptSummaryAiV2ClosedCaptioningDetail } from './ConceptSummaryAiV2ClosedCaptioningDetail';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Turn off Closed captioning confirmation
 * (Figma 2495-9886)
 *
 * Standalone canvas frame documenting the "Turn off Closed captioning for your
 * organization?" modal. It renders the Closed captioning detail inner page with
 * the confirmation open on mount. Confirming turns Closed captioning off and
 * hides its 2 dependent features (Live transcripts, AI notes); cancelling
 * dismisses the dialog and leaves Closed captioning on. The full interaction
 * lives in ConceptSummaryAiV2ClosedCaptioningDetail.
 * --------------------------------------------------------------------------- */

export function ConceptSummaryAiV2ClosedCaptioningDisableConfirm() {
  return <ConceptSummaryAiV2ClosedCaptioningDetail startConfirmOpen />;
}
