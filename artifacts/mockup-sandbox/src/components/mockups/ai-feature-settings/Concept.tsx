import React from 'react';
import {
  ChevronDown,
  ChevronRight,
  Search,
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
 * Spring nav icons — inlined directly from Figma frame 1786:54562 SVG paths.
 * --------------------------------------------------------------------------- */
function NavSettingsIcon({ color = '#0679BA' }: { color?: string }) {
  // Source: Figma asset for "Icon_Nav/Settings" (16x16 viewBox).
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M8.57143 1.14286L8.68571 1.6L8.8 2.28571L9.48571 2.51429C9.94286 2.62857 10.4 2.85714 10.8571 3.08571L11.4286 3.31429L12 2.97143L12.3429 2.74286L13.1429 3.54286L12.9143 3.88571L12.6857 4.57143L13.0286 5.14286C13.2571 5.6 13.4857 6.05714 13.6 6.51429L13.7143 7.2L14.4 7.31429L14.8571 7.42857V8.57143L14.4 8.68571L13.7143 8.8L13.4857 9.48571C13.3714 9.94286 13.1429 10.4 12.9143 10.8571L12.6857 11.4286L13.0286 12L13.2571 12.3429L12.4571 13.1429L12.1143 12.9143L11.4286 12.6857L10.8571 13.0286C10.4 13.2571 9.94286 13.4857 9.48571 13.6L8.8 13.7143L8.68571 14.4L8.57143 14.8571H7.42857L7.31429 14.4L7.2 13.7143L6.51429 13.4857C6.05714 13.3714 5.6 13.1429 5.14286 12.9143L4.57143 12.6857L4 13.0286L3.65714 13.2571L2.85714 12.4571L3.08571 12.1143L3.31429 11.4286L2.97143 10.8571C2.74286 10.4 2.51429 9.94286 2.4 9.48571L2.28571 8.8L1.6 8.68571L1.14286 8.57143V7.42857L1.6 7.31429L2.28571 7.2L2.51429 6.51429C2.62857 6.05714 2.85714 5.6 3.08571 5.14286L3.31429 4.57143L2.97143 4L2.74286 3.54286L3.54286 2.74286L3.88571 2.97143L4.57143 3.31429L5.14286 2.97143C5.6 2.74286 6.05714 2.51429 6.51429 2.4L7.2 2.28571L7.31429 1.6L7.42857 1.14286H8.57143ZM9.02857 0H6.97143C6.62857 0 6.51429 0.228571 6.4 0.571429L6.17143 1.25714C5.6 1.48571 5.02857 1.71429 4.57143 2.05714L3.88571 1.6C3.77143 1.48571 3.54286 1.48571 3.42857 1.48571C3.31429 1.48571 3.2 1.48571 3.08571 1.6L1.6 3.08571C1.37143 3.31429 1.48571 3.54286 1.6 3.88571L1.94286 4.57143C1.71429 5.02857 1.48571 5.6 1.25714 6.17143L0.571429 6.4C0.228571 6.51429 0 6.62857 0 6.97143V9.14286C0 9.48571 0.228571 9.6 0.571429 9.71429L1.37143 9.94286C1.48571 10.5143 1.71429 11.0857 2.05714 11.6571L1.6 12.3429C1.48571 12.5714 1.37143 12.9143 1.6 13.1429L3.08571 14.6286C3.2 14.7429 3.31429 14.7429 3.42857 14.7429C3.54286 14.7429 3.77143 14.7429 3.88571 14.6286L4.57143 13.9429C5.14286 14.2857 5.6 14.5143 6.28571 14.6286L6.51429 15.4286C6.51429 15.7714 6.62857 16 6.97143 16H9.14286C9.48571 16 9.6 15.7714 9.71429 15.4286L9.94286 14.6286C10.5143 14.5143 11.0857 14.2857 11.6571 13.9429L12.3429 14.4C12.4571 14.5143 12.6857 14.5143 12.8 14.5143C12.9143 14.5143 13.0286 14.5143 13.1429 14.4L14.6286 12.9143C14.8571 12.6857 14.7429 12.3429 14.6286 12.1143L14.0571 11.4286C14.4 10.8571 14.6286 10.4 14.7429 9.71429L15.5429 9.48571C15.7714 9.48571 16 9.37143 16 9.02857V6.97143C16 6.62857 15.7714 6.51429 15.4286 6.4L14.6286 6.17143C14.5143 5.6 14.2857 5.02857 13.9429 4.45714L14.4 3.77143C14.5143 3.54286 14.6286 3.2 14.4 2.97143L12.9143 1.48571C12.8 1.37143 12.6857 1.37143 12.5714 1.37143C12.4571 1.37143 12.2286 1.37143 12.1143 1.48571L11.4286 2.05714C10.9714 1.71429 10.4 1.48571 9.82857 1.25714L9.6 0.571429C9.48571 0.228571 9.37143 0 9.02857 0ZM8 11.4286C6.05714 11.4286 4.57143 9.82857 4.57143 8C4.57143 6.17143 6.17143 4.57143 8 4.57143C9.82857 4.57143 11.4286 6.17143 11.4286 8C11.4286 9.82857 9.94286 11.4286 8 11.4286ZM8 5.71429C6.74286 5.71429 5.71429 6.74286 5.71429 8C5.71429 9.25714 6.74286 10.2857 8 10.2857C9.25714 10.2857 10.2857 9.25714 10.2857 8C10.2857 6.74286 9.25714 5.71429 8 5.71429Z"
        fill={color}
      />
    </svg>
  );
}

function AppsResourcesIcon({ color = '#2F2F2F' }: { color?: string }) {
  // Source: Figma asset for "Icon_Nav/Apps" (16x16 viewBox, 3x3 grid of squares).
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M3.42858 11.4286C4.05977 11.4286 4.57142 11.9402 4.57142 12.5714V14.8572C4.57142 15.4883 4.05977 16 3.42858 16H1.14285C0.511654 16 0 15.4883 0 14.8572V12.5714C0 11.9402 0.511654 11.4286 1.14285 11.4286H3.42858ZM9.14285 11.4286C9.77404 11.4286 10.2857 11.9402 10.2857 12.5714V14.8572C10.2857 15.4883 9.77404 16 9.14285 16H6.85712C6.22592 16 5.71427 15.4883 5.71427 14.8572V12.5714C5.71427 11.9402 6.22592 11.4286 6.85712 11.4286H9.14285ZM14.8572 11.4286C15.4883 11.4286 16 11.9402 16 12.5714V14.8572C16 15.4883 15.4883 16 14.8572 16H12.5714C11.9402 16 11.4286 15.4883 11.4286 14.8572V12.5714C11.4286 11.9402 11.9402 11.4286 12.5714 11.4286H14.8572ZM3.42858 12.5714H1.14285V14.8572H3.42858V12.5714ZM9.14285 12.5714H6.85712V14.8572H9.14285V12.5714ZM14.8572 12.5714H12.5714V14.8572H14.8572V12.5714ZM3.42858 5.71427C4.05977 5.71427 4.57142 6.22592 4.57142 6.85712V9.14285C4.57142 9.77404 4.05977 10.2857 3.42858 10.2857H1.14285C0.511654 10.2857 0 9.77404 0 9.14285V6.85712C0 6.22592 0.511654 5.71427 1.14285 5.71427H3.42858ZM9.14285 5.71427C9.77404 5.71427 10.2857 6.22592 10.2857 6.85712V9.14285C10.2857 9.77404 9.77404 10.2857 9.14285 10.2857H6.85712C6.22592 10.2857 5.71427 9.77404 5.71427 9.14285V6.85712C5.71427 6.22592 6.22592 5.71427 6.85712 5.71427H9.14285ZM14.8572 5.71427C15.4883 5.71427 16 6.22592 16 6.85712V9.14285C16 9.77404 15.4883 10.2857 14.8572 10.2857H12.5714C11.9402 10.2857 11.4286 9.77404 11.4286 9.14285V6.85712C11.4286 6.22592 11.9402 5.71427 12.5714 5.71427H14.8572ZM3.42858 6.85715H1.14285V9.14288H3.42858V6.85715ZM9.14285 6.85715H6.85712V9.14288H9.14285V6.85715ZM14.8572 6.85715H12.5714V9.14288H14.8572V6.85715ZM3.42858 0C4.05977 0 4.57142 0.511654 4.57142 1.14285V3.42858C4.57142 4.05977 4.05977 4.57142 3.42858 4.57142H1.14285C0.511654 4.57142 0 4.05977 0 3.42858V1.14285C0 0.511654 0.511654 0 1.14285 0H3.42858ZM9.14285 0C9.77404 0 10.2857 0.511654 10.2857 1.14285V3.42858C10.2857 4.05977 9.77404 4.57142 9.14285 4.57142H6.85712C6.22592 4.57142 5.71427 4.05977 5.71427 3.42858V1.14285C5.71427 0.511654 6.22592 0 6.85712 0H9.14285ZM14.8572 0C15.4883 0 16 0.511654 16 1.14285V3.42858C16 4.05977 15.4883 4.57142 14.8572 4.57142H12.5714C11.9402 4.57142 11.4286 4.05977 11.4286 3.42858V1.14285C11.4286 0.511654 11.9402 0 12.5714 0H14.8572ZM3.42858 1.14285H1.14285V3.42858H3.42858V1.14285ZM9.14285 1.14285H6.85712V3.42858H9.14285V1.14285ZM14.8572 1.14285H12.5714V3.42858H14.8572V1.14285Z"
        fill={color}
      />
    </svg>
  );
}

function SecurityComplianceIcon({ color = '#2F2F2F' }: { color?: string }) {
  // Source: Figma asset for "Icon_Nav/Security compliance" (path viewBox 12.8796x16,
  // placed in a 16x16 frame with horizontal insets of 9.75% — i.e. centered).
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="translate(1.5602 0)">
        <path
          d="M6.57761 0.00210998L6.66168 0.0165743C6.84439 0.0639314 7.03343 0.136181 7.26471 0.244574L7.76171 0.496574C7.97861 0.612324 8.451 0.863681 8.69739 0.990003L8.87539 1.07918C10.0948 1.67822 11.1599 1.98625 12.3658 1.98625C12.618 1.98625 12.8278 2.168 12.8713 2.40765L12.8796 2.5V9.49143C12.8796 11.3218 12.1307 12.8448 10.6552 14.0214C10.2916 14.3094 9.91539 14.5091 9.32525 14.7497L8.34875 15.1346C7.69593 15.3959 7.41136 15.5327 7.052 15.7605L6.819 15.913C6.64596 16.0291 6.42354 16.0276 6.25396 15.9179L6.16221 15.8429C6.02557 15.7193 5.65171 15.523 5.06543 15.2652L4.64336 15.0843L3.13271 14.4656L2.75836 14.306C2.64689 14.2571 2.54811 14.2121 2.46004 14.1701L2.244 14.0609L2.22304 14.0479C1.24711 13.4064 0.631321 12.6408 0.305036 11.7525C0.108429 11.2173 0.0305714 10.7353 0.00778566 10.0776L0 9.60565V2.4999C0 2.2075 0.243679 1.97407 0.535786 1.98661C1.04554 2.00847 1.65864 1.90179 2.36964 1.67925C2.78021 1.55075 3.21014 1.38865 3.68986 1.18565L4.21079 0.957753L5.55961 0.339146L5.89168 0.195396C6.04004 0.134039 6.16411 0.0877528 6.27407 0.0532886L6.40846 0.0152886C6.46393 0.00143141 6.52111 -0.00299716 6.57768 0.00196712L6.57761 0.00210998ZM6.53086 1.05057L6.46829 1.07286L6.27411 1.14947L5.86982 1.3265L4.56725 1.92425L4.35104 2.0199C3.73718 2.28786 3.19732 2.49697 2.67643 2.66C2.20704 2.8069 1.76782 2.911 1.35632 2.96754L1.02739 3.00282V9.60486C1.02861 10.2845 1.06589 10.7298 1.19157 11.162L1.26943 11.3983C1.494 12.0097 1.90071 12.5485 2.55861 13.0307L2.77014 13.1761L2.80386 13.1946C2.905 13.2456 3.03182 13.3042 3.18857 13.3727L3.52804 13.5172L5.114 14.1676L5.57129 14.3647C5.92329 14.5208 6.20418 14.6576 6.42575 14.7852L6.55168 14.8607L6.63489 14.8093C6.97775 14.6007 7.28682 14.4548 7.87093 14.219L8.75329 13.8717C9.3705 13.6291 9.71411 13.4559 10.0159 13.2169C11.1709 12.2959 11.774 11.1585 11.8449 9.772L11.852 9.49136V2.99718L11.7262 2.98807C10.7205 2.90643 9.78707 2.63057 8.79107 2.17615L8.31007 1.94561L7.74157 1.64936L7.06868 1.29293L6.77829 1.15175C6.73536 1.13222 6.69496 1.11461 6.65679 1.09882L6.53082 1.05043L6.53086 1.05057ZM3.81139 9.2114C4.13182 9.2114 4.39046 9.4749 4.39046 9.79854C4.39046 10.0077 4.28071 10.2013 4.10196 10.3064C3.92229 10.4121 3.70054 10.4121 3.52082 10.3064C3.34204 10.2013 3.23232 10.0077 3.23232 9.79854C3.23232 9.47486 3.49096 9.2114 3.81139 9.2114ZM9.22175 9.38333C9.44907 9.38333 9.63193 9.56972 9.63193 9.79854C9.63193 10.0189 9.46236 10.1999 9.24678 10.213L5.74257 10.2137C5.51525 10.2137 5.33239 10.0273 5.33239 9.7985C5.33239 9.57815 5.50196 9.39718 5.71754 9.38408L9.22175 9.38333ZM3.81139 7.06465C4.13182 7.06465 4.39046 7.32815 4.39046 7.65179C4.39046 7.86093 4.28071 8.05454 4.10196 8.15968C3.92229 8.26536 3.70054 8.26536 3.52082 8.15968C3.34204 8.05454 3.23232 7.86093 3.23232 7.65179C3.23232 7.32811 3.49096 7.06465 3.81139 7.06465ZM9.20857 7.23657C9.43586 7.23657 9.61875 7.42307 9.61875 7.65179C9.61875 7.87215 9.44918 8.05311 9.23361 8.06622L5.74257 8.06697C5.51546 8.06697 5.33264 7.88065 5.33239 7.65175C5.33239 7.43157 5.50214 7.25043 5.71754 7.23732L9.20857 7.23657ZM3.81139 4.91786C4.13182 4.91786 4.39046 5.18136 4.39046 5.505C4.39046 5.71415 4.28071 5.90775 4.10196 6.0129C3.92229 6.11857 3.70054 6.11857 3.52082 6.0129C3.34204 5.90775 3.23232 5.71415 3.23232 5.505C3.23232 5.18132 3.49096 4.91786 3.81139 4.91786ZM9.15921 5.08965C9.3865 5.08965 9.56939 5.27615 9.56939 5.50486C9.56939 5.72507 9.39979 5.90618 9.18425 5.91929L5.74257 5.92004C5.51546 5.92004 5.33264 5.73372 5.33239 5.50482C5.33239 5.28465 5.50214 5.1035 5.71754 5.0904L9.15921 5.08965Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

function ServiceConsoleIcon({ color = '#2F2F2F' }: { color?: string }) {
  // Source: Figma asset for "Icon_Nav/Service console" (16x16 frame, path inset
  // top 7.14% / bottom 14.29% so the path sits inside a 16x16 box).
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="translate(0 1.1424)">
        <path
          d="M15.3846 11.4286C15.7245 11.4286 16 11.6844 16 12C16 12.3156 15.7245 12.5714 15.3846 12.5714H0.615385C0.2755 12.5714 0 12.3156 0 12C0 11.6844 0.2755 11.4286 0.615385 11.4286H15.3846ZM13.7143 0C14.3455 0 14.8571 0.511654 14.8571 1.14285V9.14285C14.8571 9.77404 14.3455 10.2857 13.7143 10.2857H2.28569C1.6545 10.2857 1.14285 9.77404 1.14285 9.14285V1.14285C1.14285 0.511654 1.6545 0 2.28569 0H13.7143ZM13.7143 1.14288H2.28569V9.14288H13.7143V1.14288Z"
          fill={color}
        />
      </g>
    </svg>
  );
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

function SideNav() {
  return (
    <aside
      className="shrink-0 rounded-[4px] border border-[#E2E2E2] bg-[#FBFBFB] py-[10px]"
      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
    >
      {/* Service Console */}
      <Row icon={<ServiceConsoleIcon />} label="Service Console" trailing="chev-right" />

      {/* Account Settings (expanded section header) */}
      <Row
        icon={<NavSettingsIcon />}
        label="Account Settings"
        labelColor="#0679BA"
        trailing="chev-down"
      />

      {/* Account Settings — children (no icon, indented) */}
      <Row label="Feature Settings" selected />
      {['Appearance', 'App Integrations', 'Archiver Settings', 'Directory Integration', 'Headset Support', 'Microsoft Teams', 'Multi-Site Settings', 'Outbound Call Prefix'].map((l) => (
        <Row key={l} label={l} />
      ))}

      {/* Security and Compliance */}
      <Row icon={<SecurityComplianceIcon />} label="Security and Compliance" trailing="chev-right" />
      {/* Apps and Resources */}
      <Row icon={<AppsResourcesIcon />} label="Apps and Resources" trailing="chev-right" />
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
          <main className="spring-scope flex-1 pb-10 pt-[10px]">
            <h1 className="mb-5 flex h-[40px] items-center text-[20px] font-semibold leading-[28px] tracking-[-0.2px] text-[var(--sui-colors-neutral-b1)]">
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
