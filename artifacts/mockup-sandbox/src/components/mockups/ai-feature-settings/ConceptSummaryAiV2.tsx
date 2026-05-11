import React from 'react';
import { X } from 'lucide-react';
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
import {
  FeatureSettingsShell,
  SpringSelect,
  LabelWithInfo,
  SubRow,
  UserDefaultsRow,
  UserPermissionsRow,
} from './_shared';
import { PillTabs, SettingCard, SectionHeading } from './_chrome';

/* Spring DS icons render as 32×32 SVG with no fill — render at 20×20 with
 * fill="currentColor" so they inherit the SettingCard icon-slot color. */
type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp }: { as: IconCmp }) => (
  <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
);

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 (Figma 2010-39488 "AI Features V2")
 *
 * Mirrors the redesigned admin-portal AI tab:
 *   AI features (master), AI Assistant
 *   Phone group:  Closed captioning, Live transcripts, AI notes, AI voicemail summaries
 *   Chat group:   AI writer for messaging, AI summary, AI translation
 *   SMS group:    AI writer for SMS
 *
 * Each card has switch + summary footer (User default / User access) + Manage.
 * AI features summary shows "AI data custom retention period: Disabled".
 * --------------------------------------------------------------------------- */

function SpringDialog({
  open,
  title,
  onClose,
  children,
}: React.PropsWithChildren<{ open: boolean; title: string; onClose: () => void }>) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-20">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 flex w-[720px] max-w-[calc(100%-32px)] flex-col rounded-[12px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)]"
      >
        <div className="flex items-center justify-between gap-4 px-6 pb-3 pt-6">
          <h2 className="min-w-0 flex-1 text-[18px] font-semibold leading-[24px] text-[var(--sui-colors-neutral-b1)]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[var(--sui-colors-neutral-b1)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
        <div className="flex flex-col px-6 py-2">{children}</div>
        <div className="flex justify-end gap-2 px-6 pb-6 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-[32px] min-w-[56px] items-center justify-center rounded-[10px] border border-black/20 bg-white px-3 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-[32px] min-w-[56px] items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

type ModalKey =
  | 'ai-features'
  | 'ai-assistant'
  | 'closed-captioning'
  | 'live-transcripts'
  | 'ai-notes'
  | 'ai-voicemail-summaries'
  | 'ai-writer-messaging'
  | 'ai-summary'
  | 'ai-translation'
  | 'ai-writer-sms'
  | null;

export function ConceptSummaryAiV2() {
  const [modal, setModal] = React.useState<ModalKey>(null);
  const close = () => setModal(null);

  return (
    <FeatureSettingsShell flexLayout showFooterActions={false}
      after={
        <div className="spring-scope">
          <SpringDialog open={modal === 'ai-features'} title="Manage AI features" onClose={close}>
            <SubRow>
              <LabelWithInfo>AI notes and transcriptions retention period</LabelWithInfo>
              <SpringSelect value="Disabled" width={200} />
            </SubRow>
          </SpringDialog>
          <SpringDialog open={modal === 'ai-assistant'} title="Manage AI Assistant" onClose={close}>
            <UserDefaultsRow />
            <UserPermissionsRow />
          </SpringDialog>
          {(
            [
              ['closed-captioning', 'Closed captioning'],
              ['live-transcripts', 'Live transcripts'],
              ['ai-notes', 'AI notes'],
              ['ai-voicemail-summaries', 'AI voicemail summaries'],
              ['ai-writer-messaging', 'AI writer for messaging'],
              ['ai-summary', 'AI summary'],
              ['ai-translation', 'AI translation'],
              ['ai-writer-sms', 'AI writer for SMS'],
            ] as const
          ).map(([key, title]) => (
            <SpringDialog key={key} open={modal === key} title={`Manage ${title}`} onClose={close}>
              <UserDefaultsRow />
              <UserPermissionsRow />
            </SpringDialog>
          ))}
        </div>
      }
    >
      <PillTabs selected="AI" />

      <div className="flex flex-col gap-4">
        {/* Top — ungrouped */}
        <SettingCard
          title="AI features"
          icon={<SpringIcon as={AiStarsMd} />}
          switchOn
          description="Turn on AI support for calls, messages and video meetings. Deliver real-time answers, call notes, transcripts and meeting recaps to help teams stay focused and organized. Empower users to communicate clearly with built-in writing and polishing tools."
          summary={[{ label: 'AI data custom retention period:', value: 'Disabled' }]}
          onManage={() => setModal('ai-features')}
        />
        <SettingCard
          title="AI Assistant"
          icon={<SpringIcon as={AiLightBulbMd} />}
          switchOn
          description="A personal assistant that helps you boost productivity."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
          onManage={() => setModal('ai-assistant')}
        />

        {/* Phone group */}
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
          onManage={() => setModal('closed-captioning')}
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
          onManage={() => setModal('live-transcripts')}
        />
        <SettingCard
          title="AI notes"
          icon={<SpringIcon as={SmartNotesMd} />}
          switchOn
          description="Generate call notes automatically for all your devices."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
          onManage={() => setModal('ai-notes')}
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
          onManage={() => setModal('ai-voicemail-summaries')}
        />

        {/* Chat group */}
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
          onManage={() => setModal('ai-writer-messaging')}
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
          onManage={() => setModal('ai-summary')}
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
          onManage={() => setModal('ai-translation')}
        />

        {/* SMS group */}
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
          onManage={() => setModal('ai-writer-sms')}
        />
      </div>
    </FeatureSettingsShell>
  );
}
