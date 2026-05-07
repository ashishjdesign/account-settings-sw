import React from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

export const scopedTokens = `
  .swui-scope {
    --rc-blue: #0679BA;
    --rc-orange: #FF8800;
    --rc-text: #2F2F2F;
    --rc-text-muted: #666666;
    --rc-text-faint: #999999;
    --rc-border: #E2E2E2;
    --rc-border-strong: #C7C7C7;
    --rc-bg: #FFFFFF;
    --rc-bg-fog: #FBFBFB;
    --rc-success: #1A8517;
    font-family: Helvetica, Arial, sans-serif;
    color: var(--rc-text);
  }
  .spring-scope {
    --sui-colors-primary-b: #066fac;
    --sui-colors-primary-b-high-contrast: #184d74;
    --sui-colors-neutral-base: #ffffff;
    --sui-colors-neutral-b0: #000000;
    --sui-colors-neutral-b1: #323439;
    --sui-colors-neutral-b2: #72757a;
    --sui-colors-neutral-b3: #9e9fa4;
    --sui-colors-neutral-b4: #dddfe5;
    --sui-radius-sm: 10px;
    font-family: Inter, system-ui, sans-serif;
    color: var(--sui-colors-neutral-b1);
  }
`;

export const SpringSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      'peer inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer items-center rounded-full transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b-high-contrast)] focus-visible:ring-offset-2',
      'data-[state=checked]:bg-[var(--sui-colors-primary-b)] data-[state=unchecked]:bg-[var(--sui-colors-neutral-b3)]',
      className,
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb className="pointer-events-none block h-[20px] w-[20px] rounded-full bg-white shadow-sm transition-transform data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-[2px]" />
  </SwitchPrimitives.Root>
));
SpringSwitch.displayName = 'SpringSwitch';

export type TabKey = 'General' | 'Phone' | 'AI' | 'SMS' | 'Fax' | 'Meetings';
const TABS: TabKey[] = ['General', 'Phone', 'AI', 'SMS', 'Fax', 'Meetings'];

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

function NavSettingsIcon({ color = '#0679BA' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9.02857 0H6.97143C6.62857 0 6.51429 0.228571 6.4 0.571429L6.17143 1.25714C5.6 1.48571 5.02857 1.71429 4.57143 2.05714L3.88571 1.6C3.77143 1.48571 3.54286 1.48571 3.42857 1.48571C3.31429 1.48571 3.2 1.48571 3.08571 1.6L1.6 3.08571C1.37143 3.31429 1.48571 3.54286 1.6 3.88571L1.94286 4.57143C1.71429 5.02857 1.48571 5.6 1.25714 6.17143L0.571429 6.4C0.228571 6.51429 0 6.62857 0 6.97143V9.14286C0 9.48571 0.228571 9.6 0.571429 9.71429L1.37143 9.94286C1.48571 10.5143 1.71429 11.0857 2.05714 11.6571L1.6 12.3429C1.48571 12.5714 1.37143 12.9143 1.6 13.1429L3.08571 14.6286C3.2 14.7429 3.31429 14.7429 3.42857 14.7429C3.54286 14.7429 3.77143 14.7429 3.88571 14.6286L4.57143 13.9429C5.14286 14.2857 5.6 14.5143 6.28571 14.6286L6.51429 15.4286C6.51429 15.7714 6.62857 16 6.97143 16H9.14286C9.48571 16 9.6 15.7714 9.71429 15.4286L9.94286 14.6286C10.5143 14.5143 11.0857 14.2857 11.6571 13.9429L12.3429 14.4C12.5714 14.5143 12.9143 14.6286 13.1429 14.4L14.6286 12.9143C14.8571 12.6857 14.7429 12.4571 14.6286 12.2286L14.0571 11.5429C14.4 10.9714 14.6286 10.4 14.7429 9.82857L15.4286 9.6C15.7714 9.48571 16 9.37143 16 9.02857V6.85714C16 6.62857 15.7714 6.4 15.4286 6.4L14.6286 6.17143C14.5143 5.6 14.2857 5.02857 13.9429 4.57143L14.4 3.88571C14.5143 3.65714 14.6286 3.31429 14.4 3.08571L12.9143 1.6C12.6857 1.37143 12.4571 1.48571 12.2286 1.6L11.5429 1.94286C10.9714 1.71429 10.4 1.48571 9.82857 1.25714L9.6 0.571429C9.48571 0.228571 9.37143 0 9.02857 0ZM8 5.71429C9.25714 5.71429 10.2857 6.74286 10.2857 8C10.2857 9.25714 9.25714 10.2857 8 10.2857C6.74286 10.2857 5.71429 9.25714 5.71429 8C5.71429 6.74286 6.74286 5.71429 8 5.71429Z" fill={color} />
    </svg>
  );
}

function AppsResourcesIcon({ color = '#2F2F2F' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.42858 0C4.05977 0 4.57142 0.511654 4.57142 1.14285V3.42858C4.57142 4.05977 4.05977 4.57142 3.42858 4.57142H1.14285C0.511654 4.57142 0 4.05977 0 3.42858V1.14285C0 0.511654 0.511654 0 1.14285 0H3.42858ZM9.14285 0C9.77404 0 10.2857 0.511654 10.2857 1.14285V3.42858C10.2857 4.05977 9.77404 4.57142 9.14285 4.57142H6.85712C6.22592 4.57142 5.71427 4.05977 5.71427 3.42858V1.14285C5.71427 0.511654 6.22592 0 6.85712 0H9.14285ZM14.8572 0C15.4883 0 16 0.511654 16 1.14285V3.42858C16 4.05977 15.4883 4.57142 14.8572 4.57142H12.5714C11.9402 4.57142 11.4286 4.05977 11.4286 3.42858V1.14285C11.4286 0.511654 11.9402 0 12.5714 0H14.8572ZM3.42858 5.71427C4.05977 5.71427 4.57142 6.22592 4.57142 6.85712V9.14285C4.57142 9.77404 4.05977 10.2857 3.42858 10.2857H1.14285C0.511654 10.2857 0 9.77404 0 9.14285V6.85712C0 6.22592 0.511654 5.71427 1.14285 5.71427H3.42858ZM9.14285 5.71427C9.77404 5.71427 10.2857 6.22592 10.2857 6.85712V9.14285C10.2857 9.77404 9.77404 10.2857 9.14285 10.2857H6.85712C6.22592 10.2857 5.71427 9.77404 5.71427 9.14285V6.85712C5.71427 6.22592 6.22592 5.71427 6.85712 5.71427H9.14285ZM14.8572 5.71427C15.4883 5.71427 16 6.22592 16 6.85712V9.14285C16 9.77404 15.4883 10.2857 14.8572 10.2857H12.5714C11.9402 10.2857 11.4286 9.77404 11.4286 9.14285V6.85712C11.4286 6.22592 11.9402 5.71427 12.5714 5.71427H14.8572ZM3.42858 11.4286C4.05977 11.4286 4.57142 11.9402 4.57142 12.5714V14.8572C4.57142 15.4883 4.05977 16 3.42858 16H1.14285C0.511654 16 0 15.4883 0 14.8572V12.5714C0 11.9402 0.511654 11.4286 1.14285 11.4286H3.42858ZM9.14285 11.4286C9.77404 11.4286 10.2857 11.9402 10.2857 12.5714V14.8572C10.2857 15.4883 9.77404 16 9.14285 16H6.85712C6.22592 16 5.71427 15.4883 5.71427 14.8572V12.5714C5.71427 11.9402 6.22592 11.4286 6.85712 11.4286H9.14285ZM14.8572 11.4286C15.4883 11.4286 16 11.9402 16 12.5714V14.8572C16 15.4883 15.4883 16 14.8572 16H12.5714C11.9402 16 11.4286 15.4883 11.4286 14.8572V12.5714C11.4286 11.9402 11.9402 11.4286 12.5714 11.4286H14.8572Z" fill={color} />
    </svg>
  );
}

function SecurityComplianceIcon({ color = '#2F2F2F' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 0L14 2.5V8C14 11.5 11.5 14.5 8 16C4.5 14.5 2 11.5 2 8V2.5L8 0Z" fill={color} />
    </svg>
  );
}

function ServiceConsoleIcon({ color = '#2F2F2F' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15.3846 12.5714C15.7245 12.5714 16 12.8272 16 13.1428C16 13.4584 15.7245 13.7142 15.3846 13.7142H0.615385C0.2755 13.7142 0 13.4584 0 13.1428C0 12.8272 0.2755 12.5714 0.615385 12.5714H15.3846ZM13.7143 1.14288C14.3455 1.14288 14.8571 1.65454 14.8571 2.28573V10.2857C14.8571 10.9169 14.3455 11.4286 13.7143 11.4286H2.28569C1.6545 11.4286 1.14285 10.9169 1.14285 10.2857V2.28573C1.14285 1.65454 1.6545 1.14288 2.28569 1.14288H13.7143ZM13.7143 2.28576H2.28569V10.2857H13.7143V2.28576Z" fill={color} />
    </svg>
  );
}

function Row({
  icon, label, labelColor, trailing, selected,
}: {
  icon?: React.ReactNode; label: string; labelColor?: string;
  trailing?: 'chev-right' | 'chev-down'; selected?: boolean;
}) {
  return (
    <div
      className="flex min-h-[40px] w-[190px] shrink-0 items-center gap-[5px]"
      style={{ backgroundColor: selected ? '#F4F4F4' : '#FBFBFB', paddingLeft: selected ? 0 : 10, paddingRight: 10 }}
    >
      {selected && <div className="w-[4px] shrink-0 self-stretch bg-[#0679BA]" />}
      <div className="flex min-w-0 flex-1 items-center gap-[10px] py-[8px]">
        <div className="flex h-[16px] w-[16px] shrink-0 items-center justify-center">{icon}</div>
        <p
          className="min-w-0 flex-1 text-[13px] leading-[1.54] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden"
          style={{ color: labelColor || (selected ? '#0679BA' : '#2F2F2F') }}
        >
          {label}
        </p>
      </div>
      {trailing === 'chev-right' && <ChevronRight className="h-[13px] w-[13px] shrink-0 text-[#2F2F2F]" strokeWidth={1.6} />}
      {trailing === 'chev-down' && <ChevronDown className="h-[13px] w-[13px] shrink-0 text-[#0679BA]" strokeWidth={1.6} />}
    </div>
  );
}

export function SideNav() {
  return (
    <aside
      className="shrink-0 rounded-[4px] border border-[#E2E2E2] bg-[#FBFBFB] py-[10px]"
      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
    >
      <Row icon={<ServiceConsoleIcon />} label="Service Console" trailing="chev-right" />
      <Row icon={<NavSettingsIcon />} label="Account Settings" labelColor="#0679BA" trailing="chev-down" />
      <Row label="Feature Settings" selected />
      {['Appearance', 'App Integrations', 'Archiver Settings', 'Directory Integration', 'Headset Support', 'Microsoft Teams', 'Multi-Site Settings', 'Outbound Call Prefix'].map((l) => (
        <Row key={l} label={l} />
      ))}
      <Row icon={<SecurityComplianceIcon />} label="Security and Compliance" trailing="chev-right" />
      <Row icon={<AppsResourcesIcon />} label="Apps and Resources" trailing="chev-right" />
    </aside>
  );
}

function RingCentralLogo() {
  return (
    <img
      src="/__mockup/figma-ref/ringcentral-logo.svg"
      alt="RingCentral"
      width={172}
      height={26}
      className="block h-[26px] w-auto"
    />
  );
}

export function TopChrome() {
  return (
    <div className="swui-scope mx-auto w-[1200px] max-w-full">
      <header className="flex h-[64px] w-full min-w-0 items-center justify-between gap-4 bg-white">
        <div className="min-w-0 shrink">
          <RingCentralLogo />
        </div>
        <div className="flex shrink-0 items-center gap-3 text-[13px] text-[var(--rc-text)] sm:gap-5">
          <button className="flex items-center gap-1.5 hover:text-[var(--rc-blue)]">
            <span className="hidden sm:inline">Admin Portal</span>
            <ChevronDown className="h-[13px] w-[13px]" strokeWidth={1.6} />
          </button>
          <button className="text-[var(--rc-text-muted)] hover:text-[var(--rc-blue)]">
            <AppsResourcesIcon color="currentColor" />
          </button>
          <div className="relative ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--rc-orange)] text-[12px] font-bold text-white">
            RC
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[var(--rc-success)]" />
          </div>
        </div>
      </header>

      <div className="flex h-[52px] w-full min-w-0 items-center justify-between gap-4 bg-white text-[13px]">
        <nav className="flex h-full min-w-0 flex-1 items-center gap-4 overflow-x-auto whitespace-nowrap lg:gap-9 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {[
            ['Home', false], ['Users', false], ['Phone System', false], ['AI', true],
            ['Meetings', false], ['Reports', true], ['Account', true],
          ].map(([label, hasChev]) => (
            <button
              key={label as string}
              className="flex h-full shrink-0 items-center gap-1.5 text-[var(--rc-text)] hover:text-[var(--rc-blue)]"
            >
              <span>{label}</span>
              {hasChev && <ChevronDown className="h-[13px] w-[13px]" strokeWidth={1.6} />}
            </button>
          ))}
          <button className="relative flex h-full shrink-0 items-center font-medium text-[var(--rc-blue)]">
            <span>More</span>
            <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--rc-blue)]" />
          </button>
        </nav>

        <div className="flex h-[34px] w-full max-w-[300px] min-w-[160px] shrink-0 basis-[260px] items-center rounded-[2px] border border-[var(--rc-border-strong)] bg-white px-3">
          <input
            type="text"
            placeholder="Search settings, pages, or help articles"
            className="w-full min-w-0 bg-transparent text-[12.5px] text-[var(--rc-text)] placeholder-[var(--rc-text-faint)] outline-none"
          />
          <Search className="ml-2 h-[14px] w-[14px] shrink-0 text-[var(--rc-text-muted)]" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export function FooterActions() {
  return (
    <div className="mt-5 flex justify-end gap-2">
      <button className="inline-flex h-[32px] min-w-[56px] items-center justify-center rounded-[10px] border border-black/20 bg-white px-3 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40 active:bg-[var(--sui-colors-neutral-b4)]">
        Cancel
      </button>
      <button
        disabled
        className="inline-flex h-[32px] min-w-[56px] cursor-not-allowed items-center justify-center rounded-[10px] bg-[var(--sui-colors-neutral-b3)] px-3 text-[14px] font-medium leading-[20px] text-white"
      >
        Save
      </button>
    </div>
  );
}

export function LegalFooter() {
  return (
    <div className="swui-scope mt-10 text-[11px] leading-[16px] text-[var(--rc-text-faint)]">
      <a href="#" className="text-[var(--rc-blue)] underline">Legal</a>
      <a href="#" className="ml-1 text-[var(--rc-blue)] underline">Privacy</a>
      <p className="mt-1">© 1999–2025 RingCentral Intellectual Property.</p>
      <p>All rights reserved. RingCentral and the RingCentral logo are trademarks of RingCentral, Inc.</p>
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
          <div className="flex w-full items-center justify-between gap-4 border-t border-[var(--sui-colors-neutral-b4)] pt-4">
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
              className="inline-flex h-[32px] shrink-0 items-center justify-center gap-1.5 rounded-[10px] px-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-primary-b)] transition-colors hover:text-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
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
    <h2 className="mt-2 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
      {children}
    </h2>
  );
}

export function FeatureSettingsLayout({
  selectedTab, children,
}: React.PropsWithChildren<{ selectedTab: TabKey }>) {
  return (
    <div className="relative min-h-[100dvh] w-full bg-white">
      <style>{scopedTokens}</style>

      <TopChrome />

      <div className="w-full border-b border-[#E2E2E2]" />

      <div className="flex w-full justify-center bg-white px-4 pt-6 sm:px-6 lg:px-10">
        <div className="flex w-[1200px] max-w-full gap-[10px]">
          <div className="swui-scope">
            <SideNav />
          </div>

          <main className="spring-scope flex-1 px-[16px] pb-10 pt-[10px]">
            <h1 className="mb-5 flex h-[40px] items-center text-[20px] font-semibold leading-[28px] tracking-[-0.2px] text-[var(--sui-colors-neutral-b1)]">
              Feature Settings
            </h1>

            <PillTabs selected={selectedTab} />

            <div className="flex flex-col gap-4">{children}</div>

            <FooterActions />
            <LegalFooter />
          </main>
        </div>
      </div>
    </div>
  );
}
