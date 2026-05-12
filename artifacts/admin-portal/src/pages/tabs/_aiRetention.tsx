import React from 'react';
import { CaretDownMd, InfoMd, CheckMd } from '@ringcentral/spring-icon';
import { cn } from '../../lib/utils';
import { SpringSwitch } from '../../components/shared';
import type { AiRetentionPeriod } from '../../store';

/* -----------------------------------------------------------------------------
 * Shared "AI data custom retention period" select used in both the
 * Manage AI features modal (enabled state) and the Turn on confirm dialog.
 * Popper values per Figma 2015-39944.
 * --------------------------------------------------------------------------- */
export const RETENTION_PERIODS: ReadonlyArray<{
  value: AiRetentionPeriod;
  label: string;
  menuLabel: string;
}> = [
  { value: '365', label: '365 days (Default)', menuLabel: '365 days (default)' },
  { value: '7', label: '7 days', menuLabel: '7 days' },
  { value: '14', label: '14 days', menuLabel: '14 days' },
  { value: '30', label: '30 days', menuLabel: '30 days' },
  { value: '90', label: '90 days', menuLabel: '90 days' },
  { value: '180', label: '180 days', menuLabel: '180 days' },
];

export function periodLabel(value: AiRetentionPeriod): string {
  return RETENTION_PERIODS.find((p) => p.value === value)?.label ?? `${value} days`;
}

export function RetentionPeriodSelect({
  value, onChange,
}: {
  value: AiRetentionPeriod;
  onChange: (next: AiRetentionPeriod) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const selected = RETENTION_PERIODS.find((p) => p.value === value) ?? RETENTION_PERIODS[0];

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div ref={ref} className="relative w-[200px]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-[32px] w-full cursor-pointer items-center rounded-[10px] border border-[var(--sui-colors-neutral-b0)]/20 bg-white pl-[10px] pr-[6px] text-left transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/30"
      >
        <span className="flex-1 truncate text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b0)]">
          {selected.label}
        </span>
        <span className="flex h-[24px] w-[24px] items-center justify-center text-[var(--sui-colors-neutral-b1)]">
          <CaretDownMd width={16} height={16} fill="currentColor" aria-hidden focusable={false} />
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-[calc(100%+4px)] z-50 w-[222px] rounded-[10px] border border-[var(--sui-colors-neutral-b0)]/20 bg-white py-2 shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
        >
          {RETENTION_PERIODS.map((p) => {
            const isSelected = p.value === value;
            return (
              <div key={p.value} className="px-2">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(p.value);
                    setOpen(false);
                  }}
                  className="flex min-h-[40px] w-full cursor-pointer items-center rounded-[10px] px-2 py-2.5 text-left hover:bg-[var(--sui-colors-neutral-b4)]/40"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center pr-3">
                    <span
                      className={cn(
                        'inline-block h-[6px] w-[6px] rounded-full bg-[var(--sui-colors-neutral-b0)]',
                        isSelected ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </span>
                  <span className="flex-1 truncate text-[13px] font-medium leading-[19px] text-[var(--sui-colors-neutral-b0)]">
                    {p.menuLabel}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Manage AI features dialog — Figma 1969-7046 / 2015-10201
 *
 * Hosts the "AI data custom retention period" toggle and, when on, the
 * Custom storage duration select. Save is dirty-aware.
 * --------------------------------------------------------------------------- */
export function ManageAiFeaturesDialog({
  open, initialRetentionOn, initialPeriod, onCancel, onSave, onRequestTurnOn,
}: {
  open: boolean;
  initialRetentionOn: boolean;
  initialPeriod: AiRetentionPeriod;
  onCancel: () => void;
  onSave: (next: { retentionOn: boolean; period: AiRetentionPeriod }) => void;
  /** When the user flips the retention switch from off → on, the parent
   * should open the "Turn on retention confirm" dialog overlaid on top of
   * this modal. The toggle stays visually off until the parent confirms
   * (which flips `initialRetentionOn` and re-syncs via useEffect). */
  onRequestTurnOn?: (period: AiRetentionPeriod) => void;
}) {
  const [retentionOn, setRetentionOn] = React.useState(initialRetentionOn);
  const [period, setPeriod] = React.useState<AiRetentionPeriod>(initialPeriod);
  React.useEffect(() => {
    if (open) {
      setRetentionOn(initialRetentionOn);
      setPeriod(initialPeriod);
    }
  }, [open, initialRetentionOn, initialPeriod]);
  if (!open) return null;
  const dirty = retentionOn !== initialRetentionOn || period !== initialPeriod;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-24">
      <div className="absolute inset-0" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="manage-ai-features-title"
        className="relative z-10 flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col gap-8 px-6 pb-10 pt-9">
          <div className="flex flex-col gap-6">
            <div className="flex items-start py-3">
              <h2
                id="manage-ai-features-title"
                className="flex-1 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]"
              >
                Manage AI features
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                Feature settings
              </p>
              <div className="flex flex-col gap-4 rounded-[8px] border border-[var(--sui-colors-neutral-b4)] p-4">
                <div className="flex w-full flex-col items-start justify-center gap-1">
                  <div className="flex min-h-[32px] w-full items-center gap-4">
                    <p className="flex-1 text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      AI data custom retention period
                    </p>
                    <SpringSwitch
                      checked={retentionOn}
                      onCheckedChange={(next) => {
                        // off → on: defer to parent for the Turn-on confirm.
                        // The local toggle stays off until the parent commits
                        // and re-syncs `initialRetentionOn` via useEffect.
                        if (next && !retentionOn && onRequestTurnOn) {
                          onRequestTurnOn(period);
                          return;
                        }
                        setRetentionOn(next);
                      }}
                      aria-label="AI data custom retention period"
                    />
                  </div>
                  <div className="flex w-full items-center pr-[130px]">
                    <p className="flex-1 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                      Enable custom data retention to set an AI-specific storage period including AI notes and transcriptions.{' '}
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-[var(--sui-colors-primary-b)] underline"
                      >
                        Learn more
                      </a>
                    </p>
                  </div>
                </div>
                {retentionOn && (
                  <div className="flex w-full items-center border-t border-[var(--sui-colors-neutral-b4)] pt-4">
                    <div className="flex flex-1 items-center justify-between">
                      <p className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                        Custom storage duration
                      </p>
                      <RetentionPeriodSelect value={period} onChange={setPeriod} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-start justify-end overflow-clip border-t border-[#DDDFE5]/50 px-6 pt-5">
          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center gap-2 pb-5">
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--sui-colors-neutral-b0)]/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onSave({ retentionOn, period })}
                disabled={!dirty}
                className={cn(
                  'inline-flex h-[36px] min-w-[60px] items-center justify-center rounded-[10px] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors',
                  dirty
                    ? 'cursor-pointer bg-[var(--sui-colors-primary-b)] hover:bg-[var(--sui-colors-primary-b-high-contrast)]'
                    : 'cursor-not-allowed bg-[var(--sui-colors-neutral-b3)]',
                )}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Retention confirm dialog — Figma 2015-10396 (turn-on) / 2030-40238 (change)
 * --------------------------------------------------------------------------- */
export function RetentionConfirmDialog({
  open, variant, period, onPeriodChange, onCancel, onConfirm,
}: {
  open: boolean;
  variant: 'turn-on' | 'change';
  period: AiRetentionPeriod;
  onPeriodChange?: (next: AiRetentionPeriod) => void;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [acknowledged, setAcknowledged] = React.useState(false);
  React.useEffect(() => { if (open) setAcknowledged(false); }, [open]);
  if (!open) return null;
  const isTurnOn = variant === 'turn-on';
  const title = isTurnOn
    ? 'Turn on AI data custom retention period for AI features?'
    : 'Change custom retention period for AI features?';
  const snackbar = isTurnOn
    ? 'Setting a custom retention period may permanently delete older AI data.'
    : 'Changing a custom retention period may permanently delete older AI data.';
  const confirmLabel = isTurnOn ? 'Turn on' : 'Confirm';
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 pt-24">
      <div className="absolute inset-0" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-retention-confirm-title"
        className="relative z-10 flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col gap-8 px-6 pb-[60px] pt-9">
          <div className="flex flex-col gap-8">
            <div className="flex items-start py-3">
              <h2
                id="ai-retention-confirm-title"
                className="flex-1 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]"
              >
                {title}
              </h2>
            </div>
            <div className="flex min-h-[48px] w-full items-center gap-2 rounded-[10px] border border-[var(--sui-colors-neutral-b2)] bg-[var(--sui-colors-neutral-b4)]/50 px-4 py-2 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] backdrop-blur-[10px]">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[var(--sui-colors-neutral-b0)]">
                <InfoMd width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
              </span>
              <p className="flex-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)]">
                {snackbar}
              </p>
            </div>
            <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              Selecting a shorter retention period than your current policy may result in the removal of previously stored AI data that falls outside the new limit.
            </p>
            {isTurnOn && onPeriodChange && (
              <div className="flex w-full flex-col gap-4 rounded-[8px] border border-[var(--sui-colors-neutral-b4)] p-4">
                <div className="flex w-full items-center justify-between">
                  <p className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    Custom storage duration
                  </p>
                  <RetentionPeriodSelect value={period} onChange={onPeriodChange} />
                </div>
              </div>
            )}
          </div>
          <label className="flex w-[534px] max-w-full cursor-pointer items-start gap-2">
            <span
              role="checkbox"
              aria-checked={acknowledged}
              onClick={() => setAcknowledged((v) => !v)}
              className={cn(
                'mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border-[1.2px] transition-colors',
                acknowledged
                  ? 'border-[var(--sui-colors-primary-b)] bg-[var(--sui-colors-primary-b)] text-white'
                  : 'border-[var(--sui-colors-neutral-b2)] bg-white',
              )}
            >
              {acknowledged && (
                <CheckMd width={14} height={14} fill="currentColor" aria-hidden focusable={false} />
              )}
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
            />
            <span className="flex-1 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              I understand this action may result in data loss.
            </span>
          </label>
        </div>
        <div className="flex w-full items-start justify-end overflow-clip border-t border-[#DDDFE5]/50 px-6 pt-5">
          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center gap-2 pb-5">
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--sui-colors-neutral-b4)] bg-white px-[18px] text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={!acknowledged}
                className={cn(
                  'inline-flex h-[36px] min-w-[60px] items-center justify-center rounded-[10px] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors',
                  acknowledged
                    ? 'cursor-pointer bg-[var(--sui-colors-primary-b)] hover:bg-[var(--sui-colors-primary-b-high-contrast)]'
                    : 'cursor-not-allowed bg-[var(--sui-colors-neutral-b3)]',
                )}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
