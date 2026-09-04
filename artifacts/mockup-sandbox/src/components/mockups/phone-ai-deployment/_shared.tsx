import React from 'react';
import { Lock } from 'lucide-react';
import {
  ArrowLeftMd,
  ClosedCaptionsMd,
  SmartNotesMd,
  TranscriptionMd,
  VoicemailMd,
} from '@ringcentral/spring-icon';
import { FeatureSettingsShell, SpringSwitch } from '../ai-feature-settings/_shared';

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type Deployment = { defaultValue: 'On' | 'Off'; access: 'Allowed' | 'Restricted' };

export type PhoneAiDeploymentProps = {
  initialCallNotes: boolean;
  transcriptDeployment: Deployment;
  notesDeployment: Deployment;
  onBack?: () => void;
};

function Icon({ as: Cmp }: { as: IconCmp }) {
  return (
    <div className="flex h-8 w-5 shrink-0 items-center justify-center text-[var(--sui-colors-neutral-b1)]">
      <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
    </div>
  );
}

function SpringGlyph({ as: Cmp, size }: { as: IconCmp; size: number }) {
  return <Cmp width={size} height={size} fill="currentColor" aria-hidden focusable={false} />;
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex h-8 items-center gap-2 whitespace-nowrap rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3 text-[14px] leading-5 text-[var(--sui-colors-neutral-b1)]">
      <span className="font-semibold">{label}:</span><span>{value}</span>
    </div>
  );
}

function DeploymentRow({ deployment, featureName }: { deployment: Deployment; featureName: string }) {
  return (
    <div className="mt-1 flex w-full flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap gap-2">
        <Pill label="User default" value={deployment.defaultValue} />
        <Pill label="User access" value={deployment.access} />
      </div>
      <button
        type="button"
        aria-label={`Manage ${featureName} user deployment`}
        className="h-8 rounded-[10px] px-1 text-[14px] font-medium text-[var(--sui-colors-primary-b)] hover:text-[var(--sui-colors-primary-b-high-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)] focus-visible:ring-offset-2"
      >
        Manage
      </button>
    </div>
  );
}

function Description({ children }: React.PropsWithChildren) {
  return <p className="text-[14px] leading-5 text-[var(--sui-colors-neutral-b2)]">{children} <a href="#" className="text-[var(--sui-colors-primary-b)] underline">Learn more</a></p>;
}

function StandaloneFeature({
  icon,
  title,
  description,
  checked,
  onChange,
  deployment,
}: {
  icon: IconCmp;
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  deployment: Deployment;
}) {
  return (
    <section className="rounded-lg border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
      <div className="flex items-start gap-4">
        <Icon as={icon} />
        <div className="min-w-0 flex-1">
          <div className="flex min-h-8 items-center gap-4">
            <h3 className="flex-1 text-[15px] font-bold leading-5">{title}</h3>
            <SpringSwitch aria-label={`Turn ${checked ? 'off' : 'on'} ${title}`} checked={checked} onCheckedChange={onChange} />
          </div>
          <Description>{description}</Description>
          {checked && <DeploymentRow deployment={deployment} featureName={title} />}
        </div>
      </div>
    </section>
  );
}

export function PhoneAiDeployment({
  initialCallNotes,
  transcriptDeployment,
  notesDeployment,
  onBack,
}: PhoneAiDeploymentProps) {
  const [captioning, setCaptioning] = React.useState(true);
  const [transcripts, setTranscripts] = React.useState(true);
  const [notes, setNotes] = React.useState(initialCallNotes);
  const [voicemail, setVoicemail] = React.useState(true);
  const [automatic, setAutomatic] = React.useState(true);
  const transcriptForced =
    transcriptDeployment.defaultValue === 'On' && transcriptDeployment.access === 'Restricted';
  const notesForced =
    notes &&
    notesDeployment.defaultValue === 'On' &&
    notesDeployment.access === 'Restricted';
  const forced = transcripts && (transcriptForced || notesForced);
  const behaviorLabel = notes ? 'Automatic live transcripts & call notes' : 'Automatic live transcripts';

  return (
    <FeatureSettingsShell flexLayout showFooterActions={false}>
      <button type="button" onClick={onBack ?? (() => {})} className="mb-4 flex items-center gap-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)] focus-visible:ring-offset-2">
        <SpringGlyph as={ArrowLeftMd} size={24} />
        <span className="text-[20px] font-semibold leading-7 tracking-[-0.2px]">Phone AI</span>
      </button>
      <div className="flex flex-col gap-3">
        <StandaloneFeature icon={ClosedCaptionsMd} title="Closed captioning" description="Uses AI to display real-time captions during phone calls." checked={captioning} onChange={setCaptioning} deployment={{ defaultValue: 'On', access: 'Allowed' }} />

        {captioning && (
          <section className="overflow-hidden rounded-lg border border-[var(--sui-colors-neutral-b4)] bg-white">
            <div className="p-4">
              <div className="flex items-start gap-4">
                <Icon as={TranscriptionMd} />
                <div className="min-w-0 flex-1">
                  <div className="flex min-h-8 items-center gap-4">
                    <h3 className="flex-1 text-[15px] font-bold leading-5">Live transcripts</h3>
                    <SpringSwitch aria-label={`Turn ${transcripts ? 'off' : 'on'} Live transcripts`} checked={transcripts} onCheckedChange={setTranscripts} />
                  </div>
                  <Description>Provides real-time AI-generated call transcripts.</Description>
                  {transcripts && (
                    <DeploymentRow
                      deployment={transcriptDeployment}
                      featureName="Live transcripts"
                    />
                  )}
                </div>
              </div>

              {transcripts && (
                <div className="ml-9 mt-4 border-t border-[var(--sui-colors-neutral-b4)] pt-4">
                  <div className="flex items-start gap-4">
                    <Icon as={SmartNotesMd} />
                    <div className="min-w-0 flex-1">
                      <div className="flex min-h-8 items-center gap-4">
                        <h3 className="flex-1 text-[15px] font-bold leading-5">Call notes</h3>
                        <SpringSwitch aria-label={`Turn ${notes ? 'off' : 'on'} Call notes`} checked={notes} onCheckedChange={setNotes} />
                      </div>
                      <Description>Generates call notes for all your devices.</Description>
                      {notes && (
                        <DeploymentRow deployment={notesDeployment} featureName="Call notes" />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {transcripts && (
              <footer
                aria-label={`${behaviorLabel} setting`}
                className="border-t border-[var(--sui-colors-neutral-b4)] bg-[var(--sui-colors-neutral-b5)] px-4 py-3"
              >
                <p className="mb-2 text-[12px] font-semibold uppercase leading-[15px] tracking-[0.2px] text-[var(--sui-colors-neutral-b2)]">Shared in-call policy</p>
                <div className="flex min-h-8 items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-2">
                    {forced && <Lock className="h-4 w-4 shrink-0" aria-hidden />}
                    <p className="text-[14px] font-semibold leading-5">{behaviorLabel}: {forced || automatic ? 'On' : 'Off'}</p>
                    {forced && <span className="rounded-full border border-[var(--sui-colors-neutral-b3)] bg-white px-2 py-0.5 text-[12px] font-semibold">Locked</span>}
                  </div>
                  {!forced && (
                    <button
                      type="button"
                      aria-label={`Manage ${behaviorLabel}`}
                      onClick={() => setAutomatic((value) => !value)}
                      className="h-8 shrink-0 rounded-[10px] px-1 text-[14px] font-medium text-[var(--sui-colors-primary-b)] hover:text-[var(--sui-colors-primary-b-high-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)] focus-visible:ring-offset-2"
                    >
                      Manage
                    </button>
                  )}
                </div>
                {forced && <p className="mt-1 pl-6 text-[13px] leading-5 text-[var(--sui-colors-neutral-b2)]">Always on because user access is restricted.</p>}
              </footer>
            )}
          </section>
        )}

        <StandaloneFeature icon={VoicemailMd} title="AI voicemail summaries" description="Delivers AI-generated summaries of voicemails, including key details and follow-up items." checked={voicemail} onChange={setVoicemail} deployment={{ defaultValue: 'On', access: 'Allowed' }} />
      </div>
    </FeatureSettingsShell>
  );
}