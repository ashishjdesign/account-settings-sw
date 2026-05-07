import React, { useState } from 'react';
import { useSettings } from '../../store';
import {
  SettingCard,
  SpringConfirmDialog,
  SpringDialog,
  SpringSelect,
  SubRow,
  LabelWithInfo,
  UserDefaultsRow,
  showToast,
} from '../../components/shared';

const RETENTION_OPTIONS = ['30 days', '90 days', '365 days'] as const;

export default function AiPanel() {
  const { state, dispatch } = useSettings();
  const { masterOn, aiAssistant, autoCallNotes } = state.ai;

  type AiKey = 'aiAssistant' | 'autoCallNotes';
  const [masterConfirmOpen, setMasterConfirmOpen] = useState(false);
  const [manageModal, setManageModal] = useState<AiKey | null>(null);

  const featureLabels: Record<AiKey, string> = {
    aiAssistant: 'AI Assistant',
    autoCallNotes: 'Automatic call notes',
  };

  const dispatchPatch = (key: AiKey, payload: Partial<typeof aiAssistant>) => {
    if (key === 'aiAssistant') dispatch({ type: 'PATCH_AI_ASSISTANT', payload });
    else if (key === 'autoCallNotes') dispatch({ type: 'PATCH_AI_AUTO_NOTES', payload });
  };

  const [editDefault, setEditDefault] = useState<'On' | 'Off'>('On');
  const [editAllow, setEditAllow] = useState(true);
  const [editRetention, setEditRetention] = useState<'30 days' | '90 days' | '365 days'>('365 days');

  const openManage = (feature: AiKey) => {
    const featState = state.ai[feature];
    setEditDefault(featState.defaultVal);
    setEditAllow(featState.allowChange);
    if (feature === 'aiAssistant') {
      const r = aiAssistant.customize.transcriptRetention;
      setEditRetention(r === '' ? '365 days' : r);
    }
    setManageModal(feature);
  };

  const handleSaveManage = () => {
    if (!manageModal) return;
    if (state.simulateError) {
      dispatch({ type: 'TOGGLE_SIMULATE_ERROR' });
      return;
    }
    dispatchPatch(manageModal, { defaultVal: editDefault, allowChange: editAllow });
    if (manageModal === 'aiAssistant') {
      dispatch({
        type: 'PATCH_AI_ASSISTANT_CUSTOMIZE',
        payload: { transcriptRetention: editRetention },
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

  const toggleChild = (key: AiKey) => {
    if (!masterOn) return;
    const cur = state.ai[key].on;
    dispatchPatch(key, { on: !cur });
    showToast(`${featureLabels[key]} turned ${cur ? 'off' : 'on'}`, () => dispatch({ type: 'UNDO' }));
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
          { label: 'Data retention period:', value: aiAssistant.customize.transcriptRetention || '365 days' },
          { label: 'User default:', value: aiAssistant.defaultVal },
          {
            value: aiAssistant.allowChange
              ? 'Users can change this setting'
              : 'Users cannot change this setting',
          },
        ]}
        onManage={() => openManage('aiAssistant')}
        onSwitchClick={() => toggleChild('aiAssistant')}
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
        onSwitchClick={() => toggleChild('autoCallNotes')}
      />

      <SpringConfirmDialog
        open={masterConfirmOpen}
        title="Turn off AI features?"
        body="This will turn off AI features for 98 users. Continue?"
        onCancel={() => setMasterConfirmOpen(false)}
        onConfirm={confirmMasterOff}
      />

      <SpringDialog
        open={!!manageModal}
        title={`Manage ${manageModal ? featureLabels[manageModal] : ''}`}
        onClose={() => setManageModal(null)}
        onSave={handleSaveManage}
        error={state.simulateError}
      >
        {manageModal === 'aiAssistant' && (
          <SubRow>
            <LabelWithInfo>AI notes and transcriptions retention period</LabelWithInfo>
            <SpringSelect
              value={editRetention}
              options={[...RETENTION_OPTIONS]}
              onChange={(v) => {
                const next = RETENTION_OPTIONS.find((o) => o === v);
                if (next) setEditRetention(next);
              }}
              width={200}
            />
          </SubRow>
        )}
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
