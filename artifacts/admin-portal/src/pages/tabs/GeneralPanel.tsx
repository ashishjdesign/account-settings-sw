import React, { useState } from 'react';
import { useSettings } from '../../store';
import { SettingCard, SpringConfirmDialog, SpringFeatureManageDialog, showToast } from '../../components/shared';

export default function GeneralPanel() {
  const { state, dispatch } = useSettings();
  const { userActivationOn, guides } = state.general;

  const [uaConfirmOpen, setUaConfirmOpen] = useState(false);
  const [guidesDisableConfirmOpen, setGuidesDisableConfirmOpen] = useState(false);
  const [guidesManageOpen, setGuidesManageOpen] = useState(false);

  const handleSaveGuides = (result: { defaultVal: 'On' | 'Off'; allowChange: boolean }) => {
    if (state.simulateError) {
      dispatch({ type: 'TOGGLE_SIMULATE_ERROR' });
      return;
    }
    dispatch({
      type: 'PATCH_GENERAL_GUIDES',
      payload: { defaultVal: result.defaultVal, allowChange: result.allowChange },
    });
    setGuidesManageOpen(false);
    showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
  };

  const openManage = () => setGuidesManageOpen(true);

  return (
    <div className="flex flex-col gap-4">
      <SettingCard
        title="User activation"
        switchOn={userActivationOn}
        icon="user-activation"
        description="Let users re-generate an activation email if it's been less than 30 days since the last one was sent."
        onSwitchClick={() => setUaConfirmOpen(true)}
      />

      <h2 className="mt-2 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
        In-app notification
      </h2>

      <SettingCard
        title="Guides, tutorials & announcements"
        switchOn={guides.on}
        icon="resource-center"
        description="Displays helpful guides, tutorials, important company-wide updates, and service promotions directly to your users."
        summary={
          guides.on
            ? [
                { label: 'User default:', value: guides.defaultVal },
                { label: 'User access:', value: guides.allowChange ? 'Allowed' : 'Restricted' },
              ]
            : undefined
        }
        onManage={openManage}
        onSwitchClick={() => {
          if (guides.on) {
            setGuidesDisableConfirmOpen(true);
          } else {
            dispatch({ type: 'PATCH_GENERAL_GUIDES', payload: { on: true } });
            showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
          }
        }}
      />

      <SpringConfirmDialog
        open={uaConfirmOpen}
        title={
          userActivationOn
            ? 'Turn off User activation for your organization?'
            : 'Turn on User activation for your organization?'
        }
        body={
          userActivationOn
            ? 'This will prevent users in your organization from re-generating their activation email.'
            : 'This will allow all users in your organization to re-generate their activation email.'
        }
        confirmLabel={userActivationOn ? 'Turn off' : 'Turn on'}
        onCancel={() => setUaConfirmOpen(false)}
        onConfirm={() => {
          dispatch({ type: 'SET_GENERAL_USER_ACTIVATION', payload: !userActivationOn });
          setUaConfirmOpen(false);
          showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
        }}
      />

      <SpringConfirmDialog
        open={guidesDisableConfirmOpen}
        title="Turn off Guides, tutorials & announcements for your organization?"
        body={
          <>
            This feature will be turned off for your account and no longer available to users.
            <br />
            When turned back on, previous user settings can be restored.
          </>
        }
        confirmLabel="Turn off"
        onCancel={() => setGuidesDisableConfirmOpen(false)}
        onConfirm={() => {
          dispatch({ type: 'PATCH_GENERAL_GUIDES', payload: { on: false } });
          setGuidesDisableConfirmOpen(false);
          showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
        }}
      />

      <SpringFeatureManageDialog
        open={guidesManageOpen}
        title="Manage Guides, tutorials & announcements settings"
        defaultVal={guides.defaultVal}
        allowChange={guides.allowChange}
        customCount={guides.customUsers}
        onCancel={() => setGuidesManageOpen(false)}
        onConfirm={handleSaveGuides}
        error={state.simulateError}
      />
    </div>
  );
}
