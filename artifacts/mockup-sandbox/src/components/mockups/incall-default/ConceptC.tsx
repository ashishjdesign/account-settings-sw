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

type Feature = {
  title: string;
  icon: IconCmp;
  description: string;
};

const PARENT: Feature = {
  title: 'Closed captioning',
  icon: ClosedCaptionsMd,
  description: 'Uses AI to display real-time captions during phone calls.',
};

const CHILDREN: Feature[] = [
  {
    title: 'Live transcripts',
    icon: TranscriptionMd,
    description: 'Provides real-time AI-generated call transcripts.',
  },
  {
    title: 'Call notes',
    icon: SmartNotesMd,
    description: 'Generate call notes automatically for all your devices.',
  },
];

function FeatureBody({
  title,
  description,
  checked = true,
  onCheckedChange,
}: {
  title: string;
  description: string;
  checked?: boolean;
  onCheckedChange?: (next: boolean) => void;
}) {
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

export function ConceptC({ onBack }: { onBack?: () => void }) {
  const [captioningOn, setCaptioningOn] = React.useState(true);
  const [childOn, setChildOn] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(CHILDREN.map((c) => [c.title, true])),
  );
  const [autoStart, setAutoStart] = React.useState(true);

  const handleChildSwitch = (title: string, next: boolean) => {
    setChildOn((prev) => ({ ...prev, [title]: next }));
  };

  const handleBack =
    onBack ??
    (() => {
      window.history.back();
    });

  return (
    <FeatureSettingsShell flexLayout showFooterActions={false}>
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
        {/* Parent — its dependent features are nested inside its content column */}
        <div className="flex items-start gap-4">
          <FeatureIcon as={PARENT.icon} />
          
          <div className="flex min-w-0 flex-1 flex-col">
            <FeatureBody
              title={PARENT.title}
              description={PARENT.description}
              checked={captioningOn}
              onCheckedChange={setCaptioningOn}
            />

            {/* Dependent features — hidden once Closed captioning is turned off.
             * Indented to sit under the parent, divided by hairlines. */}
            {captioningOn && (
              <div className="mt-4 flex flex-col">
                {CHILDREN.map((child) => (
                  <div
                    key={child.title}
                    className="flex items-start gap-4 border-t border-[var(--sui-colors-neutral-b4)] py-4"
                  >
                    <FeatureIcon as={child.icon} />
                    <FeatureBody
                      title={child.title}
                      description={child.description}
                      checked={childOn[child.title]}
                      onCheckedChange={(next) => handleChildSwitch(child.title, next)}
                    />
                  </div>
                ))}
                
                {/* Footer row */}
                <div className="border-t border-[var(--sui-colors-neutral-b4)] mt-0 pt-3 pb-1 pl-[36px]">
                  <label 
                    className="flex cursor-pointer items-center gap-2"
                    onClick={(e) => { e.preventDefault(); setAutoStart(!autoStart); }}
                  >
                    <span className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[3px] border ${autoStart ? 'border-[var(--sui-colors-primary-b)] bg-[var(--sui-colors-primary-b)]' : 'border-[var(--sui-colors-neutral-b4)] bg-white'}`}>
                      {autoStart && (
                        <svg viewBox="0 0 12 10" className="h-[10px] w-[10px] text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="1.5 5 4.5 8 10.5 1.5" />
                        </svg>
                      )}
                    </span>
                    <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      Keep Notes on automatically during calls
                    </span>
                  </label>
                  <p className="mt-1 pl-[24px] text-[13px] leading-[18px] text-[var(--sui-colors-neutral-b2)]">
                    Live transcripts and Call notes start on when a call begins.
                  </p>
                  <p className="mt-0.5 pl-[24px] text-[12px] leading-[17px] text-[var(--sui-colors-neutral-b3)]">
                    When Call notes is off, applies to Live transcripts only.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </FeatureSettingsShell>
  );
}
