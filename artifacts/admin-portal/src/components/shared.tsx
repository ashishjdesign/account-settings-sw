import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search, Check, X, Info } from 'lucide-react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as DialogPrimitives from '@radix-ui/react-dialog';
import * as TooltipPrimitives from '@radix-ui/react-tooltip';
import { Link, useLocation } from "wouter";
import { useSettings } from '../store';
import { toast } from "sonner";
import { cn } from '../lib/utils';

export function RingCentralLogo() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}figma-ref/ringcentral-logo.svg`}
      alt="RingCentral"
      width={172}
      height={26}
      className="block h-[26px] w-auto"
    />
  );
}

export function AppsResourcesIcon({ color = '#2F2F2F' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.42858 11.4286C4.05977 11.4286 4.57142 11.9402 4.57142 12.5714V14.8572C4.57142 15.4883 4.05977 16 3.42858 16H1.14285C0.511654 16 0 15.4883 0 14.8572V12.5714C0 11.9402 0.511654 11.4286 1.14285 11.4286H3.42858ZM9.14285 11.4286C9.77404 11.4286 10.2857 11.9402 10.2857 12.5714V14.8572C10.2857 15.4883 9.77404 16 9.14285 16H6.85712C6.22592 16 5.71427 15.4883 5.71427 14.8572V12.5714C5.71427 11.9402 6.22592 11.4286 6.85712 11.4286H9.14285ZM14.8572 11.4286C15.4883 11.4286 16 11.9402 16 12.5714V14.8572C16 15.4883 15.4883 16 14.8572 16H12.5714C11.9402 16 11.4286 15.4883 11.4286 14.8572V12.5714C11.4286 11.9402 11.9402 11.4286 12.5714 11.4286H14.8572ZM3.42858 12.5714H1.14285V14.8572H3.42858V12.5714ZM9.14285 12.5714H6.85712V14.8572H9.14285V12.5714ZM14.8572 12.5714H12.5714V14.8572H14.8572V12.5714ZM3.42858 5.71427C4.05977 5.71427 4.57142 6.22592 4.57142 6.85712V9.14285C4.57142 9.77404 4.05977 10.2857 3.42858 10.2857H1.14285C0.511654 10.2857 0 9.77404 0 9.14285V6.85712C0 6.22592 0.511654 5.71427 1.14285 5.71427H3.42858ZM9.14285 5.71427C9.77404 5.71427 10.2857 6.22592 10.2857 6.85712V9.14285C10.2857 9.77404 9.77404 10.2857 9.14285 10.2857H6.85712C6.22592 10.2857 5.71427 9.77404 5.71427 9.14285V6.85712C5.71427 6.22592 6.22592 5.71427 6.85712 5.71427H9.14285ZM14.8572 5.71427C15.4883 5.71427 16 6.22592 16 6.85712V9.14285C16 9.77404 15.4883 10.2857 14.8572 10.2857H12.5714C11.9402 10.2857 11.4286 9.77404 11.4286 9.14285V6.85712C11.4286 6.22592 11.9402 5.71427 12.5714 5.71427H14.8572ZM3.42858 6.85715H1.14285V9.14288H3.42858V6.85715ZM9.14285 6.85715H6.85712V9.14288H9.14285V6.85715ZM14.8572 6.85715H12.5714V9.14288H14.8572V6.85715ZM3.42858 0C4.05977 0 4.57142 0.511654 4.57142 1.14285V3.42858C4.57142 4.05977 4.05977 4.57142 3.42858 4.57142H1.14285C0.511654 4.57142 0 4.05977 0 3.42858V1.14285C0 0.511654 0.511654 0 1.14285 0H3.42858ZM9.14285 0C9.77404 0 10.2857 0.511654 10.2857 1.14285V3.42858C10.2857 4.05977 9.77404 4.57142 9.14285 4.57142H6.85712C6.22592 4.57142 5.71427 4.05977 5.71427 3.42858V1.14285C5.71427 0.511654 6.22592 0 6.85712 0H9.14285ZM14.8572 0C15.4883 0 16 0.511654 16 1.14285V3.42858C16 4.05977 15.4883 4.57142 14.8572 4.57142H12.5714C11.9402 4.57142 11.4286 4.05977 11.4286 3.42858V1.14285C11.4286 0.511654 11.9402 0 12.5714 0H14.8572Z" fill={color}/>
    </svg>
  );
}

export function SecurityComplianceIcon({ color = '#2F2F2F' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="translate(1.5602 0)">
        <path d="M6.57761 0.00210998L6.66168 0.0165743C6.84439 0.0639314 7.03343 0.136181 7.26471 0.244574L7.76171 0.496574C7.97861 0.612324 8.451 0.863681 8.69739 0.990003L8.87539 1.07918C10.0948 1.67822 11.1599 1.98625 12.3658 1.98625C12.618 1.98625 12.8278 2.168 12.8713 2.40765L12.8796 2.5V9.49143C12.8796 11.3218 12.1307 12.8448 10.6552 14.0214C10.2916 14.3094 9.91539 14.5091 9.32525 14.7497L8.34875 15.1346C7.69593 15.3959 7.41136 15.5327 7.052 15.7605L6.819 15.913C6.64596 16.0291 6.42354 16.0276 6.25396 15.9179L6.16221 15.8429C6.02557 15.7193 5.65171 15.523 5.06543 15.2652L4.64336 15.0843L3.13271 14.4656L2.75836 14.306C2.64689 14.2571 2.54811 14.2121 2.46004 14.1701L2.244 14.0609L2.22304 14.0479C1.24711 13.4064 0.631321 12.6408 0.305036 11.7525C0.108429 11.2173 0.0305714 10.7353 0.00778566 10.0776L0 9.60565V2.4999C0 2.2075 0.243679 1.97407 0.535786 1.98661C1.04554 2.00847 1.65864 1.90179 2.36964 1.67925C2.78021 1.55075 3.21014 1.38865 3.68986 1.18565L4.21079 0.957753L5.55961 0.339146L5.89168 0.195396C6.04004 0.134039 6.16411 0.0877528 6.27407 0.0532886L6.40846 0.0152886C6.46393 0.00143141 6.52111 -0.00299716 6.57768 0.00196712L6.57761 0.00210998ZM6.53086 1.05057L6.46829 1.07286L6.27411 1.14947L5.86982 1.3265L4.56725 1.92425L4.35104 2.0199C3.73718 2.28786 3.19732 2.49697 2.67643 2.66C2.20704 2.8069 1.76782 2.911 1.35632 2.96754L1.02739 3.00282V9.60486C1.02861 10.2845 1.06589 10.7298 1.19157 11.162L1.26943 11.3983C1.494 12.0097 1.90071 12.5485 2.55861 13.0307L2.77014 13.1761L2.80386 13.1946C2.905 13.2456 3.03182 13.3042 3.18857 13.3727L3.52804 13.5172L5.114 14.1676L5.57129 14.3647C5.92329 14.5208 6.20418 14.6576 6.42575 14.7852L6.55168 14.8607L6.63489 14.8093C6.97775 14.6007 7.28682 14.4548 7.87093 14.219L8.75329 13.8717C9.3705 13.6291 9.71411 13.4559 10.0159 13.2169C11.1709 12.2959 11.774 11.1585 11.8449 9.772L11.852 9.49136V2.99718L11.7262 2.98807C10.7205 2.90643 9.78707 2.63057 8.79107 2.17615L8.31007 1.94561L7.74157 1.64936L7.06868 1.29293L6.77829 1.15175C6.7305 1.11925 6.64986 1.07729 6.53086 1.05057Z" fill={color}/>
      </g>
    </svg>
  );
}

export function ServiceConsoleIcon({ color = '#2F2F2F' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="translate(0 1.1424)">
        <path d="M15.3846 11.4286C15.7245 11.4286 16 11.6844 16 12C16 12.3156 15.7245 12.5714 15.3846 12.5714H0.615385C0.2755 12.5714 0 12.3156 0 12C0 11.6844 0.2755 11.4286 0.615385 11.4286H15.3846ZM13.7143 0C14.3455 0 14.8571 0.511654 14.8571 1.14285V9.14285C14.8571 9.77404 14.3455 10.2857 13.7143 10.2857H2.28569C1.6545 10.2857 1.14285 9.77404 1.14285 9.14285V1.14285C1.14285 0.511654 1.6545 0 2.28569 0H13.7143ZM13.7143 1.14288H2.28569V9.14288H13.7143V1.14288Z" fill={color} />
      </g>
    </svg>
  );
}

export function NavSettingsIcon({ color = '#0679BA' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8.57143 1.14286L8.68571 1.6L8.8 2.28571L9.48571 2.51429C9.94286 2.62857 10.4 2.85714 10.8571 3.08571L11.4286 3.31429L12 2.97143L12.3429 2.74286L13.1429 3.54286L12.9143 3.88571L12.6857 4.57143L13.0286 5.14286C13.2571 5.6 13.4857 6.05714 13.6 6.51429L13.7143 7.2L14.4 7.31429L14.8571 7.42857V8.57143L14.4 8.68571L13.7143 8.8L13.4857 9.48571C13.3714 9.94286 13.1429 10.4 12.9143 10.8571L12.6857 11.4286L13.0286 12L13.2571 12.3429L12.4571 13.1429L12.1143 12.9143L11.4286 12.6857L10.8571 13.0286C10.4 13.2571 9.94286 13.4857 9.48571 13.6L8.8 13.7143L8.68571 14.4L8.57143 14.8571H7.42857L7.31429 14.4L7.2 13.7143L6.51429 13.4857C6.05714 13.3714 5.6 13.1429 5.14286 12.9143L4.57143 12.6857L4 13.0286L3.65714 13.2571L2.85714 12.4571L3.08571 12.1143L3.31429 11.4286L2.97143 10.8571C2.74286 10.4 2.51429 9.94286 2.4 9.48571L2.28571 8.8L1.6 8.68571L1.14286 8.57143V7.42857L1.6 7.31429L2.28571 7.2L2.51429 6.51429C2.62857 6.05714 2.85714 5.6 3.08571 5.14286L3.31429 4.57143L2.97143 4L2.74286 3.54286L3.54286 2.74286L3.88571 2.97143L4.57143 3.31429L5.14286 2.97143C5.6 2.74286 6.05714 2.51429 6.51429 2.4L7.2 2.28571L7.31429 1.6L7.42857 1.14286H8.57143ZM9.02857 0H6.97143C6.62857 0 6.51429 0.228571 6.4 0.571429L6.17143 1.25714C5.6 1.48571 5.02857 1.71429 4.57143 2.05714L3.88571 1.6C3.77143 1.48571 3.54286 1.48571 3.42857 1.48571C3.31429 1.48571 3.2 1.48571 3.08571 1.6L1.6 3.08571C1.37143 3.31429 1.48571 3.54286 1.6 3.88571L1.94286 4.57143C1.71429 5.02857 1.48571 5.6 1.25714 6.17143L0.571429 6.4C0.228571 6.51429 0 6.62857 0 6.97143V9.14286C0 9.48571 0.228571 9.6 0.571429 9.71429L1.37143 9.94286C1.48571 10.5143 1.71429 11.0857 2.05714 11.6571L1.6 12.3429C1.48571 12.5714 1.37143 12.9143 1.6 13.1429L3.08571 14.6286C3.2 14.7429 3.31429 14.7429 3.42857 14.7429C3.54286 14.7429 3.77143 14.7429 3.88571 14.6286L4.57143 13.9429C5.14286 14.2857 5.6 14.5143 6.28571 14.6286L6.51429 15.4286C6.51429 15.7714 6.62857 16 6.97143 16H9.14286C9.48571 16 9.6 15.7714 9.71429 15.4286L9.94286 14.6286C10.5143 14.5143 11.0857 14.2857 11.6571 13.9429L12.3429 14.6286C12.5714 14.7429 12.9143 14.7429 13.1429 14.6286L14.6286 13.1429C14.7429 13.0286 14.7429 12.9143 14.7429 12.8C14.7429 12.6857 14.7429 12.4571 14.6286 12.3429L13.9429 11.6571C14.2857 11.0857 14.5143 10.5143 14.6286 9.94286L15.4286 9.71429C15.7714 9.71429 16 9.48571 16 9.14286V6.97143C16 6.62857 15.7714 6.51429 15.4286 6.4L14.6286 6.17143C14.5143 5.6 14.2857 5.02857 13.9429 4.57143L14.6286 3.88571C14.7429 3.65714 14.7429 3.31429 14.6286 3.08571L13.1429 1.6C13.0286 1.48571 12.9143 1.48571 12.8 1.48571C12.6857 1.48571 12.4571 1.48571 12.3429 1.6L11.6571 2.28571C11.0857 1.94286 10.5143 1.71429 9.94286 1.6L9.71429 0.571429C9.71429 0.228571 9.48571 0 9.02857 0ZM7.2 4.57143C8.74286 4.57143 10.0571 5.48571 10.7429 6.85714H11.5429V9.14286H10.7429C10.0571 10.5143 8.74286 11.4286 7.2 11.4286C5.31429 11.4286 3.77143 9.88571 3.77143 8C3.77143 6.11429 5.31429 4.57143 7.2 4.57143Z" fill={color} />
    </svg>
  );
}

export function InfoIcon() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}figma-ref/icons/info.svg`}
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
      'disabled:cursor-not-allowed disabled:opacity-40',
      className,
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb className="pointer-events-none block h-[20px] w-[20px] rounded-full bg-white shadow-sm transition-transform data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-[2px]" />
  </SwitchPrimitives.Root>
));
SpringSwitch.displayName = 'SpringSwitch';

export function SpringSelect({ value, width = 200, onChange, options }: { value: string; width?: number; onChange?: (v: string) => void; options?: string[] }) {
  if (!options) {
    return (
      <button
        type="button"
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
  
  return (
    <select
      style={{ width }}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      className="flex h-[32px] items-center gap-1 rounded-[10px] border border-black/20 bg-white pl-[10px] pr-[6px] text-left transition-colors hover:border-black/40 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 text-[14px] font-normal text-[var(--sui-colors-neutral-b0)] appearance-none cursor-pointer"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );
}

export function PillTab({ label, selected, onClick }: { label: string; selected?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'inline-flex h-[32px] min-w-[100px] cursor-pointer items-center justify-center rounded-full px-3 text-[14px] font-medium leading-[20px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)]/30',
        selected
          ? 'border border-black/20 bg-[var(--sui-colors-neutral-b4)] text-[var(--sui-colors-neutral-b1)]'
          : 'border border-black/20 bg-white text-[var(--sui-colors-neutral-b1)] hover:bg-[var(--sui-colors-neutral-b4)]/40',
      )}
    >
      {label}
    </button>
  );
}

export function SpringDialog({
  open, title, onClose, children, error, onSave
}: React.PropsWithChildren<{ open: boolean; title: string; onClose: () => void; error?: boolean; onSave?: () => void }>) {
  return (
    <DialogPrimitives.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className="fixed inset-0 z-50 bg-black/40 pt-20 flex justify-center items-start data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogPrimitives.Content
            aria-label={title}
            className="relative z-10 flex w-[720px] max-w-[calc(100%-32px)] flex-col rounded-[12px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[10%] data-[state=open]:slide-in-from-top-[10%]"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-6 pb-3 pt-6">
              <DialogPrimitives.Title className="min-w-0 flex-1 text-[18px] font-semibold leading-[24px] text-[var(--sui-colors-neutral-b1)]">
                {title}
              </DialogPrimitives.Title>
              <DialogPrimitives.Close asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[var(--sui-colors-neutral-b1)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
                >
                  <X className="h-4 w-4" strokeWidth={1.8} />
                </button>
              </DialogPrimitives.Close>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mx-6 mb-2 rounded-md bg-red-50 p-3 flex items-center gap-2 text-sm text-red-800 border border-red-200">
                <Info className="h-4 w-4 text-red-600 shrink-0" />
                <span>Couldn't save settings. Try again.</span>
              </div>
            )}

            {/* Body */}
            <div className="flex flex-col px-6 py-2">
              {children}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 px-6 pb-6 pt-4">
              <DialogPrimitives.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-[32px] min-w-[56px] items-center justify-center rounded-[10px] border border-black/20 bg-white px-3 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
                >
                  Cancel
                </button>
              </DialogPrimitives.Close>
              {onSave && (
                <button
                  type="button"
                  onClick={onSave}
                  className="inline-flex h-[32px] min-w-[56px] items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
                >
                  {error ? 'Retry' : 'Save'}
                </button>
              )}
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
}

export function SpringConfirmDialog({
  open, title, body, onCancel, onConfirm, error
}: {
  open: boolean;
  title: React.ReactNode;
  body: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  error?: boolean;
}) {
  return (
    <DialogPrimitives.Root open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className="fixed inset-0 z-50 bg-black/40 pt-24 flex justify-center items-start data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogPrimitives.Content
            aria-label="Confirmation"
            className="relative z-10 flex w-[600px] max-w-[calc(100%-32px)] flex-col rounded-[12px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[10%] data-[state=open]:slide-in-from-top-[10%]"
          >
            <div className="flex flex-col gap-8 px-6 pb-10 pt-6">
              <DialogPrimitives.Title className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b1)]">
                {title}
              </DialogPrimitives.Title>
              <DialogPrimitives.Description className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                {body}
              </DialogPrimitives.Description>
              {error && (
                <div className="rounded-md bg-red-50 p-3 flex items-center gap-2 text-sm text-red-800 border border-red-200">
                  <Info className="h-4 w-4 text-red-600 shrink-0" />
                  <span>Couldn't save settings. Try again.</span>
                </div>
              )}
            </div>
            <div className="border-t border-[#DDDFE5]/50" />
            <div className="flex justify-end gap-2 px-6 py-4">
              <DialogPrimitives.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-3 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
                >
                  Cancel
                </button>
              </DialogPrimitives.Close>
              <button
                type="button"
                onClick={onConfirm}
                className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
              >
                Confirm
              </button>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
}

type SummarySegment = { label?: string; value: string };

export function SettingCard({
  title, description, switchOn, icon, summary, onManage, disabled, info, infoTooltip, onSwitchClick, onCustomize, customUsersCount, onResetOverrides
}: {
  title: string;
  description: React.ReactNode;
  switchOn: boolean;
  icon?: string;
  summary?: SummarySegment[];
  onManage?: () => void;
  disabled?: boolean;
  info?: boolean;
  infoTooltip?: string;
  onSwitchClick?: () => void;
  onCustomize?: () => void;
  customUsersCount?: number;
  onResetOverrides?: () => void;
}) {
  return (
    <section className={cn("flex items-start gap-4 rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4 transition-opacity", (!switchOn && summary) && "opacity-50")}>
      {icon && (
        <div className="flex h-[32px] items-center justify-center shrink-0">
          <img
            src={`${import.meta.env.BASE_URL}figma-ref/icons/${icon}.svg`}
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
            className="block h-5 w-5 shrink-0"
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex min-h-[32px] w-full items-center gap-4">
          <h3 className="flex-1 truncate text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            {title}
          </h3>
          {info && (
            <TooltipPrimitives.Provider delayDuration={200}>
              <TooltipPrimitives.Root>
                <TooltipPrimitives.Trigger asChild>
                  <button
                    type="button"
                    aria-label={infoTooltip ?? `More info about ${title}`}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[var(--sui-colors-neutral-b2)] transition-colors hover:text-[var(--sui-colors-neutral-b1)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
                  >
                    <InfoIcon />
                  </button>
                </TooltipPrimitives.Trigger>
                <TooltipPrimitives.Portal>
                  <TooltipPrimitives.Content className="z-50 max-w-xs px-3 py-2 text-sm bg-gray-900 text-white rounded-md shadow-md animate-in fade-in-0 zoom-in-95">
                    {infoTooltip}
                    <TooltipPrimitives.Arrow className="fill-gray-900" />
                  </TooltipPrimitives.Content>
                </TooltipPrimitives.Portal>
              </TooltipPrimitives.Root>
            </TooltipPrimitives.Provider>
          )}
          <SpringSwitch
            checked={switchOn}
            disabled={disabled}
            aria-label={title}
            onClick={onSwitchClick ? (e) => { e.preventDefault(); onSwitchClick(); } : undefined}
          />
        </div>

        <p className="pr-[130px] text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
          {description}{' '}
          <a href="#" onClick={e => e.preventDefault()} className="font-normal text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 rounded-sm">
            Learn more
          </a>
        </p>

        {customUsersCount ? (
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center rounded-full bg-[var(--sui-colors-neutral-b4)] px-2 py-0.5 text-[12px] font-medium text-[var(--sui-colors-neutral-b1)]">
              Overridden by {customUsersCount} users
            </span>
            <button
              onClick={onResetOverrides}
              disabled={disabled || !switchOn}
              className="text-[13px] text-[var(--sui-colors-primary-b)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset overrides
            </button>
          </div>
        ) : null}

        {summary && summary.length > 0 && (
          <div className="flex w-full items-center justify-between gap-4 border-t border-[var(--sui-colors-neutral-b4)] pt-4 mt-2">
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
            <div className="flex gap-2">
              {onCustomize && (
                <button
                  type="button"
                  onClick={onCustomize}
                  disabled={!switchOn || disabled}
                  className="inline-flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] px-2 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-primary-b)] transition-colors hover:bg-[var(--sui-colors-neutral-b5)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  Customize
                </button>
              )}
              {onManage && (
                <button
                  type="button"
                  onClick={onManage}
                  disabled={!switchOn || disabled}
                  className="inline-flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] px-2 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-primary-b)] transition-colors hover:bg-[var(--sui-colors-neutral-b5)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  Manage
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function SubRow({ children }: React.PropsWithChildren) {
  return (
    <div className="flex w-full items-center justify-between gap-4 border-b border-[var(--sui-colors-neutral-b4)] pb-4 pt-0 last:border-b-0 [&:not(:first-child)]:pt-4">
      {children}
    </div>
  );
}

export function UserDefaultsRow({
  defaultVal, allowChange, onDefaultChange, onAllowChangeChange, customCount
}: {
  defaultVal: 'On' | 'Off';
  allowChange: boolean;
  onDefaultChange: (v: 'On' | 'Off') => void;
  onAllowChangeChange: (v: boolean) => void;
  customCount?: number;
}) {
  const [usersDialogOpen, setUsersDialogOpen] = useState(false);
  const total = 98;
  const defaultCount = Math.max(0, total - (customCount || 0));

  return (
    <>
      <SubRow>
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            User defaults
          </span>
          <LabelWithInfo />
          <span className="ml-1 flex items-center border-l border-[var(--sui-colors-neutral-b4)] pl-2 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
            <button
              type="button"
              onClick={() => setUsersDialogOpen(true)}
              className="text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 rounded-sm"
            >
              {defaultCount}/{total} users
            </button>
            <span>&nbsp;are using the default</span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
            Set this setting for users
          </span>
          <SpringSelect value={defaultVal} options={['On', 'Off']} onChange={(v) => onDefaultChange(v as 'On' | 'Off')} width={96} />
        </div>
      </SubRow>
      <SubRow>
        <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">User permissions</span>
        <label className="flex cursor-pointer items-center gap-2 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          <div className="relative flex h-[18px] w-[18px] items-center justify-center">
            <input 
              type="checkbox" 
              className="peer sr-only" 
              checked={allowChange}
              onChange={(e) => onAllowChangeChange(e.target.checked)}
            />
            <div className="absolute inset-0 rounded-[4px] border border-[var(--sui-colors-neutral-b3)] bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--sui-colors-primary-b)]/30 peer-checked:bg-[var(--sui-colors-primary-b)] peer-checked:border-[var(--sui-colors-primary-b)] flex items-center justify-center transition-colors">
              {allowChange && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
            </div>
          </div>
          Allow users to change this setting
        </label>
      </SubRow>

      {/* Users Dialog Mock */}
      <SpringDialog
        open={usersDialogOpen}
        title="Users configuration"
        onClose={() => setUsersDialogOpen(false)}
      >
        <div className="h-48 flex items-center justify-center text-sm text-gray-500">
          User configuration list... (Mockup)
        </div>
      </SpringDialog>
    </>
  );
}

export function showToast(message: string, onUndo?: () => void) {
  toast.success(message, {
    action: onUndo ? {
      label: "Undo",
      onClick: onUndo,
    } : undefined,
    className: "bg-[#1A8517] text-white border-none rounded-[3px] px-[10px] py-[7px] text-[13px] font-sans !font-normal font-['Helvetica']",
    actionButtonStyle: {
      backgroundColor: 'transparent',
      color: 'white',
      textDecoration: 'underline',
      fontWeight: 'normal',
      padding: 0
    },
    duration: onUndo ? 8000 : 4000,
  });
}
