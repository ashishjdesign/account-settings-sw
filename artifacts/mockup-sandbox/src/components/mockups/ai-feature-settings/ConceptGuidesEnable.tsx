import React from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

/* Spring caret-down (CaretDownMD from Spring DS, node 1852-29581) — solid filled caret */
function SpringCaretDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 9.341 5.5505"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
      className={cn('h-[6px] w-[10px] shrink-0', className)}
    >
      <path d="M4.6705 5.5505L0 0.8505L0.8505 0.000999928L4.6705 3.82L8.4905 0L9.341 0.8505L4.6705 5.5505Z" />
    </svg>
  );
}

/* -----------------------------------------------------------------------------
 * Scoped tokens — Service Web UI Library (chrome) and Spring DS (content)
 * --------------------------------------------------------------------------- */
const scopedTokens = `
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
  .rc-ico-apps-resources::before { content: "\\ea53"; }
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
    --sui-colors-neutral-b5: #f5f6f9;
    --sui-radius-sm: 10px;
    font-family: Inter, system-ui, sans-serif;
    color: var(--sui-colors-neutral-b1);
  }
`;

/* -----------------------------------------------------------------------------
 * Spring switch
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
 * Spring pill tab
 * --------------------------------------------------------------------------- */
function PillTab({ label, selected }: { label: string; selected?: boolean }) {
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
 * Nav icons (Service Web UI)
 * --------------------------------------------------------------------------- */
function RcIco({ name, color }: { name: 'service-console' | 'account-settings' | 'security-compliance' | 'apps-resources'; color?: string }) {
  return <i aria-hidden="true" className={`rc-ico rc-ico-${name}`} style={{ fontSize: 16, color, lineHeight: 1 }} />;
}
function NavSettingsIcon({ color = '#0679BA' }: { color?: string }) {
  return <RcIco name="account-settings" color={color} />;
}
function AppsResourcesIcon({ color = '#2F2F2F' }: { color?: string }) {
  return <RcIco name="apps-resources" color={color} />;
}
function SecurityComplianceIcon({ color = '#2F2F2F' }: { color?: string }) {
  return <RcIco name="security-compliance" color={color} />;
}
function ServiceConsoleIcon({ color = '#2F2F2F' }: { color?: string }) {
  return <RcIco name="service-console" color={color} />;
}

/* -----------------------------------------------------------------------------
 * Side nav
 * --------------------------------------------------------------------------- */
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

function SideNav() {
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

/* -----------------------------------------------------------------------------
 * Setting card with optional summary line + Manage CTA.
 * --------------------------------------------------------------------------- */
type SummarySegment = { label?: string; value: string };

type IconKey = 'user-activation' | 'resource-center';

function SettingCard({
  title, description, switchOn, icon, summary, onManage, onSwitchClick,
}: {
  title: string;
  description: React.ReactNode;
  switchOn: boolean;
  icon: IconKey;
  summary?: SummarySegment[];
  onManage?: () => void;
  onSwitchClick?: () => void;
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
          <SpringSwitch
            checked={switchOn}
            onClick={(e) => {
              if (onSwitchClick) {
                e.preventDefault();
                onSwitchClick();
              }
            }}
            aria-label={title}
          />
        </div>

        <p className="pr-[130px] text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
          {description}{' '}
          <a href="#" className="font-normal text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]">
            Learn more
          </a>
        </p>

        {summary && summary.length > 0 && switchOn && (
          <div className="flex w-full items-center justify-between gap-4 mt-2 border-t border-[var(--sui-colors-neutral-b4)] pt-4">
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
 * RingCentral wordmark
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
 * Spring re-enable dialog — title, summary, configurable user defaults &
 * permissions, then handling of users with custom settings.
 * --------------------------------------------------------------------------- */
export type SpringEnableDialogResult = {
  defaultValue: 'On' | 'Off';
  allowChange: boolean;
  customAction: 'reset' | 'restore';
};

export function SpringEnableDialog({
  open, onCancel, onConfirm, initialUsersDialog = null,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: (result: SpringEnableDialogResult) => void;
  initialUsersDialog?: 'default' | 'custom' | 'all' | null;
}) {
  const [defaultValue, setDefaultValue] = React.useState<'On' | 'Off'>('On');
  const [allowChange, setAllowChange] = React.useState(true);
  const [customAction, setCustomAction] = React.useState<'reset' | 'restore'>('reset');
  const [usersDialog, setUsersDialog] = React.useState<'default' | 'custom' | 'all' | null>(initialUsersDialog);
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-16">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col gap-8 px-6 pb-10 pt-9">
          <div className="flex flex-col gap-6">
            <div className="py-3">
              <h2 className="text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
                Turn on Guides, tutorials &amp; announcements for your organization?
              </h2>
            </div>

            <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              This feature will be enabled for your account. Configure how it should be deployed to users below.
            </p>

            {/* Section: User deployment */}
            <div className="flex flex-col gap-2">
              <h3 className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                User deployment
              </h3>

              <div className="flex flex-col gap-4 rounded-[10px] border border-[#9E9FA4]/35 bg-white p-4">
                {/* Default in user settings row */}
                <div className="flex w-full items-center justify-between gap-4">
                  <div className="flex h-[32px] items-center gap-4 pr-4">
                    <span className="text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      Default in user settings:
                    </span>
                    <div className="flex items-center gap-5">
                      <SpringRadio
                        checked={defaultValue === 'On'}
                        onChange={() => setDefaultValue('On')}
                        label="On"
                      />
                      <SpringRadio
                        checked={defaultValue === 'Off'}
                        onChange={() => setDefaultValue('Off')}
                        label="Off"
                      />
                    </div>
                  </div>
                  <div className="flex h-[32px] items-center rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3">
                    <p className="whitespace-nowrap text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setUsersDialog('default'); }}
                        className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
                      >
                        72/98 users
                      </a>{' '}
                      are using the default
                    </p>
                  </div>
                </div>

                <div className="border-t border-[var(--sui-colors-neutral-b4)]" />

                {/* User access row */}
                <div className="flex h-[32px] items-center gap-4">
                  <span className="text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    User access:
                  </span>
                  <label className="flex cursor-pointer items-center gap-2">
                    <SpringCheckbox checked={allowChange} onChange={setAllowChange} />
                    <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      Allow users to change this setting
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Custom users — plain text + horizontal radios */}
            <div className="flex flex-col gap-3">
              <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setUsersDialog('custom'); }}
                  className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
                >
                  26/98 users
                </a>{' '}
                have custom settings for this feature. What would you like to do with these users?
              </p>
              <div className="flex items-center gap-8">
                <SpringRadio
                  checked={customAction === 'reset'}
                  onChange={() => setCustomAction('reset')}
                  label="Reset all to default"
                />
                <SpringRadio
                  checked={customAction === 'restore'}
                  onChange={() => setCustomAction('restore')}
                  label="Restore their custom settings"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--sui-colors-neutral-b4)]" />
        <div className="flex justify-end gap-2 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-3 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm({ defaultValue, allowChange, customAction })}
            className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
          >
            Turn on
          </button>
        </div>
      </div>

      {usersDialog && (
        <SpringUsersConfigDialog
          variant={usersDialog}
          onClose={() => setUsersDialog(null)}
        />
      )}
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Spring manage dialog — for the On state. Same visual treatment as the
 * re-enable dialog, but only the User defaults + User permissions controls
 * (no enable copy, no user-count summary, no custom-users handling).
 * --------------------------------------------------------------------------- */
export type SpringManageDialogResult = {
  defaultValue: 'On' | 'Off';
  allowChange: boolean;
};

export function SpringManageDialog({
  open, initialDefaultValue = 'On', initialAllowChange = true, onCancel, onSave,
}: {
  open: boolean;
  initialDefaultValue?: 'On' | 'Off';
  initialAllowChange?: boolean;
  onCancel: () => void;
  onSave: (result: SpringManageDialogResult) => void;
}) {
  const [defaultValue, setDefaultValue] = React.useState<'On' | 'Off'>(initialDefaultValue);
  const [allowChange, setAllowChange] = React.useState(initialAllowChange);
  const [usersDialog, setUsersDialog] = React.useState<'default' | 'custom' | 'all' | null>(null);
  React.useEffect(() => {
    if (open) {
      setDefaultValue(initialDefaultValue);
      setAllowChange(initialAllowChange);
    }
  }, [open, initialDefaultValue, initialAllowChange]);
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-16">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col gap-8 px-6 pb-10 pt-9">
          <div className="flex flex-col gap-6">
            <div className="py-3">
              <h2 className="text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
                Manage Guides, tutorials &amp; announcements settings
              </h2>
            </div>

            {/* Section: User deployment */}
            <div className="flex flex-col gap-2">
              <h3 className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                User deployment
              </h3>

              <div className="flex flex-col gap-4 rounded-[10px] border border-[#9E9FA4]/35 bg-white p-4">
                {/* Default in user settings row */}
                <div className="flex w-full items-center justify-between gap-4">
                  <div className="flex h-[32px] items-center gap-4 pr-4">
                    <span className="text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      Default in user settings:
                    </span>
                    <div className="flex items-center gap-5">
                      <SpringRadio
                        checked={defaultValue === 'On'}
                        onChange={() => setDefaultValue('On')}
                        label="On"
                      />
                      <SpringRadio
                        checked={defaultValue === 'Off'}
                        onChange={() => setDefaultValue('Off')}
                        label="Off"
                      />
                    </div>
                  </div>
                  <div className="flex h-[32px] items-center rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3">
                    <p className="whitespace-nowrap text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setUsersDialog('default'); }}
                        className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
                      >
                        72/98 users
                      </a>{' '}
                      are using the default
                    </p>
                  </div>
                </div>

                <div className="border-t border-[var(--sui-colors-neutral-b4)]" />

                {/* User access row */}
                <div className="flex h-[32px] items-center gap-4">
                  <span className="text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    User access:
                  </span>
                  <label className="flex cursor-pointer items-center gap-2">
                    <SpringCheckbox checked={allowChange} onChange={setAllowChange} />
                    <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      Allow users to change this setting
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
        <div className="flex justify-end gap-2 px-6 pt-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--sui-colors-neutral-b4)] bg-white px-[18px] text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave({ defaultValue, allowChange })}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-[18px] text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
          >
            Confirm
          </button>
        </div>
      </div>

      {usersDialog && (
        <SpringUsersConfigDialog
          variant={usersDialog}
          onClose={() => setUsersDialog(null)}
        />
      )}
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * SpringManageDialogV2 — alternative Manage dialog. Same single-control intent
 * as v1 (Allow self-management), but with a tighter title and a richer
 * single-line summary that links to both default and custom user lists.
 * --------------------------------------------------------------------------- */
export type SpringManageDialogV2Result = {
  defaultValue: 'On' | 'Off';
  allowChange: boolean;
};

export function SpringManageDialogV2({
  open,
  initialDefaultValue = 'On',
  initialAllowChange = true,
  defaultUsersCount = 72,
  customUsersCount = 26,
  totalUsersCount = 98,
  onCancel,
  onSave,
}: {
  open: boolean;
  initialDefaultValue?: 'On' | 'Off';
  initialAllowChange?: boolean;
  defaultUsersCount?: number;
  customUsersCount?: number;
  totalUsersCount?: number;
  onCancel: () => void;
  onSave: (result: SpringManageDialogV2Result) => void;
}) {
  const [defaultValue, setDefaultValue] = React.useState<'On' | 'Off'>(initialDefaultValue);
  const [allowChange, setAllowChange] = React.useState(initialAllowChange);
  const [usersDialog, setUsersDialog] = React.useState<'default' | 'custom' | 'all' | null>(null);

  React.useEffect(() => {
    if (open) {
      setDefaultValue(initialDefaultValue);
      setAllowChange(initialAllowChange);
    }
  }, [open, initialDefaultValue, initialAllowChange]);

  if (!open) return null;

  const hasCustomUsers = customUsersCount > 0;

  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-16">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex w-[800px] max-w-[calc(100%-32px)] flex-col rounded-[12px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)]"
      >
        <div className="flex flex-col gap-5 px-6 pb-8 pt-6">
          <h2 className="py-3 text-[22px] font-normal leading-[30px] text-[var(--sui-colors-neutral-b1)]">
            Manage Guides, tutorials &amp; announcements settings
          </h2>

          <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setUsersDialog('default'); }}
              className="cursor-pointer font-normal text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
            >
              {defaultUsersCount}/{totalUsersCount} users
            </a>{' '}
            are using the <span className="font-semibold">default</span> user configuration.
          </p>

          <div className="flex flex-col rounded-[10px] border border-[var(--sui-colors-neutral-b4)] bg-white">
            <div className="flex flex-col gap-2 p-4">
              <div className="flex min-h-[32px] w-full items-center gap-4">
                <h3 className="flex-1 text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  Default state for users
                </h3>
                <SpringSelect
                  value={defaultValue}
                  options={['On', 'Off']}
                  onChange={(v) => setDefaultValue(v as 'On' | 'Off')}
                  width={84}
                />
              </div>
              <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                What new and default-config users see in their settings.
              </p>
            </div>
            <div className="mx-4 border-t border-[var(--sui-colors-neutral-b4)]/70" />
            <label className="flex cursor-pointer flex-col gap-2 p-4">
              <div className="flex min-h-[32px] w-full items-center gap-4">
                <h3 className="flex-1 text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  Allow users to change this setting themselves
                </h3>
                <SpringSwitch
                  checked={allowChange}
                  onCheckedChange={setAllowChange}
                />
              </div>
              <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                When off, only admins can change this setting for users.
              </p>
            </label>
          </div>

          <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
            Admins can manage this setting for individual users from their detail pages or apply it in bulk through{' '}
            <a href="#" className="cursor-pointer whitespace-nowrap text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]">
              User Templates
            </a>.
          </p>
        </div>

        <div className="border-t border-[#DDDFE5]/50" />
        <div className="flex justify-end gap-2 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-3 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave({ defaultValue, allowChange })}
            className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
          >
            Save
          </button>
        </div>
      </div>

      {usersDialog && (
        <SpringUsersConfigDialog
          variant={usersDialog}
          defaultUsersCount={defaultUsersCount}
          customUsersCount={customUsersCount}
          totalUsersCount={totalUsersCount}
          onClose={() => setUsersDialog(null)}
        />
      )}
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * SpringManageDialogV3 — categorized layout. Splits content into two clearly
 * labeled sections so the pattern scales to features with their own sub-settings:
 *   1) User deployment  — default state + self-manage permission (always present)
 *   2) Feature settings — feature-specific options (varies per feature)
 * --------------------------------------------------------------------------- */
export type SpringManageDialogV3Result = {
  defaultValue: 'On' | 'Off';
  allowChange: boolean;
  showTutorials: boolean;
  showPromotions: boolean;
  showAnnouncements: boolean;
};

export function SpringManageDialogV3({
  open,
  initialDefaultValue = 'On',
  initialAllowChange = true,
  defaultUsersCount = 72,
  customUsersCount = 26,
  totalUsersCount = 98,
  onCancel,
  onSave,
}: {
  open: boolean;
  initialDefaultValue?: 'On' | 'Off';
  initialAllowChange?: boolean;
  defaultUsersCount?: number;
  customUsersCount?: number;
  totalUsersCount?: number;
  onCancel: () => void;
  onSave: (result: SpringManageDialogV3Result) => void;
}) {
  const [defaultValue, setDefaultValue] = React.useState<'On' | 'Off'>(initialDefaultValue);
  const [allowChange, setAllowChange] = React.useState(initialAllowChange);
  const [showTutorials, setShowTutorials] = React.useState(true);
  const [showPromotions, setShowPromotions] = React.useState(true);
  const [showAnnouncements, setShowAnnouncements] = React.useState(true);
  const [usersDialog, setUsersDialog] = React.useState<'default' | 'custom' | 'all' | null>(null);

  React.useEffect(() => {
    if (open) {
      setDefaultValue(initialDefaultValue);
      setAllowChange(initialAllowChange);
    }
  }, [open, initialDefaultValue, initialAllowChange]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-12">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex w-[800px] max-w-[calc(100%-32px)] flex-col rounded-[12px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)]"
      >
        <div className="flex flex-col gap-6 px-6 pb-8 pt-6">
          <h2 className="py-2 text-[22px] font-normal leading-[30px] text-[var(--sui-colors-neutral-b1)]">
            Manage Guides, tutorials &amp; announcements
          </h2>

          {/* Section 1: User deployment */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                User deployment
              </h3>
              <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setUsersDialog('default'); }}
                  className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
                >
                  {defaultUsersCount}/{totalUsersCount} users
                </a>{' '}
                use the default.
              </p>
            </div>

            <div className="flex flex-col rounded-[10px] border border-[var(--sui-colors-neutral-b4)] bg-white">
              <div className="flex min-h-[56px] items-center gap-4 p-4">
                <h4 className="flex-1 text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  Default for new users
                </h4>
                <SpringSelect
                  value={defaultValue}
                  options={['On', 'Off']}
                  onChange={(v) => setDefaultValue(v as 'On' | 'Off')}
                  width={84}
                />
              </div>
              <div className="mx-4 border-t border-[var(--sui-colors-neutral-b4)]/70" />
              <label className="flex min-h-[56px] cursor-pointer items-center gap-4 p-4">
                <h4 className="flex-1 text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  Let users change this themselves
                </h4>
                <SpringSwitch checked={allowChange} onCheckedChange={setAllowChange} />
              </label>
            </div>
          </div>

        </div>

        <div className="border-t border-[#DDDFE5]/50" />
        <div className="flex justify-end gap-2 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-3 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave({ defaultValue, allowChange, showTutorials, showPromotions, showAnnouncements })}
            className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
          >
            Save
          </button>
        </div>
      </div>

      {usersDialog && (
        <SpringUsersConfigDialog
          variant={usersDialog}
          defaultUsersCount={defaultUsersCount}
          customUsersCount={customUsersCount}
          totalUsersCount={totalUsersCount}
          onClose={() => setUsersDialog(null)}
        />
      )}
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Users config dialog — list of users on default/custom configuration
 * --------------------------------------------------------------------------- */
type UserRow = { name: string; ext: string; department: string; site: string; configuration: 'Default' | 'Custom' };

const MOCK_DEFAULT_USERS: UserRow[] = [
  { name: 'Emily Davis',    ext: '10012', department: 'Sales',   site: 'CA - San Francisco', configuration: 'Default' },
  { name: 'Chris Walker',   ext: '10013', department: 'Support', site: 'CA - San Francisco', configuration: 'Default' },
  { name: 'Jordan Lee',     ext: '10014', department: 'Sales',   site: 'CA - Los Angeles',   configuration: 'Default' },
  { name: 'Casey White',    ext: '10015', department: 'IT',      site: 'CA - San Francisco', configuration: 'Default' },
  { name: 'Taylor Adams',   ext: '10016', department: 'Sales',   site: 'CA - Los Angeles',   configuration: 'Default' },
  { name: 'Amanda Clark',   ext: '10017', department: 'Sales',   site: 'CA - San Francisco', configuration: 'Default' },
  { name: 'Mike Johnson',   ext: '10018', department: 'Support', site: 'CA - San Francisco', configuration: 'Default' },
  { name: 'Tom Anderson',   ext: '10019', department: 'IT',      site: 'CA - San Francisco', configuration: 'Default' },
  { name: 'Patrick Colins', ext: '10020', department: 'Sales',   site: 'CA - Los Angeles',   configuration: 'Default' },
  { name: 'Adam Smith',     ext: '10021', department: 'IT',      site: 'CA - Los Angeles',   configuration: 'Default' },
];

const MOCK_CUSTOM_USERS: UserRow[] = [
  { name: 'Olivia Brown',   ext: '10101', department: 'Marketing', site: 'NY - New York',     configuration: 'Custom' },
  { name: 'Liam Garcia',    ext: '10102', department: 'Engineering', site: 'NY - New York',   configuration: 'Custom' },
  { name: 'Sophia Wilson',  ext: '10103', department: 'Sales',    site: 'TX - Austin',        configuration: 'Custom' },
  { name: 'Noah Martinez',  ext: '10104', department: 'IT',       site: 'TX - Austin',        configuration: 'Custom' },
  { name: 'Ava Robinson',   ext: '10105', department: 'Support',  site: 'NY - New York',      configuration: 'Custom' },
  { name: 'Ethan Clark',    ext: '10106', department: 'Marketing', site: 'WA - Seattle',      configuration: 'Custom' },
  { name: 'Mia Lewis',      ext: '10107', department: 'Engineering', site: 'WA - Seattle',    configuration: 'Custom' },
  { name: 'Lucas Hall',     ext: '10108', department: 'Sales',    site: 'TX - Austin',        configuration: 'Custom' },
  { name: 'Isabella Young', ext: '10109', department: 'IT',       site: 'NY - New York',      configuration: 'Custom' },
  { name: 'Mason King',     ext: '10110', department: 'Support',  site: 'WA - Seattle',       configuration: 'Custom' },
];

const MOCK_ALL_USERS: UserRow[] = [
  { name: 'Emily Davis',     ext: '10012', department: 'Sales',       site: 'CA - San Francisco', configuration: 'Default' },
  { name: 'Olivia Brown',    ext: '10101', department: 'Marketing',   site: 'NY - New York',      configuration: 'Custom' },
  { name: 'Chris Walker',    ext: '10013', department: 'Support',     site: 'CA - San Francisco', configuration: 'Default' },
  { name: 'Liam Garcia',     ext: '10102', department: 'Engineering', site: 'NY - New York',      configuration: 'Custom' },
  { name: 'Jordan Lee',      ext: '10014', department: 'Sales',       site: 'CA - Los Angeles',   configuration: 'Default' },
  { name: 'Sophia Wilson',   ext: '10103', department: 'Sales',       site: 'TX - Austin',        configuration: 'Custom' },
  { name: 'Casey White',     ext: '10015', department: 'IT',          site: 'CA - San Francisco', configuration: 'Default' },
  { name: 'Noah Martinez',   ext: '10104', department: 'IT',          site: 'TX - Austin',        configuration: 'Custom' },
  { name: 'Taylor Adams',    ext: '10016', department: 'Sales',       site: 'CA - Los Angeles',   configuration: 'Default' },
  { name: 'Ava Robinson',    ext: '10105', department: 'Support',     site: 'NY - New York',      configuration: 'Custom' },
];

function SpringUsersConfigDialog({
  variant, onClose,
  defaultUsersCount = 72,
  customUsersCount = 26,
  totalUsersCount = 98,
}: {
  variant: 'default' | 'custom' | 'all';
  onClose: () => void;
  defaultUsersCount?: number;
  customUsersCount?: number;
  totalUsersCount?: number;
}) {
  const total = totalUsersCount;
  const initialFilter: 'All' | 'Default' | 'Custom' =
    variant === 'all' ? 'All' : variant === 'default' ? 'Default' : 'Custom';
  const [configFilter, setConfigFilter] = React.useState<'All' | 'Default' | 'Custom'>(initialFilter);
  const rows = React.useMemo(() => {
    if (configFilter === 'Custom') return customUsersCount === 0 ? [] : MOCK_CUSTOM_USERS;
    if (configFilter === 'Default') return MOCK_DEFAULT_USERS;
    return customUsersCount === 0 ? MOCK_DEFAULT_USERS : MOCK_ALL_USERS;
  }, [configFilter, customUsersCount]);
  const count = configFilter === 'All' ? total : configFilter === 'Default' ? defaultUsersCount : customUsersCount;

  return (
    <div className="absolute inset-0 z-[60] flex items-start justify-center pt-12">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex w-[1024px] max-w-[calc(100%-32px)] flex-col rounded-[12px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)]"
      >
        <div className="flex flex-col gap-5 px-9 pb-6 pt-8">
          <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b1)]">
            User configuration for Guides, tutorials &amp; announcements
          </h2>

          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              <span className="font-semibold">{defaultUsersCount}/{total} users</span> are using the{' '}
              <span className="font-semibold">default</span> user configuration.
            </p>
            <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              Admins can manage this setting for users from their detail pages or apply them in bulk through{' '}
              <a href="#" className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]">
                User Templates
              </a>.
            </p>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-4 items-center gap-3">
            <div className="flex h-[32px] w-full items-center rounded-[10px] border border-black/20 bg-white px-[10px]">
              <span className="flex shrink-0 items-start pr-1">
                <Search className="h-4 w-4 text-[var(--sui-colors-neutral-b1)]" strokeWidth={2} />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b0)] placeholder-[var(--sui-colors-neutral-b2)] outline-none"
              />
            </div>
            <FilterPill label="Department" />
            <FilterPill label="Sites" />
            <FilterDropdown
              label="Configuration"
              value={configFilter}
              options={['All', 'Default', 'Custom']}
              onChange={(v) => setConfigFilter(v as 'All' | 'Default' | 'Custom')}
            />
          </div>

          {/* Table */}
          <div className="flex flex-col overflow-hidden rounded-[8px] border border-black/20">
            <div className="grid grid-cols-[2fr_1fr_1.4fr_1.8fr_1.2fr] items-center gap-4 border-b border-black/20 bg-[var(--sui-colors-neutral-b4)]/40 px-4 py-3 text-[13px] font-semibold leading-[18px] text-[var(--sui-colors-neutral-b1)]">
              <span>Name</span>
              <span>Ext</span>
              <span>Department</span>
              <span>Site</span>
              <span>Configuration</span>
            </div>
            {rows.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-1 px-4 py-12 text-center">
                <p className="text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  No users found
                </p>
                <p className="text-[13px] font-normal leading-[18px] text-[var(--sui-colors-neutral-b2)]">
                  No users are currently using a custom configuration.
                </p>
              </div>
            ) : rows.map((u, i) => (
              <div
                key={u.ext}
                className={cn(
                  'grid h-[40px] grid-cols-[2fr_1fr_1.4fr_1.8fr_1.2fr] items-center gap-4 px-4 text-[12px] leading-[18px] text-[var(--sui-colors-neutral-b1)]',
                  i !== rows.length - 1 && 'border-b border-black/20',
                )}
              >
                <a href="#" className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]">
                  {u.name}
                </a>
                <span>{u.ext}</span>
                <span>{u.department}</span>
                <span>{u.site}</span>
                <span>{u.configuration}</span>
              </div>
            ))}
            <div className="flex items-center justify-end border-t border-black/20 pb-2 pl-[6px] pr-[14px] pt-2 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b0)]">
              <div className="flex items-center gap-[20px]">
                <div className="flex items-center gap-2">
                  <span>Rows per page</span>
                  <button
                    type="button"
                    className="flex h-[32px] w-[64px] cursor-pointer items-center rounded-[10px] border border-black/20 bg-white pl-[10px] pr-[6px] text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b0)] hover:border-black/40"
                  >
                    <span className="flex-1 text-left">10</span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                      <SpringCaretDown className="text-[var(--sui-colors-neutral-b0)]" />
                    </span>
                  </button>
                </div>
                <div className="flex min-w-[72px] items-center justify-end gap-1">
                  <span>{count === 0 ? '0-0' : `1-${Math.min(10, count)}`}</span>
                  <span>of</span>
                  <span>{count}</span>
                </div>
                <div className="flex items-start gap-1">
                  <button type="button" className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-[var(--sui-colors-neutral-b4)]/40">
                    <ChevronRight className="h-4 w-4 rotate-180 text-[var(--sui-colors-neutral-b0)]" strokeWidth={2} />
                  </button>
                  <button type="button" className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-[var(--sui-colors-neutral-b4)]/40">
                    <ChevronRight className="h-4 w-4 text-[var(--sui-colors-neutral-b0)]" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#DDDFE5]/50" />
        <div className="flex justify-end gap-2 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-3 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterDropdown({
  label, value, options, onChange,
}: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);
  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-[36px] w-full cursor-pointer items-center justify-between gap-2 rounded-[10px] border border-black/20 bg-white pl-3 pr-2 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)] hover:border-black/40"
      >
        <span className="truncate">{label}: {value}</span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          <SpringCaretDown className="text-[var(--sui-colors-neutral-b1)]" />
        </span>
      </button>
      {open && (
        <ul className="absolute left-0 right-0 top-[40px] z-30 overflow-hidden rounded-[4px] bg-white py-1 shadow-[0_2px_4px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
          {options.map((opt) => {
            const selected = opt === value;
            return (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={cn(
                    'flex h-[32px] w-full cursor-pointer items-center justify-between gap-2 px-3 text-left text-[14px] font-normal leading-[20px] transition-colors',
                    selected
                      ? 'bg-[var(--sui-colors-primary-b)]/10 text-[var(--sui-colors-primary-b)]'
                      : 'text-[var(--sui-colors-neutral-b1)] hover:bg-[var(--sui-colors-neutral-b4)]/50',
                  )}
                >
                  <span>{opt}</span>
                  {selected && (
                    <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 7.5l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FilterPill({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex h-[36px] w-full cursor-pointer items-center justify-between gap-2 rounded-[10px] border border-black/20 bg-white pl-3 pr-2 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)] hover:border-black/40"
    >
      <span>{label}</span>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center">
        <SpringCaretDown className="text-[var(--sui-colors-neutral-b1)]" />
      </span>
    </button>
  );
}

/* -----------------------------------------------------------------------------
 * Spring select / checkbox / radio primitives (lightweight)
 * --------------------------------------------------------------------------- */
function SpringSelect({
  value, options, onChange, width = 120,
}: { value: string; options: string[]; onChange: (v: string) => void; width?: number }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative" style={{ width }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-[32px] w-full cursor-pointer items-center justify-between gap-2 rounded-[8px] border border-black/20 bg-white px-3 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)] hover:border-black/40"
      >
        <span>{value}</span>
        <SpringCaretDown className="text-[var(--sui-colors-neutral-b1)]" />
      </button>
      {open && (
        <ul className="absolute right-0 top-[36px] z-20 min-w-full overflow-hidden rounded-[4px] bg-white py-1 shadow-[0_2px_4px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
          {options.map((opt) => {
            const selected = opt === value;
            return (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={cn(
                    'flex h-[32px] w-full cursor-pointer items-center justify-between gap-2 px-3 text-left text-[14px] font-normal leading-[20px] transition-colors',
                    selected
                      ? 'bg-[var(--sui-colors-primary-b)]/10 text-[var(--sui-colors-primary-b)]'
                      : 'text-[var(--sui-colors-neutral-b1)] hover:bg-[var(--sui-colors-neutral-b4)]/50',
                  )}
                >
                  <span>{opt}</span>
                  {selected && (
                    <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 7.5l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function SpringCheckbox({
  checked, onChange,
}: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'flex h-[18px] w-[18px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] border transition-colors',
        checked
          ? 'border-[var(--sui-colors-primary-b)] bg-[var(--sui-colors-primary-b)]'
          : 'border-[var(--sui-colors-neutral-b3)] bg-white hover:border-[var(--sui-colors-neutral-b2)]',
      )}
    >
      {checked && (
        <svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="white" strokeWidth="2">
          <path d="M3 7.5l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function SpringRadio({
  checked, onChange, label,
}: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)]">
      <button
        type="button"
        role="radio"
        aria-checked={checked}
        onClick={onChange}
        className={cn(
          'flex h-[18px] w-[18px] shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors',
          checked
            ? 'border-[var(--sui-colors-primary-b)]'
            : 'border-[var(--sui-colors-neutral-b3)] hover:border-[var(--sui-colors-neutral-b2)]',
        )}
      >
        {checked && (
          <span className="h-[10px] w-[10px] rounded-full bg-[var(--sui-colors-primary-b)]" />
        )}
      </button>
      {label}
    </label>
  );
}

/* -----------------------------------------------------------------------------
 * MAIN — User activation: disable confirmation flow
 * Toggle starts ON. Clicking the switch opens "Turn off" modal.
 * Confirm flips switch to OFF; Cancel keeps it ON.
 * --------------------------------------------------------------------------- */
export function ConceptGuidesUsersConfig() {
  return <ConceptGuidesEnableImpl initialUsersDialog="default" />;
}

export function ConceptGuidesUsersConfigAll() {
  return <ConceptGuidesEnableImpl initialUsersDialog="all" />;
}

export function ConceptGuidesUsersConfigCustom() {
  return <ConceptGuidesEnableImpl initialUsersDialog="custom" />;
}

export function ConceptGuidesEnable() {
  return <ConceptGuidesEnableImpl />;
}

export function ConceptGuidesManage() {
  return <ConceptGuidesEnableImpl mode="manage" />;
}

export function ConceptGuidesManageV2() {
  return <ConceptGuidesEnableImpl mode="manage-v2" />;
}

export function ConceptGuidesManageV3() {
  return <ConceptGuidesEnableImpl mode="manage-v3" />;
}

function ConceptGuidesEnableImpl({
  initialUsersDialog = null, mode = 'enable',
}: {
  initialUsersDialog?: 'default' | 'custom' | 'all' | null;
  mode?: 'enable' | 'manage' | 'manage-v2' | 'manage-v3';
}) {
  const isManageMode = mode === 'manage' || mode === 'manage-v2' || mode === 'manage-v3';
  const [guidesOn, setGuidesOn] = React.useState(isManageMode);
  const [confirmOpen, setConfirmOpen] = React.useState(mode === 'enable');
  const [manageOpen, setManageOpen] = React.useState(mode === 'manage');
  const [manageV2Open, setManageV2Open] = React.useState(mode === 'manage-v2');
  const [manageV3Open, setManageV3Open] = React.useState(mode === 'manage-v3');

  return (
    <div className="relative flex min-h-[960px] w-full flex-col bg-white">
      <style>{scopedTokens}</style>

      {/* CHROME */}
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

      <div className="w-full border-b border-[#E2E2E2]" />

      {/* BODY */}
      <div className="flex w-full flex-1 justify-center bg-white px-4 pt-6 sm:px-6 lg:px-10">
        <div className="flex w-[1200px] max-w-full gap-[10px]">
          <div className="swui-scope">
            <SideNav />
          </div>

          <main className="spring-scope flex flex-1 flex-col px-[16px] pb-10 pt-[10px]">
            <h1 className="mb-5 flex h-[40px] items-center text-[20px] font-semibold leading-[28px] tracking-[-0.2px] text-[var(--sui-colors-neutral-b1)]">
              Feature Settings
            </h1>

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
                switchOn={guidesOn}
                icon="resource-center"
                description="Displays helpful guides, tutorials, important company-wide updates, and service promotions directly to your users."
                summary={[
                  { label: 'User default:', value: 'On' },
                  { value: '72 of 98 users use this default' },
                  { label: 'User access:', value: 'Allowed' },
                ]}
                onManage={() => {
                  if (mode === 'manage-v3') setManageV3Open(true);
                  else if (mode === 'manage-v2') setManageV2Open(true);
                  else setManageOpen(true);
                }}
                onSwitchClick={() => {
                  if (mode === 'manage-v3') setManageV3Open(true);
                  else if (mode === 'manage-v2') setManageV2Open(true);
                  else if (mode === 'manage') setManageOpen(true);
                  else setConfirmOpen(true);
                }}
              />
            </div>

            <div className="swui-scope mt-auto pt-10 text-[11px] leading-[16px] text-[var(--rc-text-faint)]">
              <a href="#" className="text-[var(--rc-blue)] underline">Legal</a>
              <a href="#" className="ml-1 text-[var(--rc-blue)] underline">Privacy</a>
              <p className="mt-1">© 1999–2025 RingCentral Intellectual Property.</p>
              <p>All rights reserved. RingCentral and the RingCentral logo are trademarks of RingCentral, Inc.</p>
            </div>
          </main>
        </div>
      </div>

      <div className="spring-scope">
        <SpringEnableDialog
          open={confirmOpen}
          initialUsersDialog={initialUsersDialog}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            setGuidesOn(true);
            setConfirmOpen(false);
          }}
        />
        <SpringManageDialog
          open={manageOpen}
          onCancel={() => setManageOpen(false)}
          onSave={() => setManageOpen(false)}
        />
        <SpringManageDialogV2
          open={manageV2Open}
          onCancel={() => setManageV2Open(false)}
          onSave={() => setManageV2Open(false)}
        />
        <SpringManageDialogV3
          open={manageV3Open}
          onCancel={() => setManageV3Open(false)}
          onSave={() => setManageV3Open(false)}
        />
      </div>
    </div>
  );
}
