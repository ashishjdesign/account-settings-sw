import React, { useState } from 'react';
import { useSettings } from '../../store';
import { SettingCard, SpringConfirmDialog, SpringDialog, UserDefaultsRow, showToast } from '../../components/shared';

export default function GeneralPanel() {
  const { state, dispatch } = useSettings();
  const { userActivationOn, guides } = state.general;

  const [uaConfirmOpen, setUaConfirmOpen] = useState(false);
  const [guidesManageOpen, setGuidesManageOpen] = useState(false);

  const [editDefault, setEditDefault] = useState<'On' | 'Off'>(guides.defaultVal);
  const [editAllow, setEditAllow] = useState(guides.allowChange);

  const handleSaveGuides = () => {
    if (state.simulateError) return;
    dispatch({
      type: 'PATCH_GENERAL_GUIDES',
      payload: { defaultVal: editDefault, allowChange: editAllow },
    });
    setGuidesManageOpen(false);
    showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
  };

  const openManage = () => {
    setEditDefault(guides.defaultVal);
    setEditAllow(guides.allowChange);
    setGuidesManageOpen(true);
  };

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
                {
                  value: guides.allowChange
                    ? 'Users can change this setting'
                    : 'Users cannot change this setting',
                },
              ]
            : undefined
        }
        onManage={openManage}
        onSwitchClick={() => {
          dispatch({ type: 'PATCH_GENERAL_GUIDES', payload: { on: !guides.on } });
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
        onCancel={() => setUaConfirmOpen(false)}
        onConfirm={() => {
          dispatch({ type: 'SET_GENERAL_USER_ACTIVATION', payload: !userActivationOn });
          setUaConfirmOpen(false);
          showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
        }}
      />

      <SpringDialog
        open={guidesManageOpen}
        title="Manage Guides, tutorials & announcements"
        onClose={() => setGuidesManageOpen(false)}
        onSave={handleSaveGuides}
        error={state.simulateError}
      >
        <UserDefaultsRow
          defaultVal={editDefault}
          allowChange={editAllow}
          onDefaultChange={setEditDefault}
          onAllowChangeChange={setEditAllow}
          customCount={guides.customUsers}
        />
      </SpringDialog>
    </div>
  );
}
