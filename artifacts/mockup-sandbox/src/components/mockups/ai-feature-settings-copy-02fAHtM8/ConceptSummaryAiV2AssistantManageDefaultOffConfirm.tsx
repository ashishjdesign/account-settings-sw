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
import {
  AssistantManageDialog,
  AssistantManageDefaultOffConfirm,
} from './_assistantDialogs';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Manage AI Assistant: confirm "Default → Off"
 * (Figma file xGbu5327bj9YvYed8lxZQk, node 2035-41300)
 *
 * Starting state: AI features ON, AI Assistant ON (default On). Manage modal
 * is open with default already flipped to Off → pressing Save raises the
 * secondary confirm. Confirming closes both dialogs and flips the default of
 * every Phone / Chat / SMS sub-feature to Off (mirrored in the cards below).
 * --------------------------------------------------------------------------- */

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp }: { as: IconCmp }) => (
  <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
);

export function ConceptSummaryAiV2AssistantManageDefaultOffConfirm() {
  // This mockup mirrors Figma node 2035-41300 — the secondary confirm shown
  // alone on top of the Feature Settings page (the Manage AI Assistant dialog
  // is not visible underneath in the Figma frame).
  const [manageOpen, setManageOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(true);
  const [assistantDefault, setAssistantDefault] = React.useState<'On' | 'Off'>('On');
  const [allowChange, setAllowChange] = React.useState(true);
  const [pendingDefault, setPendingDefault] = React.useState<'On' | 'Off'>('Off');
  const [pendingAllow, setPendingAllow] = React.useState(true);
  const [subFeatureDefault, setSubFeatureDefault] = React.useState<'On' | 'Off'>('On');

  const subRow = (label: string, _icon: React.ReactNode) =>
    [
      { label: 'User default:', value: subFeatureDefault },
      { label: 'User access:', value: 'Allowed' },
    ];

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          <AssistantManageDialog
            open={manageOpen}
            initialDefaultVal={assistantDefault}
            initialAllowChange={allowChange}
            onCancel={() => setManageOpen(false)}
            onSave={(r) => {
              if (r.defaultVal === 'Off' && assistantDefault === 'On') {
                setPendingDefault(r.defaultVal);
                setPendingAllow(r.allowChange);
                setConfirmOpen(true);
              } else {
                setAssistantDefault(r.defaultVal);
                setAllowChange(r.allowChange);
                setManageOpen(false);
              }
            }}
          />
          <AssistantManageDefaultOffConfirm
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={() => {
              setAssistantDefault(pendingDefault);
              setAllowChange(pendingAllow);
              setSubFeatureDefault('Off');
              setConfirmOpen(false);
              setManageOpen(false);
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
          description="A personal assistant that helps you boost productivity."
          summary={[
            { label: 'User default:', value: assistantDefault },
            { label: 'User access:', value: allowChange ? 'Allowed' : 'Restricted' },
          ]}
          onManage={() => setManageOpen(true)}
        />

        <SectionHeading>Phone</SectionHeading>
        <SettingCard title="Closed captioning" icon={<SpringIcon as={ClosedCaptionsMd} />} switchOn description="Uses AI to display real-time captions during phone calls." summary={subRow('Closed captioning', null)} />
        <SettingCard title="Live transcripts" icon={<SpringIcon as={TranscriptMd} />} switchOn description="Provides real-time AI-generated call transcripts." summary={subRow('Live transcripts', null)} />
        <SettingCard title="AI notes" icon={<SpringIcon as={SmartNotesMd} />} switchOn description="Generate call notes automatically for all your devices." summary={subRow('AI notes', null)} />
        <SettingCard title="AI voicemail summaries" icon={<SpringIcon as={VoicemailMd} />} switchOn description="Delivers AI-generated summaries of voicemails, including key details and follow-up items." summary={subRow('AI voicemail summaries', null)} />

        <SectionHeading>Chat</SectionHeading>
        <SettingCard title="AI writer for messaging" icon={<SpringIcon as={AiWriterAltMd} />} switchOn description="Uses AI to draft and refine messages — check grammar, adjust tone or length, and translate to other languages." summary={subRow('AI writer for messaging', null)} />
        <SettingCard title="AI summary" icon={<SpringIcon as={AiSummaryMd} />} switchOn description="Provides AI summaries that highlight key conversation points." summary={subRow('AI summary', null)} />
        <SettingCard title="AI translation" icon={<SpringIcon as={GlobeMd} />} switchOn description="Uses AI to translate chats, messages, and transcripts across languages." summary={subRow('AI translation', null)} />

        <SectionHeading>SMS</SectionHeading>
        <SettingCard title="AI writer for SMS" icon={<SpringIcon as={AiWriterAltMd} />} switchOn description="Uses AI to draft and refine messages — check grammar, adjust tone or length, and translate to other languages." summary={subRow('AI writer for SMS', null)} />
      </div>
    </FeatureSettingsShell>
  );
}
