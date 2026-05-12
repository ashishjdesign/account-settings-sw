import React from 'react';
import { cn } from '@/lib/utils';
import { FeatureSettingsShell, SpringSwitch } from './_shared';

export type TabKey = 'General' | 'Phone' | 'AI' | 'SMS' | 'Fax';
const TABS: TabKey[] = ['General', 'Phone', 'AI', 'SMS', 'Fax'];

export function PillTabs({ selected }: { selected: TabKey }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {TABS.map((label) => (
        <button
          key={label}
          className={cn(
            'inline-flex h-[32px] min-w-[100px] items-center justify-center rounded-full px-3 text-[14px] font-medium leading-[20px] transition-colors',
            label === selected
              ? 'border border-black/20 bg-[var(--sui-colors-neutral-b4)] text-[var(--sui-colors-neutral-b1)]'
              : 'border border-black/20 bg-white text-[var(--sui-colors-neutral-b1)] hover:bg-[var(--sui-colors-neutral-b4)]/40',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export type SummarySegment = { label?: string; value: string };

export function SettingCard({
  title, description, switchOn, icon, summary, onManage,
}: {
  title: string;
  description: React.ReactNode;
  switchOn: boolean;
  icon: React.ReactNode;
  summary?: SummarySegment[];
  onManage?: () => void;
}) {
  return (
    <section className="flex items-start gap-4 rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
      <div className="flex h-[32px] w-5 items-center justify-center shrink-0 text-[var(--sui-colors-neutral-b1)]">
        {icon}
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
          <div className="mt-2 flex w-full items-center justify-between gap-4 border-t border-[var(--sui-colors-neutral-b4)] pt-4">
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

export function SectionHeading({ children }: React.PropsWithChildren) {
  return (
    <h2 className="mt-4 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
      {children}
    </h2>
  );
}

export function FeatureSettingsLayout({
  selectedTab, children,
}: React.PropsWithChildren<{ selectedTab: TabKey }>) {
  return (
    <FeatureSettingsShell showFooterActions={false} flexLayout>
      <PillTabs selected={selectedTab} />
      <div className="flex flex-col gap-4">{children}</div>
    </FeatureSettingsShell>
  );
}
