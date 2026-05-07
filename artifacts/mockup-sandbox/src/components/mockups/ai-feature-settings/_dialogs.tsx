import React from 'react';

const Icon = ({ name, className }: { name: string; className?: string }) => (
  <img
    src={`/__mockup/figma-ref/icons/${name}.svg`}
    alt=""
    aria-hidden="true"
    className={className ?? 'block h-5 w-5 shrink-0'}
  />
);

export function SpringConfirmDialog({
  open, title, body, confirmLabel, onCancel, onConfirm,
}: {
  open: boolean;
  title: string;
  body: React.ReactNode;
  confirmLabel: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center bg-black/40 pt-[120px]">
      <div
        className="flex w-[480px] flex-col rounded-[12px] bg-white shadow-xl"
        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
      >
        <div className="flex flex-col gap-6 px-6 pb-8 pt-6">
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
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Figma node 1980:37906 — Set up feature settings for external apps or URLs */
export function ExtAppFeatureSettingsDialog({
  open, onCancel, onSkip, onSave,
}: {
  open: boolean;
  onCancel?: () => void;
  onSkip?: () => void;
  onSave?: () => void;
}) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center bg-black/40 pt-[60px]">
      <div
        className="flex w-[640px] flex-col rounded-[10px] bg-white pt-9"
        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
      >
        {/* Content */}
        <div className="flex flex-col gap-8 overflow-y-auto px-6 pb-10">
          <p className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
            Set up feature settings for external apps or URLs for incoming calls
          </p>

          {/* Snackbar */}
          <div
            className="flex min-h-[48px] items-center gap-2 rounded-[10px] border border-[var(--sui-colors-neutral-b2)] px-4 py-2"
            style={{ background: 'rgba(221,223,229,0.5)' }}
          >
            <Icon name="info" className="block h-5 w-5 shrink-0" />
            <p className="flex-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)]">
              Launching an external app may impact the performance of RingCentral services.
            </p>
          </div>

          {/* Feature settings group */}
          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
              Feature settings
            </span>

            <div className="flex flex-col gap-4 rounded-[8px] border border-[var(--sui-colors-neutral-b4)] p-4">
              <div className="flex h-[32px] items-center gap-2">
                <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  Launch
                </span>

                {/* URL input */}
                <div className="flex h-[32px] flex-1 items-center rounded-[10px] border border-black/20 bg-white px-2.5">
                  <input
                    type="text"
                    placeholder="Enter an external app or website URL"
                    className="w-full bg-transparent text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)] placeholder-[var(--sui-colors-neutral-b2)] outline-none"
                  />
                </div>

                <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  when
                </span>

                {/* Trigger select */}
                <button
                  type="button"
                  className="flex h-[32px] w-[240px] cursor-pointer items-center rounded-[10px] border border-black/20 bg-white pl-2.5 pr-1.5 text-left"
                >
                  <span className="flex-1 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b0)]">
                    A call begins to ring
                  </span>
                  <svg
                    viewBox="0 0 9.341 5.5505"
                    fill="currentColor"
                    aria-hidden="true"
                    className="ml-1 h-[6px] w-[10px] shrink-0 text-[var(--sui-colors-neutral-b1)]"
                  >
                    <path d="M4.6705 5.5505L0 0.8505L0.8505 0.000999928L4.6705 3.82L8.4905 0L9.341 0.8505L4.6705 5.5505Z" />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                className="self-start rounded-[4px] px-1 py-0.5 text-[12px] font-medium leading-[17px] text-[var(--sui-colors-primary-b)] hover:underline"
              >
                Show reference parameters
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 border-t border-[#DDDFE5]/50 px-6 pt-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--sui-colors-neutral-b4)] bg-white px-[18px] text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSkip}
              className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--sui-colors-neutral-b4)] bg-white px-[18px] text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
            >
              Skip and Continue
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled
              className="inline-flex h-[36px] min-w-[60px] cursor-not-allowed items-center justify-center rounded-[10px] bg-[var(--sui-colors-neutral-b3)] px-4 text-[15px] font-medium leading-[20px] text-white"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
