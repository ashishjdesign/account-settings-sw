import React from 'react';
import { FeatureSettingsLayout, SettingCard } from './_chrome';
import { ConferenceManageDialog } from './_dialogs';

const Icon = ({ name }: { name: string }) => (
  <img
    src={`/__mockup/figma-ref/icons/${name}.svg`}
    alt=""
    aria-hidden="true"
    width={20}
    height={20}
    className="block h-5 w-5 shrink-0"
  />
);

export function ConceptPhoneConferenceManage() {
  return (
    <div className="relative">
      <FeatureSettingsLayout selectedTab="Phone">
        <SettingCard
          title="Launch an external app for incoming calls"
          switchOn={false}
          icon={<Icon name="tear-out-window" />}
          description="Have incoming calls open an external app or website, like a CRM system or online database."
        />

        <SettingCard
          title="Auto-answer calls"
          switchOn
          icon={<Icon name="active-call" />}
          description="Allow users to turn on Auto-Answer for incoming calls in the RingCentral desktop app."
          summary={[
            { label: 'User default:', value: 'Off' },
            { label: 'User access:', value: 'Allowed' },
          ]}
          onManage={() => {}}
        />

        <SettingCard
          title="Conference calls"
          switchOn
          icon={<Icon name="conference" />}
          description="Allow hosts to leave conference call without ending them."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
          onManage={() => {}}
        />
      </FeatureSettingsLayout>

      <div className="spring-scope">
        <ConferenceManageDialog
          open
          defaultVal="On"
          allowChange
          customCount={26}
          onCancel={() => {}}
          onSave={() => {}}
        />
      </div>
    </div>
  );
}
