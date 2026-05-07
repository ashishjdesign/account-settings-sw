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

export function SubRow({ children }: React.PropsWithChildren) {
  return (
    <div className="flex w-full items-center justify-between gap-4 border-b border-[var(--sui-colors-neutral-b4)] pb-4 pt-0 last:border-b-0 [&:not(:first-child)]:pt-4">
      {children}
    </div>
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
          'flex h-[20px] w-[20px] shrink-0 cursor-pointer items-center justify-center rounded-full border-[1.2px] transition-colors',
          checked
            ? 'border-[var(--sui-colors-primary-b)]'
            : 'border-[var(--sui-colors-neutral-b3)] hover:border-[var(--sui-colors-neutral-b2)]',
        )}
      >
        {checked && (
          <span className="h-[12px] w-[12px] rounded-full bg-[var(--sui-colors-primary-b)]" />
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
                          <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
                          >
                            {defaultCount}/{total} users
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
              <button
                type="button"
                onClick={() => onConfirm({ defaultVal: value, allowChange: allow })}
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-[18px] text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
              >
                {error ? 'Retry' : 'Confirm'}
              </button>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
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

export function showToast(message: string, onUndo?: () => void) {
  toast.custom(
    (id) => (
      <div
        role="status"
        className="flex w-[640px] max-w-[calc(100vw-32px)] items-center justify-between gap-2 rounded-[3px] bg-[#1A8517] px-[7px] py-[10px] font-['Helvetica',sans-serif] text-[13px] leading-[1.54] text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
      >
        <span className="h-[13px] w-[13px] shrink-0 opacity-0" aria-hidden="true" />
        <p className="flex-1 text-center">
          {message}
          {onUndo && (
            <>
              {' '}
              <button
                type="button"
                onClick={() => { onUndo(); toast.dismiss(id); }}
                className="cursor-pointer underline focus:outline-none"
              >
                Undo
              </button>
            </>
          )}
        </p>
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
    { duration: onUndo ? 8000 : 4000 },
  );
}
