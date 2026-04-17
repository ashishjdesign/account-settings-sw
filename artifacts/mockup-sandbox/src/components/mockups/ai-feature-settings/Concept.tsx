import React from 'react';
import {
  ChevronDown,
  ChevronRight,
  Search,
  LayoutGrid,
  Monitor,
  Settings,
  ShieldCheck,
  AppWindow,
  Sparkles,
  Info,
  Check,
} from 'lucide-react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

/* -----------------------------------------------------------------------------
 * Scoped tokens — Service Web UI Library (chrome) and Spring DS (content panel).
 * Each scope owns its own CSS variables so the two systems cannot bleed across
 * the seam.
 * --------------------------------------------------------------------------- */
const scopedTokens = `
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
    --sui-colors-primary-b-high-contrast: #0040dd;
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

/* -----------------------------------------------------------------------------
 * Spring switch (40 × 24 track, 20 dot)
 * --------------------------------------------------------------------------- */
const SpringSwitch = React.forwardRef<
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

/* -----------------------------------------------------------------------------
 * Spring dropdown trigger — looks like a Select control.
 * --------------------------------------------------------------------------- */
function SpringSelect({ value, width = 180 }: { value: string; width?: number }) {
  return (
    <button
      style={{ width }}
      className="flex h-[36px] items-center justify-between rounded-[6px] border border-[var(--sui-colors-neutral-b4)] bg-white px-3 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)] hover:border-[var(--sui-colors-neutral-b3)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b-high-contrast)]"
    >
      <span>{value}</span>
      <ChevronDown className="h-4 w-4 text-[var(--sui-colors-neutral-b2)]" />
    </button>
  );
}

/* -----------------------------------------------------------------------------
 * Spring outlined pill tab.
 * --------------------------------------------------------------------------- */
function PillTab({ label, selected }: { label: string; selected?: boolean }) {
  return (
    <button
      className={cn(
        'inline-flex h-[36px] items-center justify-center rounded-full border px-5 text-[14px] font-medium leading-[20px] transition-colors',
        selected
          ? 'border-[var(--sui-colors-neutral-b3)] bg-[var(--sui-colors-neutral-b4)] text-[var(--sui-colors-neutral-b0)]'
          : 'border-[var(--sui-colors-neutral-b4)] bg-white text-[var(--sui-colors-neutral-b1)] hover:bg-[var(--sui-colors-neutral-b4)]/30',
      )}
    >
      {label}
    </button>
  );
}

/* -----------------------------------------------------------------------------
 * Left side panel — Service Web UI nav tree
 * --------------------------------------------------------------------------- */
function SideNav() {
  const topItems = [
    { label: 'Service Console', icon: Monitor, hasChevron: true },
  ];
  const accountChildren = [
    'Feature Settings',
    'Appearance',
    'App Integrations',
    'Archiver Settings',
    'Directory Integration',
    'Headset Support',
    'Microsoft Teams',
    'Multi-Site Settings',
    'Outbound Call Prefix',
  ];
  const bottomItems = [
    { label: 'Security and Compliance', icon: ShieldCheck, hasChevron: false },
    { label: 'Apps and Resources', icon: AppWindow, hasChevron: false },
  ];

  return (
    <aside className="w-[210px] shrink-0 overflow-hidden rounded-[6px] border border-[var(--rc-border)] bg-white text-[13px] text-[var(--rc-text)]">
      {topItems.map((item) => (
        <button
          key={item.label}
          className="flex w-full items-center gap-2 px-3 py-2.5 text-left hover:bg-[var(--rc-bg-fog)]"
        >
          <item.icon className="h-4 w-4 text-[var(--rc-text-muted)]" strokeWidth={1.6} />
          <span className="flex-1">{item.label}</span>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--rc-text-faint)]" />
        </button>
      ))}

      {/* Account Settings — expanded, header is the "owner" of the selected child */}
      <div>
        <button className="flex w-full items-center gap-2 border-l-[3px] border-[var(--rc-blue)] bg-white px-[9px] py-2.5 text-left text-[var(--rc-blue)]">
          <Settings className="h-4 w-4" strokeWidth={1.6} />
          <span className="flex-1 font-medium">Account Settings</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <ul className="pb-1">
          {accountChildren.map((label) => {
            const selected = label === 'Feature Settings';
            return (
              <li key={label}>
                <button
                  className={cn(
                    'flex w-full items-center px-3 py-1.5 pl-9 text-left',
                    selected
                      ? 'bg-[#EAF4FA] font-medium text-[var(--rc-blue)]'
                      : 'text-[var(--rc-text)] hover:bg-[var(--rc-bg-fog)]',
                  )}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {bottomItems.map((item) => (
        <button
          key={item.label}
          className="flex w-full items-center gap-2 border-t border-[var(--rc-border)] px-3 py-2.5 text-left hover:bg-[var(--rc-bg-fog)]"
        >
          <item.icon className="h-4 w-4 text-[var(--rc-text-muted)]" strokeWidth={1.6} />
          <span className="flex-1">{item.label}</span>
        </button>
      ))}
    </aside>
  );
}

/* -----------------------------------------------------------------------------
 * Spring "Setting card" — bordered white card with a header row.
 * --------------------------------------------------------------------------- */
function SettingCard({
  title,
  description,
  switchOn,
  children,
}: React.PropsWithChildren<{ title: string; description: React.ReactNode; switchOn: boolean }>) {
  return (
    <section className="rounded-[10px] border border-[var(--sui-colors-neutral-b4)] bg-white">
      <div className="flex items-start gap-4 px-6 py-5">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[var(--sui-colors-neutral-b1)]" strokeWidth={1.6} />
        <div className="flex-1">
          <h3 className="text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b0)]">{title}</h3>
          <p className="mt-1 max-w-[640px] text-[13px] leading-[19px] text-[var(--sui-colors-neutral-b2)]">
            {description}{' '}
            <a href="#" className="font-medium text-[var(--sui-colors-primary-b)] hover:underline">
              Learn more
            </a>
          </p>
        </div>
        <SpringSwitch checked={switchOn} />
      </div>
      {children && (
        <div className="border-t border-[var(--sui-colors-neutral-b4)]">
          {children}
        </div>
      )}
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Setting card sub-rows
 * --------------------------------------------------------------------------- */
function SubRow({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--sui-colors-neutral-b4)] px-6 py-3.5 last:border-b-0">
      {children}
    </div>
  );
}

function LabelWithInfo({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center gap-1.5 text-[13px] text-[var(--sui-colors-neutral-b1)]">
      <span>{children}</span>
      <Info className="h-3.5 w-3.5 text-[var(--sui-colors-neutral-b3)]" />
    </div>
  );
}

function UserDefaultsRow() {
  return (
    <SubRow>
      <LabelWithInfo>User defaults</LabelWithInfo>
      <div className="flex items-center gap-3 text-[13px]">
        <span>
          <a href="#" className="font-medium text-[var(--sui-colors-primary-b)] hover:underline">
            72/98 users
          </a>{' '}
          <span className="text-[var(--sui-colors-neutral-b2)]">are using the default</span>
        </span>
        <span className="ml-6 text-[var(--sui-colors-neutral-b1)]">Set this setting for users</span>
        <SpringSelect value="On" width={96} />
      </div>
    </SubRow>
  );
}

function UserPermissionsRow() {
  return (
    <SubRow>
      <span className="text-[13px] text-[var(--sui-colors-neutral-b1)]">User permissions</span>
      <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[var(--sui-colors-neutral-b1)]">
        <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] bg-[var(--sui-colors-primary-b-high-contrast)]">
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </span>
        Allow users to change this setting
      </label>
    </SubRow>
  );
}

/* -----------------------------------------------------------------------------
 * RingCentral wordmark — blue "Ring", orange "Central", italic-ish.
 * --------------------------------------------------------------------------- */
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

/* -----------------------------------------------------------------------------
 * MAIN
 * --------------------------------------------------------------------------- */
export function Concept() {
  return (
    <div className="min-h-[100dvh] w-full bg-white">
      <style>{scopedTokens}</style>

      {/* ============================================================ */}
      {/* CHROME — Service Web UI Library                                */}
      {/* ============================================================ */}
      <div className="swui-scope mx-auto w-[1200px] max-w-full">
        {/* Masterhead */}
        <header className="flex h-[64px] w-full min-w-0 items-center justify-between gap-4 bg-white">
          <div className="min-w-0 shrink">
            <RingCentralLogo />
          </div>
          <div className="flex shrink-0 items-center gap-3 text-[13px] text-[var(--rc-text)] sm:gap-5">
            <button className="flex items-center gap-1.5 hover:text-[var(--rc-blue)]">
              <span className="hidden sm:inline">Admin Portal</span>
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
            <button className="text-[var(--rc-text-muted)] hover:text-[var(--rc-blue)]">
              <LayoutGrid className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <div className="relative ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--rc-orange)] text-[12px] font-bold text-white">
              RC
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[var(--rc-success)]" />
            </div>
          </div>
        </header>

        {/* Sub-nav with search on the right */}
        <div className="flex h-[52px] w-full min-w-0 items-center justify-between gap-4 bg-white text-[13px]">
          <nav className="flex h-full min-w-0 flex-1 items-center gap-4 overflow-x-auto whitespace-nowrap lg:gap-9 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {[
              ['Home', false],
              ['Users', false],
              ['Phone System', false],
              ['AI', true],
              ['Meetings', false],
              ['Reports', true],
              ['Account', true],
            ].map(([label, hasChev]) => (
              <button
                key={label as string}
                className="flex h-full shrink-0 items-center gap-1.5 text-[var(--rc-text)] hover:text-[var(--rc-blue)]"
              >
                <span>{label}</span>
                {hasChev && <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />}
              </button>
            ))}
            <button className="relative flex h-full shrink-0 items-center font-medium text-[var(--rc-blue)]">
              <span>More</span>
              <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-sm bg-[var(--rc-blue)]" />
            </button>
          </nav>

          <div className="flex h-[34px] w-full max-w-[300px] min-w-[160px] shrink-0 basis-[260px] items-center rounded-[4px] border border-[var(--rc-border-strong)] bg-white px-3">
            <input
              type="text"
              placeholder="Search settings, pages, or help articles"
              className="w-full min-w-0 bg-transparent text-[12.5px] text-[var(--rc-text)] placeholder-[var(--rc-text-faint)] outline-none"
            />
            <Search className="ml-2 h-[14px] w-[14px] shrink-0 text-[var(--rc-text-muted)]" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Full-bleed separator under the sub-nav */}
      <div className="w-full border-b border-[#E2E2E2]" />

      {/* ============================================================ */}
      {/* BODY — left chrome side panel + Spring content panel          */}
      {/* ============================================================ */}
      <div className="flex w-full justify-center bg-white px-4 pt-6 sm:px-6 lg:px-10">
        <div className="flex w-[1200px] max-w-full gap-6">
          {/* Side panel — chrome */}
          <div className="swui-scope">
            <SideNav />
          </div>

          {/* Content — Spring */}
          <main className="spring-scope flex-1 pb-10">
            <h1 className="mb-5 text-[22px] font-bold leading-[28px] text-[var(--sui-colors-neutral-b0)]">
              Feature Settings
            </h1>

            <div className="mb-6 flex flex-wrap gap-2">
              <PillTab label="General" />
              <PillTab label="Phone" />
              <PillTab label="AI" selected />
              <PillTab label="SMS" />
              <PillTab label="Fax" />
              <PillTab label="Meetings" />
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
                description="A personal assistant that helps you boost productivity."
              >
                <SubRow>
                  <LabelWithInfo>AI notes and transcriptions retention period</LabelWithInfo>
                  <SpringSelect value="365 days (Default)" width={200} />
                </SubRow>
                <UserDefaultsRow />
                <UserPermissionsRow />
              </SettingCard>

              <SettingCard
                title="Automatic call notes"
                switchOn
                description="Generate call notes automatically for all your devices."
              >
                <UserDefaultsRow />
                <UserPermissionsRow />
              </SettingCard>
            </div>

            {/* Footer actions */}
            <div className="mt-8 flex justify-end gap-3">
              <button className="h-[36px] rounded-[6px] border border-[var(--sui-colors-neutral-b3)] bg-white px-5 text-[14px] font-medium text-[var(--sui-colors-neutral-b1)] hover:bg-[var(--sui-colors-neutral-b4)]/40">
                Cancel
              </button>
              <button
                disabled
                className="h-[36px] cursor-not-allowed rounded-[6px] bg-[var(--sui-colors-neutral-b4)] px-5 text-[14px] font-medium text-[var(--sui-colors-neutral-b3)]"
              >
                Save
              </button>
            </div>

            {/* Legal footer (chrome typography but inside content area for layout) */}
            <div className="swui-scope mt-10 text-[11px] leading-[16px] text-[var(--rc-text-faint)]">
              <a href="#" className="text-[var(--rc-blue)] underline">Legal</a>
              <a href="#" className="ml-1 text-[var(--rc-blue)] underline">Privacy</a>
              <p className="mt-1">© 1999–2025 RingCentral Intellectual Property.</p>
              <p>All rights reserved. RingCentral and the RingCentral logo are trademarks of RingCentral, Inc.</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
