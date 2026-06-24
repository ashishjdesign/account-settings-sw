import React from 'react';
import {
  AiStarsMd,
  AiLightBulbMd,
} from '@ringcentral/spring-icon';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard } from './_chrome';
import { AssistantEnableConfirm } from './_assistantDialogs';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — AI Assistant enable confirmation
 * (Figma file xGbu5327bj9YvYed8lxZQk, node 2035-41070)
 *
 * Starting state: AI features ON, AI Assistant OFF (Phone/Chat/SMS sub-features
 * already hidden because they depend on the assistant). Confirm the dialog to
 * turn the assistant back on with the chosen user-deployment defaults.
 * --------------------------------------------------------------------------- */

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp }: { as: IconCmp }) => (
  <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
);

export function ConceptSummaryAiV2AssistantEnableConfirm() {
  const [assistantOn, setAssistantOn] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(true);

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          <AssistantEnableConfirm
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={() => {
              setAssistantOn(true);
              setConfirmOpen(false);
            }}
          />
        </div>
      }
    >
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
          switchOn={assistantOn}
          description="A personal AI virtual assistant that helps you boost productivity."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
        />
      </div>
    </FeatureSettingsShell>
  );
}
