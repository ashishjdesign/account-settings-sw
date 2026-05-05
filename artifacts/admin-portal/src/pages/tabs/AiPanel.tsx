import React, { useState } from 'react';
import { useSettings, AiAssistantCustomize } from '../../store';
import {
  SettingCard,
  SpringConfirmDialog,
  SpringDialog,
  SpringSelect,
  SpringSwitch,
  UserDefaultsRow,
  showToast,
} from '../../components/shared';
import * as DialogPrimitives from '@radix-ui/react-dialog';
import { X, Info } from 'lucide-react';

const RETENTION_OPTIONS = ['', '30 days', '90 days', '365 days'] as const;
const LANGUAGE_OPTIONS = ['English', 'Spanish', 'French'] as const;

export default function AiPanel() {
  const { state, dispatch } = useSettings();
  const { masterOn, aiAssistant, autoCallNotes } = state.ai;

  const [masterConfirmOpen, setMasterConfirmOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState<'aiAssistant' | 'autoCallNotes' | null>(null);
  const [manageModal, setManageModal] = useState<'aiAssistant' | 'autoCallNotes' | null>(null);

  const [editDefault, setEditDefault] = useState<'On' | 'Off'>('On');
  const [editAllow, setEditAllow] = useState(true);

  // Customize side sheet (deep-dive on AI Assistant)
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [custDraft, setCustDraft] = useState<AiAssistantCustomize>(aiAssistant.customize);
  const [unsavedGuardOpen, setUnsavedGuardOpen] = useState(false);
  const [showRetentionError, setShowRetentionError] = useState(false);

  const retentionInvalid = custDraft.transcriptRetention === '';

  const openCustomize = () => {
    setCustDraft(aiAssistant.customize);
    setShowRetentionError(false);
    setCustomizeOpen(true);
  };

  const handleCloseCustomize = () => {
    const hasChanges = JSON.stringify(custDraft) !== JSON.stringify(aiAssistant.customize);
    if (hasChanges) setUnsavedGuardOpen(true);
    else setCustomizeOpen(false);
  };

  const handleSaveCustomize = () => {
    if (retentionInvalid) {
      setShowRetentionError(true);
      return;
    }
    if (state.simulateError) return;
    dispatch({ type: 'PATCH_AI_ASSISTANT_CUSTOMIZE', payload: custDraft });
    setCustomizeOpen(false);
    showToast('AI Assistant customized.', () => dispatch({ type: 'UNDO' }));
  };

  const openManage = (feature: 'aiAssistant' | 'autoCallNotes') => {
    const featState = state.ai[feature];
    setEditDefault(featState.defaultVal);
    setEditAllow(featState.allowChange);
    setManageModal(feature);
  };

  const handleSaveManage = () => {
    if (!manageModal || state.simulateError) return;
    if (manageModal === 'aiAssistant') {
      dispatch({
        type: 'PATCH_AI_ASSISTANT',
        payload: { defaultVal: editDefault, allowChange: editAllow },
      });
    } else {
      dispatch({
        type: 'PATCH_AI_AUTO_NOTES',
        payload: { defaultVal: editDefault, allowChange: editAllow },
      });
    }
    setManageModal(null);
    showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
  };

  const handleMasterToggle = () => {
    if (masterOn) {
      setMasterConfirmOpen(true);
    } else {
      dispatch({ type: 'TOGGLE_MASTER_AI', payload: true });
      showToast('AI features turned on', () => dispatch({ type: 'UNDO' }));
    }
  };

  const confirmMasterOff = () => {
    dispatch({ type: 'TOGGLE_MASTER_AI', payload: false });
    setMasterConfirmOpen(false);
    showToast('AI features turned off', () => dispatch({ type: 'UNDO' }));
  };

  const confirmReset = () => {
    if (!resetConfirmOpen) return;
    const count = state.ai[resetConfirmOpen].customUsers;
    dispatch({ type: 'RESET_OVERRIDES_AI', payload: resetConfirmOpen });
    setResetConfirmOpen(null);
    showToast(`Reset ${count} user overrides`, () => dispatch({ type: 'UNDO' }));
  };

  const toggleAiAssistant = () => {
    if (!masterOn) return;
    dispatch({ type: 'PATCH_AI_ASSISTANT', payload: { on: !aiAssistant.on } });
    showToast(`AI Assistant turned ${aiAssistant.on ? 'off' : 'on'}`, () => dispatch({ type: 'UNDO' }));
  };

  const toggleAutoCallNotes = () => {
    if (!masterOn) return;
    dispatch({ type: 'PATCH_AI_AUTO_NOTES', payload: { on: !autoCallNotes.on } });
    showToast(`Automatic call notes turned ${autoCallNotes.on ? 'off' : 'on'}`, () =>
      dispatch({ type: 'UNDO' }),
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <SettingCard
        title="AI features"
        switchOn={masterOn}
        icon="ai-stars"
        description="Turn on AI support for calls, messages and video meetings. Deliver real-time answers, call notes, transcripts and meeting recaps to help teams stay focused and organized. Empower users to communicate clearly with built-in writing and polishing tools."
        onSwitchClick={handleMasterToggle}
      />
      <SettingCard
        title="AI Assistant"
        switchOn={aiAssistant.on && masterOn}
        disabled={!masterOn}
        icon="ai-lightbulb"
        description="A personal assistant that helps you boost productivity."
        summary={[
          { label: 'Transcript retention:', value: aiAssistant.customize.transcriptRetention || '—' },
          { label: 'Language:', value: aiAssistant.customize.transcriptLanguage },
          { label: 'User default:', value: aiAssistant.defaultVal },
          {
            value: aiAssistant.allowChange
              ? 'Users can change this setting'
              : 'Users cannot change this setting',
          },
        ]}
        onManage={() => openManage('aiAssistant')}
        onCustomize={masterOn ? openCustomize : undefined}
        onSwitchClick={toggleAiAssistant}
        customUsersCount={aiAssistant.customUsers > 0 ? aiAssistant.customUsers : undefined}
        onResetOverrides={() => setResetConfirmOpen('aiAssistant')}
      />
      <SettingCard
        title="Automatic call notes"
        switchOn={autoCallNotes.on && masterOn}
        disabled={!masterOn}
        icon="ai-writer"
        description="Generate call notes automatically for all your devices."
        summary={[
          { label: 'User default:', value: autoCallNotes.defaultVal },
          {
            value: autoCallNotes.allowChange
              ? 'Users can change this setting'
              : 'Users cannot change this setting',
          },
        ]}
        onManage={() => openManage('autoCallNotes')}
        onSwitchClick={toggleAutoCallNotes}
        customUsersCount={autoCallNotes.customUsers > 0 ? autoCallNotes.customUsers : undefined}
        onResetOverrides={() => setResetConfirmOpen('autoCallNotes')}
      />

      <SpringConfirmDialog
        open={masterConfirmOpen}
        title="Turn off AI features for 98 users? Continue?"
        body="This will turn off AI features for 98 users. Continue? AI Assistant, Automatic call notes, and all AI capabilities will be disabled for everyone in your account. Users will lose access immediately."
        onCancel={() => setMasterConfirmOpen(false)}
        onConfirm={confirmMasterOff}
      />

      <SpringConfirmDialog
        open={!!resetConfirmOpen}
        title={`Reset ${resetConfirmOpen ? state.ai[resetConfirmOpen].customUsers : 0} user overrides?`}
        body="Those users will revert to the default setting."
        onCancel={() => setResetConfirmOpen(null)}
        onConfirm={confirmReset}
      />

      <SpringDialog
        open={!!manageModal}
        title={`Manage ${manageModal === 'aiAssistant' ? 'AI Assistant' : 'Automatic call notes'}`}
        onClose={() => setManageModal(null)}
        onSave={handleSaveManage}
        error={state.simulateError}
      >
        <UserDefaultsRow
          defaultVal={editDefault}
          allowChange={editAllow}
          onDefaultChange={setEditDefault}
          onAllowChangeChange={setEditAllow}
          customCount={manageModal ? state.ai[manageModal].customUsers : 0}
        />
      </SpringDialog>

      {/* AI Assistant Customize side sheet (deep-dive flow) */}
      <DialogPrimitives.Root
        open={customizeOpen}
        onOpenChange={(o) => !o && handleCloseCustomize()}
      >
        <DialogPrimitives.Portal>
          <DialogPrimitives.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitives.Content className="fixed right-0 top-0 bottom-0 z-50 flex w-[440px] flex-col bg-white shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
            <div className="flex items-center justify-between border-b border-[var(--sui-colors-neutral-b4)] px-6 py-4">
              <DialogPrimitives.Title className="text-[18px] font-semibold text-[var(--sui-colors-neutral-b1)]">
                Customize AI Assistant
              </DialogPrimitives.Title>
              <button
                type="button"
                onClick={handleCloseCustomize}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--sui-colors-neutral-b1)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
              >
                <X className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="flex flex-col gap-6">
                {state.simulateError && (
                  <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                    <Info className="h-4 w-4 shrink-0 text-red-600" />
                    <span>Couldn't save settings. Try again.</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[14px] font-semibold text-[var(--sui-colors-neutral-b1)]">
                      Share transcripts with managers
                    </span>
                    <span className="text-[13px] text-[var(--sui-colors-neutral-b2)]">
                      Make AI-generated transcripts visible to direct managers.
                    </span>
                  </div>
                  <SpringSwitch
                    checked={custDraft.shareWithManagers}
                    onCheckedChange={(c) => setCustDraft({ ...custDraft, shareWithManagers: c })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[14px] font-semibold text-[var(--sui-colors-neutral-b1)]">
                    Transcript language
                  </span>
                  <span className="mb-1 text-[13px] text-[var(--sui-colors-neutral-b2)]">
                    Default language used for new transcripts.
                  </span>
                  <SpringSelect
                    value={custDraft.transcriptLanguage}
                    options={[...LANGUAGE_OPTIONS]}
                    onChange={(v) => {
                      const next = LANGUAGE_OPTIONS.find((o) => o === v);
                      if (next) setCustDraft({ ...custDraft, transcriptLanguage: next });
                    }}
                    width={300}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[14px] font-semibold text-[var(--sui-colors-neutral-b1)]">
                    Transcript retention <span className="text-red-600">*</span>
                  </span>
                  <span className="mb-1 text-[13px] text-[var(--sui-colors-neutral-b2)]">
                    How long to keep transcripts before auto-deletion.
                  </span>
                  <SpringSelect
                    value={custDraft.transcriptRetention}
                    options={[...RETENTION_OPTIONS]}
                    onChange={(v) => {
                      const next = RETENTION_OPTIONS.find((o) => o === v);
                      if (next !== undefined) {
                        setCustDraft({ ...custDraft, transcriptRetention: next });
                        if (next !== '') setShowRetentionError(false);
                      }
                    }}
                    width={300}
                  />
                  {showRetentionError && retentionInvalid && (
                    <span className="mt-1 text-[12px] text-red-600">
                      Transcript retention is required.
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-[var(--sui-colors-neutral-b4)] bg-[var(--sui-colors-neutral-b5)]/20 p-4">
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
                className="inline-flex h-[32px] min-w-[56px] items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-3 text-[14px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30 disabled:opacity-50"
              >
                {state.simulateError ? 'Retry' : 'Save'}
              </button>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Portal>
      </DialogPrimitives.Root>

      {/* Unsaved-changes guard */}
      <DialogPrimitives.Root open={unsavedGuardOpen} onOpenChange={setUnsavedGuardOpen}>
        <DialogPrimitives.Portal>
          <DialogPrimitives.Overlay className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-24" />
          <DialogPrimitives.Content className="relative z-[60] flex w-[400px] flex-col gap-6 rounded-[12px] bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-2">
              <DialogPrimitives.Title className="text-[20px] font-semibold text-[var(--sui-colors-neutral-b1)]">
                Discard unsaved changes?
              </DialogPrimitives.Title>
              <DialogPrimitives.Description className="text-[14px] text-[var(--sui-colors-neutral-b1)]">
                You have unsaved changes to AI Assistant. Are you sure you want to discard them?
              </DialogPrimitives.Description>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setUnsavedGuardOpen(false)}
                className="inline-flex h-[32px] rounded-[10px] border border-black/20 px-3 text-[14px] font-medium hover:bg-[var(--sui-colors-neutral-b4)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
              >
                Keep editing
              </button>
              <button
                onClick={() => {
                  setUnsavedGuardOpen(false);
                  setCustomizeOpen(false);
                }}
                className="inline-flex h-[32px] rounded-[10px] bg-red-600 px-3 text-[14px] font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600/30"
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
