import React from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

/* -----------------------------------------------------------------------------
 * Scoped tokens — Service Web UI Library (chrome) and Spring DS (content)
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
function NavSettingsIcon({ color = '#0679BA' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8.57143 1.14286L8.68571 1.6L8.8 2.28571L9.48571 2.51429C9.94286 2.62857 10.4 2.85714 10.8571 3.08571L11.4286 3.31429L12 2.97143L12.3429 2.74286L13.1429 3.54286L12.9143 3.88571L12.6857 4.57143L13.0286 5.14286C13.2571 5.6 13.4857 6.05714 13.6 6.51429L13.7143 7.2L14.4 7.31429L14.8571 7.42857V8.57143L14.4 8.68571L13.7143 8.8L13.4857 9.48571C13.3714 9.94286 13.1429 10.4 12.9143 10.8571L12.6857 11.4286L13.0286 12L13.2571 12.3429L12.4571 13.1429L12.1143 12.9143L11.4286 12.6857L10.8571 13.0286C10.4 13.2571 9.94286 13.4857 9.48571 13.6L8.8 13.7143L8.68571 14.4L8.57143 14.8571H7.42857L7.31429 14.4L7.2 13.7143L6.51429 13.4857C6.05714 13.3714 5.6 13.1429 5.14286 12.9143L4.57143 12.6857L4 13.0286L3.65714 13.2571L2.85714 12.4571L3.08571 12.1143L3.31429 11.4286L2.97143 10.8571C2.74286 10.4 2.51429 9.94286 2.4 9.48571L2.28571 8.8L1.6 8.68571L1.14286 8.57143V7.42857L1.6 7.31429L2.28571 7.2L2.51429 6.51429C2.62857 6.05714 2.85714 5.6 3.08571 5.14286L3.31429 4.57143L2.97143 4L2.74286 3.54286L3.54286 2.74286L3.88571 2.97143L4.57143 3.31429L5.14286 2.97143C5.6 2.74286 6.05714 2.51429 6.51429 2.4L7.2 2.28571L7.31429 1.6L7.42857 1.14286H8.57143ZM9.02857 0H6.97143C6.62857 0 6.51429 0.228571 6.4 0.571429L6.17143 1.25714C5.6 1.48571 5.02857 1.71429 4.57143 2.05714L3.88571 1.6C3.77143 1.48571 3.54286 1.48571 3.42857 1.48571C3.31429 1.48571 3.2 1.48571 3.08571 1.6L1.6 3.08571C1.37143 3.31429 1.48571 3.54286 1.6 3.88571L1.94286 4.57143C1.71429 5.02857 1.48571 5.6 1.25714 6.17143L0.571429 6.4C0.228571 6.51429 0 6.62857 0 6.97143V9.14286C0 9.48571 0.228571 9.6 0.571429 9.71429L1.37143 9.94286C1.48571 10.5143 1.71429 11.0857 2.05714 11.6571L1.6 12.3429C1.48571 12.5714 1.37143 12.9143 1.6 13.1429L3.08571 14.6286C3.2 14.7429 3.31429 14.7429 3.42857 14.7429C3.54286 14.7429 3.77143 14.7429 3.88571 14.6286L4.57143 13.9429C5.14286 14.2857 5.6 14.5143 6.28571 14.6286L6.51429 15.4286C6.51429 15.7714 6.62857 16 6.97143 16H9.14286C9.48571 16 9.6 15.7714 9.71429 15.4286L9.94286 14.6286C10.5143 14.5143 11.0857 14.2857 11.6571 13.9429L12.3429 14.4C12.4571 14.5143 12.6857 14.5143 12.8 14.5143C12.9143 14.5143 13.0286 14.5143 13.1429 14.4L14.6286 12.9143C14.8571 12.6857 14.7429 12.3429 14.6286 12.1143L14.0571 11.4286C14.4 10.8571 14.6286 10.4 14.7429 9.71429L15.5429 9.48571C15.7714 9.48571 16 9.37143 16 9.02857V6.97143C16 6.62857 15.7714 6.51429 15.4286 6.4L14.6286 6.17143C14.5143 5.6 14.2857 5.02857 13.9429 4.45714L14.4 3.77143C14.5143 3.54286 14.6286 3.2 14.4 2.97143L12.9143 1.48571C12.8 1.37143 12.6857 1.37143 12.5714 1.37143C12.4571 1.37143 12.2286 1.37143 12.1143 1.48571L11.4286 2.05714C10.9714 1.71429 10.4 1.48571 9.82857 1.25714L9.6 0.571429C9.48571 0.228571 9.37143 0 9.02857 0ZM8 11.4286C6.05714 11.4286 4.57143 9.82857 4.57143 8C4.57143 6.17143 6.17143 4.57143 8 4.57143C9.82857 4.57143 11.4286 6.17143 11.4286 8C11.4286 9.82857 9.94286 11.4286 8 11.4286ZM8 5.71429C6.74286 5.71429 5.71429 6.74286 5.71429 8C5.71429 9.25714 6.74286 10.2857 8 10.2857C9.25714 10.2857 10.2857 9.25714 10.2857 8C10.2857 6.74286 9.25714 5.71429 8 5.71429Z" fill={color} />
    </svg>
  );
}

function AppsResourcesIcon({ color = '#2F2F2F' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.42858 11.4286C4.05977 11.4286 4.57142 11.9402 4.57142 12.5714V14.8572C4.57142 15.4883 4.05977 16 3.42858 16H1.14285C0.511654 16 0 15.4883 0 14.8572V12.5714C0 11.9402 0.511654 11.4286 1.14285 11.4286H3.42858ZM9.14285 11.4286C9.77404 11.4286 10.2857 11.9402 10.2857 12.5714V14.8572C10.2857 15.4883 9.77404 16 9.14285 16H6.85712C6.22592 16 5.71427 15.4883 5.71427 14.8572V12.5714C5.71427 11.9402 6.22592 11.4286 6.85712 11.4286H9.14285ZM14.8572 11.4286C15.4883 11.4286 16 11.9402 16 12.5714V14.8572C16 15.4883 15.4883 16 14.8572 16H12.5714C11.9402 16 11.4286 15.4883 11.4286 14.8572V12.5714C11.4286 11.9402 11.9402 11.4286 12.5714 11.4286H14.8572ZM3.42858 12.5714H1.14285V14.8572H3.42858V12.5714ZM9.14285 12.5714H6.85712V14.8572H9.14285V12.5714ZM14.8572 12.5714H12.5714V14.8572H14.8572V12.5714ZM3.42858 5.71427C4.05977 5.71427 4.57142 6.22592 4.57142 6.85712V9.14285C4.57142 9.77404 4.05977 10.2857 3.42858 10.2857H1.14285C0.511654 10.2857 0 9.77404 0 9.14285V6.85712C0 6.22592 0.511654 5.71427 1.14285 5.71427H3.42858ZM9.14285 5.71427C9.77404 5.71427 10.2857 6.22592 10.2857 6.85712V9.14285C10.2857 9.77404 9.77404 10.2857 9.14285 10.2857H6.85712C6.22592 10.2857 5.71427 9.77404 5.71427 9.14285V6.85712C5.71427 6.22592 6.22592 5.71427 6.85712 5.71427H9.14285ZM14.8572 5.71427C15.4883 5.71427 16 6.22592 16 6.85712V9.14285C16 9.77404 15.4883 10.2857 14.8572 10.2857H12.5714C11.9402 10.2857 11.4286 9.77404 11.4286 9.14285V6.85712C11.4286 6.22592 11.9402 5.71427 12.5714 5.71427H14.8572ZM3.42858 6.85715H1.14285V9.14288H3.42858V6.85715ZM9.14285 6.85715H6.85712V9.14288H9.14285V6.85715ZM14.8572 6.85715H12.5714V9.14288H14.8572V6.85715ZM3.42858 0C4.05977 0 4.57142 0.511654 4.57142 1.14285V3.42858C4.57142 4.05977 4.05977 4.57142 3.42858 4.57142H1.14285C0.511654 4.57142 0 4.05977 0 3.42858V1.14285C0 0.511654 0.511654 0 1.14285 0H3.42858ZM9.14285 0C9.77404 0 10.2857 0.511654 10.2857 1.14285V3.42858C10.2857 4.05977 9.77404 4.57142 9.14285 4.57142H6.85712C6.22592 4.57142 5.71427 4.05977 5.71427 3.42858V1.14285C5.71427 0.511654 6.22592 0 6.85712 0H9.14285ZM14.8572 0C15.4883 0 16 0.511654 16 1.14285V3.42858C16 4.05977 15.4883 4.57142 14.8572 4.57142H12.5714C11.9402 4.57142 11.4286 4.05977 11.4286 3.42858V1.14285C11.4286 0.511654 11.9402 0 12.5714 0H14.8572ZM3.42858 1.14285H1.14285V3.42858H3.42858V1.14285ZM9.14285 1.14285H6.85712V3.42858H9.14285V1.14285ZM14.8572 1.14285H12.5714V3.42858H14.8572V1.14285Z" fill={color} />
    </svg>
  );
}

function SecurityComplianceIcon({ color = '#2F2F2F' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="translate(1.5602 0)">
        <path d="M6.57761 0.00210998L6.66168 0.0165743C6.84439 0.0639314 7.03343 0.136181 7.26471 0.244574L7.76171 0.496574C7.97861 0.612324 8.451 0.863681 8.69739 0.990003L8.87539 1.07918C10.0948 1.67822 11.1599 1.98625 12.3658 1.98625C12.618 1.98625 12.8278 2.168 12.8713 2.40765L12.8796 2.5V9.49143C12.8796 11.3218 12.1307 12.8448 10.6552 14.0214C10.2916 14.3094 9.91539 14.5091 9.32525 14.7497L8.34875 15.1346C7.69593 15.3959 7.41136 15.5327 7.052 15.7605L6.819 15.913C6.64596 16.0291 6.42354 16.0276 6.25396 15.9179L6.16221 15.8429C6.02557 15.7193 5.65171 15.523 5.06543 15.2652L4.64336 15.0843L3.13271 14.4656L2.75836 14.306C2.64689 14.2571 2.54811 14.2121 2.46004 14.1701L2.244 14.0609L2.22304 14.0479C1.24711 13.4064 0.631321 12.6408 0.305036 11.7525C0.108429 11.2173 0.0305714 10.7353 0.00778566 10.0776L0 9.60565V2.4999C0 2.2075 0.243679 1.97407 0.535786 1.98661C1.04554 2.00847 1.65864 1.90179 2.36964 1.67925C2.78021 1.55075 3.21014 1.38865 3.68986 1.18565L4.21079 0.957753L5.55961 0.339146L5.89168 0.195396C6.04004 0.134039 6.16411 0.0877528 6.27407 0.0532886L6.40846 0.0152886C6.46393 0.00143141 6.52111 -0.00299716 6.57768 0.00196712L6.57761 0.00210998ZM6.53086 1.05057L6.46829 1.07286L6.27411 1.14947L5.86982 1.3265L4.56725 1.92425L4.35104 2.0199C3.73718 2.28786 3.19732 2.49697 2.67643 2.66C2.20704 2.8069 1.76782 2.911 1.35632 2.96754L1.02739 3.00282V9.60486C1.02861 10.2845 1.06589 10.7298 1.19157 11.162L1.26943 11.3983C1.494 12.0097 1.90071 12.5485 2.55861 13.0307L2.77014 13.1761L2.80386 13.1946C2.905 13.2456 3.03182 13.3042 3.18857 13.3727L3.52804 13.5172L5.114 14.1676L5.57129 14.3647C5.92329 14.5208 6.20418 14.6576 6.42575 14.7852L6.55168 14.8607L6.63489 14.8093C6.97775 14.6007 7.28682 14.4548 7.87093 14.219L8.75329 13.8717C9.3705 13.6291 9.71411 13.4559 10.0159 13.2169C11.1709 12.2959 11.774 11.1585 11.8449 9.772L11.852 9.49136V2.99718L11.7262 2.98807C10.7205 2.90643 9.78707 2.63057 8.79107 2.17615L8.31007 1.94561L7.74157 1.64936L7.06868 1.29293L6.77829 1.15175C6.73536 1.13222 6.69496 1.11461 6.65679 1.09882L6.53082 1.05043L6.53086 1.05057Z" fill={color} />
      </g>
    </svg>
  );
}

function ServiceConsoleIcon({ color = '#2F2F2F' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="translate(0 1.1424)">
        <path d="M15.3846 11.4286C15.7245 11.4286 16 11.6844 16 12C16 12.3156 15.7245 12.5714 15.3846 12.5714H0.615385C0.2755 12.5714 0 12.3156 0 12C0 11.6844 0.2755 11.4286 0.615385 11.4286H15.3846ZM13.7143 0C14.3455 0 14.8571 0.511654 14.8571 1.14285V9.14285C14.8571 9.77404 14.3455 10.2857 13.7143 10.2857H2.28569C1.6545 10.2857 1.14285 9.77404 1.14285 9.14285V1.14285C1.14285 0.511654 1.6545 0 2.28569 0H13.7143ZM13.7143 1.14288H2.28569V9.14288H13.7143V1.14288Z" fill={color} />
      </g>
    </svg>
  );
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
  title, description, switchOn, icon, summary, onManage,
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
          <h2 className="text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b1)]">
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
 * MAIN — User activation: enable confirmation flow
 * Toggle starts OFF. Clicking the switch opens "Turn on" modal.
 * Confirm flips switch to ON; Cancel keeps it OFF.
 * --------------------------------------------------------------------------- */
export function ConceptUserActivationEnable() {
  const [userActivationOn, setUserActivationOn] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(true);

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
                switchOn={userActivationOn}
                icon="user-activation"
                description="Let users re-generate an activation email if it's been less than 30 days since the last one was sent."
                onSwitchClick={() => setConfirmOpen(true)}
              />

              <SectionHeading>In-app notification</SectionHeading>

              <SettingCard
                title="Guides, tutorials & announcements"
                switchOn
                icon="resource-center"
                description="Displays helpful guides, tutorials, important company-wide updates, and service promotions directly to your users."
                summary={[
                  { label: 'User default:', value: 'On' },
                  { value: 'Users can change this setting' },
                ]}
                onManage={() => {}}
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
        <SpringConfirmDialog
          open={confirmOpen}
          title="Turn on User activation for your organization?"
          body="This will allow all users in your organization to re-generate their activation email."
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            setUserActivationOn(true);
            setConfirmOpen(false);
          }}
        />
      </div>
    </div>
  );
}
