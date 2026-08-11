import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  FeatureSettingsShell,
  PillTab,
  SpringSelect,
  SpringSwitch,
  LabelWithInfo,
  SubRow,
  UserDefaultsRow,
  UserPermissionsRow,
} from './_shared';

/* -----------------------------------------------------------------------------
 * Setting card with summary line + Manage CTA (collapsed sub-settings).
 *
 * Summary segments per Figma 1786:54673 — each segment is "Label: value"
 * (label Inter Semibold 14/20, value Inter Regular 14/20) or plain text;
 * segments separated by an 8px vertical divider in neutral-b4.
 * --------------------------------------------------------------------------- */
type SummarySegment = { label?: string; value: string };

function SettingCard({
  title, description, switchOn, icon = 'ai-stars', summary, onManage,
}: {
  title: string;
  description: React.ReactNode;
  switchOn: boolean;
  icon?: 'ai-stars' | 'ai-lightbulb' | 'ai-writer';
  summary?: SummarySegment[];
  onManage?: () => void;
}) {
  return (
    <section className="flex items-start gap-4 rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
      <div className="flex h-[32px] items-center justify-center shrink-0">
        <img
          src={`/__mockup/figma-ref/icons/${icon}.svg`}
          alt=""
          aria-hidden="true"
          width={20}
          height={20}
          className="block h-5 w-5 shrink-0"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {/* Title row */}
        <div className="flex min-h-[32px] w-full items-center gap-4">
          <h3 className="flex-1 truncate text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            {title}
          </h3>
          <SpringSwitch checked={switchOn} />
        </div>

        {/* Description */}
        <p className="pr-[130px] text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
          {description}{' '}
          <a href="#" className="font-normal text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]">
            Learn more
          </a>
        </p>

        {/* Summary + Manage row (Figma 1786:54673) */}
        {summary && summary.length > 0 && switchOn && (
          <div className="flex w-full items-center justify-between gap-4 mt-2">
            <div className="flex min-w-0 flex-1 items-center text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              {summary.map((seg, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex items-center gap-2 whitespace-nowrap',
                    i > 0 && 'ml-2 border-l border-[var(--sui-colors-neutral-b4)] pl-2',
                  )}
                >
                  {seg.label && <span className="font-semibold">{seg.label}</span>}
                  <span className="font-normal">{seg.value}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={onManage}
              className="inline-flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] px-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-primary-b)] transition-colors hover:text-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
            >
              Manage
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Spring Dialog (modal)
 *
 * Spring DS dialog spec: white surface, 12px radius, 24px padding,
 * level-3 elevation shadow, 40% black scrim. Header has the title in
 * Inter Semibold 18/24 and a 24px close (X) button. Footer right-aligned
 * action buttons reusing the existing Spring button spec.
 * --------------------------------------------------------------------------- */
function SpringDialog({
  open, title, onClose, children,
}: React.PropsWithChildren<{ open: boolean; title: string; onClose: () => void }>) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-20">
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Surface */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 flex w-[720px] max-w-[calc(100%-32px)] flex-col rounded-[12px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)]"
      >
        {/* Header */}
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

        {/* Body */}
        <div className="flex flex-col px-6 py-2">
          {children}
        </div>

        {/* Footer */}
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

/* -----------------------------------------------------------------------------
 * MAIN
 * --------------------------------------------------------------------------- */
type ModalKey = 'ai-assistant' | 'auto-call-notes' | null;

export function ConceptSummaryModal() {
  const [modal, setModal] = React.useState<ModalKey>(null);

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          <SpringDialog
            open={modal === 'ai-assistant'}
            title="Manage AI Assistant"
            onClose={() => setModal(null)}
          >
            <SubRow>
              <LabelWithInfo>Call notes and transcriptions retention period</LabelWithInfo>
              <SpringSelect value="365 days (Default)" width={200} />
            </SubRow>
            <UserDefaultsRow />
            <UserPermissionsRow />
          </SpringDialog>

          <SpringDialog
            open={modal === 'auto-call-notes'}
            title="Manage Automatic call notes"
            onClose={() => setModal(null)}
          >
            <UserDefaultsRow />
            <UserPermissionsRow />
          </SpringDialog>
        </div>
      }
    >
      <div className="mb-6 flex flex-wrap gap-2">
        <PillTab label="General" />
        <PillTab label="Phone" />
        <PillTab label="AI" selected />
        <PillTab label="SMS" />
        <PillTab label="Fax" />
      </div>

      <div className="flex flex-col gap-4">
        <SettingCard
          title="AI features"
          switchOn
          description="Turn on AI support for calls, messages and video meetings. Deliver real-time answers, call notes, transcripts and meeting recaps to help teams stay focused and organized. Empower users to communicate clearly with built-in writing and polishing tools."
        />

        <SettingCard
          title="AI Assistant"
          switchOn
          icon="ai-lightbulb"
          description="A personal AI virtual assistant that helps you boost productivity."
          summary={[
            { label: 'Data retention period:', value: '365 days' },
            { label: 'User default:', value: 'On' },
            { value: 'Users can change this setting' },
          ]}
          onManage={() => setModal('ai-assistant')}
        />

        <SettingCard
          title="Automatic call notes"
          switchOn
          icon="ai-writer"
          description="Generate call notes automatically for all your devices."
          summary={[
            { label: 'User default:', value: 'On' },
            { value: 'Users can change this setting' },
          ]}
          onManage={() => setModal('auto-call-notes')}
        />
      </div>
    </FeatureSettingsShell>
  );
}
