import React from 'react';
import {
  AiStarsMd,
  AiLightBulbMd,
  AiWriterAltMd,
  AiSummaryMd,
  SmartNotesMd,
  ClosedCaptionsMd,
  TranscriptMd,
  VoicemailMd,
  GlobeMd,
} from '@ringcentral/spring-icon';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard, SectionHeading } from './_chrome';
import { AssistantManageDialog } from './_assistantDialogs';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Manage AI Assistant modal
 * (Figma file xGbu5327bj9YvYed8lxZQk, node 2035-40810)
 *
 * Starting state: AI features ON, AI Assistant ON, all sub-feature cards
 * visible. Clicking Manage on the AI Assistant card opens the modal. Save is
 * disabled until the form is dirty.
 * --------------------------------------------------------------------------- */

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp }: { as: IconCmp }) => (
  <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
);

export function ConceptSummaryAiV2AssistantManage() {
  const [open, setOpen] = React.useState(true);
  const [defaultVal, setDefaultVal] = React.useState<'On' | 'Off'>('On');
  const [allowChange, setAllowChange] = React.useState(true);

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          <AssistantManageDialog
            open={open}
            initialDefaultVal={defaultVal}
            initialAllowChange={allowChange}
            onCancel={() => setOpen(false)}
            onSave={(r) => {
              setDefaultVal(r.defaultVal);
              setAllowChange(r.allowChange);
              setOpen(false);
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
          switchOn
          description="A personal AI virtual assistant that helps you boost productivity."
          summary={[
            { label: 'User default:', value: defaultVal },
            { label: 'User access:', value: allowChange ? 'Allowed' : 'Restricted' },
          ]}
          onManage={() => setOpen(true)}
        />

        <SectionHeading>Phone</SectionHeading>
        <SettingCard
          title="Closed captioning"
          icon={<SpringIcon as={ClosedCaptionsMd} />}
          switchOn
          description="Uses AI to display real-time captions during phone calls."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
        />
        <SettingCard
          title="Live transcripts"
          icon={<SpringIcon as={TranscriptMd} />}
          switchOn
          description="Provides real-time AI-generated call transcripts."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
        />
        <SettingCard
          title="Call notes"
          icon={<SpringIcon as={SmartNotesMd} />}
          switchOn
          description="Generate call notes automatically for all your devices."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
        />
        <SettingCard
          title="AI voicemail summaries"
          icon={<SpringIcon as={VoicemailMd} />}
          switchOn
          description="Delivers AI-generated summaries of voicemails, including key details and follow-up items."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
        />

        <SectionHeading>Chat</SectionHeading>
        <SettingCard
          title="AI writer for messaging"
          icon={<SpringIcon as={AiWriterAltMd} />}
          switchOn
          description="Uses AI to draft and refine messages — check grammar, adjust tone or length, and translate to other languages."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
        />
        <SettingCard
          title="AI summary"
          icon={<SpringIcon as={AiSummaryMd} />}
          switchOn
          description="Provides AI summaries that highlight key conversation points."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
        />
        <SettingCard
          title="AI translation"
          icon={<SpringIcon as={GlobeMd} />}
          switchOn
          description="Uses AI to translate chats, messages, and transcripts across languages."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
        />

        <SectionHeading>SMS</SectionHeading>
        <SettingCard
          title="AI writer for SMS"
          icon={<SpringIcon as={AiWriterAltMd} />}
          switchOn
          description="Uses AI to draft and refine messages — check grammar, adjust tone or length, and translate to other languages."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
        />
      </div>
    </FeatureSettingsShell>
  );
}
