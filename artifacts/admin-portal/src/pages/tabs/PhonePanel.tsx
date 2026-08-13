import React, { useState } from 'react';
import { useSettings } from '../../store';
import {
  SettingCard,
  SpringConfirmDialog,
  ExtAppEnableCombinedDialog,
  ExtAppManageDialog,
  showToast,
} from '../../components/shared';

export default function PhonePanel() {
  const { state, dispatch } = useSettings();
  const { externalAppOn, extApp, autoAnswer, conference } = state.phone;

  // Auto-answer calls and Conference calls are account-level only — users
  // manage their own setting once enabled, so admins get plain on/off
  // confirmations (same experience as User activation). No Manage dialog,
  // no user deployment.
  const [autoAnswerConfirmOpen, setAutoAnswerConfirmOpen] = useState(false);
  const [conferenceConfirmOpen, setConferenceConfirmOpen] = useState(false);
  const [extEnableOpen, setExtEnableOpen] = useState(false);
  const [extDisableOpen, setExtDisableOpen] = useState(false);
  const [extManageOpen, setExtManageOpen] = useState(false);

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
        onSwitchClick={() => setAutoAnswerConfirmOpen(true)}
      />
      <SettingCard
        title="Conference calls"
        switchOn={conference.on}
        icon="conference"
        description="Allow hosts to leave conference call without ending them."
        onSwitchClick={() => setConferenceConfirmOpen(true)}
      />

      {/* Auto-answer calls and Conference calls follow the User activation
          experience — general confirmation modals only; users manage their
          own setting once the feature is on for the account. */}
      <SpringConfirmDialog
        open={autoAnswerConfirmOpen}
        title={
          autoAnswer.on
            ? 'Turn off Auto-answer calls for your organization?'
            : 'Turn on Auto-answer calls for your organization?'
        }
        body={
          autoAnswer.on
            ? 'This will prevent users in your organization from using Auto-answer for incoming calls.'
            : 'This will allow users in your organization to turn on Auto-answer for incoming calls in the RingCentral desktop app. Users manage this setting on their own.'
        }
        confirmLabel={autoAnswer.on ? 'Turn off' : 'Turn on'}
        onCancel={() => setAutoAnswerConfirmOpen(false)}
        onConfirm={() => {
          dispatch({ type: 'PATCH_PHONE_AUTO_ANSWER', payload: { on: !autoAnswer.on } });
          setAutoAnswerConfirmOpen(false);
          showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
        }}
      />

      <SpringConfirmDialog
        open={conferenceConfirmOpen}
        title={
          conference.on
            ? 'Turn off Conference calls for your organization?'
            : 'Turn on Conference calls for your organization?'
        }
        body={
          conference.on
            ? 'Users who host conference calls won\u2019t be able to leave them without ending the call for everyone.'
            : 'Users who host conference calls will be able to leave them without ending the call for everyone. Users manage this setting on their own.'
        }
        confirmLabel={conference.on ? 'Turn off' : 'Turn on'}
        onCancel={() => setConferenceConfirmOpen(false)}
        onConfirm={() => {
          dispatch({ type: 'PATCH_PHONE_CONFERENCE', payload: { on: !conference.on } });
          setConferenceConfirmOpen(false);
          showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
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
        isFirstTimeEnable={!extApp.everEnabled}
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
        body="This feature will be turned off for your account and no longer available to users. When turned back on, previous user settings can be restored."
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
