import React from 'react';
import {
  ArrowLeftMd,
  ClosedCaptionsMd,
  SmartNotesMd,
  TranscriptionMd,
  VoicemailMd,
} from '@ringcentral/spring-icon';
import { FeatureSettingsShell, SpringSwitch } from '../ai-feature-settings/_shared';

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;

function Icon({ as: Cmp }: { as: IconCmp }) {
  return (
    <div className="flex h-[32px] w-5 shrink-0 items-center justify-center text-[var(--sui-colors-neutral-b1)]">
      <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
    </div>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex h-[32px] items-center gap-2 whitespace-nowrap rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]">
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

function DeploymentSummary({ featureName }: { featureName: string }) {
  return (
    <div className="mt-2 flex w-full flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap gap-2">
        <Pill label="User default" value="On" />
        <Pill label="User access" value="Allowed" />
      </div>
      <button
        type="button"
        aria-label={`Manage ${featureName} user deployment`}
        className="h-[32px] rounded-[10px] px-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-primary-b)] hover:text-[var(--sui-colors-primary-b-high-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)] focus-visible:ring-offset-2"
      >
        Manage
      </button>
    </div>
  );
}

function Description({ children }: React.PropsWithChildren) {
  return (
    <p className="text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b2)]">
      {children}{' '}
      <a href="#" onClick={(event) => event.preventDefault()} className="text-[var(--sui-colors-primary-b)] underline">
        Learn more
      </a>
    </p>
  );
}

export function EditableSharedBehavior({
  onBack,
  automaticRestricted = true,
}: {
  onBack?: () => void;
  automaticRestricted?: boolean;
}) {
  const [captioningOn, setCaptioningOn] = React.useState(true);
  const [transcriptsOn, setTranscriptsOn] = React.useState(true);
  const [callNotesOn, setCallNotesOn] = React.useState(true);
  const [voicemailOn, setVoicemailOn] = React.useState(true);
  const [automaticOn, setAutomaticOn] = React.useState(true);

  return (
    <FeatureSettingsShell flexLayout showFooterActions={false}>
      <button
        type="button"
        onClick={onBack ?? (() => {})}
        className="mb-4 flex items-center gap-4 rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)] focus-visible:ring-offset-2"
      >
        <ArrowLeftMd width={24} height={24} fill="currentColor" aria-hidden focusable={false} />
        <span className="text-[20px] font-semibold leading-[28px] tracking-[-0.2px]">Phone AI</span>
      </button>

      <div className="flex flex-col gap-3">
        <section className="rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
          <div className="flex items-start gap-4">
            <Icon as={ClosedCaptionsMd} />
            <div className="min-w-0 flex-1">
              <div className="flex min-h-[32px] items-center gap-4">
                <h3 className="flex-1 text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  Closed captioning
                </h3>
                <SpringSwitch
                  aria-label="Turn off Closed captioning"
                  checked={captioningOn}
                  onCheckedChange={setCaptioningOn}
                />
              </div>
              <Description>Uses AI to display real-time captions during phone calls.</Description>
              {captioningOn && <DeploymentSummary featureName="Closed captioning" />}
            </div>
          </div>
        </section>

        {captioningOn && (
          <section className="rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
            <div className="flex items-start gap-4">
              <Icon as={TranscriptionMd} />
              <div className="min-w-0 flex-1">
                <div className="flex min-h-[32px] items-center gap-4">
                  <h3 className="flex-1 text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    Live transcripts
                  </h3>
                  <SpringSwitch
                    aria-label={`Turn ${transcriptsOn ? 'off' : 'on'} Live transcripts`}
                    checked={transcriptsOn}
                    onCheckedChange={setTranscriptsOn}
                  />
                </div>
                <Description>Provides real-time AI-generated call transcripts.</Description>
                {transcriptsOn && <DeploymentSummary featureName="Live transcripts" />}

                {transcriptsOn && (
                  <div className="mt-4 border-t border-[var(--sui-colors-neutral-b4)] pt-4">
                    <div className="flex items-start gap-4">
                      <Icon as={SmartNotesMd} />
                      <div className="min-w-0 flex-1">
                        <div className="flex min-h-[32px] items-center gap-4">
                          <h4 className="flex-1 text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                            Call notes
                          </h4>
                          <SpringSwitch
                            aria-label={`Turn ${callNotesOn ? 'off' : 'on'} Call notes`}
                            checked={callNotesOn}
                            onCheckedChange={setCallNotesOn}
                          />
                        </div>
                        <Description>Generates call notes for all your devices.</Description>
                        {callNotesOn && <DeploymentSummary featureName="Call notes" />}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {transcriptsOn && (
              <div className="mt-4 flex items-center justify-between gap-4 border-t border-[var(--sui-colors-neutral-b4)] pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                    In-call behavior:
                  </span>
                  <Pill
                    label={callNotesOn ? 'Automatic live transcripts & call notes' : 'Automatic live transcripts'}
                    value={automaticOn ? 'On' : 'Off'}
                  />
                </div>
                {automaticRestricted ? (
                  <div className="group relative">
                      <button
                        type="button"
                        aria-disabled="true"
                        aria-describedby="mockup-automatic-behavior-locked-reason"
                        className="flex h-[32px] cursor-not-allowed items-center gap-1 rounded-[10px] px-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)] focus-visible:ring-offset-2"
                      >
                        Manage
                        <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.5">
                          <circle cx="8" cy="8" r="6.25" />
                          <path d="M8 7.1v4M8 4.6v.1" strokeLinecap="round" />
                        </svg>
                      </button>
                      <div
                        id="mockup-automatic-behavior-locked-reason"
                        role="tooltip"
                        className="pointer-events-none absolute bottom-full right-0 z-20 mb-2 hidden w-max max-w-[280px] rounded-[6px] bg-[var(--sui-colors-neutral-b0)] px-3 py-2 text-[12px] font-normal leading-[16px] text-white shadow-lg group-hover:block group-focus-within:block"
                      >
                        Always on because user access is restricted.
                      </div>
                  </div>
                ) : (
                    <button
                      type="button"
                      aria-label={`Manage ${callNotesOn ? 'automatic live transcripts and call notes' : 'automatic live transcripts'}`}
                      onClick={() => setAutomaticOn((value) => !value)}
                      className="h-[32px] shrink-0 rounded-[10px] px-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-primary-b)] hover:text-[var(--sui-colors-primary-b-high-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)] focus-visible:ring-offset-2"
                    >
                      Manage
                    </button>
                )}
              </div>
            )}
          </section>
        )}

        <section className="rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
          <div className="flex items-start gap-4">
            <Icon as={VoicemailMd} />
            <div className="min-w-0 flex-1">
              <div className="flex min-h-[32px] items-center gap-4">
                <h3 className="flex-1 text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  AI voicemail summaries
                </h3>
                <SpringSwitch
                  aria-label="Turn off AI voicemail summaries"
                  checked={voicemailOn}
                  onCheckedChange={setVoicemailOn}
                />
              </div>
              <Description>
                Delivers AI-generated summaries of voicemails, including key details and follow-up items.
              </Description>
              {voicemailOn && <DeploymentSummary featureName="AI voicemail summaries" />}
            </div>
          </div>
        </section>
      </div>
    </FeatureSettingsShell>
  );
}