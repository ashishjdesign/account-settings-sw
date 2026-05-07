import React from 'react';
import { cn } from '@/lib/utils';
import {
  FeatureSettingsShell,
  PillTab,
  SpringSwitch,
} from './_shared';

/* -----------------------------------------------------------------------------
 * Setting card with optional summary line + Manage CTA.
 * --------------------------------------------------------------------------- */
type SummarySegment = { label?: string; value: string };

type IconKey = 'user-activation' | 'resource-center';

function SettingCard({
  title, description, switchOn, icon, summary, onManage,
}: {
  title: string;
  description: React.ReactNode;
  switchOn: boolean;
  icon: IconKey;
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
        <div className="flex min-h-[32px] w-full items-center gap-4">
          <h3 className="flex-1 truncate text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            {title}
          </h3>
          <SpringSwitch checked={switchOn} aria-label={title} />
        </div>

        <p className="pr-[130px] text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
          {description}{' '}
          <a href="#" className="font-normal text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]">
            Learn more
          </a>
        </p>

        {summary && summary.length > 0 && switchOn && (
          <div className="flex w-full items-center justify-between gap-4 border-t border-[var(--sui-colors-neutral-b4)] pt-4">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
              {summary.map((seg, i) => (
                <div
                  key={i}
                  className="flex h-[32px] items-center gap-2 whitespace-nowrap rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]"
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
 * Section subhead between cards (e.g. "In-app notification")
 * --------------------------------------------------------------------------- */
function SectionHeading({ children }: React.PropsWithChildren) {
  return (
    <h2 className="mt-2 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
      {children}
    </h2>
  );
}

/* -----------------------------------------------------------------------------
 * MAIN — General tab, Summary + Manage v2 (no modals)
 * --------------------------------------------------------------------------- */
export function ConceptSummaryGeneral() {
  return (
    <FeatureSettingsShell flexLayout showFooterActions={false}>
      <div className="mb-6 flex flex-wrap gap-2">
        <PillTab label="General" selected />
        <PillTab label="Phone" />
        <PillTab label="AI" />
        <PillTab label="SMS" />
        <PillTab label="Fax" />
      </div>

      <div className="flex flex-col gap-4">
        <SettingCard
          title="User activation"
          switchOn={false}
          icon="user-activation"
          description="Let users re-generate an activation email if it's been less than 30 days since the last one was sent."
        />

        <SectionHeading>In-app notification</SectionHeading>

        <SettingCard
          title="Guides, tutorials & announcements"
          switchOn
          icon="resource-center"
          description="Displays helpful guides, tutorials, important company-wide updates, and service promotions directly to your users."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
          onManage={() => {}}
        />
      </div>
    </FeatureSettingsShell>
  );
}
