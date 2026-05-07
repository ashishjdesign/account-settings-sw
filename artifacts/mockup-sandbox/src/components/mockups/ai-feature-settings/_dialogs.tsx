import React from 'react';

const Icon = ({ name, className }: { name: string; className?: string }) => (
  <img
    src={`/__mockup/figma-ref/icons/${name}.svg`}
    alt=""
    aria-hidden="true"
    className={className ?? 'block h-5 w-5 shrink-0'}
  />
);

function SpringRadio({ checked, onChange, label }: {
  checked: boolean; onChange: () => void; label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <button
        type="button"
        onClick={onChange}
        aria-pressed={checked}
        className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[var(--sui-colors-neutral-b2)] bg-white"
      >
        {checked && (
          <span className="absolute inset-[3px] rounded-full bg-[var(--sui-colors-primary-b)]" />
        )}
      </button>
      <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
        {label}
      </span>
    </label>
  );
}

function SpringCheckbox({ checked, onChange }: {
  checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border ${
        checked
          ? 'border-[var(--sui-colors-primary-b)] bg-[var(--sui-colors-primary-b)]'
          : 'border-[var(--sui-colors-neutral-b2)] bg-white'
      }`}
    >
      {checked && (
        <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

/* First-time enablement dialog — same pattern as the Guides "Turn on"
 * dialog (User deployment section with Default + User access), but
 * without the user-count links and custom-users section since the
 * feature has never been deployed yet. The admin only picks the
 * default and whether users can change it. */
export function SpringFirstEnableDialog({
  open, title, body, onCancel, onConfirm,
}: {
  open: boolean;
  title: string;
  body?: React.ReactNode;
  onCancel?: () => void;
  onConfirm?: (result: { defaultValue: 'On' | 'Off'; allowChange: boolean }) => void;
}) {
  const [defaultValue, setDefaultValue] = React.useState<'On' | 'Off'>('On');
  const [allowChange, setAllowChange] = React.useState(true);
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-16">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
      >
        <div className="flex flex-col gap-6 px-6 pb-10 pt-9">
          <div className="py-3">
            <h2 className="text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
              {title}
            </h2>
          </div>

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
                  <SpringRadio
                    checked={defaultValue === 'On'}
                    onChange={() => setDefaultValue('On')}
                    label="On"
                  />
                  <SpringRadio
                    checked={defaultValue === 'Off'}
                    onChange={() => setDefaultValue('Off')}
                    label="Off"
                  />
                </div>
              </div>

              <div className="border-t border-[var(--sui-colors-neutral-b4)]" />

              <div className="flex h-[32px] items-center gap-4">
                <span className="text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  User access:
                </span>
                <label className="flex cursor-pointer items-center gap-2">
                  <SpringCheckbox checked={allowChange} onChange={setAllowChange} />
                  <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    Allow users to change this setting
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--sui-colors-neutral-b4)]" />
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
            onClick={() => onConfirm?.({ defaultValue, allowChange })}
            className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
          >
            Turn on
          </button>
        </div>
      </div>
    </div>
  );
}

/* Figma node 1981:38965 — Reference parameters table shown when the
 * "Show reference parameters" link is expanded. */
function ReferenceParametersTable() {
  const rowText = 'text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]';
  const codeCell = 'w-[120px] shrink-0 px-4 py-3 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]';
  const usageCell = 'flex-1 px-4 py-3';
  return (
    <div className="overflow-hidden rounded-[8px] border border-[var(--sui-colors-neutral-b4)]">
      {/* Header */}
      <div className="flex bg-[var(--sui-colors-neutral-b5)]">
        <div className="w-[120px] shrink-0 px-4 py-2 text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          Parameter
        </div>
        <div className="flex-1 px-4 py-2 text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          Usage
        </div>
      </div>

      {/* Simple rows */}
      {[
        { p: '%N', u: 'Full name' },
        { p: '%F', u: 'First name' },
        { p: '%L', u: 'Last name' },
        { p: '%D', u: 'Called number' },
      ].map((r) => (
        <div key={r.p} className="flex border-t border-[var(--sui-colors-neutral-b4)]">
          <div className={codeCell}>{r.p}</div>
          <div className={`${usageCell} ${rowText}`}>{r.u}</div>
        </div>
      ))}

      {/* %P — rich row with examples */}
      <div className="flex border-t border-[var(--sui-colors-neutral-b4)]">
        <div className={codeCell}>%P</div>
        <div className={`${usageCell} flex flex-col gap-3`}>
          <p className={rowText}>Formatted phone number: (650) 555-4092</p>
          <div className="flex flex-col gap-2">
            <p className={rowText}>Examples:</p>

            <div className="flex flex-col gap-1 pl-4">
              <p className={`${rowText} relative before:absolute before:-left-3 before:content-['•']`}>
                Launch URL
              </p>
              <div className="flex h-[32px] items-center rounded-[10px] border border-black/20 bg-white px-2.5">
                <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  http://www.mysite.com/myintegration.htm?number=%P
                </span>
              </div>
              <p className="text-[13px] font-normal leading-[18px] text-[var(--sui-colors-neutral-b2)]">
                This example launches a browser, opens a webpage, and passes the caller&apos;s phone number details.
              </p>
            </div>

            <div className="flex flex-col gap-1 pl-4">
              <p className={`${rowText} relative before:absolute before:-left-3 before:content-['•']`}>
                Launch app
              </p>
              <div className="flex h-[32px] items-center rounded-[10px] border border-black/20 bg-white px-2.5">
                <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  /myfolder/myapp &quot;%P&quot; &quot;%N&quot;
                </span>
              </div>
              <p className="text-[13px] font-normal leading-[18px] text-[var(--sui-colors-neutral-b2)]">
                This example opens an application on your computer and passes the caller&apos;s phone number and full name to the app.
              </p>
            </div>
          </div>
        </div>
      </div>

      {[
        { p: '%C', u: 'Full canonical format: +1 (650) 555-4092' },
        { p: '%E', u: 'E164 phone number: +16505554092' },
        { p: '%%', u: '%symbol' },
      ].map((r) => (
        <div key={r.p} className="flex border-t border-[var(--sui-colors-neutral-b4)]">
          <div className={codeCell}>{r.p}</div>
          <div className={`${usageCell} ${rowText}`}>{r.u}</div>
        </div>
      ))}
    </div>
  );
}

/* Figma node 1980:37906 — Set up feature settings for external apps or URLs */
export function ExtAppFeatureSettingsDialog({
  open, onCancel, onSkip, onSave, initialExpanded = false,
}: {
  open: boolean;
  onCancel?: () => void;
  onSkip?: () => void;
  onSave?: () => void;
  initialExpanded?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(initialExpanded);
  React.useEffect(() => { if (open) setExpanded(initialExpanded); }, [open, initialExpanded]);
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center bg-black/40 pt-[60px]">
      <div
        className="flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white pt-9"
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
                onClick={() => setExpanded((v) => !v)}
                className="self-start rounded-[4px] px-1 py-0.5 text-[12px] font-medium leading-[17px] text-[var(--sui-colors-primary-b)] hover:underline"
              >
                {expanded ? 'Hide reference parameters' : 'Show reference parameters'}
              </button>

              {expanded && <ReferenceParametersTable />}
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
