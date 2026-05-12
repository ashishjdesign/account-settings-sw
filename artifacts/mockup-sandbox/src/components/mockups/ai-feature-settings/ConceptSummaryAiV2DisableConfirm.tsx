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

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Disable confirmation dialog
 *
 * Top-level "AI features" toggle has no user-level configuration, so disabling
 * it just shows a simple confirmation (Figma 2014-51039). Confirming disables
 * AI features and hides every dependent feature card from the layout.
 * --------------------------------------------------------------------------- */

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp }: { as: IconCmp }) => (
  <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
);

function SpringConfirmDialog({
  open, title, body, onCancel, onConfirm, confirmLabel = 'Confirm',
}: {
  open: boolean;
  title: React.ReactNode;
  body?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
}) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-24">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex w-[600px] max-w-[calc(100%-32px)] flex-col rounded-[12px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)]"
      >
        <div className="flex flex-col gap-8 px-6 pb-10 pt-9">
          <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
            {title}
          </h2>
          {body && (
            <div className="flex flex-col gap-4 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              {body}
            </div>
          )}
        </div>
        <div className="border-t border-[#DDDFE5]/50" />
        <div className="flex justify-end gap-2 px-6 py-5">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--sui-colors-neutral-b4)] bg-white px-[18px] text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-[18px] text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ConceptSummaryAiV2DisableConfirm() {
  const [aiOn, setAiOn] = React.useState(true);
  const [confirmOpen, setConfirmOpen] = React.useState(true);

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          <SpringConfirmDialog
            open={confirmOpen}
            confirmLabel="Turn off"
            title={<>Turn off <span className="font-normal">AI features</span> for your organization?</>}
            body={
              <>
                <p>This will disable all AI features across your entire account and hide it from all users.</p>
                <div className="flex flex-col gap-0">
                  <p>
                    <span className="font-bold">AI Assistant </span>
                    with <span className="font-bold">phone, chat </span>
                    and <span className="font-bold">SMS AI features </span>
                    will also be turned off.
                  </p>
                  <p>If you turn it back on, previous user settings will be restored.</p>
                </div>
              </>
            }
            onCancel={() => setConfirmOpen(false)}
            onConfirm={() => { setAiOn(false); setConfirmOpen(false); }}
          />
        </div>
      }
    >
      <PillTabs selected="AI" />

      <div className="flex flex-col gap-4">
        <SettingCard
          title="AI features"
          icon={<SpringIcon as={AiStarsMd} />}
          switchOn={aiOn}
          description="Turn on AI support for calls, messages and video meetings. Deliver real-time answers, call notes, transcripts and meeting recaps to help teams stay focused and organized. Empower users to communicate clearly with built-in writing and polishing tools."
          summary={[{ label: 'AI data custom retention period:', value: 'Disabled' }]}
        />

        {aiOn && (
          <>
            <SettingCard
              title="AI Assistant"
              icon={<SpringIcon as={AiLightBulbMd} />}
              switchOn
              description="A personal assistant that helps you boost productivity."
              summary={[
                { label: 'User default:', value: 'On' },
                { label: 'User access:', value: 'Allowed' },
              ]}
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
              title="AI notes"
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
          </>
        )}
      </div>
    </FeatureSettingsShell>
  );
}
