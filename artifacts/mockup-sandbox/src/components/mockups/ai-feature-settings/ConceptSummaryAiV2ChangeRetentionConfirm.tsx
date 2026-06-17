import React from 'react';
import {
  AiStarsMd,
  AvaMd,
  AiWriterAltMd,
  AiSummaryMd,
  ClosedCaptionsMd,
  VoicemailMd,
  GlobeMd,
  InfoMd,
  CheckMd,
} from '@ringcentral/spring-icon';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard, ParentCard, SectionHeading } from './_chrome';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — "Change custom retention period?" confirm
 * (Figma 2030-40238)
 *
 * Shown when retention is already on and the admin changes the period (e.g.
 * 365 → 90 days), then clicks Save in the Manage AI features modal. Admin
 * must acknowledge potential data loss before "Confirm" enables.
 * --------------------------------------------------------------------------- */

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp }: { as: IconCmp }) => (
  <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
);

function ChangeRetentionConfirmDialog({
  open, onCancel, onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [acknowledged, setAcknowledged] = React.useState(false);
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-24">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-retention-title"
        className="relative z-10 flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col gap-8 overflow-visible px-6 pb-[60px] pt-9">
          <div className="flex flex-col gap-8">
            <div className="flex items-start py-3">
              <h2
                id="change-retention-title"
                className="flex-1 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]"
              >
                Change custom retention period for AI features?
              </h2>
            </div>

            <div className="flex min-h-[48px] w-full items-center gap-2 rounded-[10px] border border-[var(--sui-colors-neutral-b2)] bg-[var(--sui-colors-neutral-b4)]/50 px-4 py-2 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] backdrop-blur-[10px]">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[var(--sui-colors-neutral-b0)]">
                <InfoMd width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
              </span>
              <p className="flex-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)]">
                Changing a custom retention period may permanently delete older AI data.
              </p>
            </div>

            <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              Selecting a shorter retention period than your current policy may result in the removal of previously stored AI data that falls outside the new limit.
            </p>
          </div>

          <label className="flex w-[534px] max-w-full cursor-pointer items-start gap-2">
            <span
              role="checkbox"
              aria-checked={acknowledged}
              onClick={() => setAcknowledged((v) => !v)}
              className={[
                'mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border-[1.2px] transition-colors',
                acknowledged
                  ? 'border-[var(--sui-colors-primary-b)] bg-[var(--sui-colors-primary-b)] text-white'
                  : 'border-[var(--sui-colors-neutral-b2)] bg-white',
              ].join(' ')}
            >
              {acknowledged && (
                <CheckMd width={14} height={14} fill="currentColor" aria-hidden focusable={false} />
              )}
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
            />
            <span className="flex-1 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              I understand this action may result in data loss.
            </span>
          </label>
        </div>

        <div className="flex w-full items-start justify-end overflow-clip border-t border-[#DDDFE5]/50 px-6 pt-5">
          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center gap-2 pb-5">
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
                disabled={!acknowledged}
                className={[
                  'inline-flex h-[36px] min-w-[60px] items-center justify-center rounded-[10px] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors',
                  acknowledged
                    ? 'cursor-pointer bg-[var(--sui-colors-primary-b)] hover:bg-[var(--sui-colors-primary-b-high-contrast)]'
                    : 'cursor-not-allowed bg-[var(--sui-colors-neutral-b3)]',
                ].join(' ')}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConceptSummaryAiV2ChangeRetentionConfirm() {
  const [open, setOpen] = React.useState(true);

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          <ChangeRetentionConfirmDialog
            open={open}
            onCancel={() => setOpen(false)}
            onConfirm={() => setOpen(false)}
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
          summary={[{ label: 'AI data custom retention period:', value: '365 days' }]}
        />

        {/* AI Bot group — AVA replaces AI Assistant, parent of 5 features */}
        <SectionHeading>AI Bot</SectionHeading>
        <ParentCard
          title="AVA"
          icon={<SpringIcon as={AvaMd} />}
          featureCount={5}
          description="A personal assistant that helps you boost productivity."
        />

        <SectionHeading>Phone</SectionHeading>
        <ParentCard
          title="Closed captioning"
          icon={<SpringIcon as={ClosedCaptionsMd} />}
          featureCount={2}
          description="Uses AI to display real-time captions during phone calls."
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
