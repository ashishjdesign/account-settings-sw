import React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

const SpringSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      'peer inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer items-center rounded-full transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b-high-contrast)] focus-visible:ring-offset-2',
      'data-[state=checked]:bg-[var(--sui-colors-primary-b)] data-[state=unchecked]:bg-[var(--sui-colors-neutral-b3)]',
      className,
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb className="pointer-events-none block h-[20px] w-[20px] rounded-full bg-white shadow-sm transition-transform data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-[2px]" />
  </SwitchPrimitives.Root>
));
SpringSwitch.displayName = 'SpringSwitch';

const Icon = ({ name, className }: { name: string; className?: string }) => (
  <img
    src={`/__mockup/figma-ref/icons/${name}.svg`}
    alt=""
    aria-hidden="true"
    className={className ?? 'block h-5 w-5 shrink-0'}
  />
);

function SpringRadio({ checked, onChange, label, disabled }: {
  checked: boolean; onChange: () => void; label: string; disabled?: boolean;
}) {
  return (
    <label className={cn(
      'flex items-center gap-2',
      disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    )}>
      <button
        type="button"
        onClick={onChange}
        aria-pressed={checked}
        disabled={disabled}
        className={cn(
          'relative flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[1.2px] bg-white',
          checked
            ? 'border-[var(--sui-colors-primary-b)]'
            : 'border-[var(--sui-colors-neutral-b2)]',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-[var(--sui-colors-neutral-b1)]',
        )}
      >
        {checked && (
          <span className="absolute inset-[3px] rounded-full bg-[var(--sui-colors-primary-b)]" />
        )}
      </button>
      <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)]">
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
      className={cn(
        'flex h-[20px] w-[20px] shrink-0 cursor-pointer items-center justify-center rounded-[4px]',
        checked
          ? 'bg-[var(--sui-colors-primary-b)] p-[4px]'
          : 'border-[1.2px] border-[var(--sui-colors-neutral-b2)] bg-white',
      )}
    >
      {checked && (
        <svg viewBox="0 0 12 12" className="h-[12px] w-[12px] text-white" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M1.5 6l3 3 6-6.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

/* Lightweight Spring-style select used in the Manage modal. */
function SpringSelect({
  value, options, width = 112, onChange, disabled, tooltip,
}: { value: string; options: string[]; width?: number; onChange?: (v: string) => void; disabled?: boolean; tooltip?: string }) {
  return (
    <div className="group relative inline-flex shrink-0" style={{ width }}>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-[32px] w-full appearance-none rounded-[10px] border border-black/20 bg-white pl-2.5 pr-7 text-left text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b0)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 disabled:cursor-not-allowed disabled:bg-[var(--sui-colors-neutral-b5)] disabled:text-[var(--sui-colors-neutral-b2)] enabled:cursor-pointer"
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
      {disabled && tooltip && (
        <div
          role="tooltip"
          className="pointer-events-none absolute bottom-[calc(100%+8px)] right-0 z-50 hidden w-[260px] rounded-md bg-[var(--sui-colors-neutral-b1)] px-3 py-2 text-[12px] font-normal leading-[16px] text-white shadow-md group-hover:block group-focus-within:block"
        >
          {tooltip}
          <span
            aria-hidden="true"
            className="absolute right-4 top-full h-0 w-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-[var(--sui-colors-neutral-b1)]"
          />
        </div>
      )}
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
            <h3 className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
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

        <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
        <div className="flex justify-end gap-2 px-6 pt-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm?.({ defaultValue, allowChange })}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
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
  open, onBack, onSkip, onSave, initialExpanded = false, requireSave = false,
}: {
  open: boolean;
  onBack?: () => void;
  onSkip?: () => void;
  onSave?: () => void;
  initialExpanded?: boolean;
  /* When true (e.g. admin chose "Default: On" in the prior dialog), the
   * Skip button is hidden — feature settings are mandatory before the
   * feature can be turned on for users. */
  requireSave?: boolean;
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
            <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
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
        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-[var(--sui-colors-neutral-b4)]/50 bg-white px-6 pt-5 pb-5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Back
          </button>
          <div className="flex items-center gap-2">
            {!requireSave && (
              <button
                type="button"
                onClick={onSkip}
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
              >
                Skip and Continue
              </button>
            )}
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
              <h3 className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
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
                  {customCount === 0 && (
                    <div className="flex h-[32px] items-center rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3">
                      <p className="whitespace-nowrap text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                        <button type="button" className="cursor-pointer text-[var(--sui-colors-primary-b)] underline">
                          {defaultCount}/{total} users
                        </button>{' '}
                        are using the default
                      </p>
                    </div>
                  )}
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
        <div className="flex justify-end gap-2 px-6 pt-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm?.({ defaultValue, allowChange, customAction })}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
          >
            Turn on
          </button>
        </div>
      </div>
    </div>
  );
}

/* Manage modal for "Auto-answer calls" — Figma node 1993:29733. Mirrors
 * `ExtAppManageDialog` user-deployment block exactly (cross-feature
 * consistency is the #1 priority); Feature settings hosts a single
 * "Auto-answer delay" select. */
const AUTO_ANSWER_DELAY_OPTIONS = [
  'Immediately',
  '5 seconds',
  '10 seconds',
  '15 seconds',
  '20 seconds',
  '25 seconds',
] as const;
type AutoAnswerDelay = (typeof AUTO_ANSWER_DELAY_OPTIONS)[number];

export function AutoAnswerManageDialog({
  open,
  defaultVal = 'Off',
  allowChange = true,
  delay = 'Immediately',
  customCount = 0,
  totalUsers = 98,
  onCancel,
  onSave,
}: {
  open: boolean;
  defaultVal?: 'On' | 'Off';
  allowChange?: boolean;
  delay?: AutoAnswerDelay;
  customCount?: number;
  totalUsers?: number;
  onCancel?: () => void;
  onSave?: (result: { defaultVal: 'On' | 'Off'; allowChange: boolean; delay: AutoAnswerDelay }) => void;
}) {
  const [value, setValue] = React.useState<'On' | 'Off'>(defaultVal);
  const [allow, setAllow] = React.useState(allowChange);
  const [del, setDel] = React.useState<AutoAnswerDelay>(delay);
  React.useEffect(() => {
    if (open) {
      setValue(defaultVal);
      setAllow(allowChange);
      setDel(delay);
    }
  }, [open, defaultVal, allowChange, delay]);
  const total = totalUsers;
  const defaultCount = Math.max(0, total - (customCount || 0));
  const dirty = value !== defaultVal || allow !== allowChange || del !== delay;

  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-[60px]">
      <div
        className="flex max-h-full min-h-0 w-[800px] max-w-[calc(100%-32px)] flex-col overflow-hidden rounded-[12px] bg-white"
        style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)' }}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 pb-8 pt-6">
          <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b1)]">
            Manage Auto-answer calls
          </h2>

          {/* User deployment */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
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
                  <SpringCheckbox checked={allow} onChange={setAllow} />
                  <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    Allow users to change this setting
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Feature settings */}
          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
              Feature settings
            </span>
            <div className="flex flex-col gap-4 rounded-[10px] border border-[var(--sui-colors-neutral-b4)] p-4">
              <div className="flex items-start justify-between gap-8">
                <div className="flex min-w-0 flex-col gap-1 pr-6">
                  <span className="flex h-[32px] items-center text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    Auto-answer delay
                  </span>
                  <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                    Select how long users’ incoming calls will ring before being auto-answered.
                    This setting won’t apply while users are on an active call.
                  </p>
                </div>
                <SpringSelect
                  value={del}
                  width={200}
                  options={AUTO_ANSWER_DELAY_OPTIONS as unknown as string[]}
                  onChange={(v) => setDel(v as AutoAnswerDelay)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
        <div className="flex shrink-0 items-center justify-end gap-2 bg-white px-6 pt-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave?.({ defaultVal: value, allowChange: allow, delay: del })}
            disabled={!dirty}
            className={`inline-flex h-[36px] min-w-[60px] items-center justify-center rounded-[10px] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors ${
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
  const [confirmOff, setConfirmOff] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      setValue(defaultVal);
      setAllow(allowChange);
      setUrl(launchUrl);
      setTrig(trigger);
      setExpanded(false);
      setConfirmOff(false);
    }
  }, [open, defaultVal, allowChange, launchUrl, trigger]);
  const total = totalUsers;
  const defaultCount = Math.max(0, total - (customCount || 0));
  const urlEmpty = url.trim().length === 0;
  const dirty =
    value !== defaultVal ||
    allow !== allowChange ||
    url.trim() !== launchUrl.trim() ||
    trig !== trigger;
  const commit = (override?: { defaultVal?: 'On' | 'Off' }) =>
    onSave?.({
      defaultVal: override?.defaultVal ?? value,
      allowChange: allow,
      launchUrl: url.trim(),
      trigger: trig,
    });
  const handleSave = () => {
    // If the user is saving with an empty URL while the default is still On,
    // confirm before turning the default off (Figma node 1991:28574). We do
    // not auto-flip the radios when the URL is cleared.
    if (urlEmpty && value === 'On') {
      setConfirmOff(true);
      return;
    }
    commit();
  };

  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-[60px]">
      <div
        className="flex max-h-full min-h-0 w-[800px] max-w-[calc(100%-32px)] flex-col overflow-hidden rounded-[12px] bg-white"
        style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)' }}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 pb-8 pt-6">
          <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b1)]">
            Manage Launch an external app for incoming calls
          </h2>

          {/* User deployment */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
              User deployment
            </h3>

            <div className="flex flex-col gap-4 rounded-[10px] border border-[#9E9FA4]/35 bg-white p-4">
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex h-[32px] items-center gap-4 pr-4">
                  <span className="text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    Default in user settings:
                  </span>
                  <div className="group relative flex items-center gap-5">
                    <SpringRadio
                      checked={value === 'On'}
                      onChange={() => setValue('On')}
                      label="On"
                      disabled={urlEmpty && value === 'Off'}
                    />
                    <SpringRadio
                      checked={value === 'Off'}
                      onChange={() => setValue('Off')}
                      label="Off"
                      disabled={urlEmpty && value === 'Off'}
                    />
                    {urlEmpty && value === 'Off' && (
                      <div
                        role="tooltip"
                        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-0 z-50 hidden w-[260px] rounded-md bg-[var(--sui-colors-neutral-b1)] px-3 py-2 text-[12px] font-normal leading-[16px] text-white shadow-md group-hover:block group-focus-within:block"
                      >
                        To set this setting for new users as ON, set up external app or website URL first.
                        <span
                          aria-hidden="true"
                          className="absolute left-4 top-full h-0 w-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-[var(--sui-colors-neutral-b1)]"
                        />
                      </div>
                    )}
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
                  <SpringCheckbox checked={allow} onChange={setAllow} />
                  <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    Allow users to change this setting
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Feature settings */}
          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
              Feature settings
            </span>
            <div className="flex flex-col gap-4 rounded-[10px] border border-[var(--sui-colors-neutral-b4)] p-4">
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

        <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
        <div className="flex shrink-0 items-center justify-end gap-2 bg-white px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!dirty}
            className={`inline-flex h-[36px] min-w-[60px] items-center justify-center rounded-[10px] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors ${
              dirty
                ? 'cursor-pointer bg-[var(--sui-colors-primary-b)] hover:bg-[var(--sui-colors-primary-b-high-contrast)]'
                : 'cursor-not-allowed bg-[var(--sui-colors-neutral-b3)]'
            }`}
          >
            Save
          </button>
        </div>
      </div>

      {confirmOff && (
        <div className="absolute inset-0 z-[60] flex items-start justify-center pt-24">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setConfirmOff(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 flex w-[600px] max-w-[calc(100%-32px)] flex-col rounded-[12px] bg-white"
            style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.18)' }}
          >
            <div className="flex flex-col gap-8 px-6 pb-10 pt-6">
              <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b1)]">
                Turn off default for users?
              </h2>
              <div className="flex flex-col gap-3 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                <p>
                  <strong>Launch an external app for incoming calls</strong> doesn’t have a URL.
                </p>
                <p>
                  The default for users can’t stay on without a URL and will be turned{' '}
                  <strong>off</strong>.
                </p>
              </div>
            </div>
            <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
            <div className="flex justify-end gap-2 px-6 pt-5 pb-5">
              <button
                type="button"
                onClick={() => setConfirmOff(false)}
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmOff(false);
                  commit({ defaultVal: 'Off' });
                }}
                className="inline-flex h-[36px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
              >
                Turn off default &amp; save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Auto-answer calls — Turn off confirmation (standard user-level pattern).
 * Mirrors `SpringConfirmDialog` used by ConceptGuidesDisable for cross-feature
 * consistency. Same 600px width, header copy, and footer treatment.
 * --------------------------------------------------------------------------- */
export function AutoAnswerDisableDialog({
  open, onCancel, onConfirm,
}: {
  open: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-24">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex w-[600px] max-w-[calc(100%-32px)] flex-col rounded-[12px] bg-white"
        style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)' }}
      >
        <div className="flex flex-col gap-8 px-6 pb-10 pt-6">
          <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b1)]">
            Turn off Auto-answer calls for your organization?
          </h2>
          <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            This feature will be turned off for your account and no longer available to users.
            <br />
            When turned back on, previous user settings can be restored.
          </p>
        </div>
        <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
        <div className="flex justify-end gap-2 px-6 pt-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
          >
            Turn off
          </button>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Auto-answer calls — Turn back on dialog. Mirrors `SpringReEnableDialog`
 * (custom-users question) AND adds the Feature settings (Auto-answer delay)
 * section right inside, identical styling to `AutoAnswerManageDialog`.
 * --------------------------------------------------------------------------- */
export function AutoAnswerReEnableDialog({
  open,
  delay = 'Immediately',
  customCount = 0,
  totalUsers = 98,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  delay?: AutoAnswerDelay;
  customCount?: number;
  totalUsers?: number;
  onCancel?: () => void;
  onConfirm?: (result: {
    defaultValue: 'On' | 'Off';
    allowChange: boolean;
    customAction: 'reset' | 'restore';
    delay: AutoAnswerDelay;
  }) => void;
}) {
  const [defaultValue, setDefaultValue] = React.useState<'On' | 'Off'>('Off');
  const [allowChange, setAllowChange] = React.useState(true);
  const [customAction, setCustomAction] = React.useState<'reset' | 'restore'>('reset');
  const [del, setDel] = React.useState<AutoAnswerDelay>(delay);
  React.useEffect(() => {
    if (open) setDel(delay);
  }, [open, delay]);
  const total = totalUsers;
  const defaultCount = Math.max(0, total - (customCount || 0));

  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-[60px]">
      <div className="absolute inset-0" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex max-h-full min-h-0 w-[820px] max-w-[calc(100%-32px)] flex-col overflow-hidden rounded-[10px] bg-white"
        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 pb-8 pt-9">
          <div className="py-3">
            <h2 className="text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
              Turn on Auto-answer calls?
            </h2>
          </div>

          <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            This feature will be enabled for your account. Configure how it should be deployed to users below.
          </p>

          {/* User deployment — IDENTICAL to AutoAnswerManageDialog / SpringReEnableDialog */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
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
                {customCount === 0 && (
                  <div className="flex h-[32px] items-center rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3">
                    <p className="whitespace-nowrap text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      <button type="button" className="cursor-pointer text-[var(--sui-colors-primary-b)] underline">
                        {defaultCount}/{total} users
                      </button>{' '}
                      are using the default
                    </p>
                  </div>
                )}
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

          {/* Feature settings — Auto-answer delay (mirrors AutoAnswerManageDialog) */}
          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
              Feature settings
            </span>
            <div className="flex flex-col gap-4 rounded-[10px] border border-[var(--sui-colors-neutral-b4)] p-4">
              <div className="flex items-start justify-between gap-8">
                <div className="flex min-w-0 flex-col gap-1 pr-6">
                  <span className="flex h-[32px] items-center text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    Auto-answer delay
                  </span>
                  <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                    Select how long users’ incoming calls will ring before being auto-answered.
                    This setting won’t apply while users are on an active call.
                  </p>
                </div>
                <SpringSelect
                  value={del}
                  width={200}
                  options={AUTO_ANSWER_DELAY_OPTIONS as unknown as string[]}
                  onChange={(v) => setDel(v as AutoAnswerDelay)}
                />
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

        <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
        <div className="flex shrink-0 items-center justify-end gap-2 bg-white px-6 pt-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm?.({ defaultValue, allowChange, customAction, delay: del })}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
          >
            Turn on
          </button>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Conference calls — Turn off confirmation. Mirrors AutoAnswerDisableDialog
 * (cross-feature consistency is the #1 priority); only the title differs.
 * --------------------------------------------------------------------------- */
export function ConferenceDisableDialog({
  open, onCancel, onConfirm,
}: {
  open: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-24">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex w-[600px] max-w-[calc(100%-32px)] flex-col rounded-[12px] bg-white"
        style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)' }}
      >
        <div className="flex flex-col gap-8 px-6 pb-10 pt-6">
          <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b1)]">
            Turn off Conference calls for your organization?
          </h2>
          <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            This feature will be turned off for your account and no longer available to users.
            <br />
            When turned back on, previous user settings can be restored.
          </p>
        </div>
        <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
        <div className="flex justify-end gap-2 px-6 pt-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
          >
            Turn off
          </button>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Conference calls — Manage modal. Mirrors AutoAnswerManageDialog's User
 * deployment block exactly (cross-feature consistency is the #1 priority).
 * No Feature settings section — Conference calls has no extra controls.
 * --------------------------------------------------------------------------- */
export function ConferenceManageDialog({
  open,
  defaultVal = 'On',
  allowChange = true,
  customCount = 0,
  totalUsers = 98,
  onCancel,
  onSave,
}: {
  open: boolean;
  defaultVal?: 'On' | 'Off';
  allowChange?: boolean;
  customCount?: number;
  totalUsers?: number;
  onCancel?: () => void;
  onSave?: (result: { defaultVal: 'On' | 'Off'; allowChange: boolean }) => void;
}) {
  const [value, setValue] = React.useState<'On' | 'Off'>(defaultVal);
  const [allow, setAllow] = React.useState(allowChange);
  React.useEffect(() => {
    if (open) {
      setValue(defaultVal);
      setAllow(allowChange);
    }
  }, [open, defaultVal, allowChange]);
  const total = totalUsers;
  const defaultCount = Math.max(0, total - (customCount || 0));
  const dirty = value !== defaultVal || allow !== allowChange;

  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-[60px]">
      <div
        className="flex max-h-full min-h-0 w-[800px] max-w-[calc(100%-32px)] flex-col overflow-hidden rounded-[12px] bg-white"
        style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)' }}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 pb-8 pt-6">
          <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b1)]">
            Manage Conference calls
          </h2>

          {/* User deployment — IDENTICAL to AutoAnswerManageDialog */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
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
                  <SpringCheckbox checked={allow} onChange={setAllow} />
                  <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    Allow users to change this setting
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
        <div className="flex shrink-0 items-center justify-end gap-2 bg-white px-6 pt-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave?.({ defaultVal: value, allowChange: allow })}
            disabled={!dirty}
            className="inline-flex h-[36px] min-w-[60px] items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)] disabled:cursor-not-allowed disabled:bg-[var(--sui-colors-neutral-b3)] disabled:hover:bg-[var(--sui-colors-neutral-b3)] enabled:cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Conference calls — Turn back on dialog. Mirrors AutoAnswerReEnableDialog
 * but without the Feature settings (delay) section. User deployment block is
 * IDENTICAL to ConferenceManageDialog and the other Manage dialogs.
 * --------------------------------------------------------------------------- */
export function ConferenceReEnableDialog({
  open,
  customCount = 0,
  totalUsers = 98,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  customCount?: number;
  totalUsers?: number;
  onCancel?: () => void;
  onConfirm?: (result: {
    defaultValue: 'On' | 'Off';
    allowChange: boolean;
    customAction: 'reset' | 'restore';
  }) => void;
}) {
  const [defaultValue, setDefaultValue] = React.useState<'On' | 'Off'>('Off');
  const [allowChange, setAllowChange] = React.useState(true);
  const [customAction, setCustomAction] = React.useState<'reset' | 'restore'>('reset');
  const total = totalUsers;
  const defaultCount = Math.max(0, total - (customCount || 0));

  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-[60px]">
      <div className="absolute inset-0" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex max-h-full min-h-0 w-[820px] max-w-[calc(100%-32px)] flex-col overflow-hidden rounded-[10px] bg-white"
        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 pb-8 pt-9">
          <div className="py-3">
            <h2 className="text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
              Turn on Conference calls?
            </h2>
          </div>

          <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            This feature will be enabled for your account. Configure how it should be deployed to users below.
          </p>

          {/* User deployment — IDENTICAL to ConferenceManageDialog */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
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
                {customCount === 0 && (
                  <div className="flex h-[32px] items-center rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3">
                    <p className="whitespace-nowrap text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      <button type="button" className="cursor-pointer text-[var(--sui-colors-primary-b)] underline">
                        {defaultCount}/{total} users
                      </button>{' '}
                      are using the default
                    </p>
                  </div>
                )}
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

        <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
        <div className="flex shrink-0 items-center justify-end gap-2 bg-white px-6 pt-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm?.({ defaultValue, allowChange, customAction })}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
          >
            Turn on
          </button>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * ExtAppEnableCombinedDialog — Single combined first-enable / re-enable dialog
 * for "Launch an external app for incoming calls". Mirrors the production
 * component in admin-portal/src/components/shared.tsx (Figma node 2013:40428).
 *
 * Mockup-sandbox version uses an absolute overlay so it renders inside the
 * iframe instead of the page-level fixed overlay used in production.
 * --------------------------------------------------------------------------- */
export function ExtAppEnableCombinedDialog({
  open,
  initialUrl = '',
  initialTrigger = 'A call begins to ring',
  initialExpanded = false,
  customCount = 0,
  totalUsers = 98,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  initialUrl?: string;
  initialTrigger?: 'A call begins to ring' | 'A call is answered';
  initialExpanded?: boolean;
  customCount?: number;
  totalUsers?: number;
  onCancel?: () => void;
  onConfirm?: (result: {
    defaultVal: 'On' | 'Off';
    allowChange: boolean;
    launchUrl: string;
    trigger: 'A call begins to ring' | 'A call is answered';
    customAction: 'reset' | 'restore';
  }) => void;
}) {
  const [value, setValue] = React.useState<'On' | 'Off'>('On');
  const [allow, setAllow] = React.useState(true);
  const [url, setUrl] = React.useState(initialUrl);
  const [trig, setTrig] = React.useState<'A call begins to ring' | 'A call is answered'>(initialTrigger);
  const [expanded, setExpanded] = React.useState(initialExpanded);
  const [customAction, setCustomAction] = React.useState<'reset' | 'restore'>('reset');
  React.useEffect(() => {
    if (open) {
      setValue('On');
      setAllow(true);
      setUrl(initialUrl);
      setTrig(initialTrigger);
      setExpanded(initialExpanded);
      setCustomAction('reset');
    }
  }, [open, initialUrl, initialTrigger, initialExpanded]);

  const total = totalUsers;
  const defaultCount = Math.max(0, total - (customCount || 0));
  const urlEmpty = url.trim().length === 0;
  const turnOnDisabled = value === 'On' && urlEmpty;

  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-[60px]">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Turn on Launch an external app for incoming calls for your organization"
        className="flex max-h-full min-h-0 w-[820px] max-w-[calc(100%-32px)] flex-col overflow-hidden rounded-[10px] bg-white"
        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-6 pb-10 pt-9">
          <div className="flex flex-col gap-6">
            <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
              Turn on Launch an external app for incoming calls for your organization?
            </h2>

            <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              This feature will be enabled for your account. Configure how it should be deployed to users below.
            </p>

            {/* User deployment */}
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
                  {customCount === 0 && (
                    <div className="flex h-[32px] items-center rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3">
                      <p className="whitespace-nowrap text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                        <button type="button" className="cursor-pointer text-[var(--sui-colors-primary-b)] underline">
                          {defaultCount}/{total} users
                        </button>{' '}
                        are using the default
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-[var(--sui-colors-neutral-b4)]" />

                <div className="flex h-[32px] items-center gap-4">
                  <span className="text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    User access:
                  </span>
                  <label className="flex cursor-pointer items-center gap-2">
                    <SpringCheckbox checked={allow} onChange={setAllow} />
                    <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      Allow users to change this setting
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Feature settings */}
            <div className="flex flex-col gap-2">
              <h3 className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                Feature settings
              </h3>

              <div
                className="flex min-h-[48px] items-center gap-2 rounded-[10px] border border-[var(--sui-colors-neutral-b2)] px-4 py-2"
                style={{ background: 'rgba(221,223,229,0.5)' }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-[var(--sui-colors-neutral-b1)]"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <p className="flex-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)]">
                  Launching an external app may impact the performance of RingCentral services.
                </p>
              </div>

              <div className="mt-2 flex flex-col gap-4 rounded-[10px] border border-[var(--sui-colors-neutral-b4)] p-4">
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
                  aria-expanded={expanded}
                  className="self-start cursor-pointer rounded-[4px] px-1 py-0.5 text-[12px] font-medium leading-[17px] text-[var(--sui-colors-primary-b)] hover:underline"
                >
                  {expanded ? 'Hide reference parameters' : 'Show reference parameters'}
                </button>
                {expanded && <ReferenceParametersTable />}
              </div>
            </div>

            {/* Custom users decision — only on re-enable */}
            {customCount > 0 && (
              <div className="flex flex-col gap-4">
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

        <div className="flex shrink-0 justify-end gap-2 border-t border-[var(--sui-colors-neutral-b4)]/50 bg-white px-6 pt-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
          >
            Cancel
          </button>
          <div className="group relative inline-flex">
            <button
              type="button"
              onClick={() =>
                onConfirm?.({
                  defaultVal: value,
                  allowChange: allow,
                  launchUrl: url.trim(),
                  trigger: trig,
                  customAction,
                })
              }
              disabled={turnOnDisabled}
              className={`inline-flex h-[36px] min-w-[60px] items-center justify-center rounded-[10px] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors ${
                turnOnDisabled
                  ? 'cursor-not-allowed bg-[var(--sui-colors-neutral-b3)]'
                  : 'cursor-pointer bg-[var(--sui-colors-primary-b)] hover:bg-[var(--sui-colors-primary-b-high-contrast)]'
              }`}
            >
              Turn on
            </button>
            {turnOnDisabled && (
              <div
                role="tooltip"
                className="pointer-events-none absolute bottom-[calc(100%+8px)] right-0 z-50 hidden w-[260px] rounded-md bg-[var(--sui-colors-neutral-b1)] px-3 py-2 text-[12px] font-normal leading-[16px] text-white shadow-md group-hover:block group-focus-within:block"
              >
                Set up an external app or website URL to turn this on for users.
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-full h-0 w-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-[var(--sui-colors-neutral-b1)]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
