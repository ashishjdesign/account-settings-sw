import React, { useState } from 'react';
import { useSettings, type AutoAnswerDelay } from '../../store';
import {
  SettingCard,
  SpringConfirmDialog,
  ExtAppEnableCombinedDialog,
  ExtAppManageDialog,
  AutoAnswerManageDialog,
  AutoAnswerReEnableDialog,
  ConferenceManageDialog,
  ConferenceReEnableDialog,
  showToast,
} from '../../components/shared';

export default function PhonePanel() {
  const { state, dispatch } = useSettings();
  const { externalAppOn, extApp, autoAnswer, conference } = state.phone;

  const [manageOpen, setManageOpen] = useState(false);
  const [autoAnswerEnableOpen, setAutoAnswerEnableOpen] = useState(false);
  const [autoAnswerDisableOpen, setAutoAnswerDisableOpen] = useState(false);
  const [conferenceManageOpen, setConferenceManageOpen] = useState(false);
  const [conferenceEnableOpen, setConferenceEnableOpen] = useState(false);
  const [conferenceDisableOpen, setConferenceDisableOpen] = useState(false);
  const [extEnableOpen, setExtEnableOpen] = useState(false);
  const [extDisableOpen, setExtDisableOpen] = useState(false);
  const [extManageOpen, setExtManageOpen] = useState(false);

  const handleSaveManage = (result: { defaultVal: 'On' | 'Off'; allowChange: boolean; delay: AutoAnswerDelay }) => {
    if (state.simulateError) {
      dispatch({ type: 'TOGGLE_SIMULATE_ERROR' });
      return;
    }
    dispatch({
      type: 'PATCH_PHONE_AUTO_ANSWER',
      payload: { defaultVal: result.defaultVal, allowChange: result.allowChange, delay: result.delay },
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
        summary={autoAnswer.on ? [
          { label: 'User default:', value: autoAnswer.defaultVal },
          { label: 'User access:', value: autoAnswer.allowChange ? 'Allowed' : 'Restricted' },
        ] : undefined}
        onManage={autoAnswer.on ? () => setManageOpen(true) : undefined}
        onSwitchClick={() => {
          if (autoAnswer.on) setAutoAnswerDisableOpen(true);
          else setAutoAnswerEnableOpen(true);
        }}
      />
      <SettingCard
        title="Conference calls"
        switchOn={conference.on}
        icon="conference"
        description="Allow hosts to leave conference call without ending them."
        summary={conference.on ? [
          { label: 'User default:', value: conference.defaultVal },
          { label: 'User access:', value: conference.allowChange ? 'Allowed' : 'Restricted' },
        ] : undefined}
        onManage={conference.on ? () => setConferenceManageOpen(true) : undefined}
        onSwitchClick={() => {
          if (conference.on) setConferenceDisableOpen(true);
          else setConferenceEnableOpen(true);
        }}
      />

      <AutoAnswerManageDialog
        open={manageOpen}
        defaultVal={autoAnswer.defaultVal}
        allowChange={autoAnswer.allowChange}
        delay={autoAnswer.delay}
        customCount={autoAnswer.customUsers}
        onCancel={() => setManageOpen(false)}
        onConfirm={handleSaveManage}
        error={state.simulateError}
      />

      <AutoAnswerReEnableDialog
        open={autoAnswerEnableOpen}
        delay={autoAnswer.delay}
        customCount={autoAnswer.customUsers}
        onCancel={() => setAutoAnswerEnableOpen(false)}
        onConfirm={(result) => {
          dispatch({
            type: 'PATCH_PHONE_AUTO_ANSWER',
            payload: {
              on: true,
              defaultVal: result.defaultVal,
              allowChange: result.allowChange,
              delay: result.delay,
              ...(result.customAction === 'reset' ? { customUsers: 0 } : {}),
            },
          });
          setAutoAnswerEnableOpen(false);
          showToast('Auto-answer calls is on.');
        }}
      />

      <SpringConfirmDialog
        open={autoAnswerDisableOpen}
        title="Turn off Auto-answer calls for your organization?"
        body={<>This feature will be turned off for your account and no longer available to users.<br />When turned back on, previous user settings can be restored.</>}
        confirmLabel="Turn off"
        onCancel={() => setAutoAnswerDisableOpen(false)}
        onConfirm={() => {
          dispatch({ type: 'PATCH_PHONE_AUTO_ANSWER', payload: { on: false } });
          setAutoAnswerDisableOpen(false);
          showToast('Auto-answer calls is off.');
        }}
      />

      {/* Conference calls — Manage / Re-enable / Disable. Mirrors Auto-answer
          wiring exactly so modal styling and the User deployment block stay
          consistent across all Manage screens (the user's #1 priority). */}
      <ConferenceManageDialog
        open={conferenceManageOpen}
        defaultVal={conference.defaultVal}
        allowChange={conference.allowChange}
        customCount={conference.customUsers}
        onCancel={() => setConferenceManageOpen(false)}
        onConfirm={(result) => {
          if (state.simulateError) {
            dispatch({ type: 'TOGGLE_SIMULATE_ERROR' });
            return;
          }
          dispatch({
            type: 'PATCH_PHONE_CONFERENCE',
            payload: { defaultVal: result.defaultVal, allowChange: result.allowChange },
          });
          setConferenceManageOpen(false);
          showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
        }}
        error={state.simulateError}
      />

      <ConferenceReEnableDialog
        open={conferenceEnableOpen}
        customCount={conference.customUsers}
        onCancel={() => setConferenceEnableOpen(false)}
        onConfirm={(result) => {
          dispatch({
            type: 'PATCH_PHONE_CONFERENCE',
            payload: {
              on: true,
              defaultVal: result.defaultVal,
              allowChange: result.allowChange,
              ...(result.customAction === 'reset' ? { customUsers: 0 } : {}),
            },
          });
          setConferenceEnableOpen(false);
          showToast('Conference calls is on.');
        }}
      />

      <SpringConfirmDialog
        open={conferenceDisableOpen}
        title="Turn off Conference calls for your organization?"
        body={<>This feature will be turned off for your account and no longer available to users.<br />When turned back on, previous user settings can be restored.</>}
        confirmLabel="Turn off"
        onCancel={() => setConferenceDisableOpen(false)}
        onConfirm={() => {
          dispatch({ type: 'PATCH_PHONE_CONFERENCE', payload: { on: false } });
          setConferenceDisableOpen(false);
          showToast('Conference calls is off.');
        }}
      />

      {/* Launch external app — single combined enable dialog (Figma node
          2013:40428). Shown for both first-time enable and re-enable; the
          custom-users decision section auto-hides when there are no
          custom users. URL is required when Default = On (button stays
          disabled with a tooltip until a URL is provided). */}
      <ExtAppEnableCombinedDialog
        open={extEnableOpen}
        initialUrl={extApp.launchUrl}
        initialTrigger={extApp.trigger}
        customCount={extApp.customUsers}
        onCancel={() => setExtEnableOpen(false)}
        onConfirm={(result) => {
          dispatch({
            type: 'PATCH_PHONE_EXT_APP',
            payload: {
              on: true,
              defaultVal: result.defaultVal,
              allowChange: result.allowChange,
              launchUrl: result.launchUrl,
              trigger: result.trigger,
              everEnabled: true,
              ...(result.customAction === 'reset' ? { customUsers: 0 } : {}),
            },
          });
          setExtEnableOpen(false);
          showToast('Launch an external app for incoming calls is on.');
        }}
      />
      <ExtAppManageDialog
        open={extManageOpen}
        defaultVal={extApp.defaultVal}
        allowChange={extApp.allowChange}
        launchUrl={extApp.launchUrl}
        trigger={extApp.trigger}
        customCount={extApp.customUsers}
        error={state.simulateError}
        onCancel={() => setExtManageOpen(false)}
        onConfirm={(result) => {
          if (state.simulateError) {
            dispatch({ type: 'TOGGLE_SIMULATE_ERROR' });
            return;
          }
          dispatch({
            type: 'PATCH_PHONE_EXT_APP',
            payload: {
              defaultVal: result.defaultVal,
              allowChange: result.allowChange,
              launchUrl: result.launchUrl,
              trigger: result.trigger,
            },
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
