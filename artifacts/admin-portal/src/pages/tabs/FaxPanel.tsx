import React, { useState } from 'react';
import { useSettings, FaxConfig } from '../../store';
import { SettingCard, SpringDialog, UserDefaultsRow, SpringSelect, showToast, SpringSwitch } from '../../components/shared';
import * as DialogPrimitives from '@radix-ui/react-dialog';
import { X, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function FaxPanel() {
  const { state, dispatch } = useSettings();
  const { fax, emailToFaxOn } = state.fax;

  const [manageOpen, setManageOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  // Manage state
  const [editDefault, setEditDefault] = useState<'On'|'Off'>(fax.defaultVal);
  const [editAllow, setEditAllow] = useState(fax.allowChange);

  // Customize state
  const [custDraft, setCustDraft] = useState<FaxConfig>(fax.customize);
  const [unsavedGuardOpen, setUnsavedGuardOpen] = useState(false);

  const handleSaveManage = () => {
    if(state.simulateError) return;
    dispatch({ type: 'SNAPSHOT' });
    dispatch({ type: 'UPDATE_FEATURE', payload: { tab: 'fax', feature: 'fax', data: { defaultVal: editDefault, allowChange: editAllow } } });
    setManageOpen(false);
    showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
  };

  const openCustomize = () => {
    setCustDraft(fax.customize);
    setCustomizeOpen(true);
  };

  const handleCloseCustomize = () => {
    const hasChanges = JSON.stringify(custDraft) !== JSON.stringify(fax.customize);
    if (hasChanges) {
      setUnsavedGuardOpen(true);
    } else {
      setCustomizeOpen(false);
    }
  };

  const retentionOptions = ['30 days', '90 days', '365 days'] as const;
  const retentionInvalid = !retentionOptions.includes(custDraft.retention as any);
  const [showRetentionError, setShowRetentionError] = useState(false);

  const handleSaveCustomize = () => {
    if (retentionInvalid) {
      setShowRetentionError(true);
      return;
    }
    if (state.simulateError) return;
    dispatch({ type: 'SNAPSHOT' });
    dispatch({ type: 'UPDATE_FAX_CUSTOMIZE', payload: custDraft });
    setCustomizeOpen(false);
    setShowRetentionError(false);
    showToast('Fax settings customized.', () => dispatch({ type: 'UNDO' }));
  };

  return (
    <div className="flex flex-col gap-4">
      <SettingCard
        title="Fax"
        switchOn={fax.on}
        icon="fax"
        description="Allow this account to access fax settings."
        summary={[
          { label: 'User default:', value: fax.defaultVal },
          { value: fax.allowChange ? 'Users can change this setting' : 'Users cannot change this setting' },
        ]}
        onManage={() => {
          setEditDefault(fax.defaultVal);
          setEditAllow(fax.allowChange);
          setManageOpen(true);
        }}
        onCustomize={openCustomize}
        onSwitchClick={() => {
          dispatch({ type: 'SNAPSHOT' });
          dispatch({ type: 'UPDATE_FEATURE', payload: { tab: 'fax', feature: 'fax', data: { on: !fax.on } }});
        }}
      />
      <SettingCard
        title="Email-to-Fax"
        switchOn={emailToFaxOn}
        icon="email-to-fax"
        description="Allow this account to send faxes using Email-to-fax feature."
        disabled={!fax.on}
        onSwitchClick={() => {
          dispatch({ type: 'SNAPSHOT' });
          dispatch({ type: 'UPDATE_FEATURE', payload: { tab: 'fax', feature: 'emailToFaxOn', data: !emailToFaxOn }});
        }}
      />

      <SpringDialog
        open={manageOpen}
        title="Manage Fax"
        onClose={() => setManageOpen(false)}
        onSave={handleSaveManage}
        error={state.simulateError}
      >
        <UserDefaultsRow 
          defaultVal={editDefault}
          allowChange={editAllow}
          onDefaultChange={setEditDefault}
          onAllowChangeChange={setEditAllow}
          customCount={fax.customUsers}
        />
      </SpringDialog>

      {/* Side sheet for Customize */}
      <DialogPrimitives.Root open={customizeOpen} onOpenChange={(o) => !o && handleCloseCustomize()}>
        <DialogPrimitives.Portal>
          <DialogPrimitives.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitives.Content className="fixed right-0 top-0 bottom-0 z-50 flex w-[440px] flex-col bg-white shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--sui-colors-neutral-b4)]">
              <DialogPrimitives.Title className="text-[18px] font-semibold text-[var(--sui-colors-neutral-b1)]">
                Customize Fax Settings
              </DialogPrimitives.Title>
              <button
                type="button"
                onClick={handleCloseCustomize}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--sui-colors-neutral-b1)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
              >
                <X className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {!fax.on ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-[var(--sui-colors-neutral-b2)] gap-4">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <img src="/figma-ref/icons/fax.svg" className="w-8 h-8 opacity-40" alt="" />
                  </div>
                  <p>Fax service is currently turned off.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {state.simulateError && (
                    <div className="rounded-md bg-red-50 p-3 flex items-center gap-2 text-sm text-red-800 border border-red-200">
                      <Info className="h-4 w-4 text-red-600 shrink-0" />
                      <span>Couldn't save settings. Try again.</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] font-semibold text-[var(--sui-colors-neutral-b1)]">International faxing</span>
                      <span className="text-[13px] text-[var(--sui-colors-neutral-b2)]">Allow users to send faxes internationally.</span>
                    </div>
                    <SpringSwitch 
                      checked={custDraft.international} 
                      onCheckedChange={(c) => setCustDraft({ ...custDraft, international: c })}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[14px] font-semibold text-[var(--sui-colors-neutral-b1)]">Cover page default</span>
                    <span className="text-[13px] text-[var(--sui-colors-neutral-b2)] mb-1">Set the default cover page template for all users.</span>
                    <SpringSelect 
                      value={custDraft.coverPage} 
                      options={['None', 'Standard', 'Branded']}
                      onChange={(v) => setCustDraft({ ...custDraft, coverPage: v as any })}
                      width={300}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[14px] font-semibold text-[var(--sui-colors-neutral-b1)]">
                      Retention period <span className="text-red-600">*</span>
                    </span>
                    <span className="text-[13px] text-[var(--sui-colors-neutral-b2)] mb-1">How long to keep faxes before auto-deletion.</span>
                    <SpringSelect
                      value={custDraft.retention}
                      options={['', '30 days', '90 days', '365 days']}
                      onChange={(v) => {
                        setCustDraft({ ...custDraft, retention: v as any });
                        if (v) setShowRetentionError(false);
                      }}
                      width={300}
                    />
                    {showRetentionError && retentionInvalid && (
                      <span className="text-[12px] text-red-600 mt-1">Retention period is required.</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[var(--sui-colors-neutral-b4)] p-4 flex justify-end gap-2 bg-[var(--sui-colors-neutral-b5)]/20">
              <button
                type="button"
                onClick={handleCloseCustomize}
                className="inline-flex h-[32px] min-w-[56px] items-center justify-center rounded-[10px] border border-black/20 bg-white px-3 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCustomize}
                disabled={!fax.on}
                className="inline-flex h-[32px] min-w-[56px] items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 disabled:opacity-50"
              >
                {state.simulateError ? 'Retry' : 'Save'}
              </button>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Portal>
      </DialogPrimitives.Root>

      {/* Unsaved changes confirmation */}
      <DialogPrimitives.Root open={unsavedGuardOpen} onOpenChange={setUnsavedGuardOpen}>
        <DialogPrimitives.Portal>
          <DialogPrimitives.Overlay className="fixed inset-0 z-50 bg-black/40 pt-24 flex justify-center items-start" />
          <DialogPrimitives.Content className="relative z-[60] flex w-[400px] flex-col rounded-[12px] bg-white shadow-xl p-6 gap-6">
            <div className="flex flex-col gap-2">
              <DialogPrimitives.Title className="text-[20px] font-semibold text-[var(--sui-colors-neutral-b1)]">
                Discard unsaved changes?
              </DialogPrimitives.Title>
              <DialogPrimitives.Description className="text-[14px] text-[var(--sui-colors-neutral-b1)]">
                You have unsaved changes in your fax settings. Are you sure you want to discard them?
              </DialogPrimitives.Description>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setUnsavedGuardOpen(false)}
                className="inline-flex h-[32px] px-3 rounded-[10px] border border-black/20 text-[14px] font-medium hover:bg-[var(--sui-colors-neutral-b4)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
              >
                Keep editing
              </button>
              <button
                onClick={() => {
                  setUnsavedGuardOpen(false);
                  setCustomizeOpen(false);
                }}
                className="inline-flex h-[32px] px-3 rounded-[10px] bg-red-600 text-white text-[14px] font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600/30"
              >
                Discard changes
              </button>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Portal>
      </DialogPrimitives.Root>
    </div>
  );
}
