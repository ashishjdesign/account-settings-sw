import React from 'react';
import {
  CaretDownMd as CaretDownMdIcon,
  InfoMd as InfoMdIcon,
} from '@ringcentral/spring-icon';

/* The installed @ringcentral/spring-icon typings pull in a React-types
 * variant that marks onPointerEnterCapture/onPointerLeaveCapture as required
 * props. Re-type the icons as plain SVG components; runtime is unaffected. */
type SvgIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const CaretDownMd = CaretDownMdIcon as unknown as SvgIcon;
const InfoMd = InfoMdIcon as unknown as SvgIcon;
import { cn } from '../../lib/utils';
import type { AiCustomRetention, AiRetentionProductKey } from '../../store';

/* -----------------------------------------------------------------------------
 * AI data custom retention period — granular per product.
 * Products, defaults, and allowed custom ranges per requirement screens
 * (Dialog-rp2/rp6, Popper-rp3/rp5, Dialog-rp4).
 * --------------------------------------------------------------------------- */
export const RETENTION_PRODUCTS: ReadonlyArray<{
  key: AiRetentionProductKey;
  title: string;
  /** Short label used in the Feature Settings card summary pills. */
  shortLabel: string;
  description: React.ReactNode;
  defaultDays: number;
  minDays: number;
  maxDays: number;
}> = [
  {
    key: 'ringexPhone',
    title: 'Phone AI notes and transcripts',
    shortLabel: 'Phone',
    description: (
      <>
        AI notes and transcripts from phone calls, including those in call logs and call
        recordings logs, are permanently deleted after the selected period. The logs
        themselves and call recordings aren’t affected.
      </>
    ),
    defaultDays: 365,
    minDays: 7,
    maxDays: 365,
  },
  {
    key: 'meetings',
    title: 'Meeting AI data retention',
    shortLabel: 'Meetings',
    description: (
      <>
        AI notes and transcripts from meetings are permanently deleted after the selected
        period. Meeting recordings and in-meeting chats, when present, are deleted
        at the same time. This setting doesn’t affect how long the Meetings log is kept.
      </>
    ),
    defaultDays: 365,
    minDays: 1,
    maxDays: 365,
  },
  {
    key: 'ringcx',
    title: 'RingCX AI artifacts',
    shortLabel: 'RingCX',
    description: (
      <>
        Applies to AI artifacts generated during RingCX sessions.
        <br />
        AI artifacts may be deleted before the selected retention period if the related session
        is deleted or expires.
      </>
    ),
    defaultDays: 365,
    minDays: 7,
    maxDays: 365,
  },
];

export const RETENTION_PRESET_DAYS: ReadonlyArray<number> = [7, 14, 30, 90, 180, 365];

// RingCX is hidden from the current retention UI; retain its stored policy.
export const VISIBLE_RETENTION_PRODUCTS = RETENTION_PRODUCTS.filter((p) => p.key !== 'ringcx');

export function productFor(key: AiRetentionProductKey) {
  return RETENTION_PRODUCTS.find((p) => p.key === key)!;
}

/** "365 days (default)" / "333 days (custom)" / "90 days" */
export function retentionDaysLabel(key: AiRetentionProductKey, days: number): string {
  const product = productFor(key);
  const label = `${days} ${days === 1 ? 'day' : 'days'}`;
  if (days === product.defaultDays) return `${label} (default)`;
  if (!RETENTION_PRESET_DAYS.includes(days)) return `${label} (custom)`;
  return label;
}

/* -----------------------------------------------------------------------------
 * Per-product retention select. Only the supported preset periods are selectable.
 * --------------------------------------------------------------------------- */
export function RetentionPeriodSelect({
  productKey, value, onChange,
}: {
  productKey: AiRetentionProductKey;
  value: number;
  onChange: (next: number) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const options = RETENTION_PRESET_DAYS;

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div ref={ref} className="relative w-[200px] shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-[32px] w-full cursor-pointer items-center rounded-[10px] border border-[var(--sui-colors-neutral-b0)]/20 bg-white pl-[10px] pr-[6px] text-left transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/30"
      >
        <span className="flex-1 truncate text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b0)]">
          {retentionDaysLabel(productKey, value)}
        </span>
        <span className="flex h-[24px] w-[24px] items-center justify-center text-[var(--sui-colors-neutral-b1)]">
          <CaretDownMd width={16} height={16} fill="currentColor" aria-hidden focusable={false} />
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-[calc(100%+4px)] z-50 w-[222px] rounded-[10px] border border-[var(--sui-colors-neutral-b0)]/20 bg-white pt-2 shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
        >
          {options.map((d) => {
            const isSelected = d === value;
            return (
              <div key={d} className="px-2">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(d);
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
                    {retentionDaysLabel(productKey, d)}
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
 * "Set AI data custom retention period for <Product>" dialog — Dialog-rp4.
 * Number input limited to the product's min–max range; Apply is disabled
 * until a valid value is entered.
 * --------------------------------------------------------------------------- */
export function SetCustomRetentionDialog({
  open, productKey, initialDays, onCancel, onApply,
}: {
  open: boolean;
  productKey: AiRetentionProductKey | null;
  initialDays?: number;
  onCancel: () => void;
  onApply: (days: number) => void;
}) {
  const [raw, setRaw] = React.useState('');
  React.useEffect(() => {
    if (open) setRaw('');
  }, [open, productKey]);
  if (!open || !productKey) return null;
  const product = productFor(productKey);
  const parsed = /^\d+$/.test(raw.trim()) ? Number(raw.trim()) : NaN;
  const valid = Number.isInteger(parsed) && parsed >= product.minDays && parsed <= product.maxDays;
  const showError = raw.trim() !== '' && !valid;
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 pt-24">
      <div className="absolute inset-0" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="set-custom-retention-title"
        className="relative z-10 flex w-[620px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col gap-8 px-6 pb-10 pt-9">
          <div className="flex items-start py-3">
            <h2
              id="set-custom-retention-title"
              className="flex-1 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]"
            >
              Set AI data custom retention period
              <br />
              for {product.title}
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              Enter a retention period between {product.minDays} and {product.maxDays} days.
            </p>
            <input
              type="text"
              inputMode="numeric"
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              placeholder="Enter number of days"
              aria-label="Number of days"
              aria-invalid={showError}
              className={cn(
                'h-[40px] w-[320px] rounded-[10px] border bg-white px-3 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b0)] outline-none placeholder:text-[var(--sui-colors-neutral-b2)]',
                showError
                  ? 'border-[var(--sui-colors-danger-b)]'
                  : 'border-[var(--sui-colors-neutral-b0)]/20 focus:border-[var(--sui-colors-primary-b)]',
              )}
            />
            {showError && (
              <p className="text-[13px] font-normal leading-[18px] text-[var(--sui-colors-danger-b)]">
                Enter a number between {product.minDays} and {product.maxDays}.
              </p>
            )}
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
                onClick={() => valid && onApply(parsed)}
                disabled={!valid}
                className={cn(
                  'inline-flex h-[36px] min-w-[60px] items-center justify-center rounded-[10px] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors',
                  valid
                    ? 'cursor-pointer bg-[var(--sui-colors-primary-b)] hover:bg-[var(--sui-colors-primary-b-high-contrast)]'
                    : 'cursor-not-allowed bg-[var(--sui-colors-neutral-b3)]',
                )}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Manage AI data custom retention period dialog — Dialog-rp2/rp6.
 * One card per product with its own retention select. Save is dirty-aware.
 * --------------------------------------------------------------------------- */
export function ManageAiFeaturesDialog({
  open, initialRetention, onCancel, onSave,
}: {
  open: boolean;
  initialRetention: AiCustomRetention;
  onCancel: () => void;
  onSave: (next: AiCustomRetention) => void;
}) {
  const [retention, setRetention] = React.useState<AiCustomRetention>(initialRetention);
  React.useEffect(() => {
    if (open) setRetention(initialRetention);
  }, [open, initialRetention]);
  if (!open) return null;
  const dirty = VISIBLE_RETENTION_PRODUCTS.some((p) => retention[p.key] !== initialRetention[p.key]);
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-16">
      <div className="absolute inset-0" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="manage-ai-retention-title"
        className="relative z-10 flex w-[880px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col gap-6 px-6 pb-8 pt-9">
          <div className="flex flex-col gap-4">
            <div className="flex items-start py-3">
              <h2
                id="manage-ai-retention-title"
                className="flex-1 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]"
              >
                Manage AI data retention
              </h2>
            </div>
            <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
              Set how long data is retained across supported AI features. This data
              is permanently deleted after the selected period.{' '}
              <a
                href="https://support.ringcentral.com/article-v2/RingCentral-data-retention-policies.html?brand=RingCentral&product=RingEX&language=en_US"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {VISIBLE_RETENTION_PRODUCTS.map((p) => (
              <div
                key={p.key}
                className="flex flex-col gap-1 rounded-[8px] border border-[var(--sui-colors-neutral-b4)] p-4"
              >
                <div className="flex min-h-[32px] w-full items-center gap-4">
                  <p className="flex-1 text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    {p.title}
                  </p>
                  <RetentionPeriodSelect
                    productKey={p.key}
                    value={retention[p.key]}
                    onChange={(days) => setRetention((r) => ({ ...r, [p.key]: days }))}
                  />
                </div>
                <div className="flex w-full items-center pr-[216px]">
                  <p className="flex-1 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
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
                onClick={() => onSave(retention)}
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
 * Retention change confirm dialog — Figma 2030-40238. Shown only when a new
 * period is shorter than the current one (data-loss risk).
 * --------------------------------------------------------------------------- */
export function RetentionInfoSnackbar({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-[48px] w-full items-center gap-2 rounded-[10px] border border-[var(--sui-colors-neutral-b2)] bg-[var(--sui-colors-neutral-b4)]/50 px-4 py-2 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] backdrop-blur-[10px]">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[var(--sui-colors-neutral-b0)]">
        <InfoMd width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
      </span>
      <p className="flex-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)]">
        {children}
      </p>
    </div>
  );
}

export function RetentionConfirmDialog({
  open, onCancel, onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  const title = 'Shorten retention period?';
  const confirmLabel = 'Acknowledge and confirm';
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
            <RetentionInfoSnackbar>
              Data older than the new retention period will be permanently deleted during the next daily cleanup. Deleted data can’t be recovered. Are you sure you want to shorten the retention period?
            </RetentionInfoSnackbar>
          </div>
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
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
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
