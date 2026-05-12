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
  CaretDownMd,
} from '@ringcentral/spring-icon';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard, SectionHeading } from './_chrome';
import { RetentionPeriodSelect, RETENTION_PERIODS } from './_retention';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — "Manage AI features" modal, retention enabled
 * (Figma 1969-7046, popper Figma 2015-39944)
 * --------------------------------------------------------------------------- */

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp }: { as: IconCmp }) => (
  <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
);

function SpringSwitch({ on }: { on: boolean }) {
  return (
    <span
      role="switch"
      aria-checked={on}
      className={[
        'relative inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer items-center rounded-full transition-colors',
        on ? 'bg-[var(--sui-colors-primary-b)]' : 'bg-[var(--sui-colors-neutral-b3)]',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-1/2 inline-block h-[20px] w-[20px] -translate-y-1/2 rounded-full bg-white shadow transition-all',
          on ? 'left-[18px]' : 'left-[2px]',
        ].join(' ')}
      />
    </span>
  );
}

function ManageAiFeaturesDialog({
  open, onCancel, onSave,
}: {
  open: boolean;
  onCancel: () => void;
  onSave: () => void;
}) {
  const [period, setPeriod] = React.useState(RETENTION_PERIODS[0].value);
  if (!open) return null;
  const dirty = period !== RETENTION_PERIODS[0].value;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-24">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="manage-ai-features-title"
        className="relative z-10 flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col gap-8 overflow-visible px-6 pb-10 pt-9">
          <div className="flex flex-col gap-6">
            <div className="flex items-start py-3">
              <h2
                id="manage-ai-features-title"
                className="flex-1 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]"
              >
                Manage AI features
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                Feature settings
              </p>

              <div className="flex flex-col gap-4 rounded-[8px] border border-[var(--sui-colors-neutral-b4)] p-4">
                <div className="flex w-full flex-col items-start justify-center gap-1">
                  <div className="flex min-h-[32px] w-full items-center gap-4">
                    <div className="flex min-w-0 flex-1 items-center">
                      <p className="text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                        AI data custom retention period
                      </p>
                    </div>
                    <SpringSwitch on />
                  </div>
                  <div className="flex w-full items-center pr-[130px]">
                    <p className="flex-1 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                      Enable custom data retention to set an AI-specific storage period including AI notes and transcriptions.{' '}
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-[#066FAC] underline decoration-solid"
                      >
                        Learn more
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex w-full items-center border-t border-[var(--sui-colors-neutral-b4)] pt-4">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      Custom storage duration
                    </p>
                    <RetentionPeriodSelect value={period} onChange={setPeriod} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-start justify-end overflow-clip border-t border-[#DDDFE5]/50 px-6 pt-5">
          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center gap-2 pb-5">
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--sui-colors-neutral-b0)]/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSave}
                disabled={!dirty}
                className={[
                  'inline-flex h-[36px] min-w-[60px] items-center justify-center rounded-[10px] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors',
                  dirty
                    ? 'cursor-pointer bg-[var(--sui-colors-primary-b)] hover:bg-[var(--sui-colors-primary-b-high-contrast)]'
                    : 'cursor-not-allowed bg-[var(--sui-colors-neutral-b3)]',
                ].join(' ')}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConceptSummaryAiV2ManageMainModalEnabled() {
  const [open, setOpen] = React.useState(true);
  // Suppress unused-import warnings (kept for visual parity with siblings).
  void CaretDownMd;

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          <ManageAiFeaturesDialog
            open={open}
            onCancel={() => setOpen(false)}
            onSave={() => setOpen(false)}
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
      </div>
    </FeatureSettingsShell>
  );
}
