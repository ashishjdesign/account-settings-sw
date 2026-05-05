import React from 'react';
import { useSettings } from '../../store';
import { SettingCard } from '../../components/shared';

export default function SmsPanel() {
  const { state } = useSettings();

  return (
    <div className="flex flex-col gap-4">
      <SettingCard
        title="SMS Service"
        switchOn={state.sms.smsOn}
        disabled
        info
        infoTooltip="SMS Service is enabled at the account level and cannot be turned off here. Contact your account team to change."
        icon="sms"
        description="Allow this account to access SMS Service."
      />
    </div>
  );
}
