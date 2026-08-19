import React from 'react';
import {
  ArrowLeftMd,
  ClosedCaptionsMd,
  TranscriptionMd,
  SmartNotesMd,
  VoicemailMd,
} from '@ringcentral/spring-icon';
import { FeatureSettingsShell, SpringSwitch } from '../ai-feature-settings/_shared';

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp, size = 20 }: { as: IconCmp; size?: number }) => (
  <Cmp width={size} height={size} fill="currentColor" aria-hidden focusable={false} />
);

function FeatureIcon({ as, size = 20 }: { as: IconCmp; size?: number }) {
  return (
    <div className="flex h-[32px] w-5 shrink-0 items-center justify-center text-[var(--sui-colors-neutral-b1)]">
      <SpringIcon as={as} size={size} />
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[3px] border ${
          checked
            ? 'border-[var(--sui-colors-primary-b)] bg-[var(--sui-colors-primary-b)]'
            : 'border-[var(--sui-colors-neutral-b3)] bg-white'
        }`}
      >
        {checked && (
          <svg
            viewBox="0 0 12 10"
            className="h-[10px] w-[10px] text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="1.5 5 4.5 8 10.5 1.5" />
          </svg>
        )}
      </span>
      <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
        {label}
      </span>
    </label>
  );
}

/* Pill badge matching admin portal "User default / User access" style */
function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex h-[32px] items-center gap-2 whitespace-nowrap rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]">
      <span className="font-semibold">{label}</span>
      <span className="font-normal">{value}</span>
    </div>
  );
}

export function ConceptB({ onBack }: { onBack?: () => void }) {
  const [captioningOn, setCaptioningOn] = React.useState(true);
  const [transcriptsOn, setTranscriptsOn] = React.useState(true);
  const [callNotesOn, setCallNotesOn] = React.useState(false); // off to show caveat
  const [automaticCallNotes, setAutomaticCallNotes] = React.useState(true);
  const [voicemailOn, setVoicemailOn] = React.useState(true);

  return (
    <FeatureSettingsShell flexLayout showFooterActions={false}>
      {/* Back row */}
      <button
        type="button"
        onClick={onBack ?? (() => {})}
        className="mb-4 flex items-center gap-4 text-[var(--sui-colors-neutral-b1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)]/30"
      >
        <SpringIcon as={ArrowLeftMd} size={24} />
        <span className="text-[20px] font-semibold leading-[28px] tracking-[-0.2px]">
          Phone AI
        </span>
      </button>

      <div className="flex flex-col gap-3">
        {/* ── Card 1: Closed captioning ── */}
        <section className="rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
          <div className="flex items-start gap-4">
            <FeatureIcon as={ClosedCaptionsMd} />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex min-h-[32px] w-full items-center gap-4">
                <h3 className="flex-1 text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  Closed captioning
                </h3>
                <SpringSwitch checked={captioningOn} onCheckedChange={setCaptioningOn} />
              </div>
              <p className="text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                Uses AI to display real-time captions during phone calls.{' '}
                <a href="#" className="text-[var(--sui-colors-primary-b)] underline">
                  Learn more
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ── Card 2: Live transcripts + Call notes + in-call behavior ── */}
        {captioningOn && (
          <section className="rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white">
            {/* Live transcripts row */}
            <div className="flex items-start gap-4 p-4">
              <FeatureIcon as={TranscriptionMd} />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex min-h-[32px] w-full items-center gap-4">
                  <h3 className="flex-1 text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    Live transcripts
                  </h3>
                  <SpringSwitch checked={transcriptsOn} onCheckedChange={setTranscriptsOn} />
                </div>
                <p className="text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                  Provides real-time AI-generated call transcripts.{' '}
                  <a href="#" className="text-[var(--sui-colors-primary-b)] underline">
                    Learn more
                  </a>
                </p>
              </div>
            </div>

            {/* Call notes — nested inside LT card */}
            {transcriptsOn && (
              <div className="flex items-start gap-3 border-t border-[var(--sui-colors-neutral-b4)] px-4 py-3 pl-[52px]">
                <FeatureIcon as={SmartNotesMd} size={18} />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-center gap-4">
                    <h4 className="flex-1 text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      Call notes
                    </h4>
                    <SpringSwitch checked={callNotesOn} onCheckedChange={setCallNotesOn} />
                  </div>
                  <p className="text-[13px] leading-[18px] text-[var(--sui-colors-neutral-b2)]">
                    Generates call notes automatically for all your devices.{' '}
                    <a href="#" className="text-[var(--sui-colors-primary-b)] underline">
                      Learn more
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Notes in-call behavior — group footer inside LT card */}
            {transcriptsOn && (
              <div className="border-t border-[var(--sui-colors-neutral-b4)] px-4 py-4">
                <p className="mb-2 text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  Notes in-call behavior
                </p>
                <Checkbox
                  checked={automaticCallNotes}
                  onChange={setAutomaticCallNotes}
                  label="Automatic call notes"
                />
                {automaticCallNotes && (
                  <p className="mt-1 pl-[24px] text-[13px] leading-[18px] text-[var(--sui-colors-neutral-b2)]">
                    {callNotesOn
                      ? 'Notes start on automatically when a call begins.'
                      : 'When Call notes is off, applies to Live transcripts only.'}
                  </p>
                )}
              </div>
            )}
          </section>
        )}

        {/* ── Card 3: AI voicemail summaries (keeps user deployment) ── */}
        <section className="rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
          <div className="flex items-start gap-4">
            <FeatureIcon as={VoicemailMd} />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex min-h-[32px] w-full items-center gap-4">
                <h3 className="flex-1 text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  AI voicemail summaries
                </h3>
                <SpringSwitch checked={voicemailOn} onCheckedChange={setVoicemailOn} />
              </div>
              <p className="text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                Delivers AI-generated summaries of voicemails, including key details and
                follow-up items.{' '}
                <a href="#" className="text-[var(--sui-colors-primary-b)] underline">
                  Learn more
                </a>
              </p>
              {voicemailOn && (
                <div className="mt-1 flex w-full items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill label="User default:" value="On" />
                    <Pill label="User access:" value="Allowed" />
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-[32px] shrink-0 items-center justify-center rounded-[10px] px-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-primary-b)] hover:text-[var(--sui-colors-primary-b-high-contrast)]"
                  >
                    Manage
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </FeatureSettingsShell>
  );
}
