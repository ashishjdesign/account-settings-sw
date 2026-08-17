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

function FeatureBody({
  title,
  description,
  checked,
  onCheckedChange,
  children,
}: React.PropsWithChildren<{
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
}>) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex flex-col gap-2">
        <div className="flex min-h-[32px] w-full items-center gap-4">
          <h3 className="flex-1 truncate text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            {title}
          </h3>
          <SpringSwitch checked={checked} onCheckedChange={onCheckedChange} aria-label={title} />
        </div>

        <p className="pr-[130px] text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
          {description}{' '}
          <a
            href="#"
            className="font-normal text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
          >
            Learn more
          </a>
        </p>
      </div>

      {children}
    </div>
  );
}

function FeatureIcon({ as }: { as: IconCmp }) {
  return (
    <div className="flex h-[32px] w-5 shrink-0 items-center justify-center text-[var(--sui-colors-neutral-b1)]">
      <SpringIcon as={as} />
    </div>
  );
}

export function ConceptB({
  onBack,
}: {
  onBack?: () => void;
}) {
  const [captioningOn, setCaptioningOn] = React.useState(true);
  const [transcriptsOn, setTranscriptsOn] = React.useState(true);
  const [notesOn, setNotesOn] = React.useState(true);
  const [autoStart, setAutoStart] = React.useState(true);

  const handleBack =
    onBack ??
    (() => {
      // no-op for generic preview
    });

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
    >
      {/* Back row — ← Closed captioning */}
      <button
        type="button"
        onClick={handleBack}
        className="mb-4 flex items-center gap-4 text-[var(--sui-colors-neutral-b1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)]/30"
      >
        <SpringIcon as={ArrowLeftMd} size={24} />
        <span className="text-[20px] font-semibold leading-[28px] tracking-[-0.2px]">
          Closed captioning
        </span>
      </button>

      <section className="rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
        {/* Parent */}
        <div className="flex items-start gap-4">
          <FeatureIcon as={ClosedCaptionsMd} />
          <FeatureBody
            title="Closed captioning"
            description="Uses AI to display real-time captions during phone calls."
            checked={captioningOn}
            onCheckedChange={setCaptioningOn}
          >
            {/* Dependent features */}
            {captioningOn && (
              <div className="mt-4 flex flex-col">
                <div className="flex items-start gap-4 border-t border-[var(--sui-colors-neutral-b4)] py-4">
                  <FeatureIcon as={TranscriptionMd} />
                  <FeatureBody
                    title="Live transcripts"
                    description="Provides real-time AI-generated call transcripts."
                    checked={transcriptsOn}
                    onCheckedChange={setTranscriptsOn}
                  />
                </div>

                <div className="border-t border-[var(--sui-colors-neutral-b4)] pt-4 pb-2 pl-10">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--sui-colors-neutral-b3)]">
                    In-call behavior
                  </p>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={autoStart}
                      onChange={(e) => setAutoStart(e.target.checked)}
                    />
                    <span
                      className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[3px] border ${
                        autoStart
                          ? 'border-[var(--sui-colors-primary-b)] bg-[var(--sui-colors-primary-b)]'
                          : 'border-[var(--sui-colors-neutral-b3)] bg-white'
                      }`}
                    >
                      {autoStart && (
                        <svg
                          viewBox="0 0 12 10"
                          className="h-[10px] w-[10px] text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="1.5 5 4.5 8 10.5 1.5" />
                        </svg>
                      )}
                    </span>
                    <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      Keep Notes on by default during calls
                    </span>
                  </label>
                  <p className="mt-1 pl-[24px] text-[13px] leading-[18px] text-[var(--sui-colors-neutral-b2)]">
                    Live transcripts and Call notes start on when a call begins.
                  </p>
                  <p className="mt-0.5 pl-[24px] text-[12px] leading-[17px] text-[var(--sui-colors-neutral-b3)]">
                    When Call notes is off, applies to Live transcripts only.
                  </p>
                </div>

                <div className="flex items-start gap-4 border-t border-[var(--sui-colors-neutral-b4)] py-4">
                  <FeatureIcon as={SmartNotesMd} />
                  <FeatureBody
                    title="Call notes"
                    description="Generate call notes automatically for all your devices."
                    checked={notesOn}
                    onCheckedChange={setNotesOn}
                  />
                </div>
              </div>
            )}
          </FeatureBody>
        </div>
      </section>
    </FeatureSettingsShell>
  );
}
