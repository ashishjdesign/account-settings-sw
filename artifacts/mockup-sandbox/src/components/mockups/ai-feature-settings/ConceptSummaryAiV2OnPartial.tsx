import React from 'react';
import { AiStarsMd, AiLightBulbMd } from '@ringcentral/spring-icon';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard } from './_chrome';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — On (partial / restored state)
 *
 * Result of confirming "Turn on" on the enable-confirm dialog. The master AI
 * features toggle is back on, and previous user settings are restored — in this
 * scenario the admin had previously turned off every feature except AI
 * Assistant, so AI Assistant reappears (still off, matching its previous user
 * setting) while all other dependent features remain hidden from the layout.
 * --------------------------------------------------------------------------- */

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp }: { as: IconCmp }) => (
  <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
);

export function ConceptSummaryAiV2OnPartial() {
  return (
    <FeatureSettingsShell flexLayout showFooterActions={false}>
      <PillTabs selected="AI" />

      <div className="flex flex-col gap-4">
        <SettingCard
          title="AI features"
          icon={<SpringIcon as={AiStarsMd} />}
          switchOn
          description="Turn on AI support for calls, messages and video meetings. Deliver real-time answers, call notes, transcripts and meeting recaps to help teams stay focused and organized. Empower users to communicate clearly with built-in writing and polishing tools."
          summary={[{ label: 'AI data custom retention period:', value: 'Disabled' }]}
        />

        <SettingCard
          title="AI Assistant"
          icon={<SpringIcon as={AiLightBulbMd} />}
          switchOn={false}
          description="A personal assistant that helps you boost productivity."
        />
      </div>
    </FeatureSettingsShell>
  );
}
