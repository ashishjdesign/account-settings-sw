import React from 'react';
import { ChevronDown, ChevronRight, Search, Check } from 'lucide-react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

/* -----------------------------------------------------------------------------
 * Scoped tokens — Service Web UI Library (chrome) and Spring DS (content panel).
 * Each scope owns its own CSS variables so the two systems cannot bleed across
 * the seam.
 * --------------------------------------------------------------------------- */
export const scopedTokens = `
  @font-face {
    font-family: "rc-font";
    src: url("/__mockup/figma-ref/fonts/rc-font.woff2") format("woff2"),
         url("/__mockup/figma-ref/fonts/rc-font.woff") format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }
  .rc-ico {
    font-family: "rc-font" !important;
    speak: never;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .rc-ico-service-console::before { content: "\\ea4a"; }
  .rc-ico-account-settings::before { content: "\\e987"; }
  .rc-ico-security-compliance::before { content: "\\ea4c"; }
  .rc-ico-apps-resources::before { content: "\\eb42"; }
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

/* -----------------------------------------------------------------------------
 * Spring switch (40 × 24 track, 20 dot)
 * --------------------------------------------------------------------------- */
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

/* -----------------------------------------------------------------------------
 * Spring dropdown trigger — looks like a Select control.
 * --------------------------------------------------------------------------- */
export function SpringSelect({ value, width = 200 }: { value: string; width?: number }) {
  // Spring DS Select: height 32, radius 10, 1px border @ rgba(0,0,0,0.2),
  // pl 10 / pr 6, label Inter Regular 14/20 in neutral-b0,
  // trailing chevron inside a 24x24 round icon button.
  return (
    <button
      style={{ width }}
      className="flex h-[32px] items-center gap-1 rounded-[10px] border border-black/20 bg-white pl-[10px] pr-[6px] text-left transition-colors hover:border-black/40 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
    >
      <span className="min-w-0 flex-1 truncate text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b0)]">
        {value}
      </span>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[var(--sui-colors-neutral-b1)]">
        <ChevronDown className="h-4 w-4" strokeWidth={1.6} />
      </span>
    </button>
  );
}

/* -----------------------------------------------------------------------------
 * Spring outlined pill tab.
 * --------------------------------------------------------------------------- */
export function PillTab({ label, selected }: { label: string; selected?: boolean }) {
  return (
    <button
      className={cn(
        'inline-flex h-[32px] min-w-[100px] items-center justify-center rounded-full px-3 text-[14px] font-medium leading-[20px] transition-colors',
        selected
          ? 'border border-black/20 bg-[var(--sui-colors-neutral-b4)] text-[var(--sui-colors-neutral-b1)]'
          : 'border border-black/20 bg-white text-[var(--sui-colors-neutral-b1)] hover:bg-[var(--sui-colors-neutral-b4)]/40',
      )}
    >
      {label}
    </button>
  );
}

/* -----------------------------------------------------------------------------
 * Spring nav icons — rendered as rc-font glyphs (real RingCentral icon font).
 * --------------------------------------------------------------------------- */
function RcIco({ name, color }: { name: 'service-console' | 'account-settings' | 'security-compliance' | 'apps-resources'; color?: string }) {
  return <i aria-hidden="true" className={`rc-ico rc-ico-${name}`} style={{ fontSize: 16, color, lineHeight: 1 }} />;
}
export function NavSettingsIcon({ color = '#0679BA' }: { color?: string }) {
  return <RcIco name="account-settings" color={color} />;
}
export function AppsResourcesIcon({ color = '#2F2F2F' }: { color?: string }) {
  return <RcIco name="apps-resources" color={color} />;
}
export function SecurityComplianceIcon({ color = '#2F2F2F' }: { color?: string }) {
  return <RcIco name="security-compliance" color={color} />;
}
export function ServiceConsoleIcon({ color = '#2F2F2F' }: { color?: string }) {
  return <RcIco name="service-console" color={color} />;
}


/* -----------------------------------------------------------------------------
 * Left side panel — Service Web UI nav tree
 * --------------------------------------------------------------------------- */
function Row({
  icon,
  label,
  labelColor,
  trailing,
  selected,
}: {
  icon?: React.ReactNode;
  label: string;
  labelColor?: string;
  trailing?: 'chev-right' | 'chev-down';
  selected?: boolean;
}) {
  // Per Figma: each row is 190px wide, 40px tall, bg #FBFBFB (or #F4F4F4 when selected),
  // with left+right borders only, 10px horizontal padding, 5px gap, inner content 10px gap.
  // Selected row: 4px blue bar replaces the left padding.
  return (
    <div
      className="flex min-h-[40px] w-[190px] shrink-0 items-center gap-[5px]"
      style={{
        backgroundColor: selected ? '#F4F4F4' : '#FBFBFB',
        paddingLeft: selected ? 0 : 10,
        paddingRight: 10,
      }}
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
      <Row
        icon={<NavSettingsIcon />}
        label="Account Settings"
        labelColor="#0679BA"
        trailing="chev-down"
      />
      <Row label="Feature Settings" selected />
      {['Appearance', 'App Integrations', 'Archiver Settings', 'Directory Integration', 'Headset Support', 'Microsoft Teams', 'Multi-Site Settings', 'Outbound Call Prefix'].map((l) => (
        <Row key={l} label={l} />
      ))}
      <Row icon={<SecurityComplianceIcon />} label="Security and Compliance" trailing="chev-right" />
      <Row icon={<AppsResourcesIcon />} label="Apps and Resources" trailing="chev-right" />
    </aside>
  );
}

/* -----------------------------------------------------------------------------
 * RingCentral wordmark — blue "Ring", orange "Central", italic-ish.
 * --------------------------------------------------------------------------- */
export function RingCentralLogo() {
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
 * Spring info icon (Figma asset) + label-with-info helper
 * --------------------------------------------------------------------------- */
export function InfoIcon() {
  return (
    <img
      src="/__mockup/figma-ref/icons/info.svg"
      alt=""
      aria-hidden="true"
      width={12}
      height={12}
      className="block h-3 w-3 shrink-0"
    />
  );
}

export function LabelWithInfo({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center gap-2 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
      <span>{children}</span>
      <InfoIcon />
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Setting card sub-rows — used both inline (Concept) and inside modals.
 * --------------------------------------------------------------------------- */
export function SubRow({ children }: React.PropsWithChildren) {
  return (
    <div className="flex w-full items-center justify-between gap-4 border-b border-[var(--sui-colors-neutral-b4)] pb-4 pt-0 last:border-b-0 [&:not(:first-child)]:pt-4">
      {children}
    </div>
  );
}

export function UserDefaultsRow() {
  return (
    <SubRow>
      <div className="flex min-w-0 items-center gap-2">
        <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          User defaults
        </span>
        <InfoIcon />
        <span className="ml-1 flex items-center border-l border-[var(--sui-colors-neutral-b4)] pl-2 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
          <a href="#" className="text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]">
            72/98 users
          </a>
          <span>&nbsp;are using the default</span>
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
          Set this setting for users
        </span>
        <SpringSelect value="On" width={96} />
      </div>
    </SubRow>
  );
}

export function UserPermissionsRow() {
  return (
    <SubRow>
      <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">User permissions</span>
      <label className="flex cursor-pointer items-center gap-2 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]">
        <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] bg-[var(--sui-colors-primary-b)]">
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </span>
        Allow users to change this setting
      </label>
    </SubRow>
  );
}

/* -----------------------------------------------------------------------------
 * Shell — Service Web UI chrome (masterhead, top nav, side nav) wrapping the
 * Spring content panel. Each tab mockup composes this shell with its own pill
 * tabs and card content as `children`. Use `after` to render absolute-positioned
 * overlays (modals) outside the centered chrome wrapper.
 * --------------------------------------------------------------------------- */
export function FeatureSettingsShell({
  children,
  after,
  flexLayout = false,
  showFooterActions = true,
}: React.PropsWithChildren<{
  after?: React.ReactNode;
  /**
   * When true, the shell uses a flex column layout that stretches to a
   * minimum height (960px) and pushes the legal footer to the bottom via
   * `mt-auto`. When false (default), the shell uses the original
   * `min-h-[100dvh]` block layout.
   */
  flexLayout?: boolean;
  /**
   * When true (default), renders the standard Cancel + disabled Save action
   * buttons under the content. Set to false for tabs that don't show them.
   */
  showFooterActions?: boolean;
}>) {
  return (
    <div
      className={
        flexLayout
          ? 'relative flex min-h-[960px] w-full flex-col bg-white'
          : 'relative min-h-[100dvh] w-full bg-white'
      }
    >
      <style>{scopedTokens}</style>

      {/* CHROME — Service Web UI Library */}
      <div className="swui-scope mx-auto w-[1200px] max-w-full">
        {/* Masterhead */}
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

      {/* Full-bleed separator under the sub-nav */}
      <div className="w-full border-b border-[#E2E2E2]" />

      {/* BODY — left chrome side panel + Spring content panel */}
      <div
        className={
          flexLayout
            ? 'flex w-full flex-1 justify-center bg-white px-4 pt-6 sm:px-6 lg:px-10'
            : 'flex w-full justify-center bg-white px-4 pt-6 sm:px-6 lg:px-10'
        }
      >
        <div className="flex w-[1200px] max-w-full gap-[10px]">
          <div className="swui-scope">
            <SideNav />
          </div>

          <main
            className={
              flexLayout
                ? 'spring-scope flex flex-1 flex-col px-[16px] pb-10 pt-[10px]'
                : 'spring-scope flex-1 px-[16px] pb-10 pt-[10px]'
            }
          >
            <h1 className="mb-5 flex h-[40px] items-center text-[20px] font-semibold leading-[28px] tracking-[-0.2px] text-[var(--sui-colors-neutral-b1)]">
              Feature Settings
            </h1>

            {children}

            {showFooterActions && (
              /* Footer actions — Spring DS Button (height 32, radius 10, padding-x 12, min-w 56) */
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
            )}

            {/* Legal footer (chrome typography but inside content area for layout) */}
            <div
              className={
                flexLayout
                  ? 'swui-scope mt-auto pt-10 text-[11px] leading-[16px] text-[var(--rc-text-faint)]'
                  : 'swui-scope mt-10 text-[11px] leading-[16px] text-[var(--rc-text-faint)]'
              }
            >
              <a href="#" className="text-[var(--rc-blue)] underline">Legal</a>
              <a href="#" className="ml-1 text-[var(--rc-blue)] underline">Privacy</a>
              <p className="mt-1">© 1999–2025 RingCentral Intellectual Property.</p>
              <p>All rights reserved. RingCentral and the RingCentral logo are trademarks of RingCentral, Inc.</p>
            </div>
          </main>
        </div>
      </div>

      {after}
    </div>
  );
}
