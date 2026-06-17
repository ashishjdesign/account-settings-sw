import React, { useEffect, useState } from 'react';
import * as DialogPrimitives from '@radix-ui/react-dialog';
import { Check, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

/* -----------------------------------------------------------------------------
 * AI Assistant — Turn on confirm dialog
 * (Figma file xGbu5327bj9YvYed8lxZQk, node 2035-41070)
 *
 * Mirrors the User-deployment card from SpringFeatureManageDialog and adds the
 * "X/98 users have custom settings — Reset / Restore" radio block. Confirming
 * commits the new defaults via the parent's onConfirm.
 * --------------------------------------------------------------------------- */

const TOTAL_USERS = 98;

function Radio({
  checked, onChange, label,
}: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
      <button
        type="button"
        role="radio"
        aria-checked={checked}
        onClick={onChange}
        className={cn(
          'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] bg-white transition-colors',
          checked
            ? 'border-[var(--sui-colors-primary-b)]'
            : 'border-[var(--sui-colors-neutral-b2)] hover:border-[var(--sui-colors-neutral-b1)]',
        )}
      >
        {checked && (
          <span className="h-[8px] w-[8px] rounded-full bg-[var(--sui-colors-primary-b)]" />
        )}
      </button>
      {label}
    </label>
  );
}

/* -----------------------------------------------------------------------------
 * AI Assistant — "Set default in user settings to Off?" confirm
 * (Figma file xGbu5327bj9YvYed8lxZQk, node 2035-41300)
 *
 * Shown after Save in the Manage AI Assistant dialog when the user flipped
 * "Default in user settings" from On → Off. Confirming cascades the Off
 * default to all Phone / Chat / SMS sub-features.
 * --------------------------------------------------------------------------- */
export function AssistantManageDefaultOffConfirmDialog({
  open, onCancel, onConfirm,
}: { open: boolean; onCancel: () => void; onConfirm: () => void }) {
  return (
    <DialogPrimitives.Root open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className="fixed inset-0 z-[60] bg-black/40 pt-16 flex justify-center items-start data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogPrimitives.Content
            aria-label="Set AI Assistant default to Off"
            className="relative z-10 flex w-[620px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            <div className="flex flex-col gap-6 px-6 pb-8 pt-9">
              <div className="py-3">
                <DialogPrimitives.Title className="text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
                  Set AI Assistant default in user settings to Off?
                </DialogPrimitives.Title>
              </div>
              <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                <span className="font-bold">Phone, chat</span> and{' '}
                <span className="font-bold">SMS AI features</span> depend on AI Assistant and will
                also default to Off in user settings.
              </p>
            </div>
            <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
            <div className="flex justify-end gap-2 px-6 py-5">
              <DialogPrimitives.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
                >
                  Cancel
                </button>
              </DialogPrimitives.Close>
              <button
                type="button"
                onClick={onConfirm}
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-[18px] text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
              >
                Confirm
              </button>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
}

export type AssistantEnableResult = {
  defaultVal: 'On' | 'Off';
  allowChange: boolean;
  customAction: 'reset' | 'restore';
};

/* -----------------------------------------------------------------------------
 * Generic feature "Turn off" confirm — width 620, mirrors the AssistantDisable
 * mockup chrome (Figma file xGbu5327bj9YvYed8lxZQk, e.g. node 2040-44839 for
 * Fax). Optionally renders a `dependentNote` paragraph after the standard
 * body — used to call out features that will also be turned off (e.g.
 * Email-to-Fax for Fax).
 * --------------------------------------------------------------------------- */
export function FeatureDisableConfirmDialog({
  open,
  featureName,
  dependentNote,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  featureName: string;
  dependentNote?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <DialogPrimitives.Root open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-16 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogPrimitives.Content
            aria-label={`Turn off ${featureName}`}
            className="relative z-10 flex w-[620px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            <div className="flex flex-col gap-6 px-6 pb-8 pt-9">
              <DialogPrimitives.Title className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
                Turn off {featureName} for your organization?
              </DialogPrimitives.Title>
              {/* Outer gap-6 keeps title↔body rhythm; inner gap-2 keeps the
                  two paragraphs close together (Figma 2040-44839). */}
              <div className="flex flex-col gap-2 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                <p>
                  This feature will be turned off for your account and no longer available to
                  users. When turned back on, previous user settings can be restored.
                </p>
                {dependentNote && <p>{dependentNote}</p>}
              </div>
            </div>
            <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
            <div className="flex justify-end gap-2 px-6 py-5">
              <DialogPrimitives.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--sui-colors-neutral-b4)] bg-white px-[18px] text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
                >
                  Cancel
                </button>
              </DialogPrimitives.Close>
              <button
                type="button"
                onClick={onConfirm}
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-[18px] text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
              >
                Turn off
              </button>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
}

/* -----------------------------------------------------------------------------
 * Generic feature "Turn on" confirm — same chrome as the AI Assistant variant
 * but parameterized by featureName. Used for Closed captioning, Live
 * transcripts, AI notes, etc.
 * (Figma e.g. node 2039-41662 for Closed captioning.)
 * --------------------------------------------------------------------------- */
export function FeatureEnableConfirmDialog({
  open,
  featureName,
  initialDefaultVal = 'On',
  initialAllowChange = true,
  customCount = 0,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  featureName: string;
  initialDefaultVal?: 'On' | 'Off';
  initialAllowChange?: boolean;
  customCount?: number;
  onCancel: () => void;
  onConfirm: (result: AssistantEnableResult) => void;
}) {
  const [value, setValue] = useState<'On' | 'Off'>(initialDefaultVal);
  const [allow, setAllow] = useState(initialAllowChange);
  const [customAction, setCustomAction] = useState<'reset' | 'restore'>('reset');

  useEffect(() => {
    if (open) {
      setValue(initialDefaultVal);
      setAllow(initialAllowChange);
      setCustomAction('reset');
    }
  }, [open, initialDefaultVal, initialAllowChange]);

  const defaultUsersCount = Math.max(0, TOTAL_USERS - customCount);

  return (
    <DialogPrimitives.Root open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className="fixed inset-0 z-50 bg-black/40 pt-16 flex justify-center items-start data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogPrimitives.Content
            aria-label={`Turn on ${featureName}`}
            className="relative z-10 flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            <div className="flex flex-col gap-6 px-6 pb-8 pt-9">
              <div className="py-3">
                <DialogPrimitives.Title className="text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
                  Turn on {featureName} for your organization?
                </DialogPrimitives.Title>
              </div>

              <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                This feature will be enabled for your account. Configure how it should be deployed
                to users below.
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
                        <Radio checked={value === 'On'} onChange={() => setValue('On')} label="On" />
                        <Radio checked={value === 'Off'} onChange={() => setValue('Off')} label="Off" />
                      </div>
                    </div>
                    <div className="flex h-[32px] items-center rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3">
                      <p className="whitespace-nowrap text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                        <span className="text-[var(--sui-colors-primary-b)] underline">
                          {defaultUsersCount}/{TOTAL_USERS} users
                        </span>{' '}
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
                      <div className="relative flex h-[20px] w-[20px] items-center justify-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={allow}
                          onChange={(e) => setAllow(e.target.checked)}
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-[4px] border-[1.2px] border-[var(--sui-colors-neutral-b2)] bg-white peer-checked:bg-[var(--sui-colors-primary-b)] peer-checked:border-transparent transition-colors">
                          {allow && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </div>
                      </div>
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
                    <span className="text-[var(--sui-colors-primary-b)] underline">
                      {customCount}/{TOTAL_USERS} users
                    </span>{' '}
                    have custom settings for this feature. What would you like to do with these
                    users?
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

            <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
            <div className="flex justify-end gap-2 px-6 py-5">
              <DialogPrimitives.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
                >
                  Cancel
                </button>
              </DialogPrimitives.Close>
              <button
                type="button"
                onClick={() =>
                  onConfirm({ defaultVal: value, allowChange: allow, customAction })
                }
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-[18px] text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
              >
                Turn on
              </button>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
}

/* -----------------------------------------------------------------------------
 * AI Assistant — Re-enable confirm (Figma file xGbu5327bj9YvYed8lxZQk, node
 * 2069-32183). Replaces the form-based AssistantEnableConfirmDialog now that
 * AI Assistant no longer has user-level management. Just confirms the
 * re-enable and notes that AVA's own child features (Query, Messaging,
 * Integrations, Actions, Knowledge Base) will also be restored.
 * --------------------------------------------------------------------------- */
export function AssistantReEnableConfirmDialog({
  open, onCancel, onConfirm,
}: { open: boolean; onCancel: () => void; onConfirm: () => void }) {
  return (
    <DialogPrimitives.Root open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className="fixed inset-0 z-50 bg-black/40 pt-16 flex justify-center items-start data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogPrimitives.Content
            aria-label="Turn on AVA"
            className="relative z-10 flex w-[620px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            <div className="flex flex-col gap-8 px-6 pb-15 pt-9">
              <div className="py-3">
                <DialogPrimitives.Title className="text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
                  Turn on AVA for your organization?
                </DialogPrimitives.Title>
              </div>
              <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                This will turn AVA back on across your entire account.
              </p>
              <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                <span className="font-bold">Query, Messaging, Integrations, Actions</span> and{' '}
                <span className="font-bold">Knowledge Bases</span> will also be restored.
              </p>
            </div>
            <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
            <div className="flex justify-end gap-2 px-6 py-5">
              <DialogPrimitives.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
                >
                  Cancel
                </button>
              </DialogPrimitives.Close>
              <button
                type="button"
                onClick={onConfirm}
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-[18px] text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
              >
                Turn on
              </button>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
}

export function AssistantEnableConfirmDialog({
  open,
  initialDefaultVal = 'On',
  initialAllowChange = true,
  customCount = 0,
  onCancel,
  onConfirm,
  error,
}: {
  open: boolean;
  initialDefaultVal?: 'On' | 'Off';
  initialAllowChange?: boolean;
  customCount?: number;
  onCancel: () => void;
  onConfirm: (result: AssistantEnableResult) => void;
  error?: boolean;
}) {
  const [value, setValue] = useState<'On' | 'Off'>(initialDefaultVal);
  const [allow, setAllow] = useState(initialAllowChange);
  const [customAction, setCustomAction] = useState<'reset' | 'restore'>('reset');

  useEffect(() => {
    if (open) {
      setValue(initialDefaultVal);
      setAllow(initialAllowChange);
      setCustomAction('reset');
    }
  }, [open, initialDefaultVal, initialAllowChange]);

  const defaultUsersCount = Math.max(0, TOTAL_USERS - customCount);

  return (
    <DialogPrimitives.Root open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className="fixed inset-0 z-50 bg-black/40 pt-16 flex justify-center items-start data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogPrimitives.Content
            aria-label="Turn on AI Assistant"
            className="relative z-10 flex w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            <div className="flex flex-col gap-6 px-6 pb-8 pt-9">
              <div className="py-3">
                <DialogPrimitives.Title className="text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
                  Turn on AI Assistant for your organization?
                </DialogPrimitives.Title>
              </div>

              <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                This feature will be enabled for your account. Configure how it should be deployed
                to users below.
              </p>

              {/* User deployment card */}
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
                        <Radio checked={value === 'On'} onChange={() => setValue('On')} label="On" />
                        <Radio checked={value === 'Off'} onChange={() => setValue('Off')} label="Off" />
                      </div>
                    </div>
                    <div className="flex h-[32px] items-center rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3">
                      <p className="whitespace-nowrap text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                        <span className="text-[var(--sui-colors-primary-b)] underline">
                          {defaultUsersCount}/{TOTAL_USERS} users
                        </span>{' '}
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
                      <div className="relative flex h-[20px] w-[20px] items-center justify-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={allow}
                          onChange={(e) => setAllow(e.target.checked)}
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-[4px] border-[1.2px] border-[var(--sui-colors-neutral-b2)] bg-white peer-checked:bg-[var(--sui-colors-primary-b)] peer-checked:border-transparent transition-colors">
                          {allow && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </div>
                      </div>
                      <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                        Allow users to change this setting
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Custom users disposition */}
              {customCount > 0 && (
                <div className="flex flex-col gap-3">
                  <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    <span className="text-[var(--sui-colors-primary-b)] underline">
                      {customCount}/{TOTAL_USERS} users
                    </span>{' '}
                    have custom settings for this feature. What would you like to do with these
                    users?
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

              {error && (
                <div className="rounded-md bg-red-50 p-3 flex items-center gap-2 text-sm text-red-800 border border-red-200">
                  <Info className="h-4 w-4 text-red-600 shrink-0" />
                  <span>Couldn't save settings. Try again.</span>
                </div>
              )}
            </div>

            <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
            <div className="flex justify-end gap-2 px-6 py-5">
              <DialogPrimitives.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
                >
                  Cancel
                </button>
              </DialogPrimitives.Close>
              <button
                type="button"
                onClick={() =>
                  onConfirm({ defaultVal: value, allowChange: allow, customAction })
                }
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-[18px] text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
              >
                {error ? 'Retry' : 'Turn on'}
              </button>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
}

/* -----------------------------------------------------------------------------
 * Email-to-Fax — Turn on confirm
 * (Figma file xGbu5327bj9YvYed8lxZQk, nodes 2041-9597 first-time, 2050-30618
 * re-enable.)
 *
 * Two visual modes via `firstTime`:
 *  - first-time: omits the "X/98 users using default" pill on the deployment
 *    card and the "X/98 users have custom settings" reset/restore section.
 *  - re-enable:  shows both, matching the Re-enable mockup.
 *
 * Both variants always render the security snackbar + indemnification consent
 * block below the form; "Turn on" is disabled until the consent box is
 * checked.
 * --------------------------------------------------------------------------- */
export function EmailToFaxEnableConfirmDialog({
  open,
  firstTime,
  initialDefaultVal = 'On',
  initialAllowChange = true,
  customCount = 0,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  firstTime: boolean;
  initialDefaultVal?: 'On' | 'Off';
  initialAllowChange?: boolean;
  customCount?: number;
  onCancel: () => void;
  onConfirm: (result: AssistantEnableResult) => void;
}) {
  const [value, setValue] = useState<'On' | 'Off'>(initialDefaultVal);
  const [allow, setAllow] = useState(initialAllowChange);
  const [customAction, setCustomAction] = useState<'reset' | 'restore'>('reset');
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (open) {
      setValue(initialDefaultVal);
      setAllow(initialAllowChange);
      setCustomAction('reset');
      setConsent(false);
    }
  }, [open, initialDefaultVal, initialAllowChange]);

  const defaultUsersCount = Math.max(0, TOTAL_USERS - customCount);

  return (
    <DialogPrimitives.Root open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className="fixed inset-0 z-50 bg-black/40 pt-16 flex justify-center items-start data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogPrimitives.Content
            aria-label="Turn on Email-to-Fax"
            className="relative z-10 flex max-h-[calc(100vh-96px)] w-[820px] max-w-[calc(100%-32px)] flex-col rounded-[10px] bg-white shadow-[0_10px_10px_rgba(0,0,0,0.2)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            <div className="flex flex-col gap-6 overflow-y-auto px-6 pb-8 pt-9">
              <div className="py-3">
                <DialogPrimitives.Title className="text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
                  Turn on Email-to-Fax for your organization?
                </DialogPrimitives.Title>
              </div>

              <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                This feature will be enabled for your account. Configure how it should be deployed
                to users below.
              </p>

              {/* User deployment card */}
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
                        <Radio checked={value === 'On'} onChange={() => setValue('On')} label="On" />
                        <Radio checked={value === 'Off'} onChange={() => setValue('Off')} label="Off" />
                      </div>
                    </div>
                    {!firstTime && (
                      <div className="flex h-[32px] items-center rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3">
                        <p className="whitespace-nowrap text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                          <span className="text-[var(--sui-colors-primary-b)] underline">
                            {defaultUsersCount}/{TOTAL_USERS} users
                          </span>{' '}
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
                      <div className="relative flex h-[20px] w-[20px] items-center justify-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={allow}
                          onChange={(e) => setAllow(e.target.checked)}
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-[4px] border-[1.2px] border-[var(--sui-colors-neutral-b2)] bg-white peer-checked:bg-[var(--sui-colors-primary-b)] peer-checked:border-transparent transition-colors">
                          {allow && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </div>
                      </div>
                      <span className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                        Allow users to change this setting
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {!firstTime && customCount > 0 && (
                <div className="flex flex-col gap-3">
                  <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    <span className="text-[var(--sui-colors-primary-b)] underline">
                      {customCount}/{TOTAL_USERS} users
                    </span>{' '}
                    have custom settings for this feature. What would you like to do with these
                    users?
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

              <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />

              {/* Security snackbar */}
              <div className="flex min-h-[48px] w-full items-center gap-2 rounded-[10px] border border-[var(--sui-colors-neutral-b2)] bg-[var(--sui-colors-neutral-b4)]/50 px-4 py-2 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] backdrop-blur-[10px]">
                <Info className="h-5 w-5 shrink-0 text-[var(--sui-colors-neutral-b0)]" strokeWidth={2} />
                <p className="flex-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)]">
                  To use Email-to-fax, your email domain needs to meet our security requirements.{' '}
                  <button
                    type="button"
                    className="cursor-pointer font-medium text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
                  >
                    Learn More
                  </button>
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  If your email domain doesn't meet the security requirements, it may result in
                  the following:
                </p>
                <ul className="flex list-disc flex-col gap-1 pl-6 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                  <li>Your email may be spoofed and/or rejected by the Email-to-fax system.</li>
                  <li>
                    In cases of suspicious email activities, our Service Abuse and Fraud team
                    may turn off Email-to-fax for the account.
                  </li>
                </ul>

                <label className="flex cursor-pointer items-start gap-3 pt-1">
                  <div className="relative mt-0.5 flex h-[20px] w-[20px] shrink-0 items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-[4px] border-[1.2px] border-[var(--sui-colors-neutral-b2)] bg-white peer-checked:bg-[var(--sui-colors-primary-b)] peer-checked:border-transparent transition-colors">
                      {consent && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                    </div>
                  </div>
                  <span className="text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                    By checking this box, I confirm that my email domain meets the required
                    security standards. I acknowledge and agree that it is my sole responsibility
                    to ensure my email domain remains compliant with those standards. I agree to
                    indemnify and hold harmless RingCentral, its partners, and its affiliates for
                    any and all liability resulting from my failure to comply with these
                    requirements.
                  </span>
                </label>
              </div>
            </div>

            <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
            <div className="flex justify-end gap-2 px-6 py-5">
              <DialogPrimitives.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
                >
                  Cancel
                </button>
              </DialogPrimitives.Close>
              <button
                type="button"
                disabled={!consent}
                onClick={() =>
                  onConfirm({ defaultVal: value, allowChange: allow, customAction })
                }
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-[18px] text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)] disabled:cursor-not-allowed disabled:bg-[var(--sui-colors-neutral-b3)] disabled:hover:bg-[var(--sui-colors-neutral-b3)]"
              >
                Turn on
              </button>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
}
