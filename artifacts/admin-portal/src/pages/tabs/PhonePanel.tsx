import React, { useState } from 'react';
import { useSettings } from '../../store';
import { SettingCard, SpringDialog, UserDefaultsRow, showToast } from '../../components/shared';

export default function PhonePanel() {
  const { state, dispatch } = useSettings();
  const { externalAppOn, autoAnswer, conferenceCallsOn } = state.phone;

  const [manageOpen, setManageOpen] = useState(false);
  const [editDefault, setEditDefault] = useState<'On' | 'Off'>(autoAnswer.defaultVal);
  const [editAllow, setEditAllow] = useState(autoAnswer.allowChange);

  const openManage = () => {
    setEditDefault(autoAnswer.defaultVal);
    setEditAllow(autoAnswer.allowChange);
    setManageOpen(true);
  };

  const handleSaveManage = () => {
    if (state.simulateError) return;
    dispatch({ type: 'SNAPSHOT' });
    dispatch({
      type: 'UPDATE_FEATURE',
      payload: {
        tab: 'phone',
        feature: 'autoAnswer',
        data: { defaultVal: editDefault, allowChange: editAllow },
      },
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
        onSwitchClick={() =>
          dispatch({
            type: 'UPDATE_FEATURE',
            payload: { tab: 'phone', feature: 'externalAppOn', data: !externalAppOn },
          })
        }
      />
      <SettingCard
        title="Auto-answer calls"
        switchOn={autoAnswer.on}
        icon="active-call"
        description="Allow users to turn on Auto-Answer for incoming calls in the RingCentral desktop app."
        summary={[
          { label: 'User default:', value: autoAnswer.defaultVal },
          { value: autoAnswer.allowChange ? 'Users can change this setting' : 'Users cannot change this setting' },
        ]}
        onManage={openManage}
        onSwitchClick={() =>
          dispatch({
            type: 'UPDATE_FEATURE',
            payload: { tab: 'phone', feature: 'autoAnswer', data: { on: !autoAnswer.on } },
          })
        }
      />
      <SettingCard
        title="Conference calls"
        switchOn={conferenceCallsOn}
        icon="conference"
        description="Allow hosts to leave conference call without ending them."
        onSwitchClick={() =>
          dispatch({
            type: 'UPDATE_FEATURE',
            payload: { tab: 'phone', feature: 'conferenceCallsOn', data: !conferenceCallsOn },
          })
        }
      />

      <SpringDialog
        open={manageOpen}
        title="Manage Auto-answer calls"
        onClose={() => setManageOpen(false)}
        onSave={handleSaveManage}
        error={state.simulateError}
      >
        <UserDefaultsRow
          defaultVal={editDefault}
          allowChange={editAllow}
          onDefaultChange={setEditDefault}
          onAllowChangeChange={setEditAllow}
          customCount={autoAnswer.customUsers}
        />
      </SpringDialog>
    </div>
  );
}
