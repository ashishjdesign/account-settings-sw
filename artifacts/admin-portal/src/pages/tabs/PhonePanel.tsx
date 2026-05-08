import React, { useState } from 'react';
import { useSettings } from '../../store';
import {
  SettingCard,
  SpringFeatureManageDialog,
  SpringFeatureEnableDialog,
  SpringConfirmDialog,
  ExtAppFeatureSettingsDialog,
  showToast,
} from '../../components/shared';

export default function PhonePanel() {
  const { state, dispatch } = useSettings();
  const { externalAppOn, extApp, autoAnswer, conferenceCallsOn } = state.phone;

  const [manageOpen, setManageOpen] = useState(false);
  const [extEnableOpen, setExtEnableOpen] = useState(false);
  const [extDisableOpen, setExtDisableOpen] = useState(false);
  const [extSettingsOpen, setExtSettingsOpen] = useState(false);
  const [extManageOpen, setExtManageOpen] = useState(false);
  // Stage the first-enable deployment choices until the user finishes (or
  // skips) the follow-on settings dialog. Cancel must abort onboarding fully.
  const [pendingEnable, setPendingEnable] = useState<
    | { defaultVal: 'On' | 'Off'; allowChange: boolean }
    | null
  >(null);

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
        summary={externalAppOn ? [
          { label: 'User default:', value: extApp.defaultVal },
          { label: 'User access:', value: extApp.allowChange ? 'Allowed' : 'Restricted' },
        ] : undefined}
        onManage={externalAppOn ? () => setExtManageOpen(true) : undefined}
        onSwitchClick={() => {
          if (externalAppOn) setExtDisableOpen(true);
          else setExtEnableOpen(true);
        }}
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

      {/* Launch external app — first-time enable + Manage */}
      <SpringFeatureEnableDialog
        open={extEnableOpen}
        title="Turn on Launch an external app for incoming calls?"
        customCount={extApp.customUsers}
        onCancel={() => setExtEnableOpen(false)}
        onConfirm={(result) => {
          // Stage deployment choices; do NOT dispatch yet so Cancel on the
          // follow-on settings dialog can abort cleanly.
          setPendingEnable({ defaultVal: result.defaultVal, allowChange: result.allowChange });
          setExtEnableOpen(false);
          setExtSettingsOpen(true);
        }}
      />
      <ExtAppFeatureSettingsDialog
        open={extSettingsOpen}
        initialUrl={extApp.launchUrl}
        initialTrigger={extApp.trigger}
        onCancel={() => {
          // Cancel aborts the entire onboarding — nothing committed.
          setExtSettingsOpen(false);
          setPendingEnable(null);
        }}
        onSkip={() => {
          if (pendingEnable) {
            dispatch({
              type: 'PATCH_PHONE_EXT_APP',
              payload: { on: true, defaultVal: pendingEnable.defaultVal, allowChange: pendingEnable.allowChange },
            });
          }
          setPendingEnable(null);
          setExtSettingsOpen(false);
          showToast('Launch an external app for incoming calls is on.');
        }}
        onSave={(result) => {
          dispatch({
            type: 'PATCH_PHONE_EXT_APP',
            payload: pendingEnable
              ? {
                  on: true,
                  defaultVal: pendingEnable.defaultVal,
                  allowChange: pendingEnable.allowChange,
                  launchUrl: result.launchUrl,
                  trigger: result.trigger,
                }
              : { launchUrl: result.launchUrl, trigger: result.trigger },
          });
          setPendingEnable(null);
          setExtSettingsOpen(false);
          showToast('Settings were saved.');
        }}
      />
      <SpringFeatureManageDialog
        open={extManageOpen}
        title="Manage Launch an external app for incoming calls settings"
        defaultVal={extApp.defaultVal}
        allowChange={extApp.allowChange}
        customCount={extApp.customUsers}
        onCancel={() => setExtManageOpen(false)}
        onConfirm={(result) => {
          dispatch({
            type: 'PATCH_PHONE_EXT_APP',
            payload: { defaultVal: result.defaultVal, allowChange: result.allowChange },
          });
          setExtManageOpen(false);
          showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
        }}
      />
      <SpringConfirmDialog
        open={extDisableOpen}
        title="Turn off Launch an external app for incoming calls?"
        body="Incoming calls will no longer open the external app or website you configured. You can turn this back on at any time."
        confirmLabel="Turn off"
        onCancel={() => setExtDisableOpen(false)}
        onConfirm={() => {
          dispatch({ type: 'SET_PHONE_EXTERNAL_APP', payload: false });
          setExtDisableOpen(false);
          showToast('Launch an external app for incoming calls is off.');
        }}
      />
    </div>
  );
}
