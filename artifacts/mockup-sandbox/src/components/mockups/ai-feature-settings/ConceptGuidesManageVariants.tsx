import React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

/* Spring caret-down (CaretDownMD) */
function SpringCaretDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 9.341 5.5505"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
      className={cn('h-[6px] w-[10px] shrink-0', className)}
    >
      <path d="M4.6705 5.5505L0 0.8505L0.8505 0.000999928L4.6705 3.82L8.4905 0L9.341 0.8505L4.6705 5.5505Z" />
    </svg>
  );
}

const scopedTokens = `
  .spring-scope {
    --sui-colors-primary-b: #066fac;
    --sui-colors-primary-b-high-contrast: #184d74;
    --sui-colors-neutral-b0: #000000;
    --sui-colors-neutral-b1: #323439;
    --sui-colors-neutral-b2: #72757a;
    --sui-colors-neutral-b3: #9e9fa4;
    --sui-colors-neutral-b4: #dddfe5;
    font-family: Inter, system-ui, sans-serif;
    color: var(--sui-colors-neutral-b1);
  }
`;

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

function InlineSelect({
  value, options, onChange, width = 76,
}: { value: string; options: string[]; onChange: (v: string) => void; width?: number }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function h(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  return (
    <div className="relative inline-block align-middle" style={{ width }} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-[28px] w-full cursor-pointer items-center justify-between gap-2 rounded-[8px] border border-black/20 bg-white px-2 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)] hover:border-black/40"
      >
        <span className="truncate">{value}</span>
        <SpringCaretDown className="text-[var(--sui-colors-neutral-b1)]" />
      </button>
      {open && (
        <ul className="absolute left-0 right-0 top-[32px] z-20 min-w-full overflow-hidden rounded-[4px] bg-white py-1 shadow-[0_2px_4px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className={cn(
                  'flex h-[32px] w-full cursor-pointer items-center justify-between gap-2 px-3 text-left text-[14px] font-normal leading-[20px] transition-colors',
                  opt === value
                    ? 'bg-[var(--sui-colors-primary-b)]/10 text-[var(--sui-colors-primary-b)]'
                    : 'text-[var(--sui-colors-neutral-b1)] hover:bg-[var(--sui-colors-neutral-b4)]/50',
                )}
              >
                <span>{opt}</span>
                {opt === value && (
                  <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7.5l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SpringCheckbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'mt-[2px] flex h-[16px] w-[16px] shrink-0 cursor-pointer items-center justify-center rounded-[3px] border transition-colors',
        checked
          ? 'border-[var(--sui-colors-primary-b)] bg-[var(--sui-colors-primary-b)]'
          : 'border-[var(--sui-colors-neutral-b3)] bg-white hover:border-[var(--sui-colors-neutral-b2)]',
      )}
    >
      {checked && (
        <svg viewBox="0 0 14 14" width="11" height="11" fill="none" stroke="white" strokeWidth="2.5">
          <path d="M3 7.5l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

/* -----------------------------------------------------------------------------
 * Shared frame
 * --------------------------------------------------------------------------- */
function VariantFrame({
  caption, children,
}: { caption: string; children: React.ReactNode }) {
  return (
    <div className="spring-scope relative flex min-h-[960px] w-full items-center justify-center bg-[#F4F5F7] p-6">
      <style>{scopedTokens}</style>
      <div className="flex w-full max-w-[680px] flex-col gap-3">
        <p className="text-[12px] font-semibold uppercase leading-[16px] tracking-[0.4px] text-[var(--sui-colors-neutral-b2)]">
          {caption}
        </p>
        <div className="flex w-full flex-col rounded-[12px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col gap-5 px-6 pb-6 pt-6">
            <h2 className="text-[20px] font-normal leading-[28px] text-[var(--sui-colors-neutral-b1)]">
              Manage Guides, tutorials &amp; announcements
            </h2>
            {children}
          </div>
          <div className="border-t border-[#DDDFE5]/50" />
          <div className="flex justify-end gap-2 px-6 py-4">
            <button
              type="button"
              className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-3 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex h-[32px] min-w-[64px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * V4 — Default state + explicit reset action for existing custom users
 * --------------------------------------------------------------------------- */
export function ConceptGuidesManageV4() {
  const [defaultValue, setDefaultValue] = React.useState<'On' | 'Off'>('On');
  const [resetCustom, setResetCustom] = React.useState(false);
  const [allowChange, setAllowChange] = React.useState(true);
  return (
    <VariantFrame caption="V4 — Default + reset existing">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              Default for all users
            </span>
            <span className="text-[13px] font-normal leading-[18px] text-[var(--sui-colors-neutral-b2)]">
              Applies to anyone who hasn't customized this setting.
            </span>
          </div>
          <InlineSelect
            value={defaultValue}
            options={['On', 'Off']}
            onChange={(v) => setDefaultValue(v as 'On' | 'Off')}
          />
        </div>

        <div className="border-t border-[var(--sui-colors-neutral-b4)]/70" />

        <label className="flex cursor-pointer items-start gap-3">
          <SpringCheckbox checked={resetCustom} onChange={setResetCustom} />
          <span className="flex flex-col">
            <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              Also reset 26 users with custom settings
            </span>
            <span className="text-[13px] font-normal leading-[18px] text-[var(--sui-colors-neutral-b2)]">
              Their individual overrides will be cleared and replaced with the default.
            </span>
          </span>
        </label>

        <div className="border-t border-[var(--sui-colors-neutral-b4)]/70" />

        <div className="flex items-center justify-between gap-4">
          <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            Let users change this themselves
          </span>
          <SpringSwitch checked={allowChange} onCheckedChange={setAllowChange} />
        </div>
      </div>
    </VariantFrame>
  );
}

/* -----------------------------------------------------------------------------
 * V5 — Scoped inline sentence (default state + apply-to scope picker)
 * --------------------------------------------------------------------------- */
type V5Scope = 'All users (replaces customizations)' | 'Users without customizations' | 'Only new users going forward';
export function ConceptGuidesManageV5() {
  const [defaultValue, setDefaultValue] = React.useState<'On' | 'Off'>('On');
  const [scope, setScope] = React.useState<V5Scope>('Users without customizations');
  const [allowChange, setAllowChange] = React.useState(true);
  const scopeNote: Record<V5Scope, string> = {
    'All users (replaces customizations)': 'Will overwrite the 26 users with custom settings.',
    'Users without customizations':         '26 users with custom settings keep their overrides.',
    'Only new users going forward':         'All 98 existing users keep their current settings.',
  };
  return (
    <VariantFrame caption="V5 — Scoped sentence">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-[15px] leading-[28px] text-[var(--sui-colors-neutral-b1)]">
          <span>Set this to</span>
          <InlineSelect
            value={defaultValue}
            options={['On', 'Off']}
            onChange={(v) => setDefaultValue(v as 'On' | 'Off')}
          />
          <span>for</span>
          <InlineSelect
            value={scope}
            options={[
              'All users (replaces customizations)',
              'Users without customizations',
              'Only new users going forward',
            ]}
            onChange={(v) => setScope(v as V5Scope)}
            width={300}
          />
          <span>.</span>
        </div>
        <p className="text-[13px] font-normal leading-[18px] text-[var(--sui-colors-neutral-b2)]">
          {scopeNote[scope]}
        </p>
        <div className="border-t border-[var(--sui-colors-neutral-b4)]/70" />
        <label className="flex cursor-pointer items-center gap-2">
          <SpringCheckbox checked={allowChange} onChange={setAllowChange} />
          <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            Let users change this themselves going forward
          </span>
        </label>
      </div>
    </VariantFrame>
  );
}

/* -----------------------------------------------------------------------------
 * V6 — Status snapshot + change/reset actions
 * --------------------------------------------------------------------------- */
export function ConceptGuidesManageV6() {
  const [defaultValue, setDefaultValue] = React.useState<'On' | 'Off'>('On');
  const [resetCustom, setResetCustom] = React.useState(false);
  const [allowChange, setAllowChange] = React.useState(true);
  return (
    <VariantFrame caption="V6 — Status snapshot">
      <div className="flex flex-col gap-4">
        {/* Distribution snapshot */}
        <div className="flex flex-col gap-2 rounded-[10px] bg-[var(--sui-colors-primary-b)]/[0.04] p-4">
          <p className="text-[13px] font-semibold uppercase leading-[16px] tracking-[0.4px] text-[var(--sui-colors-neutral-b2)]">
            Current state
          </p>
          <div className="flex h-[8px] w-full overflow-hidden rounded-full bg-[var(--sui-colors-neutral-b4)]">
            <div className="h-full bg-[var(--sui-colors-primary-b)]" style={{ width: '73.5%' }} />
            <div className="h-full bg-[var(--sui-colors-primary-b)]/40" style={{ width: '26.5%' }} />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] leading-[18px] text-[var(--sui-colors-neutral-b1)]">
            <span className="flex items-center gap-1.5">
              <span className="h-[8px] w-[8px] rounded-full bg-[var(--sui-colors-primary-b)]" />
              <span><span className="font-semibold">72</span> on default (On)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-[8px] w-[8px] rounded-full bg-[var(--sui-colors-primary-b)]/40" />
              <span><span className="font-semibold">26</span> with custom settings</span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            Change default to
          </span>
          <InlineSelect
            value={defaultValue}
            options={['On', 'Off']}
            onChange={(v) => setDefaultValue(v as 'On' | 'Off')}
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <SpringCheckbox checked={resetCustom} onChange={setResetCustom} />
          <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            Also reset the 26 users with custom settings to the default
          </span>
        </label>

        <div className="border-t border-[var(--sui-colors-neutral-b4)]/70" />

        <div className="flex items-center justify-between gap-4">
          <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            Let users change this themselves
          </span>
          <SpringSwitch checked={allowChange} onCheckedChange={setAllowChange} />
        </div>
      </div>
    </VariantFrame>
  );
}
