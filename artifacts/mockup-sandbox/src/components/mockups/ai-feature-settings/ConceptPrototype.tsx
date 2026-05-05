import React from 'react';
import {
  ChevronDown,
  ChevronRight,
  Search,
  Check,
  X,
} from 'lucide-react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';
import { SpringEnableDialog, SpringManageDialogV2 } from './ConceptGuidesEnable';

/* -----------------------------------------------------------------------------
 * Scoped tokens — Service Web UI Library (chrome) and Spring DS (content panel)
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
  .rc-ico-account-settings::before { content: "\\eb40"; }
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
      'disabled:cursor-not-allowed disabled:opacity-40',
      className,
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb className="pointer-events-none block h-[20px] w-[20px] rounded-full bg-white shadow-sm transition-transform data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-[2px]" />
  </SwitchPrimitives.Root>
));
SpringSwitch.displayName = 'SpringSwitch';

/* -----------------------------------------------------------------------------
 * Spring select
 * --------------------------------------------------------------------------- */
function SpringSelect({ value, width = 200 }: { value: string; width?: number }) {
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
 * Spring pill tab
 * --------------------------------------------------------------------------- */
function PillTab({
  label, selected, onClick,
}: { label: string; selected?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'inline-flex h-[32px] min-w-[100px] cursor-pointer items-center justify-center rounded-full px-3 text-[14px] font-medium leading-[20px] transition-colors focus:outline-none',
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
 * Spring info icon (Figma asset)
 * --------------------------------------------------------------------------- */
function InfoIcon() {
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

function LabelWithInfo({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center gap-2 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
      <span>{children}</span>
      <InfoIcon />
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Setting card with summary line + Manage CTA (collapsed sub-settings).
 *
 * Summary segments per Figma 1786:54673 — each segment is "Label: value"
 * (label Inter Semibold 14/20, value Inter Regular 14/20) or plain text;
 * segments separated by an 8px vertical divider in neutral-b4.
 * --------------------------------------------------------------------------- */
type SummarySegment = { label?: string; value: string };

type IconKey =
  | 'ai-stars' | 'ai-lightbulb' | 'ai-writer'
  | 'user-activation' | 'resource-center'
  | 'tear-out-window' | 'active-call' | 'conference'
  | 'sms' | 'fax' | 'email-to-fax';

function SettingCard({
  title, description, switchOn, icon, summary, onManage, disabled, info, infoTooltip, onSwitchClick,
}: {
  title: string;
  description: React.ReactNode;
  switchOn: boolean;
  icon?: IconKey;
  summary?: SummarySegment[];
  onManage?: () => void;
  disabled?: boolean;
  info?: boolean;
  infoTooltip?: string;
  onSwitchClick?: () => void;
}) {
  return (
    <section className="flex items-start gap-4 rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
      {icon && (
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
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {/* Title row */}
        <div className="flex min-h-[32px] w-full items-center gap-4">
          <h3 className="flex-1 truncate text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            {title}
          </h3>
          {info && (
            <button
              type="button"
              aria-label={infoTooltip ?? `More info about ${title}`}
              title={infoTooltip}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[var(--sui-colors-neutral-b2)] transition-colors hover:text-[var(--sui-colors-neutral-b1)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
            >
              <InfoIcon />
            </button>
          )}
          <SpringSwitch
            checked={switchOn}
            disabled={disabled}
            aria-label={title}
            onClick={onSwitchClick ? (e) => { e.preventDefault(); onSwitchClick(); } : undefined}
          />
        </div>

        {/* Description */}
        <p className="pr-[130px] text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
          {description}{' '}
          <a href="#" className="font-normal text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]">
            Learn more
          </a>
        </p>

        {/* Summary + Manage row (Figma 1786:54673) */}
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
 * Modal sub-rows (reused from the inline-sub-settings concept)
 * --------------------------------------------------------------------------- */
function SubRow({ children }: React.PropsWithChildren) {
  return (
    <div className="flex w-full items-center justify-between gap-4 border-b border-[var(--sui-colors-neutral-b4)] pb-4 pt-0 last:border-b-0 [&:not(:first-child)]:pt-4">
      {children}
    </div>
  );
}

function UserDefaultsRow() {
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

function UserPermissionsRow() {
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
 * Spring Dialog (modal)
 *
 * Spring DS dialog spec: white surface, 12px radius, 24px padding,
 * level-3 elevation shadow, 40% black scrim. Header has the title in
 * Inter Semibold 18/24 and a 24px close (X) button. Footer right-aligned
 * action buttons reusing the existing Spring button spec.
 * --------------------------------------------------------------------------- */
function SpringDialog({
  open, title, onClose, children,
}: React.PropsWithChildren<{ open: boolean; title: string; onClose: () => void }>) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-20">
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Surface */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 flex w-[720px] max-w-[calc(100%-32px)] flex-col rounded-[12px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 pb-3 pt-6">
          <h2 className="min-w-0 flex-1 text-[18px] font-semibold leading-[24px] text-[var(--sui-colors-neutral-b1)]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[var(--sui-colors-neutral-b1)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col px-6 py-2">
          {children}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 pb-6 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-[32px] min-w-[56px] items-center justify-center rounded-[10px] border border-black/20 bg-white px-3 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-[32px] min-w-[56px] items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
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
 * Section subhead between cards (e.g. "In-app notification" on General tab)
 * --------------------------------------------------------------------------- */
function SectionHeading({ children }: React.PropsWithChildren) {
  return (
    <h2 className="mt-2 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
      {children}
    </h2>
  );
}

/* -----------------------------------------------------------------------------
 * Tab content panels
 * --------------------------------------------------------------------------- */
function GeneralPanel({
  userActivationOn,
  onUserActivationClick,
  guidesOn,
  guidesDefault,
  guidesAllowChange,
  onGuidesClick,
  onGuidesManage,
}: {
  userActivationOn: boolean;
  onUserActivationClick: () => void;
  guidesOn: boolean;
  guidesDefault: 'On' | 'Off';
  guidesAllowChange: boolean;
  onGuidesClick: () => void;
  onGuidesManage: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <SettingCard
        title="User activation"
        switchOn={userActivationOn}
        icon="user-activation"
        description="Let users re-generate an activation email if it's been less than 30 days since the last one was sent."
        onSwitchClick={onUserActivationClick}
      />
      <SectionHeading>In-app notification</SectionHeading>
      <SettingCard
        title="Guides, tutorials & announcements"
        switchOn={guidesOn}
        icon="resource-center"
        description="Displays helpful guides, tutorials, important company-wide updates, and service promotions directly to your users."
        summary={
          guidesOn
            ? [
                { label: 'User default:', value: guidesDefault },
                {
                  value: guidesAllowChange
                    ? 'Users can change this setting'
                    : 'Users cannot change this setting',
                },
              ]
            : undefined
        }
        onManage={onGuidesManage}
        onSwitchClick={onGuidesClick}
      />
    </div>
  );
}

function PhonePanel() {
  return (
    <div className="flex flex-col gap-4">
      <SettingCard
        title="Launch an external app for incoming calls"
        switchOn={false}
        icon="tear-out-window"
        description="Have incoming calls open an external app or website, like a CRM system or online database."
      />
      <SettingCard
        title="Auto-answer calls"
        switchOn
        icon="active-call"
        description="Allow users to turn on Auto-Answer for incoming calls in the RingCentral desktop app."
        summary={[
          { label: 'User default:', value: 'Off' },
          { value: 'Users can change this setting' },
        ]}
        onManage={() => {}}
      />
      <SettingCard
        title="Conference calls"
        switchOn={false}
        icon="conference"
        description="Allow hosts to leave conference call without ending them."
      />
    </div>
  );
}

function AiPanel({ onManage }: { onManage: (k: 'ai-assistant' | 'auto-call-notes') => void }) {
  return (
    <div className="flex flex-col gap-4">
      <SettingCard
        title="AI features"
        switchOn
        icon="ai-stars"
        description="Turn on AI support for calls, messages and video meetings. Deliver real-time answers, call notes, transcripts and meeting recaps to help teams stay focused and organized. Empower users to communicate clearly with built-in writing and polishing tools."
      />
      <SettingCard
        title="AI Assistant"
        switchOn
        icon="ai-lightbulb"
        description="A personal assistant that helps you boost productivity."
        summary={[
          { label: 'Data retention period:', value: '365 days' },
          { label: 'User default:', value: 'On' },
          { value: 'Users can change this setting' },
        ]}
        onManage={() => onManage('ai-assistant')}
      />
      <SettingCard
        title="Automatic call notes"
        switchOn
        icon="ai-writer"
        description="Generate call notes automatically for all your devices."
        summary={[
          { label: 'User default:', value: 'On' },
          { value: 'Users can change this setting' },
        ]}
        onManage={() => onManage('auto-call-notes')}
      />
    </div>
  );
}

function SmsPanel() {
  return (
    <div className="flex flex-col gap-4">
      <SettingCard
        title="SMS Service"
        switchOn
        disabled
        info
        infoTooltip="SMS Service is enabled at the account level and cannot be turned off here. Contact your account team to change."
        icon="sms"
        description="Allow this account to access SMS Service."
      />
    </div>
  );
}

function FaxPanel() {
  return (
    <div className="flex flex-col gap-4">
      <SettingCard
        title="Fax"
        switchOn
        icon="fax"
        description="Allow this account to access fax settings."
        summary={[
          { label: 'User default:', value: 'On' },
          { value: 'Users can change this setting' },
        ]}
        onManage={() => {}}
      />
      <SettingCard
        title="Email-to-Fax"
        switchOn={false}
        icon="email-to-fax"
        description="Allow this account to send faxes using Email-to-fax feature."
      />
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * MAIN — clickable prototype, pills navigate between v2 tabs
 * --------------------------------------------------------------------------- */
type ModalKey = 'ai-assistant' | 'auto-call-notes' | null;
type TabKey = 'general' | 'phone' | 'ai' | 'sms' | 'fax';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'general', label: 'General' },
  { key: 'phone', label: 'Phone' },
  { key: 'ai', label: 'AI' },
  { key: 'sms', label: 'SMS' },
  { key: 'fax', label: 'Fax' },
];

export function ConceptPrototype() {
  const [tab, setTab] = React.useState<TabKey>('general');
  const [modal, setModal] = React.useState<ModalKey>(null);
  const [userActivationOn, setUserActivationOn] = React.useState(false);
  const [uaConfirmOpen, setUaConfirmOpen] = React.useState(false);
  const [guidesOn, setGuidesOn] = React.useState(true);
  const [guidesDefault, setGuidesDefault] = React.useState<'On' | 'Off'>('On');
  const [guidesAllowChange, setGuidesAllowChange] = React.useState(true);
  const [guidesDefaultCount, setGuidesDefaultCount] = React.useState(72);
  const [guidesCustomCount, setGuidesCustomCount] = React.useState(26);
  const [guidesDisableConfirmOpen, setGuidesDisableConfirmOpen] = React.useState(false);
  const [guidesEnableConfirmOpen, setGuidesEnableConfirmOpen] = React.useState(false);
  const [guidesManageOpen, setGuidesManageOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const toastTimerRef = React.useRef<number | null>(null);

  const showToast = React.useCallback(() => {
    setToastOpen(true);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToastOpen(false), 3000);
  }, []);

  React.useEffect(() => () => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
  }, []);

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
              {TABS.map((t) => (
                <PillTab
                  key={t.key}
                  label={t.label}
                  selected={tab === t.key}
                  onClick={() => setTab(t.key)}
                />
              ))}
            </div>

            {tab === 'general' && (
              <GeneralPanel
                userActivationOn={userActivationOn}
                onUserActivationClick={() => setUaConfirmOpen(true)}
                guidesOn={guidesOn}
                guidesDefault={guidesDefault}
                guidesAllowChange={guidesAllowChange}
                onGuidesClick={() =>
                  guidesOn
                    ? setGuidesDisableConfirmOpen(true)
                    : setGuidesEnableConfirmOpen(true)
                }
                onGuidesManage={() => setGuidesManageOpen(true)}
              />
            )}
            {tab === 'phone' && <PhonePanel />}
            {tab === 'ai' && <AiPanel onManage={(k) => setModal(k)} />}
            {tab === 'sms' && <SmsPanel />}
            {tab === 'fax' && <FaxPanel />}

            <div className="swui-scope mt-auto pt-10 text-[11px] leading-[16px] text-[var(--rc-text-faint)]">
              <a href="#" className="text-[var(--rc-blue)] underline">Legal</a>
              <a href="#" className="ml-1 text-[var(--rc-blue)] underline">Privacy</a>
              <p className="mt-1">© 1999–2025 RingCentral Intellectual Property.</p>
              <p>All rights reserved. RingCentral and the RingCentral logo are trademarks of RingCentral, Inc.</p>
            </div>
          </main>
        </div>
      </div>

      {/* Modals (Spring scope so tokens resolve) */}
      <div className="spring-scope">
        <SpringDialog
          open={modal === 'ai-assistant'}
          title="Manage AI Assistant"
          onClose={() => setModal(null)}
        >
          <SubRow>
            <LabelWithInfo>AI notes and transcriptions retention period</LabelWithInfo>
            <SpringSelect value="365 days (Default)" width={200} />
          </SubRow>
          <UserDefaultsRow />
          <UserPermissionsRow />
        </SpringDialog>

        <SpringDialog
          open={modal === 'auto-call-notes'}
          title="Manage Automatic call notes"
          onClose={() => setModal(null)}
        >
          <UserDefaultsRow />
          <UserPermissionsRow />
        </SpringDialog>

        <SpringConfirmDialog
          open={guidesDisableConfirmOpen}
          title="Turn off Guides, tutorials & announcements for your organization?"
          body={
            <>
              Feature will be disabled globally on entire account and hidden from all users.
              <br />
              When re-enabled, users&rsquo; previous settings will return.
            </>
          }
          onCancel={() => setGuidesDisableConfirmOpen(false)}
          onConfirm={() => {
            setGuidesOn(false);
            setGuidesDisableConfirmOpen(false);
            showToast();
          }}
        />

        <SpringEnableDialog
          open={guidesEnableConfirmOpen}
          onCancel={() => setGuidesEnableConfirmOpen(false)}
          onConfirm={({ defaultValue, allowChange, customAction }) => {
            setGuidesDefault(defaultValue);
            setGuidesAllowChange(allowChange);
            setGuidesDefaultCount(customAction === 'reset' ? 98 : 72);
            setGuidesCustomCount(customAction === 'reset' ? 0 : 26);
            setGuidesOn(true);
            setGuidesEnableConfirmOpen(false);
            showToast();
          }}
        />

        <SpringManageDialogV2
          open={guidesManageOpen}
          initialDefaultValue={guidesDefault}
          initialAllowChange={guidesAllowChange}
          defaultUsersCount={guidesDefaultCount}
          customUsersCount={guidesCustomCount}
          onCancel={() => setGuidesManageOpen(false)}
          onSave={({ defaultValue, allowChange }) => {
            setGuidesDefault(defaultValue);
            setGuidesAllowChange(allowChange);
            setGuidesManageOpen(false);
            showToast();
          }}
        />

        <SpringConfirmDialog
          open={uaConfirmOpen}
          title={
            userActivationOn
              ? 'Turn off User activation for your organization?'
              : 'Turn on User activation for your organization?'
          }
          body={
            userActivationOn
              ? 'This will prevent users in your organization from re-generating their activation email.'
              : 'This will allow all users in your organization to re-generate their activation email.'
          }
          onCancel={() => setUaConfirmOpen(false)}
          onConfirm={() => {
            setUserActivationOn((v) => !v);
            setUaConfirmOpen(false);
            showToast();
          }}
        />
      </div>

      {/* Success toast (Service Web style) */}
      <SuccessToast open={toastOpen} message="Settings were updated." />
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Spring confirmation dialog — Cancel + Confirm, no close X
 * --------------------------------------------------------------------------- */
function SpringConfirmDialog({
  open, title, body, onCancel, onConfirm,
}: {
  open: boolean;
  title: React.ReactNode;
  body: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-24">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex w-[600px] max-w-[calc(100%-32px)] flex-col rounded-[12px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)]"
      >
        <div className="flex flex-col gap-8 px-6 pb-10 pt-6">
          <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b1)]">
            {title}
          </h2>
          <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            {body}
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
            onClick={onConfirm}
            className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Service Web success toast — green pill at top of viewport
 * Spec from Figma: bg #1a8517, radius 3px, Helvetica 13/20 white, padding 7/10
 * --------------------------------------------------------------------------- */
function SuccessToast({ open, message }: { open: boolean; message: string }) {
  return (
    <div
      className={cn(
        'swui-scope pointer-events-none absolute left-1/2 top-6 z-[60] -translate-x-1/2 transition-all duration-200',
        open ? 'opacity-100 translate-y-0' : 'pointer-events-none -translate-y-2 opacity-0',
      )}
      role="status"
      aria-live="polite"
    >
      <div
        className="flex items-center justify-between gap-2 rounded-[3px] bg-[#1A8517] px-[10px] py-[7px] shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        <span className="h-[13px] w-[13px] shrink-0" aria-hidden="true" />
        <p className="min-w-[400px] text-center text-[13px] leading-[20px] text-white">
          {message}
        </p>
        <button
          type="button"
          aria-label="Close"
          className="flex h-[13px] w-[13px] shrink-0 items-center justify-center text-white/90 hover:text-white"
        >
          <svg viewBox="0 0 13 13" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 2l9 9M11 2l-9 9" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
