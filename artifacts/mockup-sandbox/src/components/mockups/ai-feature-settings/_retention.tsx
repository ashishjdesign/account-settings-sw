import React from 'react';
import { CaretDownMd, InfoMd, CheckMd } from '@ringcentral/spring-icon';

/* -----------------------------------------------------------------------------
 * Shared "AI data custom retention period" select used in the Manage AI
 * features modal. Retention is always on (account preconfigured) — admins can
 * only change the period. Popper values per Figma 2015-39944.
 * --------------------------------------------------------------------------- */

export const RETENTION_PERIODS = [
  { value: '365', label: '365 days (Default)', menuLabel: '365 days (default)' },
  { value: '7', label: '7 days', menuLabel: '7 days' },
  { value: '14', label: '14 days', menuLabel: '14 days' },
  { value: '30', label: '30 days', menuLabel: '30 days' },
  { value: '90', label: '90 days', menuLabel: '90 days' },
  { value: '180', label: '180 days', menuLabel: '180 days' },
] as const;

export type RetentionValue = (typeof RETENTION_PERIODS)[number]['value'];

export function RetentionPeriodSelect({
  value, onChange,
}: {
  value: RetentionValue;
  onChange: (next: RetentionValue) => void;
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
                      className={[
                        'inline-block h-[6px] w-[6px] rounded-full bg-[var(--sui-colors-neutral-b0)]',
                        isSelected ? 'opacity-100' : 'opacity-0',
                      ].join(' ')}
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
 * Shared dialogs used by the Manage AI features click-through prototype.
 * --------------------------------------------------------------------------- */

export function ManageAiFeaturesDialog({
  open,
  initialPeriod,
  onCancel,
  onSave,
}: {
  open: boolean;
  initialPeriod: RetentionValue;
  onCancel: () => void;
  onSave: (next: { period: RetentionValue }) => void;
}) {
  const [period, setPeriod] = React.useState<RetentionValue>(initialPeriod);

  React.useEffect(() => {
    if (open) setPeriod(initialPeriod);
  }, [open, initialPeriod]);

  if (!open) return null;
  const dirty = period !== initialPeriod;

  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-24">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="manage-ai-features-title"
        className="relative z-10 flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col gap-8 overflow-visible px-6 pb-10 pt-9">
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
                    <div className="flex min-w-0 flex-1 items-center">
                      <p className="text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                        AI data custom retention period
                      </p>
                    </div>
                    <RetentionPeriodSelect value={period} onChange={setPeriod} />
                  </div>
                  <div className="flex w-full items-center pr-[130px]">
                    <p className="flex-1 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                      Set custom AI-specific storage period including Call notes and transcriptions.{' '}
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-[#066FAC] underline decoration-solid"
                      >
                        Learn more
                      </a>
                    </p>
                  </div>
                </div>
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
                onClick={() => onSave({ period })}
                disabled={!dirty}
                className={[
                  'inline-flex h-[36px] min-w-[60px] items-center justify-center rounded-[10px] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors',
                  dirty
                    ? 'cursor-pointer bg-[var(--sui-colors-primary-b)] hover:bg-[var(--sui-colors-primary-b-high-contrast)]'
                    : 'cursor-not-allowed bg-[var(--sui-colors-neutral-b3)]',
                ].join(' ')}
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

export function ChangeRetentionConfirmDialog({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [acknowledged, setAcknowledged] = React.useState(false);
  React.useEffect(() => {
    if (open) setAcknowledged(false);
  }, [open]);
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-24">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-retention-title"
        className="relative z-10 flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col gap-8 overflow-visible px-6 pb-[60px] pt-9">
          <div className="flex flex-col gap-8">
            <div className="flex items-start py-3">
              <h2
                id="change-retention-title"
                className="flex-1 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]"
              >
                Change custom retention period for AI features?
              </h2>
            </div>

            <div className="flex min-h-[48px] w-full items-center gap-2 rounded-[10px] border border-[var(--sui-colors-neutral-b2)] bg-[var(--sui-colors-neutral-b4)]/50 px-4 py-2 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] backdrop-blur-[10px]">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[var(--sui-colors-neutral-b0)]">
                <InfoMd width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
              </span>
              <p className="flex-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)]">
                Changing a custom retention period may permanently delete older AI data.
              </p>
            </div>

            <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              Selecting a shorter retention period than your current policy may result in the removal of previously stored AI data that falls outside the new limit.
            </p>
          </div>

          <label className="flex w-[534px] max-w-full cursor-pointer items-start gap-2">
            <span
              role="checkbox"
              aria-checked={acknowledged}
              onClick={() => setAcknowledged((v) => !v)}
              className={[
                'mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border-[1.2px] transition-colors',
                acknowledged
                  ? 'border-[var(--sui-colors-primary-b)] bg-[var(--sui-colors-primary-b)] text-white'
                  : 'border-[var(--sui-colors-neutral-b2)] bg-white',
              ].join(' ')}
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
                className={[
                  'inline-flex h-[36px] min-w-[60px] items-center justify-center rounded-[10px] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors',
                  acknowledged
                    ? 'cursor-pointer bg-[var(--sui-colors-primary-b)] hover:bg-[var(--sui-colors-primary-b-high-contrast)]'
                    : 'cursor-not-allowed bg-[var(--sui-colors-neutral-b3)]',
                ].join(' ')}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
