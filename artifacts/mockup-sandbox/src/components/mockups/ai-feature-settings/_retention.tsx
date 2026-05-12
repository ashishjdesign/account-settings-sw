import React from 'react';
import { CaretDownMd } from '@ringcentral/spring-icon';

/* -----------------------------------------------------------------------------
 * Shared "AI data custom retention period" select used in both the
 * Manage AI features modal (enabled state) and the Turn on confirm dialog.
 * Popper values per Figma 2015-39944.
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
