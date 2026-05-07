import React from 'react';
import { FeatureSettingsLayout, SettingCard } from './_chrome';
import { SpringConfirmDialog } from './_dialogs';

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

export function ConceptPhoneExtAppEnable() {
  const [extAppOn, setExtAppOn] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(true);

  return (
    <div className="relative">
      <FeatureSettingsLayout selectedTab="Phone">
        <SettingCard
          title="Launch an external app for incoming calls"
          switchOn={extAppOn}
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
          switchOn={false}
          icon={<Icon name="conference" />}
          description="Allow hosts to leave conference call without ending them."
        />
      </FeatureSettingsLayout>

      <div className="spring-scope">
        <SpringConfirmDialog
          open={confirmOpen}
          title="Turn on Launch an external app for incoming calls?"
          body="This will allow incoming calls to open an external app or website, like a CRM system or online database, for users in your organization."
          confirmLabel="Turn on"
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            setExtAppOn(true);
            setConfirmOpen(false);
          }}
        />
      </div>
    </div>
  );
}
