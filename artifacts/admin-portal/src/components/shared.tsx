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

function RcIco({ name, color }: { name: 'service-console' | 'account-settings' | 'security-compliance' | 'apps-resources'; color?: string }) {
  return <i aria-hidden="true" className={`rc-ico rc-ico-${name}`} style={{ fontSize: 16, color, lineHeight: 1 }} />;
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
export function NavSettingsIcon({ color = '#0679BA' }: { color?: string }) {
  return <RcIco name="account-settings" color={color} />;
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

export function SpringSelect({ value, width = 200, onChange, options, disabled }: { value: string; width?: number; onChange?: (v: string) => void; options?: string[]; disabled?: boolean }) {
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
    <div className="relative inline-flex" style={{ width }}>
      <select
        value={value}
        disabled={disabled}
        onChange={e => onChange?.(e.target.value)}
        className="h-[32px] w-full appearance-none rounded-[10px] border border-black/20 bg-white pl-[10px] pr-8 text-left text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:border-black/40 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 disabled:cursor-not-allowed disabled:bg-[var(--sui-colors-neutral-b5)] disabled:text-[var(--sui-colors-neutral-b2)] disabled:hover:border-black/20 enabled:cursor-pointer"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <span className="pointer-events-none absolute right-1.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-[var(--sui-colors-neutral-b1)]">
        <ChevronDown className="h-4 w-4" strokeWidth={1.6} />
      </span>
    </div>
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
  open, title, body, onCancel, onConfirm, error, confirmLabel = 'Confirm'
}: {
  open: boolean;
  title: React.ReactNode;
  body: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  error?: boolean;
  confirmLabel?: string;
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
                {confirmLabel}
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
  icon?: string | React.ReactNode;
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
        <div className="flex h-[32px] items-center justify-center shrink-0 text-[var(--sui-colors-neutral-b1)]">
          {typeof icon === 'string' ? (
            <img
              src={`${import.meta.env.BASE_URL}figma-ref/icons/${icon}.svg`}
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
              className="block h-5 w-5 shrink-0"
            />
          ) : (
            <div className="flex h-5 w-5 items-center justify-center shrink-0" aria-hidden="true">
              {icon}
            </div>
          )}
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
          <div className="flex w-full items-center justify-between gap-4 mt-2 border-t border-[var(--sui-colors-neutral-b4)] pt-4 mt-2">
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

export function SectionHeading({ children }: React.PropsWithChildren) {
  return (
    <h2 className="mt-2 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
      {children}
    </h2>
  );
}

export function SubRow({ children }: React.PropsWithChildren) {
  return (
    <div className="flex w-full items-center justify-between gap-4 border-b border-[var(--sui-colors-neutral-b4)] pb-4 pt-0 last:border-b-0 [&:not(:first-child)]:pt-4">
      {children}
    </div>
  );
}

function SpringRadio({
  checked, onChange, label, disabled,
}: { checked: boolean; onChange: () => void; label: string; disabled?: boolean }) {
  return (
    <label className={cn(
      'flex items-center gap-2 text-[14px] font-medium leading-[20px]',
      disabled
        ? 'cursor-not-allowed text-[var(--sui-colors-neutral-b2)]'
        : 'cursor-pointer text-[var(--sui-colors-neutral-b0)]',
    )}>
      <button
        type="button"
        role="radio"
        aria-checked={checked}
        disabled={disabled}
        onClick={onChange}
        className={cn(
          'flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[1.2px] transition-colors',
          disabled
            ? 'cursor-not-allowed border-[var(--sui-colors-neutral-b3)] bg-[var(--sui-colors-neutral-b5)]'
            : checked
              ? 'cursor-pointer border-[var(--sui-colors-primary-b)]'
              : 'cursor-pointer border-[var(--sui-colors-neutral-b3)] hover:border-[var(--sui-colors-neutral-b2)]',
        )}
      >
        {checked && (
          <span className={cn(
            'h-[12px] w-[12px] rounded-full',
            disabled ? 'bg-[var(--sui-colors-neutral-b3)]' : 'bg-[var(--sui-colors-primary-b)]',
          )} />
        )}
      </button>
      {label}
    </label>
  );
}

export function SpringFeatureManageDialog({
  open,
  title,
  defaultVal,
  allowChange,
  customCount = 0,
  totalUsers = 98,
  onCancel,
  onConfirm,
  error,
}: {
  open: boolean;
  title: string;
  defaultVal: 'On' | 'Off';
  allowChange: boolean;
  customCount?: number;
  totalUsers?: number;
  onCancel: () => void;
  onConfirm: (result: { defaultVal: 'On' | 'Off'; allowChange: boolean }) => void;
  error?: boolean;
}) {
  const [value, setValue] = useState<'On' | 'Off'>(defaultVal);
  const [allow, setAllow] = useState(allowChange);
  const [usersOpen, setUsersOpen] = useState(false);
  const total = totalUsers;
  const defaultCount = Math.max(0, total - (customCount || 0));

  useEffect(() => {
    if (open) {
      setValue(defaultVal);
      setAllow(allowChange);
    }
  }, [open, defaultVal, allowChange]);

  return (
    <DialogPrimitives.Root open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className="fixed inset-0 z-50 bg-black/40 pt-16 flex justify-center items-start data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogPrimitives.Content
            aria-label={title}
            className="relative z-10 flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            <div className="flex flex-col gap-8 px-6 pb-10 pt-9">
              <div className="flex flex-col gap-6">
                <div className="py-3">
                  <DialogPrimitives.Title className="text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
                    {title}
                  </DialogPrimitives.Title>
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
                            checked={value === 'On'}
                            onChange={() => setValue('On')}
                            label="On"
                          />
                          <SpringRadio
                            checked={value === 'Off'}
                            onChange={() => setValue('Off')}
                            label="Off"
                          />
                        </div>
                      </div>
                      <div className="flex h-[32px] items-center rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3">
                        <p className="whitespace-nowrap text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                          <button
                            type="button"
                            onClick={() => setUsersOpen(true)}
                            className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 rounded-sm"
                          >
                            {defaultCount}/{total} users
                          </button>{' '}
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
                        <div className="relative flex h-[18px] w-[18px] items-center justify-center">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={allow}
                            onChange={(e) => setAllow(e.target.checked)}
                          />
                          <div className="absolute inset-0 rounded-[4px] border border-[var(--sui-colors-neutral-b3)] bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--sui-colors-primary-b)]/30 peer-checked:bg-[var(--sui-colors-primary-b)] peer-checked:border-[var(--sui-colors-primary-b)] flex items-center justify-center transition-colors">
                            {allow && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                          </div>
                        </div>
                        <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                          Allow users to change this setting
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-3 flex items-center gap-2 text-sm text-red-800 border border-red-200">
                    <Info className="h-4 w-4 text-red-600 shrink-0" />
                    <span>Couldn't save settings. Try again.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
            <div className="flex justify-end gap-2 px-6 pt-5 pb-5">
              <DialogPrimitives.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--sui-colors-neutral-b4)] bg-white px-[18px] text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
                >
                  Cancel
                </button>
              </DialogPrimitives.Close>
              {(() => {
                const dirty = value !== defaultVal || allow !== allowChange;
                const disabled = !dirty && !error;
                return (
                  <button
                    type="button"
                    onClick={() => onConfirm({ defaultVal: value, allowChange: allow })}
                    disabled={disabled}
                    className="inline-flex h-[36px] min-w-[60px] items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-[18px] text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 disabled:cursor-not-allowed disabled:bg-[var(--sui-colors-neutral-b3)] disabled:hover:bg-[var(--sui-colors-neutral-b3)] enabled:cursor-pointer"
                  >
                    {error ? 'Retry' : 'Save'}
                  </button>
                );
              })()}
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
      <SpringUsersConfigDialog
        open={usersOpen}
        featureLabel={title.replace(/^Manage\s+/, '').replace(/\s+settings$/, '')}
        variant="default"
        onClose={() => setUsersOpen(false)}
        defaultUsersCount={defaultCount}
        customUsersCount={customCount}
        totalUsersCount={total}
      />
    </DialogPrimitives.Root>
  );
}

type UserRow = { name: string; ext: string; department: string; site: string; configuration: 'Default' | 'Custom' };
const MOCK_DEFAULT_USERS: UserRow[] = [
  { name: 'Alex Morgan',     ext: '10001', department: 'Engineering', site: 'CA - San Mateo',     configuration: 'Default' },
  { name: 'Jamie Chen',      ext: '10002', department: 'Engineering', site: 'CA - San Mateo',     configuration: 'Default' },
  { name: 'Priya Patel',     ext: '10003', department: 'Product',     site: 'NY - New York',      configuration: 'Default' },
  { name: 'Diego Hernandez', ext: '10004', department: 'Sales',       site: 'TX - Austin',        configuration: 'Default' },
  { name: 'Sara Kim',        ext: '10005', department: 'Marketing',   site: 'CA - San Francisco', configuration: 'Default' },
  { name: 'Liam O\'Brien',   ext: '10006', department: 'Support',     site: 'IL - Chicago',       configuration: 'Default' },
  { name: 'Mei Tanaka',      ext: '10007', department: 'Engineering', site: 'WA - Seattle',       configuration: 'Default' },
  { name: 'Noah Williams',   ext: '10008', department: 'Operations',  site: 'CO - Denver',        configuration: 'Default' },
  { name: 'Olivia Brown',    ext: '10009', department: 'HR',          site: 'CA - San Mateo',     configuration: 'Default' },
  { name: 'Ethan Davis',     ext: '10010', department: 'Engineering', site: 'NY - New York',      configuration: 'Default' },
];
const MOCK_CUSTOM_USERS: UserRow[] = [
  { name: 'Sophia Garcia',   ext: '10011', department: 'Sales',       site: 'TX - Austin',        configuration: 'Custom' },
  { name: 'Mason Lee',       ext: '10012', department: 'Support',     site: 'IL - Chicago',       configuration: 'Custom' },
  { name: 'Isabella Martin', ext: '10013', department: 'Engineering', site: 'CA - San Mateo',     configuration: 'Custom' },
  { name: 'Lucas Anderson',  ext: '10014', department: 'Product',     site: 'WA - Seattle',       configuration: 'Custom' },
  { name: 'Mia Thompson',    ext: '10015', department: 'Marketing',   site: 'CA - San Francisco', configuration: 'Custom' },
  { name: 'Taylor Adams',    ext: '10016', department: 'Sales',       site: 'CA - Los Angeles',   configuration: 'Custom' },
  { name: 'Ava Robinson',    ext: '10017', department: 'Support',     site: 'NY - New York',      configuration: 'Custom' },
];

export function SpringUsersConfigDialog({
  open, featureLabel, variant = 'default', onClose,
  defaultUsersCount = 72, customUsersCount = 26, totalUsersCount = 98,
}: {
  open: boolean;
  featureLabel: string;
  variant?: 'default' | 'custom' | 'all';
  onClose: () => void;
  defaultUsersCount?: number;
  customUsersCount?: number;
  totalUsersCount?: number;
}) {
  const initialFilter: 'All' | 'Default' | 'Custom' =
    variant === 'all' ? 'All' : variant === 'default' ? 'Default' : 'Custom';
  const [configFilter, setConfigFilter] = useState<'All' | 'Default' | 'Custom'>(initialFilter);
  useEffect(() => { if (open) setConfigFilter(initialFilter); }, [open, initialFilter]);
  const total = totalUsersCount;
  const rows: UserRow[] = configFilter === 'Custom'
    ? MOCK_CUSTOM_USERS
    : configFilter === 'Default'
      ? MOCK_DEFAULT_USERS
      : [...MOCK_DEFAULT_USERS, ...MOCK_CUSTOM_USERS];
  const count = configFilter === 'All' ? total : configFilter === 'Default' ? defaultUsersCount : customUsersCount;

  return (
    <DialogPrimitives.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className="fixed inset-0 z-[60] bg-black/40 pt-12 flex justify-center items-start data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogPrimitives.Content
            aria-label={`User configuration for ${featureLabel}`}
            className="relative z-10 flex w-[1024px] max-w-[calc(100%-32px)] flex-col rounded-[12px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            <div className="flex flex-col gap-5 px-9 pb-6 pt-8">
              <DialogPrimitives.Title className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b1)]">
                User configuration for {featureLabel}
              </DialogPrimitives.Title>

              <div className="flex flex-col gap-1">
                <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  <span className="font-semibold">{defaultUsersCount}/{total} users</span> are using the{' '}
                  <span className="font-semibold">default</span> user configuration.
                </p>
                <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  Admins can manage this setting for users from their detail pages or apply them in bulk through{' '}
                  <a href="#" onClick={(e) => e.preventDefault()} className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]">
                    User Templates
                  </a>.
                </p>
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <div className="flex h-[36px] w-full items-center rounded-[10px] border border-black/20 bg-white px-[10px]">
                  <Search className="h-4 w-4 shrink-0 text-[var(--sui-colors-neutral-b1)]" strokeWidth={2} />
                  <input
                    type="text"
                    placeholder="Search"
                    className="ml-1 w-full bg-transparent text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b0)] placeholder-[var(--sui-colors-neutral-b2)] outline-none"
                  />
                </div>
                <UsersFilterPill label="Department" />
                <UsersFilterPill label="Sites" />
                <UsersFilterDropdown
                  label="Configuration"
                  value={configFilter}
                  options={['All', 'Default', 'Custom']}
                  onChange={(v) => setConfigFilter(v as 'All' | 'Default' | 'Custom')}
                />
              </div>

              <div className="flex flex-col overflow-hidden rounded-[8px] border border-black/20">
                <div className="grid grid-cols-[2fr_1fr_1.4fr_1.8fr_1.2fr] items-center gap-4 border-b border-black/20 bg-[var(--sui-colors-neutral-b4)]/40 px-4 py-3 text-[13px] font-semibold leading-[18px] text-[var(--sui-colors-neutral-b1)]">
                  <span>Name</span><span>Ext</span><span>Department</span><span>Site</span><span>Configuration</span>
                </div>
                {rows.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-1 px-4 py-12 text-center">
                    <p className="text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">No users found</p>
                  </div>
                ) : rows.slice(0, 10).map((u, i, arr) => (
                  <div
                    key={u.ext}
                    className={cn(
                      'grid h-[40px] grid-cols-[2fr_1fr_1.4fr_1.8fr_1.2fr] items-center gap-4 px-4 text-[12px] leading-[18px] text-[var(--sui-colors-neutral-b1)]',
                      i !== arr.length - 1 && 'border-b border-black/20',
                    )}
                  >
                    <a href="#" onClick={(e) => e.preventDefault()} className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]">
                      {u.name}
                    </a>
                    <span>{u.ext}</span>
                    <span>{u.department}</span>
                    <span>{u.site}</span>
                    <span>{u.configuration}</span>
                  </div>
                ))}
                <div className="flex items-center justify-end border-t border-black/20 px-3 py-2 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b0)]">
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                      <span>Rows per page</span>
                      <span className="flex h-[32px] w-[64px] items-center rounded-[10px] border border-black/20 bg-white px-3 text-[14px]">10</span>
                    </div>
                    <span>{count === 0 ? '0-0' : `1-${Math.min(10, count)}`} of {count}</span>
                    <div className="flex items-center gap-1">
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

            <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
            <div className="flex justify-end gap-2 px-6 py-4">
              <DialogPrimitives.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-3 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
                >
                  Close
                </button>
              </DialogPrimitives.Close>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
}

function UsersFilterPill({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex h-[36px] w-full cursor-pointer items-center justify-between gap-2 rounded-[10px] border border-black/20 bg-white pl-3 pr-2 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)] hover:border-black/40"
    >
      <span>{label}</span>
      <ChevronDown className="h-4 w-4 text-[var(--sui-colors-neutral-b1)]" strokeWidth={2} />
    </button>
  );
}

function UsersFilterDropdown({
  label, value, options, onChange,
}: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
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
        <ChevronDown className="h-4 w-4 text-[var(--sui-colors-neutral-b1)]" strokeWidth={2} />
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
                  {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function SpringFeatureEnableDialog({
  open,
  title,
  customCount = 0,
  totalUsers = 98,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  customCount?: number;
  totalUsers?: number;
  onCancel: () => void;
  onConfirm: (result: { defaultVal: 'On' | 'Off'; allowChange: boolean; customAction: 'reset' | 'restore' }) => void;
}) {
  const [value, setValue] = useState<'On' | 'Off'>('On');
  const [allow, setAllow] = useState(true);
  const [customAction, setCustomAction] = useState<'reset' | 'restore'>('reset');
  const [usersOpen, setUsersOpen] = useState<null | 'default' | 'custom'>(null);
  const total = totalUsers;
  const defaultCount = Math.max(0, total - (customCount || 0));

  useEffect(() => {
    if (open) {
      setValue('On');
      setAllow(true);
      setCustomAction('reset');
    }
  }, [open]);

  return (
    <DialogPrimitives.Root open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className="fixed inset-0 z-50 bg-black/40 pt-16 flex justify-center items-start data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogPrimitives.Content
            aria-label={title}
            className="relative z-10 flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            <div className="flex flex-col gap-8 px-6 pb-10 pt-9">
              <div className="flex flex-col gap-6">
                <div className="py-3">
                  <DialogPrimitives.Title className="text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
                    {title}
                  </DialogPrimitives.Title>
                </div>

                <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  This feature will be enabled for your account. Configure how it should be deployed to users below.
                </p>

                <div className="flex flex-col gap-2">
                  <h3 className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                    User deployment
                  </h3>

                  <div className="flex flex-col gap-4 rounded-[10px] border border-[#9E9FA4]/35 bg-white p-4">
                    <div className="flex w-full items-center justify-between gap-4">
                      <div className="flex h-[32px] items-center gap-4 pr-4">
                        <span className="text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                          Default in user settings:
                        </span>
                        <div className="flex items-center gap-5">
                          <SpringRadio checked={value === 'On'} onChange={() => setValue('On')} label="On" />
                          <SpringRadio checked={value === 'Off'} onChange={() => setValue('Off')} label="Off" />
                        </div>
                      </div>
                      <div className="flex h-[32px] items-center rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3">
                        <p className="whitespace-nowrap text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                          <button
                            type="button"
                            onClick={() => setUsersOpen(true)}
                            className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 rounded-sm"
                          >
                            {defaultCount}/{total} users
                          </button>{' '}
                          are using the default
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-[var(--sui-colors-neutral-b4)]" />

                    <div className="flex h-[32px] items-center gap-4">
                      <span className="text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                        User access:
                      </span>
                      <label className="flex cursor-pointer items-center gap-2">
                        <div className="relative flex h-[18px] w-[18px] items-center justify-center">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={allow}
                            onChange={(e) => setAllow(e.target.checked)}
                          />
                          <div className="absolute inset-0 rounded-[4px] border border-[var(--sui-colors-neutral-b3)] bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--sui-colors-primary-b)]/30 peer-checked:bg-[var(--sui-colors-primary-b)] peer-checked:border-[var(--sui-colors-primary-b)] flex items-center justify-center transition-colors">
                            {allow && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                          </div>
                        </div>
                        <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                          Allow users to change this setting
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {customCount > 0 && (
                  <div className="flex flex-col gap-3">
                    <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      <button
                        type="button"
                        onClick={() => setUsersOpen('custom')}
                        className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 rounded-sm"
                      >
                        {customCount}/{total} users
                      </button>{' '}
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
                )}
              </div>
            </div>

            <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
            <div className="flex justify-end gap-2 px-6 pt-5 pb-5">
              <DialogPrimitives.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--sui-colors-neutral-b4)] bg-white px-[18px] text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
                >
                  Cancel
                </button>
              </DialogPrimitives.Close>
              <button
                type="button"
                onClick={() => onConfirm({ defaultVal: value, allowChange: allow, customAction })}
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-[18px] text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
              >
                Turn on
              </button>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
      <SpringUsersConfigDialog
        open={usersOpen !== null}
        featureLabel={title.replace(/^Turn on\s+/, '').replace(/\s+for your organization\?$/, '')}
        variant={usersOpen ?? 'default'}
        onClose={() => setUsersOpen(null)}
        defaultUsersCount={defaultCount}
        customUsersCount={customCount}
        totalUsersCount={total}
      />
    </DialogPrimitives.Root>
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

/* -----------------------------------------------------------------------------
 * SpringFirstEnableDialog — bare-bones first-time enable confirmation. Shown
 * when an admin turns on a feature that has never been deployed before, so
 * there is no user-count link and no custom-users validation section. The
 * admin only picks the default and whether users can change it.
 * --------------------------------------------------------------------------- */
export function SpringFirstEnableDialog({
  open,
  title,
  body,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  body?: React.ReactNode;
  onCancel: () => void;
  onConfirm: (result: { defaultVal: 'On' | 'Off'; allowChange: boolean }) => void;
}) {
  const [value, setValue] = useState<'On' | 'Off'>('On');
  const [allow, setAllow] = useState(true);

  useEffect(() => {
    if (open) {
      setValue('On');
      setAllow(true);
    }
  }, [open]);

  return (
    <DialogPrimitives.Root open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-16 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogPrimitives.Content
            aria-label={title}
            className="relative z-10 flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            <div className="flex flex-col gap-6 px-6 pb-10 pt-9">
              <DialogPrimitives.Title className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
                {title}
              </DialogPrimitives.Title>

              {body && (
                <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  {body}
                </p>
              )}

              <div className="flex flex-col gap-2">
                <h3 className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                  User deployment
                </h3>
                <div className="flex flex-col gap-4 rounded-[10px] border border-[#9E9FA4]/35 bg-white p-4">
                  <div className="flex h-[32px] items-center gap-4">
                    <span className="text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      Default in user settings:
                    </span>
                    <div className="flex items-center gap-5">
                      <SpringRadio checked={value === 'On'} onChange={() => setValue('On')} label="On" />
                      <SpringRadio checked={value === 'Off'} onChange={() => setValue('Off')} label="Off" />
                    </div>
                  </div>
                  <div className="border-t border-[var(--sui-colors-neutral-b4)]" />
                  <div className="flex h-[32px] items-center gap-4">
                    <span className="text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      User access:
                    </span>
                    <label className="flex cursor-pointer items-center gap-2">
                      <div className="relative flex h-[18px] w-[18px] items-center justify-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={allow}
                          onChange={(e) => setAllow(e.target.checked)}
                        />
                        <div className="absolute inset-0 rounded-[4px] border border-[var(--sui-colors-neutral-b3)] bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--sui-colors-primary-b)]/30 peer-checked:bg-[var(--sui-colors-primary-b)] peer-checked:border-[var(--sui-colors-primary-b)] flex items-center justify-center transition-colors">
                          {allow && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </div>
                      </div>
                      <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                        Allow users to change this setting
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
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
                onClick={() => onConfirm({ defaultVal: value, allowChange: allow })}
                className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
              >
                Turn on
              </button>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
}

/* -----------------------------------------------------------------------------
 * ExtAppFeatureSettingsDialog — Set up Launch URL + trigger for the
 * "Launch an external app for incoming calls" feature. Includes a
 * collapsible reference parameters table (Figma node 1981:38965).
 * --------------------------------------------------------------------------- */
const TRIGGER_OPTIONS: ReadonlyArray<'A call begins to ring' | 'A call is answered'> = [
  'A call begins to ring',
  'A call is answered',
];

function ReferenceParametersTable() {
  const rowText = 'text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]';
  const codeCell = 'w-[120px] shrink-0 px-4 py-3 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]';
  const usageCell = 'flex-1 px-4 py-3';
  const simpleRows = [
    { p: '%N', u: 'Full name' },
    { p: '%F', u: 'First name' },
    { p: '%L', u: 'Last name' },
    { p: '%D', u: 'Called number' },
  ];
  const tailRows = [
    { p: '%C', u: 'Full canonical format: +1 (650) 555-4092' },
    { p: '%E', u: 'E164 phone number: +16505554092' },
    { p: '%%', u: '%symbol' },
  ];
  return (
    <div className="overflow-hidden rounded-[8px] border border-[var(--sui-colors-neutral-b4)]">
      <div className="flex bg-[var(--sui-colors-neutral-b5)]">
        <div className="w-[120px] shrink-0 px-4 py-2 text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          Parameter
        </div>
        <div className="flex-1 px-4 py-2 text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          Usage
        </div>
      </div>
      {simpleRows.map((r) => (
        <div key={r.p} className="flex border-t border-[var(--sui-colors-neutral-b4)]">
          <div className={codeCell}>{r.p}</div>
          <div className={`${usageCell} ${rowText}`}>{r.u}</div>
        </div>
      ))}
      <div className="flex border-t border-[var(--sui-colors-neutral-b4)]">
        <div className={codeCell}>%P</div>
        <div className={`${usageCell} flex flex-col gap-3`}>
          <p className={rowText}>Formatted phone number: (650) 555-4092</p>
          <div className="flex flex-col gap-2">
            <p className={rowText}>Examples:</p>
            <div className="flex flex-col gap-1 pl-4">
              <p className={`${rowText} relative before:absolute before:-left-3 before:content-['•']`}>Launch URL</p>
              <div className="flex h-[32px] items-center rounded-[10px] border border-black/20 bg-white px-2.5">
                <span className={rowText}>http://www.mysite.com/myintegration.htm?number=%P</span>
              </div>
              <p className="text-[13px] font-normal leading-[18px] text-[var(--sui-colors-neutral-b2)]">
                This example launches a browser, opens a webpage, and passes the caller's phone number details.
              </p>
            </div>
            <div className="flex flex-col gap-1 pl-4">
              <p className={`${rowText} relative before:absolute before:-left-3 before:content-['•']`}>Launch app</p>
              <div className="flex h-[32px] items-center rounded-[10px] border border-black/20 bg-white px-2.5">
                <span className={rowText}>/myfolder/myapp "%P" "%N"</span>
              </div>
              <p className="text-[13px] font-normal leading-[18px] text-[var(--sui-colors-neutral-b2)]">
                This example opens an application on your computer and passes the caller's phone number and full name to the app.
              </p>
            </div>
          </div>
        </div>
      </div>
      {tailRows.map((r) => (
        <div key={r.p} className="flex border-t border-[var(--sui-colors-neutral-b4)]">
          <div className={codeCell}>{r.p}</div>
          <div className={`${usageCell} ${rowText}`}>{r.u}</div>
        </div>
      ))}
    </div>
  );
}

export function ExtAppFeatureSettingsDialog({
  open,
  initialUrl = '',
  initialTrigger = 'A call begins to ring',
  initialExpanded = false,
  requireSave = false,
  onBack,
  onSkip,
  onSave,
}: {
  open: boolean;
  initialUrl?: string;
  initialTrigger?: 'A call begins to ring' | 'A call is answered';
  initialExpanded?: boolean;
  /* When true (admin chose "Default: On" in the prior dialog), Skip is
   * hidden — admin must provide a Launch URL before turning the feature on
   * for users. */
  requireSave?: boolean;
  onBack: () => void;
  onSkip: () => void;
  onSave: (result: { launchUrl: string; trigger: 'A call begins to ring' | 'A call is answered' }) => void;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [trigger, setTrigger] = useState<'A call begins to ring' | 'A call is answered'>(initialTrigger);
  const [expanded, setExpanded] = useState(initialExpanded);
  useEffect(() => {
    if (open) {
      setUrl(initialUrl);
      setTrigger(initialTrigger);
      setExpanded(initialExpanded);
    }
  }, [open, initialUrl, initialTrigger, initialExpanded]);

  const canSave = url.trim().length > 0;

  return (
    <DialogPrimitives.Root open={open} onOpenChange={(o) => !o && onBack()}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-[60px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogPrimitives.Content
            aria-label="Set up feature settings for external apps or URLs for incoming calls"
            className="relative z-10 flex max-h-full min-h-0 w-[820px] max-w-[calc(100%-32px)] flex-col overflow-hidden rounded-[10px] bg-white pt-9 shadow-[0_10px_30px_rgba(0,0,0,0.2)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-6 pb-10">
              <DialogPrimitives.Title className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
                Set up feature settings for external apps or URLs for incoming calls
              </DialogPrimitives.Title>

              <div
                className="flex min-h-[48px] items-center gap-2 rounded-[10px] border border-[var(--sui-colors-neutral-b2)] px-4 py-2"
                style={{ background: 'rgba(221,223,229,0.5)' }}
              >
                <Info className="h-5 w-5 shrink-0 text-[var(--sui-colors-neutral-b1)]" />
                <p className="flex-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)]">
                  Launching an external app may impact the performance of RingCentral services.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                  Feature settings
                </span>

                <div className="flex flex-col gap-4 rounded-[8px] border border-[var(--sui-colors-neutral-b4)] p-4">
                  <div className="flex h-[32px] items-center gap-2">
                    <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      Launch
                    </span>
                    <div className="flex h-[32px] flex-1 items-center rounded-[10px] border border-black/20 bg-white px-2.5 focus-within:ring-2 focus-within:ring-[var(--sui-colors-primary-b)]/30">
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter an external app or website URL"
                        className="w-full bg-transparent text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)] placeholder-[var(--sui-colors-neutral-b2)] outline-none"
                      />
                    </div>
                    <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      when
                    </span>
                    <SpringSelect
                      value={trigger}
                      width={240}
                      options={TRIGGER_OPTIONS as unknown as string[]}
                      onChange={(v) => setTrigger(v as typeof trigger)}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="self-start cursor-pointer rounded-[4px] px-1 py-0.5 text-[12px] font-medium leading-[17px] text-[var(--sui-colors-primary-b)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
                  >
                    {expanded ? 'Hide reference parameters' : 'Show reference parameters'}
                  </button>

                  {expanded && <ReferenceParametersTable />}
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-2 border-t border-[#DDDFE5]/50 bg-white px-6 pt-5 pb-5">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--sui-colors-neutral-b4)] bg-white px-[18px] text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
              >
                Back
              </button>
              <div className="flex items-center gap-2">
                {!requireSave && (
                  <button
                    type="button"
                    onClick={onSkip}
                    className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--sui-colors-neutral-b4)] bg-white px-[18px] text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
                  >
                    Skip and Continue
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onSave({ launchUrl: url.trim(), trigger })}
                  disabled={!canSave}
                  className="inline-flex h-[36px] min-w-[60px] items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-[18px] text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 disabled:cursor-not-allowed disabled:bg-[var(--sui-colors-neutral-b3)] disabled:hover:bg-[var(--sui-colors-neutral-b3)] enabled:cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
}

/* -----------------------------------------------------------------------------
 * ExtAppManageDialog — Manage modal for "Launch an external app for incoming
 * calls" (Figma node 1874:31634). Combines User deployment (Default + User
 * access as separate cards) and Feature settings (Launch URL + trigger).
 * --------------------------------------------------------------------------- */
export function ExtAppManageDialog({
  open,
  defaultVal,
  allowChange,
  launchUrl,
  trigger,
  customCount = 0,
  totalUsers = 98,
  onCancel,
  onConfirm,
  error,
}: {
  open: boolean;
  defaultVal: 'On' | 'Off';
  allowChange: boolean;
  launchUrl: string;
  trigger: 'A call begins to ring' | 'A call is answered';
  customCount?: number;
  totalUsers?: number;
  onCancel: () => void;
  onConfirm: (result: {
    defaultVal: 'On' | 'Off';
    allowChange: boolean;
    launchUrl: string;
    trigger: 'A call begins to ring' | 'A call is answered';
  }) => void;
  error?: boolean;
}) {
  const [value, setValue] = useState<'On' | 'Off'>(defaultVal);
  const [allow, setAllow] = useState(allowChange);
  const [url, setUrl] = useState(launchUrl);
  const [trig, setTrig] = useState<'A call begins to ring' | 'A call is answered'>(trigger);
  const [expanded, setExpanded] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [confirmOff, setConfirmOff] = useState(false);
  const total = totalUsers;
  const defaultCount = Math.max(0, total - (customCount || 0));

  useEffect(() => {
    if (open) {
      setValue(defaultVal);
      setAllow(allowChange);
      setUrl(launchUrl);
      setTrig(trigger);
      setExpanded(false);
      setUsersOpen(false);
      setConfirmOff(false);
    }
  }, [open, defaultVal, allowChange, launchUrl, trigger]);

  // When the URL is empty, the default-for-users is forced Off and the
  // select is disabled. Compute the effective value the user sees.
  const urlEmpty = url.trim().length === 0;
  const effectiveValue: 'On' | 'Off' = urlEmpty ? 'Off' : value;
  const noUrlTooltip = 'To set this setting for new users as ON, set up external app or website URL first.';

  const dirty =
    effectiveValue !== defaultVal ||
    allow !== allowChange ||
    url.trim() !== launchUrl.trim() ||
    trig !== trigger;
  const saveDisabled = !dirty && !error;

  const commit = (override?: { defaultVal?: 'On' | 'Off' }) => {
    onConfirm({
      defaultVal: override?.defaultVal ?? effectiveValue,
      allowChange: allow,
      launchUrl: url.trim(),
      trigger: trig,
    });
  };

  const handleSave = () => {
    if (error) {
      commit();
      return;
    }
    // Cleared the URL on a feature that was on by default for users → confirm.
    if (urlEmpty && defaultVal === 'On') {
      setConfirmOff(true);
      return;
    }
    commit();
  };

  return (
    <DialogPrimitives.Root open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-[60px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogPrimitives.Content
            aria-label="Manage Launch an external app for incoming calls"
            className="relative z-10 flex max-h-full min-h-0 w-[800px] max-w-[calc(100%-32px)] flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 pb-8 pt-6">
              <DialogPrimitives.Title className="py-2 text-[22px] font-normal leading-[30px] text-[var(--sui-colors-neutral-b1)]">
                Manage Launch an external app for incoming calls
              </DialogPrimitives.Title>

              {/* User deployment */}
              <div className="flex flex-col gap-2">
                <h3 className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                  User deployment
                </h3>

                <div className="flex flex-col rounded-[10px] border border-[#9E9FA4]/35 bg-white">
                  <div className="flex min-h-[56px] items-center gap-4 px-4 py-3">
                    <span className="text-[14px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      Default in user settings:
                    </span>
                    {urlEmpty ? (
                      <TooltipPrimitives.Provider delayDuration={200}>
                        <TooltipPrimitives.Root>
                          <TooltipPrimitives.Trigger asChild>
                            <span tabIndex={0} aria-label={noUrlTooltip} className="flex items-center gap-5">
                              <SpringRadio checked={false} onChange={() => {}} label="On" disabled />
                              <SpringRadio checked={true} onChange={() => {}} label="Off" disabled />
                            </span>
                          </TooltipPrimitives.Trigger>
                          <TooltipPrimitives.Portal>
                            <TooltipPrimitives.Content
                              side="top"
                              sideOffset={6}
                              className="z-50 max-w-xs rounded-md bg-gray-900 px-3 py-2 text-sm text-white shadow-md animate-in fade-in-0 zoom-in-95"
                            >
                              {noUrlTooltip}
                              <TooltipPrimitives.Arrow className="fill-gray-900" />
                            </TooltipPrimitives.Content>
                          </TooltipPrimitives.Portal>
                        </TooltipPrimitives.Root>
                      </TooltipPrimitives.Provider>
                    ) : (
                      <div className="flex items-center gap-5">
                        <SpringRadio checked={value === 'On'} onChange={() => setValue('On')} label="On" />
                        <SpringRadio checked={value === 'Off'} onChange={() => setValue('Off')} label="Off" />
                      </div>
                    )}
                    <p className="ml-auto text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                      <button
                        type="button"
                        onClick={() => setUsersOpen(true)}
                        className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 rounded-sm"
                      >
                        {defaultCount}/{total} users
                      </button>{' '}
                      are using the default
                    </p>
                  </div>
                  <div className="mx-4 border-t border-[var(--sui-colors-neutral-b4)]/70" />
                  <div className="flex min-h-[56px] items-center gap-4 px-4 py-3">
                    <span className="text-[14px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      User access:
                    </span>
                    <label className="flex cursor-pointer items-center gap-2">
                      <div className="relative flex h-[20px] w-[20px] items-center justify-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={allow}
                          onChange={(e) => setAllow(e.target.checked)}
                        />
                        <div className="absolute inset-0 rounded-[4px] border border-[var(--sui-colors-neutral-b3)] bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--sui-colors-primary-b)]/30 peer-checked:bg-[var(--sui-colors-primary-b)] peer-checked:border-[var(--sui-colors-primary-b)] flex items-center justify-center transition-colors">
                          {allow && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </div>
                      </div>
                      <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                        Allow users to change this setting
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Feature settings */}
              <div className="flex flex-col gap-2">
                <h3 className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                  Feature settings
                </h3>
                <div className="flex flex-col gap-4 rounded-[10px] border border-[var(--sui-colors-neutral-b4)] p-4">
                  <div className="flex h-[32px] items-center gap-2">
                    <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      Launch
                    </span>
                    <div className="flex h-[32px] flex-1 items-center rounded-[10px] border border-black/20 bg-white px-2.5 focus-within:ring-2 focus-within:ring-[var(--sui-colors-primary-b)]/30">
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter an external app or website URL"
                        aria-label="Launch URL or external app path"
                        className="w-full bg-transparent text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)] placeholder-[var(--sui-colors-neutral-b2)] outline-none"
                      />
                    </div>
                    <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      when
                    </span>
                    <span className="sr-only" id="ext-app-manage-trigger-label">Trigger event</span>
                    <SpringSelect
                      value={trig}
                      width={240}
                      options={['A call begins to ring', 'A call is answered']}
                      onChange={(v) => setTrig(v as typeof trig)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    aria-expanded={expanded}
                    className="self-start cursor-pointer rounded-[4px] px-1 py-0.5 text-[12px] font-medium leading-[17px] text-[var(--sui-colors-primary-b)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
                  >
                    {expanded ? 'Hide reference parameters' : 'Show reference parameters'}
                  </button>
                  {expanded && <ReferenceParametersTable />}
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  <Info className="h-4 w-4 shrink-0 text-red-600" />
                  <span>Couldn't save settings. Try again.</span>
                </div>
              )}
            </div>

            <div className="flex shrink-0 justify-end gap-2 border-t border-[#DDDFE5]/50 bg-white px-6 py-4">
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
                onClick={handleSave}
                disabled={saveDisabled}
                className="inline-flex h-[32px] min-w-[64px] items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 disabled:cursor-not-allowed disabled:bg-[var(--sui-colors-neutral-b3)] disabled:hover:bg-[var(--sui-colors-neutral-b3)] enabled:cursor-pointer"
              >
                {error ? 'Retry' : 'Save'}
              </button>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
      <SpringConfirmDialog
        open={confirmOff}
        title="Turn off default for users?"
        body={
          <>
            <p className="mb-3">
              <strong>Launch an external app for incoming calls</strong> doesn’t have a URL.
            </p>
            <p>
              The default for users can’t stay on without a URL and will be turned <strong>off</strong>.
              All other changes will still be saved.
            </p>
          </>
        }
        confirmLabel="Turn off default & save"
        onCancel={() => setConfirmOff(false)}
        onConfirm={() => {
          setConfirmOff(false);
          commit({ defaultVal: 'Off' });
        }}
      />
      <SpringUsersConfigDialog
        open={usersOpen}
        featureLabel="Launch an external app for incoming calls"
        variant="default"
        onClose={() => setUsersOpen(false)}
        defaultUsersCount={defaultCount}
        customUsersCount={customCount}
        totalUsersCount={total}
      />
    </DialogPrimitives.Root>
  );
}

export function showToast(message: string, _onUndo?: () => void) {
  toast.custom(
    (id) => (
      <div
        role="status"
        className="flex w-full items-center justify-between gap-2 rounded-[3px] bg-[#1A8517] px-[7px] py-[10px] font-['Helvetica',sans-serif] text-[13px] leading-[1.54] text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
      >
        <span className="h-[13px] w-[13px] shrink-0 opacity-0" aria-hidden="true" />
        <p className="flex-1 text-center">{message}</p>
        <button
          type="button"
          onClick={() => toast.dismiss(id)}
          aria-label="Close"
          className="flex h-[13px] w-[13px] shrink-0 cursor-pointer items-center justify-center text-white focus:outline-none"
        >
          <X className="h-[13px] w-[13px]" strokeWidth={2} />
        </button>
      </div>
    ),
    { duration: 4000 },
  );
}
