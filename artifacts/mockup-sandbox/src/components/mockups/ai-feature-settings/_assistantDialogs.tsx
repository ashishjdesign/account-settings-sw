import React from 'react';
import { CheckMd } from '@ringcentral/spring-icon';

/* -----------------------------------------------------------------------------
 * Shared dialog primitives for the AI Assistant flows (Figma file
 * xGbu5327bj9YvYed8lxZQk):
 *   - UserDeploymentCard          — "Default in user settings" + "User access"
 *   - AssistantConfirmShell       — common dialog chrome (header / body / footer)
 *   - AssistantDisableConfirm     — "Turn off AI Assistant for your organization?"
 *   - AssistantEnableConfirm      — "Turn on AI Assistant for your organization?"
 *   - AssistantManageDialog       — "Manage AI Assistant"
 * --------------------------------------------------------------------------- */

const TOTAL_USERS = 98;

export function Radio({
  checked, onChange, label,
}: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <span className="relative flex h-[18px] w-[18px] items-center justify-center">
        <input
          type="radio"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <span
          className={[
            'absolute inset-0 rounded-full border-[1.5px] transition-colors',
            checked
              ? 'border-[var(--sui-colors-primary-b)]'
              : 'border-[var(--sui-colors-neutral-b2)]',
          ].join(' ')}
        />
        {checked && (
          <span className="relative h-[8px] w-[8px] rounded-full bg-[var(--sui-colors-primary-b)]" />
        )}
      </span>
      <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
        {label}
      </span>
    </label>
  );
}

export function Checkbox({
  checked, onChange, label,
}: { checked: boolean; onChange: (v: boolean) => void; label: React.ReactNode }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <span className="relative flex h-[20px] w-[20px] items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={[
            'absolute inset-0 flex items-center justify-center rounded-[4px] border-[1.2px] transition-colors',
            checked
              ? 'border-transparent bg-[var(--sui-colors-primary-b)]'
              : 'border-[var(--sui-colors-neutral-b2)] bg-white',
          ].join(' ')}
        >
          {checked && (
            <CheckMd width={14} height={14} fill="#ffffff" aria-hidden focusable={false} />
          )}
        </span>
      </span>
      <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
        {label}
      </span>
    </label>
  );
}

export function UserDeploymentCard({
  defaultVal, onDefaultValChange,
  allowChange, onAllowChangeChange,
  defaultUsersCount,
}: {
  defaultVal: 'On' | 'Off';
  onDefaultValChange: (v: 'On' | 'Off') => void;
  allowChange: boolean;
  onAllowChangeChange: (v: boolean) => void;
  defaultUsersCount: number;
}) {
  return (
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
              <Radio
                checked={defaultVal === 'On'}
                onChange={() => onDefaultValChange('On')}
                label="On"
              />
              <Radio
                checked={defaultVal === 'Off'}
                onChange={() => onDefaultValChange('Off')}
                label="Off"
              />
            </div>
          </div>
          <div className="flex h-[32px] items-center rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3">
            <p className="whitespace-nowrap text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              <button
                type="button"
                className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
              >
                {defaultUsersCount}/{TOTAL_USERS} users
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
          <Checkbox
            checked={allowChange}
            onChange={onAllowChangeChange}
            label="Allow users to change this setting"
          />
        </div>
      </div>
    </div>
  );
}

export function DialogShell({
  open, ariaLabel, onClose, width = 820, children,
}: {
  open: boolean;
  ariaLabel: string;
  onClose: () => void;
  width?: number;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-16">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        style={{ width }}
        className="relative z-10 flex max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
      >
        {children}
      </div>
    </div>
  );
}

export function DialogFooter({
  onCancel, onConfirm, confirmLabel, confirmDisabled,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
  confirmDisabled?: boolean;
}) {
  return (
    <>
      <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
      <div className="flex justify-end gap-2 px-6 py-5">
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
          disabled={confirmDisabled}
          className="inline-flex h-[36px] min-w-[60px] items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-[18px] text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)] disabled:cursor-not-allowed disabled:bg-[var(--sui-colors-neutral-b3)] disabled:hover:bg-[var(--sui-colors-neutral-b3)] enabled:cursor-pointer"
        >
          {confirmLabel}
        </button>
      </div>
    </>
  );
}

/* -----------------------------------------------------------------------------
 * AssistantDisableConfirm (Figma 2032-40483) — width 720, simple body.
 * --------------------------------------------------------------------------- */
export function AssistantDisableConfirm({
  open, onCancel, onConfirm,
}: { open: boolean; onCancel: () => void; onConfirm: () => void }) {
  return (
    <DialogShell open={open} ariaLabel="Turn off AI Assistant" onClose={onCancel} width={720}>
      <div className="flex flex-col gap-8 px-6 pb-10 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Turn off AI Assistant for your organization?
        </h2>
        <div className="flex flex-col gap-4 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          <p>
            This feature will be turned off for your account and no longer available to users.
            When turned back on, previous user settings can be restored.
          </p>
          <p>
            <span className="font-bold">Phone, chat</span> and{' '}
            <span className="font-bold">SMS AI features</span> will also be turned off.
          </p>
        </div>
      </div>
      <DialogFooter onCancel={onCancel} onConfirm={onConfirm} confirmLabel="Turn off" />
    </DialogShell>
  );
}

/* -----------------------------------------------------------------------------
 * AvaDisableConfirm (Figma 2454-8876) — width 720, simple body.
 * Turning off the AVA parent also turns off its 5 dependent features.
 * --------------------------------------------------------------------------- */
export function AvaDisableConfirm({
  open, onCancel, onConfirm,
}: { open: boolean; onCancel: () => void; onConfirm: () => void }) {
  return (
    <DialogShell open={open} ariaLabel="Turn off AVA" onClose={onCancel} width={720}>
      <div className="flex flex-col gap-8 px-6 pb-10 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Turn off AVA for your organization?
        </h2>
        <div className="flex flex-col gap-4 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          <p>
            This feature will be turned off for your account and no longer available to users.
            <br aria-hidden />
            When turned back on, previous user settings can be restored.
          </p>
          <p>
            <span className="font-bold">Query, Messaging, Integrations, Actions</span> and{' '}
            <span className="font-bold">Knowledge Bases</span> will also be turned off.
          </p>
        </div>
      </div>
      <DialogFooter onCancel={onCancel} onConfirm={onConfirm} confirmLabel="Turn off" />
    </DialogShell>
  );
}

/* -----------------------------------------------------------------------------
 * AvaManageDefaultOffConfirm (Figma 2454-9526) — width 600, simple body.
 * Shown when the Manage AVA dialog is saved with the user default set to Off.
 * Because AVA is a parent, defaulting AVA off also defaults its 5 dependent
 * features off in user settings.
 * --------------------------------------------------------------------------- */
export function AvaManageDefaultOffConfirm({
  open, onCancel, onConfirm,
}: { open: boolean; onCancel: () => void; onConfirm: () => void }) {
  return (
    <DialogShell open={open} ariaLabel="Turn off default for users" onClose={onCancel} width={600}>
      <div className="flex flex-col gap-8 px-6 pb-10 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Turn off default for users?
        </h2>
        <div className="flex flex-col gap-4 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          <p>
            <span className="font-bold">AVA</span> will default to off in user settings.
          </p>
          <p>
            <span className="font-bold">Query, Messaging, Integrations, Actions</span> and{' '}
            <span className="font-bold">Knowledge Bases</span> will also default to off.
          </p>
        </div>
      </div>
      <DialogFooter onCancel={onCancel} onConfirm={onConfirm} confirmLabel="Turn default off" />
    </DialogShell>
  );
}

/* -----------------------------------------------------------------------------
 * AvaManageRestrictAccessConfirm (Figma 2502-10410) — width 600, simple body.
 * Shown when the Manage AVA dialog is saved with "User access" unchecked
 * (users restricted from changing the setting). Because AVA is a parent,
 * restricting AVA also restricts its 5 dependent features.
 * --------------------------------------------------------------------------- */
export function AvaManageRestrictAccessConfirm({
  open, onCancel, onConfirm,
}: { open: boolean; onCancel: () => void; onConfirm: () => void }) {
  return (
    <DialogShell open={open} ariaLabel="Restrict users from changing this setting" onClose={onCancel} width={600}>
      <div className="flex flex-col gap-8 px-6 pb-10 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Restrict users from changing this setting?
        </h2>
        <div className="flex flex-col gap-4 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          <p>
            Users will no longer be able to change <span className="font-bold">AVA</span>.
          </p>
          <p>
            This restriction will also apply to{' '}
            <span className="font-bold">Query, Messaging, Integrations, Actions</span> and{' '}
            <span className="font-bold">Knowledge Bases</span>
          </p>
        </div>
      </div>
      <DialogFooter onCancel={onCancel} onConfirm={onConfirm} confirmLabel="Restrict access" />
    </DialogShell>
  );
}

/* -----------------------------------------------------------------------------
 * ClosedCaptioningDisableConfirm (Figma 2495-9886) — width 720, simple body.
 * Turning off the Closed captioning parent also turns off its 2 dependent
 * features (Live transcripts, AI notes).
 * --------------------------------------------------------------------------- */
export function ClosedCaptioningDisableConfirm({
  open, onCancel, onConfirm,
}: { open: boolean; onCancel: () => void; onConfirm: () => void }) {
  return (
    <DialogShell open={open} ariaLabel="Turn off Closed captioning" onClose={onCancel} width={720}>
      <div className="flex flex-col gap-8 px-6 pb-10 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Turn off Closed captioning for your organization?
        </h2>
        <div className="flex flex-col gap-4 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          <p>
            This feature will be turned off for your account and no longer available to users.
            <br aria-hidden />
            When turned back on, previous user settings can be restored.
          </p>
          <p>
            <span className="font-bold">Live transcripts</span> and{' '}
            <span className="font-bold">AI notes</span> will also be turned off.
          </p>
        </div>
      </div>
      <DialogFooter onCancel={onCancel} onConfirm={onConfirm} confirmLabel="Turn off" />
    </DialogShell>
  );
}

/* -----------------------------------------------------------------------------
 * AssistantEnableConfirm (Figma 2035-41070) — width 820, includes:
 *   - User deployment card
 *   - "Custom users — what to do" radio block (only when customUsers > 0)
 * --------------------------------------------------------------------------- */
export function AssistantEnableConfirm({
  open, onCancel, onConfirm,
  initialDefaultVal = 'On',
  initialAllowChange = true,
  customUsersCount = 26,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: (result: {
    defaultVal: 'On' | 'Off';
    allowChange: boolean;
    customAction: 'reset' | 'restore';
  }) => void;
  initialDefaultVal?: 'On' | 'Off';
  initialAllowChange?: boolean;
  customUsersCount?: number;
}) {
  const [defaultVal, setDefaultVal] = React.useState<'On' | 'Off'>(initialDefaultVal);
  const [allowChange, setAllowChange] = React.useState(initialAllowChange);
  const [customAction, setCustomAction] = React.useState<'reset' | 'restore'>('reset');

  React.useEffect(() => {
    if (open) {
      setDefaultVal(initialDefaultVal);
      setAllowChange(initialAllowChange);
      setCustomAction('reset');
    }
  }, [open, initialDefaultVal, initialAllowChange]);

  const defaultUsersCount = Math.max(0, TOTAL_USERS - customUsersCount);

  return (
    <DialogShell open={open} ariaLabel="Turn on AI Assistant" onClose={onCancel}>
      <div className="flex flex-col gap-6 px-6 pb-8 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Turn on AI Assistant for your organization?
        </h2>
        <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          This feature will be enabled for your account. Configure how it should be deployed to
          users below.
        </p>

        <UserDeploymentCard
          defaultVal={defaultVal}
          onDefaultValChange={setDefaultVal}
          allowChange={allowChange}
          onAllowChangeChange={setAllowChange}
          defaultUsersCount={defaultUsersCount}
        />

        {customUsersCount > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              <button
                type="button"
                className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
              >
                {customUsersCount}/{TOTAL_USERS} users
              </button>{' '}
              have custom settings for this feature. What would you like to do with these users?
            </p>
            <div className="flex items-center gap-6">
              <Radio
                checked={customAction === 'reset'}
                onChange={() => setCustomAction('reset')}
                label="Reset all to default"
              />
              <Radio
                checked={customAction === 'restore'}
                onChange={() => setCustomAction('restore')}
                label="Restore their custom settings"
              />
            </div>
          </div>
        )}
      </div>
      <DialogFooter
        onCancel={onCancel}
        onConfirm={() => onConfirm({ defaultVal, allowChange, customAction })}
        confirmLabel="Turn on"
      />
    </DialogShell>
  );
}

/* -----------------------------------------------------------------------------
 * AssistantManageDefaultOffConfirm (Figma 2035-41300) — secondary confirm shown
 * when the user changes "Default in user settings" from On → Off in the Manage
 * AI Assistant dialog and presses Save. Width 620, no form — just a warning.
 * --------------------------------------------------------------------------- */
export function AssistantManageDefaultOffConfirm({
  open, onCancel, onConfirm,
}: { open: boolean; onCancel: () => void; onConfirm: () => void }) {
  return (
    <DialogShell open={open} ariaLabel="Set AI Assistant default to Off" onClose={onCancel} width={620}>
      <div className="flex flex-col gap-6 px-6 pb-8 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Set AI Assistant default in user settings to Off?
        </h2>
        <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          <span className="font-bold">Phone, chat</span> and{' '}
          <span className="font-bold">SMS AI features</span> depend on AI Assistant and will also
          default to Off in user settings.
        </p>
      </div>
      <DialogFooter onCancel={onCancel} onConfirm={onConfirm} confirmLabel="Confirm" />
    </DialogShell>
  );
}

/* -----------------------------------------------------------------------------
 * Generic feature dialogs (Closed captioning, Live transcripts, AI notes, …)
 * — same chrome as the AI Assistant equivalents, just parameterized by the
 * feature label so they can be reused across all simple user-level sub-features.
 * --------------------------------------------------------------------------- */

export function FeatureDisableConfirm({
  open, featureName, onCancel, onConfirm, dependentNote,
}: {
  open: boolean;
  featureName: string;
  onCancel: () => void;
  onConfirm: () => void;
  /**
   * Optional note rendered after the standard paragraph — used to call out
   * dependent features that will also be turned off (e.g. Email-to-Fax for Fax).
   */
  dependentNote?: React.ReactNode;
}) {
  return (
    <DialogShell open={open} ariaLabel={`Turn off ${featureName}`} onClose={onCancel} width={620}>
      <div className="flex flex-col gap-6 px-6 pb-8 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Turn off {featureName} for your organization?
        </h2>
        {/* The two paragraphs sit close together (Figma); the outer gap-6 stays
            so the title↔body rhythm matches the rest of the disable confirms. */}
        <div className="flex flex-col gap-2 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          <p>
            This feature will be turned off for your account and no longer available to users.
            When turned back on, previous user settings can be restored.
          </p>
          {dependentNote && <p>{dependentNote}</p>}
        </div>
      </div>
      <DialogFooter onCancel={onCancel} onConfirm={onConfirm} confirmLabel="Turn off" />
    </DialogShell>
  );
}

/* -----------------------------------------------------------------------------
 * FeatureChildDisableConfirm — the standard confirmation shown when a dependent
 * (child) feature's own switch is turned off. Unlike the org-level disable
 * confirms ("… for your organization?"), a child is a user-level sub-feature, so
 * the title is simply "Turn off {featureName}?". On confirm the child stays off
 * and its user-deployment row (pills + Manage) is hidden by the caller.
 * --------------------------------------------------------------------------- */
export function FeatureChildDisableConfirm({
  open, featureName, onCancel, onConfirm,
}: {
  open: boolean;
  featureName: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <DialogShell open={open} ariaLabel={`Turn off ${featureName}`} onClose={onCancel} width={620}>
      <div className="flex flex-col gap-6 px-6 pb-8 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Turn off {featureName}?
        </h2>
        <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          This feature will be turned off and no longer available to users. When turned back on,
          previous user settings can be restored.
        </p>
      </div>
      <DialogFooter onCancel={onCancel} onConfirm={onConfirm} confirmLabel="Turn off" />
    </DialogShell>
  );
}

export function FeatureEnableConfirm({
  open, featureName, onCancel, onConfirm,
  initialDefaultVal = 'On',
  initialAllowChange = true,
  customUsersCount = 26,
}: {
  open: boolean;
  featureName: string;
  onCancel: () => void;
  onConfirm: (result: {
    defaultVal: 'On' | 'Off';
    allowChange: boolean;
    customAction: 'reset' | 'restore';
  }) => void;
  initialDefaultVal?: 'On' | 'Off';
  initialAllowChange?: boolean;
  customUsersCount?: number;
}) {
  const [defaultVal, setDefaultVal] = React.useState<'On' | 'Off'>(initialDefaultVal);
  const [allowChange, setAllowChange] = React.useState(initialAllowChange);
  const [customAction, setCustomAction] = React.useState<'reset' | 'restore'>('reset');

  React.useEffect(() => {
    if (open) {
      setDefaultVal(initialDefaultVal);
      setAllowChange(initialAllowChange);
      setCustomAction('reset');
    }
  }, [open, initialDefaultVal, initialAllowChange]);

  const defaultUsersCount = Math.max(0, TOTAL_USERS - customUsersCount);

  return (
    <DialogShell open={open} ariaLabel={`Turn on ${featureName}`} onClose={onCancel}>
      <div className="flex flex-col gap-6 px-6 pb-8 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Turn on {featureName} for your organization?
        </h2>
        <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          This feature will be enabled for your account. Configure how it should be deployed to
          users below.
        </p>

        <UserDeploymentCard
          defaultVal={defaultVal}
          onDefaultValChange={setDefaultVal}
          allowChange={allowChange}
          onAllowChangeChange={setAllowChange}
          defaultUsersCount={defaultUsersCount}
        />

        {customUsersCount > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              <button
                type="button"
                className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
              >
                {customUsersCount}/{TOTAL_USERS} users
              </button>{' '}
              have custom settings for this feature. What would you like to do with these users?
            </p>
            <div className="flex items-center gap-6">
              <Radio
                checked={customAction === 'reset'}
                onChange={() => setCustomAction('reset')}
                label="Reset all to default"
              />
              <Radio
                checked={customAction === 'restore'}
                onChange={() => setCustomAction('restore')}
                label="Restore their custom settings"
              />
            </div>
          </div>
        )}
      </div>
      <DialogFooter
        onCancel={onCancel}
        onConfirm={() => onConfirm({ defaultVal, allowChange, customAction })}
        confirmLabel="Turn on"
      />
    </DialogShell>
  );
}

export function FeatureManageDialog({
  open, featureName, onCancel, onSave,
  initialDefaultVal, initialAllowChange,
  customUsersCount = 26,
}: {
  open: boolean;
  featureName: string;
  onCancel: () => void;
  onSave: (result: { defaultVal: 'On' | 'Off'; allowChange: boolean }) => void;
  initialDefaultVal: 'On' | 'Off';
  initialAllowChange: boolean;
  customUsersCount?: number;
}) {
  const [defaultVal, setDefaultVal] = React.useState<'On' | 'Off'>(initialDefaultVal);
  const [allowChange, setAllowChange] = React.useState(initialAllowChange);

  React.useEffect(() => {
    if (open) {
      setDefaultVal(initialDefaultVal);
      setAllowChange(initialAllowChange);
    }
  }, [open, initialDefaultVal, initialAllowChange]);

  const defaultUsersCount = Math.max(0, TOTAL_USERS - customUsersCount);
  const dirty = defaultVal !== initialDefaultVal || allowChange !== initialAllowChange;

  return (
    <DialogShell open={open} ariaLabel={`Manage ${featureName}`} onClose={onCancel}>
      <div className="flex flex-col gap-6 px-6 pb-8 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Manage {featureName}
        </h2>
        <UserDeploymentCard
          defaultVal={defaultVal}
          onDefaultValChange={setDefaultVal}
          allowChange={allowChange}
          onAllowChangeChange={setAllowChange}
          defaultUsersCount={defaultUsersCount}
        />
      </div>
      <DialogFooter
        onCancel={onCancel}
        onConfirm={() => onSave({ defaultVal, allowChange })}
        confirmLabel="Save"
        confirmDisabled={!dirty}
      />
    </DialogShell>
  );
}

/* -----------------------------------------------------------------------------
 * AssistantManageDialog (Figma 2035-40810) — Manage AI Assistant.
 * Same User deployment card as the enable confirm. Save is disabled when the
 * form is not dirty.
 * --------------------------------------------------------------------------- */
export function AssistantManageDialog({
  open, onCancel, onSave,
  initialDefaultVal, initialAllowChange,
  customUsersCount = 26,
}: {
  open: boolean;
  onCancel: () => void;
  onSave: (result: { defaultVal: 'On' | 'Off'; allowChange: boolean }) => void;
  initialDefaultVal: 'On' | 'Off';
  initialAllowChange: boolean;
  customUsersCount?: number;
}) {
  const [defaultVal, setDefaultVal] = React.useState<'On' | 'Off'>(initialDefaultVal);
  const [allowChange, setAllowChange] = React.useState(initialAllowChange);

  React.useEffect(() => {
    if (open) {
      setDefaultVal(initialDefaultVal);
      setAllowChange(initialAllowChange);
    }
  }, [open, initialDefaultVal, initialAllowChange]);

  const defaultUsersCount = Math.max(0, TOTAL_USERS - customUsersCount);
  const dirty = defaultVal !== initialDefaultVal || allowChange !== initialAllowChange;

  return (
    <DialogShell open={open} ariaLabel="Manage AI Assistant" onClose={onCancel}>
      <div className="flex flex-col gap-6 px-6 pb-8 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Manage AI Assistant
        </h2>
        <UserDeploymentCard
          defaultVal={defaultVal}
          onDefaultValChange={setDefaultVal}
          allowChange={allowChange}
          onAllowChangeChange={setAllowChange}
          defaultUsersCount={defaultUsersCount}
        />
      </div>
      <DialogFooter
        onCancel={onCancel}
        onConfirm={() => onSave({ defaultVal, allowChange })}
        confirmLabel="Save"
        confirmDisabled={!dirty}
      />
    </DialogShell>
  );
}

/* -----------------------------------------------------------------------------
 * AvaManageDialog (Figma 2454-9168) — Manage AVA. Same User deployment card as
 * the Assistant manage dialog (Default in user settings On/Off + User access
 * checkbox + "N/98 users are using the default"). Save is disabled until the
 * form is dirty.
 * --------------------------------------------------------------------------- */
export function AvaManageDialog({
  open, onCancel, onSave,
  initialDefaultVal, initialAllowChange,
  customUsersCount = 26,
}: {
  open: boolean;
  onCancel: () => void;
  onSave: (result: { defaultVal: 'On' | 'Off'; allowChange: boolean }) => void;
  initialDefaultVal: 'On' | 'Off';
  initialAllowChange: boolean;
  customUsersCount?: number;
}) {
  const [defaultVal, setDefaultVal] = React.useState<'On' | 'Off'>(initialDefaultVal);
  const [allowChange, setAllowChange] = React.useState(initialAllowChange);

  React.useEffect(() => {
    if (open) {
      setDefaultVal(initialDefaultVal);
      setAllowChange(initialAllowChange);
    }
  }, [open, initialDefaultVal, initialAllowChange]);

  const defaultUsersCount = Math.max(0, TOTAL_USERS - customUsersCount);
  const dirty = defaultVal !== initialDefaultVal || allowChange !== initialAllowChange;

  return (
    <DialogShell open={open} ariaLabel="Manage AVA" onClose={onCancel}>
      <div className="flex flex-col gap-6 px-6 pb-8 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Manage AVA
        </h2>
        <UserDeploymentCard
          defaultVal={defaultVal}
          onDefaultValChange={setDefaultVal}
          allowChange={allowChange}
          onAllowChangeChange={setAllowChange}
          defaultUsersCount={defaultUsersCount}
        />
      </div>
      <DialogFooter
        onCancel={onCancel}
        onConfirm={() => onSave({ defaultVal, allowChange })}
        confirmLabel="Save"
        confirmDisabled={!dirty}
      />
    </DialogShell>
  );
}

/* -----------------------------------------------------------------------------
 * AssistantReEnableConfirm (Figma 2069-32183) — width 620, no form. Shown when
 * AI Assistant is turned back on after having been disabled. Just confirms the
 * re-enable and notes that Phone / chat / SMS AI features will also be
 * restored to their previous states.
 * --------------------------------------------------------------------------- */
export function AssistantReEnableConfirm({
  open, onCancel, onConfirm,
}: { open: boolean; onCancel: () => void; onConfirm: () => void }) {
  return (
    <DialogShell open={open} ariaLabel="Turn on AI Assistant" onClose={onCancel} width={620}>
      <div className="flex flex-col gap-8 px-6 pb-15 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Turn on AI Assistant for your organization?
        </h2>
        <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          This will turn AI Assistant back on across your entire account.
        </p>
        <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          <span className="font-bold">Phone, chat</span> and{' '}
          <span className="font-bold">SMS AI features</span> will also be restored.
        </p>
      </div>
      <DialogFooter onCancel={onCancel} onConfirm={onConfirm} confirmLabel="Turn on" />
    </DialogShell>
  );
}
