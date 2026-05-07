import React, { useState } from 'react';
import { useSettings } from '../../store';
import {
  SettingCard,
  SpringConfirmDialog,
  SpringDialog,
  SpringFeatureManageDialog,
  SpringSelect,
  SubRow,
  LabelWithInfo,
  showToast,
} from '../../components/shared';

const RETENTION_OPTIONS = ['30 days', '90 days', '365 days'] as const;

export default function AiPanel() {
  const { state, dispatch } = useSettings();
  const { masterOn, aiAssistant, autoCallNotes } = state.ai;

  type AiKey = 'aiAssistant' | 'autoCallNotes';
  type ManageKey = 'aiFeatures' | AiKey;
  const [masterConfirmOpen, setMasterConfirmOpen] = useState(false);
  const [manageModal, setManageModal] = useState<ManageKey | null>(null);

  const manageLabels: Record<ManageKey, string> = {
    aiFeatures: 'AI features',
    aiAssistant: 'AI Assistant',
    autoCallNotes: 'Automatic call notes',
  };

  const dispatchPatch = (key: AiKey, payload: Partial<typeof aiAssistant>) => {
    if (key === 'aiAssistant') dispatch({ type: 'PATCH_AI_ASSISTANT', payload });
    else if (key === 'autoCallNotes') dispatch({ type: 'PATCH_AI_AUTO_NOTES', payload });
  };

  const [editRetention, setEditRetention] = useState<'30 days' | '90 days' | '365 days'>('365 days');

  const openManage = (key: ManageKey) => {
    if (key === 'aiFeatures') {
      const r = aiAssistant.customize.transcriptRetention;
      setEditRetention(r === '' ? '365 days' : r);
    }
    setManageModal(key);
  };

  const handleSaveAiFeatures = () => {
    if (state.simulateError) {
      dispatch({ type: 'TOGGLE_SIMULATE_ERROR' });
      return;
    }
    dispatch({
      type: 'PATCH_AI_ASSISTANT_CUSTOMIZE',
      payload: { transcriptRetention: editRetention },
    });
    setManageModal(null);
    showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
  };

  const handleSaveFeatureManage = (
    key: AiKey,
    result: { defaultVal: 'On' | 'Off'; allowChange: boolean },
  ) => {
    if (state.simulateError) {
      dispatch({ type: 'TOGGLE_SIMULATE_ERROR' });
      return;
    }
    dispatchPatch(key, { defaultVal: result.defaultVal, allowChange: result.allowChange });
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
    showToast(`${manageLabels[key]} turned ${cur ? 'off' : 'on'}`, () => dispatch({ type: 'UNDO' }));
  };

  return (
    <div className="flex flex-col gap-4">
      <SettingCard
        title="AI features"
        switchOn={masterOn}
        icon="ai-stars"
        description="Turn on AI support for calls, messages and video meetings. Deliver real-time answers, call notes, transcripts and meeting recaps to help teams stay focused and organized. Empower users to communicate clearly with built-in writing and polishing tools."
        summary={[
          { label: 'Data retention period:', value: aiAssistant.customize.transcriptRetention || '365 days' },
        ]}
        onManage={() => openManage('aiFeatures')}
        onSwitchClick={handleMasterToggle}
      />
      <SettingCard
        title="AI Assistant"
        switchOn={aiAssistant.on && masterOn}
        disabled={!masterOn}
        icon="ai-lightbulb"
        description="A personal assistant that helps you boost productivity."
        summary={[
          { label: 'User default:', value: aiAssistant.defaultVal },
          { label: 'User access:', value: aiAssistant.allowChange ? 'Allowed' : 'Restricted' },
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
          { label: 'User access:', value: autoCallNotes.allowChange ? 'Allowed' : 'Restricted' },
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
        open={manageModal === 'aiFeatures'}
        title="Manage AI features"
        onClose={() => setManageModal(null)}
        onSave={handleSaveAiFeatures}
        error={state.simulateError}
      >
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
      </SpringDialog>

      <SpringFeatureManageDialog
        open={manageModal === 'aiAssistant'}
        title={`Manage ${manageLabels.aiAssistant} settings`}
        defaultVal={aiAssistant.defaultVal}
        allowChange={aiAssistant.allowChange}
        customCount={aiAssistant.customUsers}
        onCancel={() => setManageModal(null)}
        onConfirm={(r) => handleSaveFeatureManage('aiAssistant', r)}
        error={state.simulateError}
      />

      <SpringFeatureManageDialog
        open={manageModal === 'autoCallNotes'}
        title={`Manage ${manageLabels.autoCallNotes} settings`}
        defaultVal={autoCallNotes.defaultVal}
        allowChange={autoCallNotes.allowChange}
        customCount={autoCallNotes.customUsers}
        onCancel={() => setManageModal(null)}
        onConfirm={(r) => handleSaveFeatureManage('autoCallNotes', r)}
        error={state.simulateError}
      />
    </div>
  );
}
