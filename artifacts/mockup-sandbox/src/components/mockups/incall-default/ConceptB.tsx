import React from 'react';
import {
  ArrowLeftMd,
  ClosedCaptionsMd,
  TranscriptionMd,
  SmartNotesMd,
} from '@ringcentral/spring-icon';
import { FeatureSettingsShell, SpringSwitch } from '../ai-feature-settings/_shared';

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp, size = 20 }: { as: IconCmp; size?: number }) => (
  <Cmp width={size} height={size} fill="currentColor" aria-hidden focusable={false} />
);

function FeatureIcon({ as }: { as: IconCmp }) {
  return (
    <div className="flex h-[32px] w-5 shrink-0 items-center justify-center text-[var(--sui-colors-neutral-b1)]">
      <SpringIcon as={as} />
    </div>
  );
}

function Checkbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-start gap-2">
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span
        className={`mt-[2px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[3px] border ${
          checked
            ? 'border-[var(--sui-colors-primary-b)] bg-[var(--sui-colors-primary-b)]'
            : 'border-[var(--sui-colors-neutral-b3)] bg-white'
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 10" className="h-[10px] w-[10px] text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1.5 5 4.5 8 10.5 1.5" />
          </svg>
        )}
      </span>
      <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
        Keep Notes on by default during calls
      </span>
    </label>
  );
}

export function ConceptB({ onBack }: { onBack?: () => void }) {
  const [captioningOn, setCaptioningOn] = React.useState(true);
  const [transcriptsOn, setTranscriptsOn] = React.useState(true);
  const [notesOn, setNotesOn] = React.useState(false); // off to show caveat
  const [autoStart, setAutoStart] = React.useState(true);

  return (
    <FeatureSettingsShell flexLayout showFooterActions={false}>
      {/* Back row */}
      <button
        type="button"
        onClick={onBack ?? (() => {})}
        className="mb-4 flex items-center gap-4 text-[var(--sui-colors-neutral-b1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)]/30"
      >
        <SpringIcon as={ArrowLeftMd} size={24} />
        <span className="text-[20px] font-semibold leading-[28px] tracking-[-0.2px]">Phone AI</span>
      </button>

      {/* ── CC family group — one shared container, shared footer ── */}
      <div className="overflow-hidden rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white">

        {/* Row 1: Closed captioning */}
        <div className="flex items-start gap-4 p-4">
          <FeatureIcon as={ClosedCaptionsMd} />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex min-h-[32px] w-full items-center gap-4">
              <h3 className="flex-1 text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">Closed captioning</h3>
              <SpringSwitch checked={captioningOn} onCheckedChange={setCaptioningOn} />
            </div>
            <p className="text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b2)]">
              Uses AI to display real-time captions during phone calls.{' '}
              <a href="#" className="text-[var(--sui-colors-primary-b)] underline">Learn more</a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--sui-colors-neutral-b4)]" />

        {/* Row 2: Live transcripts + Call notes nested */}
        {captioningOn && (
          <>
            <div className="flex items-start gap-4 p-4">
              <FeatureIcon as={TranscriptionMd} />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex min-h-[32px] w-full items-center gap-4">
                  <h3 className="flex-1 text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">Live transcripts</h3>
                  <SpringSwitch checked={transcriptsOn} onCheckedChange={setTranscriptsOn} />
                </div>
                <p className="text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                  Provides real-time AI-generated call transcripts.{' '}
                  <a href="#" className="text-[var(--sui-colors-primary-b)] underline">Learn more</a>
                </p>

                {/* Call notes nested inside LT */}
                {transcriptsOn && (
                  <div className="mt-2 flex items-start gap-3 border-t border-[var(--sui-colors-neutral-b4)] pt-3">
                    <div className="flex h-[28px] w-5 shrink-0 items-center justify-center text-[var(--sui-colors-neutral-b2)]">
                      <SpringIcon as={SmartNotesMd} size={18} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-center gap-4">
                        <h4 className="flex-1 text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">Call notes</h4>
                        <SpringSwitch checked={notesOn} onCheckedChange={setNotesOn} />
                      </div>
                      <p className="text-[13px] leading-[18px] text-[var(--sui-colors-neutral-b2)]">
                        Generates call notes automatically for all your devices.{' '}
                        <a href="#" className="text-[var(--sui-colors-primary-b)] underline">Learn more</a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[var(--sui-colors-neutral-b4)]" />

            {/* Group footer — Notes in-call behavior. Sits at the bottom of the
                shared container so it's visually clear it governs the whole
                CC family (CC + LT + Call notes), not just LT alone. */}
            <div className="px-5 py-4">
              <p className="mb-2 text-[13px] font-semibold leading-[18px] text-[var(--sui-colors-neutral-b1)]">
                Notes in-call behavior
              </p>
              <Checkbox checked={autoStart} onChange={setAutoStart} />
              {autoStart && (
                <p className="mt-1 pl-[24px] text-[13px] leading-[18px] text-[var(--sui-colors-neutral-b2)]">
                  {notesOn
                    ? 'Live transcripts and Call notes start on when a call begins.'
                    : 'When Call notes is off, applies to Live transcripts only.'}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </FeatureSettingsShell>
  );
}
