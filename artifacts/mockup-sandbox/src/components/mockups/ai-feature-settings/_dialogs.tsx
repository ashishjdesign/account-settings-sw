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

/* Lightweight Spring-style select used in the Manage modal. */
function SpringSelect({
  value, options, width = 112, onChange,
}: { value: string; options: string[]; width?: number; onChange?: (v: string) => void }) {
  return (
    <div className="relative inline-flex" style={{ width }}>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-[32px] w-full cursor-pointer appearance-none rounded-[10px] border border-black/20 bg-white pl-2.5 pr-7 text-left text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b0)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg
        viewBox="0 0 9.341 5.5505"
        fill="currentColor"
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 top-1/2 h-[6px] w-[10px] -translate-y-1/2 text-[var(--sui-colors-neutral-b1)]"
      >
        <path d="M4.6705 5.5505L0 0.8505L0.8505 0.000999928L4.6705 3.82L8.4905 0L9.341 0.8505L4.6705 5.5505Z" />
      </svg>
    </div>
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
  open, onBack, onSkip, onSave, initialExpanded = false,
}: {
  open: boolean;
  onBack?: () => void;
  onSkip?: () => void;
  onSave?: () => void;
  initialExpanded?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(initialExpanded);
  React.useEffect(() => { if (open) setExpanded(initialExpanded); }, [open, initialExpanded]);
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-[60px]">
      <div
        className="flex max-h-full w-[820px] max-w-[calc(100%-32px)] min-h-0 flex-col overflow-hidden rounded-[10px] bg-white pt-9"
        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
      >
        {/* Content (scrollable) */}
        <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-6 pb-10">
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

        {/* Footer (pinned) */}
        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-[#DDDFE5]/50 bg-white px-6 pt-5 pb-5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--sui-colors-neutral-b4)] bg-white px-[18px] text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Back
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

/* Re-enable confirmation — shown the second (and subsequent) time the admin
 * turns the feature back on. Includes the X/Y "users using default" link and,
 * when there are custom-user overrides, the "Reset all to default / Restore
 * their custom settings" choice. Mirrors `SpringFeatureEnableDialog` in
 * `admin-portal/src/components/shared.tsx`. */
export function SpringReEnableDialog({
  open, title, customCount = 0, totalUsers = 98, onCancel, onConfirm,
}: {
  open: boolean;
  title: string;
  customCount?: number;
  totalUsers?: number;
  onCancel?: () => void;
  onConfirm?: (result: {
    defaultValue: 'On' | 'Off';
    allowChange: boolean;
    customAction: 'reset' | 'restore';
  }) => void;
}) {
  const [defaultValue, setDefaultValue] = React.useState<'On' | 'Off'>('On');
  const [allowChange, setAllowChange] = React.useState(true);
  const [customAction, setCustomAction] = React.useState<'reset' | 'restore'>('reset');
  const total = totalUsers;
  const defaultCount = Math.max(0, total - (customCount || 0));

  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-16">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white"
        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
      >
        <div className="flex flex-col gap-8 px-6 pb-10 pt-9">
          <div className="flex flex-col gap-6">
            <div className="py-3">
              <h2 className="text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
                {title}
              </h2>
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
                      <SpringRadio checked={defaultValue === 'On'} onChange={() => setDefaultValue('On')} label="On" />
                      <SpringRadio checked={defaultValue === 'Off'} onChange={() => setDefaultValue('Off')} label="Off" />
                    </div>
                  </div>
                  <div className="flex h-[32px] items-center rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3">
                    <p className="whitespace-nowrap text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      <button type="button" className="cursor-pointer text-[var(--sui-colors-primary-b)] underline">
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
                    <SpringCheckbox checked={allowChange} onChange={setAllowChange} />
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
                  <button type="button" className="cursor-pointer text-[var(--sui-colors-primary-b)] underline">
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
            onClick={() => onConfirm?.({ defaultValue, allowChange, customAction })}
            className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
          >
            Turn on
          </button>
        </div>
      </div>
    </div>
  );
}

/* Manage modal for "Launch an external app for incoming calls" — Figma node
 * 1874:31634. Combines User deployment (Default + User access as separate
 * cards with an inline On/Off select) and Feature settings (Launch URL +
 * trigger + Show/Hide reference parameters). Mirrors `ExtAppManageDialog` in
 * `admin-portal/src/components/shared.tsx`. */
export function ExtAppManageDialog({
  open,
  defaultVal = 'On',
  allowChange = true,
  launchUrl = '',
  trigger = 'A call begins to ring',
  customCount = 0,
  totalUsers = 98,
  onCancel,
  onSave,
}: {
  open: boolean;
  defaultVal?: 'On' | 'Off';
  allowChange?: boolean;
  launchUrl?: string;
  trigger?: 'A call begins to ring' | 'A call is answered';
  customCount?: number;
  totalUsers?: number;
  onCancel?: () => void;
  onSave?: (result: {
    defaultVal: 'On' | 'Off';
    allowChange: boolean;
    launchUrl: string;
    trigger: 'A call begins to ring' | 'A call is answered';
  }) => void;
}) {
  const [value, setValue] = React.useState<'On' | 'Off'>(defaultVal);
  const [allow, setAllow] = React.useState(allowChange);
  const [url, setUrl] = React.useState(launchUrl);
  const [trig, setTrig] = React.useState<'A call begins to ring' | 'A call is answered'>(trigger);
  const [expanded, setExpanded] = React.useState(false);
  const total = totalUsers;
  const defaultCount = Math.max(0, total - (customCount || 0));
  const dirty =
    value !== defaultVal ||
    allow !== allowChange ||
    url.trim() !== launchUrl.trim() ||
    trig !== trigger;

  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-[60px]">
      <div
        className="flex max-h-full min-h-0 w-[820px] max-w-[calc(100%-32px)] flex-col overflow-hidden rounded-[10px] bg-white pt-9"
        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 pb-10">
          <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
            Manage Launch an external app for incoming calls
          </h2>

          {/* User deployment */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
              User deployment
            </h3>

            {/* Default in user settings card */}
            <div className="flex min-h-[64px] items-center justify-between rounded-[10px] border border-[#9E9FA4]/35 bg-white px-3 py-4">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  Default in user settings
                </span>
                <div className="flex items-center border-l border-[var(--sui-colors-neutral-b4)] pl-2">
                  <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                    <button type="button" className="cursor-pointer text-[var(--sui-colors-primary-b)] underline">
                      {defaultCount}/{total} users
                    </button>{' '}
                    are using the default
                  </p>
                </div>
              </div>
              <SpringSelect
                value={value}
                width={112}
                options={['On', 'Off']}
                onChange={(v) => setValue(v as 'On' | 'Off')}
              />
            </div>

            {/* User access card */}
            <div className="flex min-h-[64px] items-center justify-between rounded-[10px] border border-[#9E9FA4]/35 bg-white px-3 py-4">
              <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                User access
              </span>
              <label className="flex cursor-pointer items-center gap-2">
                <SpringCheckbox checked={allow} onChange={setAllow} />
                <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  Allow users to change this setting
                </span>
              </label>
            </div>
          </div>

          {/* Feature settings */}
          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
              Feature settings
            </span>
            <div className="flex flex-col gap-4 rounded-[8px] border border-[var(--sui-colors-neutral-b4)] p-4">
              <div className="flex h-[32px] items-center gap-2">
                <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  Launch
                </span>
                <div className="flex h-[32px] flex-1 items-center rounded-[10px] border border-black/20 bg-white px-2.5">
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
                className="self-start rounded-[4px] px-1 py-0.5 text-[12px] font-medium leading-[17px] text-[var(--sui-colors-primary-b)] hover:underline"
              >
                {expanded ? 'Hide reference parameters' : 'Show reference parameters'}
              </button>
              {expanded && <ReferenceParametersTable />}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#DDDFE5]/50 bg-white px-6 pt-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--sui-colors-neutral-b4)] bg-white px-[18px] text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave?.({ defaultVal: value, allowChange: allow, launchUrl: url.trim(), trigger: trig })}
            disabled={!dirty}
            className={`inline-flex h-[36px] min-w-[60px] items-center justify-center rounded-[10px] px-[18px] text-[14px] font-medium leading-[20px] text-white transition-colors ${
              dirty
                ? 'cursor-pointer bg-[var(--sui-colors-primary-b)] hover:bg-[var(--sui-colors-primary-b-high-contrast)]'
                : 'cursor-not-allowed bg-[var(--sui-colors-neutral-b3)]'
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
