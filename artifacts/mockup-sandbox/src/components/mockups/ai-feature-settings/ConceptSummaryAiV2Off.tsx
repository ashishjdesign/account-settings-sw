import React from 'react';
import { AiStarsMd } from '@ringcentral/spring-icon';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard } from './_chrome';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Off state
 *
 * Master "AI features" toggle is OFF. All dependent cards (AI Assistant +
 * Phone / Chat / SMS groups) are hidden from the layout per the user request:
 * "they should be turned off and hidden from the layout when turning off".
 * --------------------------------------------------------------------------- */

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp }: { as: IconCmp }) => (
  <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
);

export function ConceptSummaryAiV2Off() {
  return (
    <FeatureSettingsShell flexLayout showFooterActions={false}>
      <PillTabs selected="AI" />

      <div className="flex flex-col gap-4">
        <SettingCard
          title="AI features"
          icon={<SpringIcon as={AiStarsMd} />}
          switchOn={false}
          description="Turn on AI support for calls, messages and video meetings. Deliver real-time answers, call notes, transcripts and meeting recaps to help teams stay focused and organized. Empower users to communicate clearly with built-in writing and polishing tools."
        />
      </div>
    </FeatureSettingsShell>
  );
}
