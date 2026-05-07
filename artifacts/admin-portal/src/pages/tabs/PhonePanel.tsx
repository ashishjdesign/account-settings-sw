import React, { useState } from 'react';
import { useSettings } from '../../store';
import { SettingCard, SpringFeatureManageDialog, showToast } from '../../components/shared';

export default function PhonePanel() {
  const { state, dispatch } = useSettings();
  const { externalAppOn, autoAnswer, conferenceCallsOn } = state.phone;

  const [manageOpen, setManageOpen] = useState(false);

  const handleSaveManage = (result: { defaultVal: 'On' | 'Off'; allowChange: boolean }) => {
    if (state.simulateError) {
      dispatch({ type: 'TOGGLE_SIMULATE_ERROR' });
      return;
    }
    dispatch({
      type: 'PATCH_PHONE_AUTO_ANSWER',
      payload: { defaultVal: result.defaultVal, allowChange: result.allowChange },
    });
    setManageOpen(false);
    showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
  };

  return (
    <div className="flex flex-col gap-4">
      <SettingCard
        title="Launch an external app for incoming calls"
        switchOn={externalAppOn}
        icon="tear-out-window"
        description="Have incoming calls open an external app or website, like a CRM system or online database."
        onSwitchClick={() => dispatch({ type: 'SET_PHONE_EXTERNAL_APP', payload: !externalAppOn })}
      />
      <SettingCard
        title="Auto-answer calls"
        switchOn={autoAnswer.on}
        icon="active-call"
        description="Allow users to turn on Auto-Answer for incoming calls in the RingCentral desktop app."
        summary={[
          { label: 'User default:', value: autoAnswer.defaultVal },
          { label: 'User access:', value: autoAnswer.allowChange ? 'Allowed' : 'Restricted' },
        ]}
        onManage={() => setManageOpen(true)}
        onSwitchClick={() =>
          dispatch({ type: 'PATCH_PHONE_AUTO_ANSWER', payload: { on: !autoAnswer.on } })
        }
      />
      <SettingCard
        title="Conference calls"
        switchOn={conferenceCallsOn}
        icon="conference"
        description="Allow hosts to leave conference call without ending them."
        onSwitchClick={() => dispatch({ type: 'SET_PHONE_CONFERENCE', payload: !conferenceCallsOn })}
      />

      <SpringFeatureManageDialog
        open={manageOpen}
        title="Manage Auto-answer calls settings"
        defaultVal={autoAnswer.defaultVal}
        allowChange={autoAnswer.allowChange}
        customCount={autoAnswer.customUsers}
        onCancel={() => setManageOpen(false)}
        onConfirm={handleSaveManage}
        error={state.simulateError}
      />
    </div>
  );
}
