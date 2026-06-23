import React from 'react';
import {
  AiStarsMd,
  AiLightBulbMd,
} from '@ringcentral/spring-icon';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard } from './_chrome';
import { AssistantReEnableConfirm } from './_assistantDialogs';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — AI Assistant re-enable confirmation
 * (Figma file xGbu5327bj9YvYed8lxZQk, node 2069-32183)
 *
 * Starting state: AI features ON, AI Assistant OFF (no user-level summary on
 * the assistant card — user-level management was removed). Confirm the dialog
 * to turn the assistant back on; Phone / chat / SMS AI features will be
 * restored to their previous on/off states.
 * --------------------------------------------------------------------------- */

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp }: { as: IconCmp }) => (
  <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
);

export function ConceptSummaryAiV2AssistantReEnableConfirm() {
  const [assistantOn, setAssistantOn] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(true);

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          <AssistantReEnableConfirm
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

        {/* AI Assistant — no user-level summary / Manage button anymore. */}
        <SettingCard
          title="AI Assistant"
          icon={<SpringIcon as={AiLightBulbMd} />}
          switchOn={assistantOn}
          description="A personal assistant that helps you boost productivity."
        />
      </div>
    </FeatureSettingsShell>
  );
}
