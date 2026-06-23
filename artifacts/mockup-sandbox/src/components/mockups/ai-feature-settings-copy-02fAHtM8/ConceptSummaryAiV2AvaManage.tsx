import { ConceptSummaryAiV2AvaDetail } from './ConceptSummaryAiV2AvaDetail';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Manage AVA modal (Figma 2454-9168)
 *
 * Standalone canvas frame documenting the "Manage AVA" modal. It renders the AVA
 * detail inner page with the manage dialog open on mount. The dialog exposes the
 * User deployment card — "Default in user settings" (On/Off), the "72/98 users
 * are using the default" link, and the "Allow users to change this setting"
 * checkbox — with Cancel / Save (Save disabled until the form is dirty). The
 * full interaction lives in ConceptSummaryAiV2AvaDetail (parent Manage button).
 * --------------------------------------------------------------------------- */

export function ConceptSummaryAiV2AvaManage() {
  return <ConceptSummaryAiV2AvaDetail startManageOpen />;
}
