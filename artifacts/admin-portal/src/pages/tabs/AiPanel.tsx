import React, { useState } from 'react';
import { useSettings } from '../../store';
import { SettingCard, SpringConfirmDialog, SpringDialog, UserDefaultsRow, showToast } from '../../components/shared';

export default function AiPanel() {
  const { state, dispatch } = useSettings();
  const { masterOn, aiAssistant, autoCallNotes } = state.ai;

  const [masterConfirmOpen, setMasterConfirmOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState<'aiAssistant' | 'autoCallNotes' | null>(null);
  const [manageModal, setManageModal] = useState<'aiAssistant' | 'autoCallNotes' | null>(null);

  // Manage state
  const [editDefault, setEditDefault] = useState<'On'|'Off'>('On');
  const [editAllow, setEditAllow] = useState(true);

  const openManage = (feature: 'aiAssistant' | 'autoCallNotes') => {
    const featState = state.ai[feature];
    setEditDefault(featState.defaultVal);
    setEditAllow(featState.allowChange);
    setManageModal(feature);
  };

  const handleSaveManage = () => {
    if (manageModal && !state.simulateError) {
      dispatch({ type: 'SNAPSHOT' });
      dispatch({ 
        type: 'UPDATE_FEATURE', 
        payload: { tab: 'ai', feature: manageModal, data: { defaultVal: editDefault, allowChange: editAllow } } 
      });
      setManageModal(null);
      showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
    }
  };

  const handleMasterToggle = () => {
    if (masterOn) {
      setMasterConfirmOpen(true);
    } else {
      dispatch({ type: 'SNAPSHOT' });
      dispatch({ type: 'TOGGLE_MASTER_AI', payload: true });
      showToast('AI features turned on', () => dispatch({ type: 'UNDO' }));
    }
  };

  const confirmMasterOff = () => {
    dispatch({ type: 'SNAPSHOT' });
    dispatch({ type: 'TOGGLE_MASTER_AI', payload: false });
    setMasterConfirmOpen(false);
    showToast('AI features turned off', () => dispatch({ type: 'UNDO' }));
  };

  const confirmReset = () => {
    if (resetConfirmOpen) {
      dispatch({ type: 'SNAPSHOT' });
      dispatch({ type: 'RESET_OVERRIDES', payload: { tab: 'ai', feature: resetConfirmOpen } });
      const count = state.ai[resetConfirmOpen].customUsers;
      setResetConfirmOpen(null);
      showToast(`Reset ${count} user overrides`, () => dispatch({ type: 'UNDO' }));
    }
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
          { label: 'Data retention period:', value: '365 days' },
          { label: 'User default:', value: aiAssistant.defaultVal },
          { value: aiAssistant.allowChange ? 'Users can change this setting' : 'Users cannot change this setting' },
        ]}
        onManage={() => openManage('aiAssistant')}
        onSwitchClick={() => {
          if(!masterOn) return;
          dispatch({ type: 'SNAPSHOT' });
          dispatch({ type: 'UPDATE_FEATURE', payload: { tab: 'ai', feature: 'aiAssistant', data: { on: !aiAssistant.on } }});
        }}
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
          { value: autoCallNotes.allowChange ? 'Users can change this setting' : 'Users cannot change this setting' },
        ]}
        onManage={() => openManage('autoCallNotes')}
        onSwitchClick={() => {
          if(!masterOn) return;
          dispatch({ type: 'SNAPSHOT' });
          dispatch({ type: 'UPDATE_FEATURE', payload: { tab: 'ai', feature: 'autoCallNotes', data: { on: !autoCallNotes.on } }});
        }}
        customUsersCount={autoCallNotes.customUsers > 0 ? autoCallNotes.customUsers : undefined}
        onResetOverrides={() => setResetConfirmOpen('autoCallNotes')}
      />

      <SpringConfirmDialog
        open={masterConfirmOpen}
        title="Turn off AI features for 98 users?"
        body="This will disable AI Assistant, Automatic call notes, and all AI capabilities for everyone in your account. Users will lose access immediately."
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
    </div>
  );
}
