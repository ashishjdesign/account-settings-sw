import React from 'react';
import { FeatureSettingsLayout, SettingCard } from './_chrome';
import { ExtAppFeatureSettingsDialog, SpringFirstEnableDialog } from './_dialogs';

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

type Step = 'enable' | 'settings' | 'closed';

export function ConceptPhoneExtAppFeatureSettings() {
  const [step, setStep] = React.useState<Step>('settings');

  return (
    <div className="relative">
      <FeatureSettingsLayout selectedTab="Phone">
        <SettingCard
          title="Launch an external app for incoming calls"
          switchOn
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
        <SpringFirstEnableDialog
          open={step === 'enable'}
          title="Turn on Launch an external app for incoming calls?"
          body="This feature will be enabled for your account. Configure how it should be deployed to users below."
          onCancel={() => setStep('closed')}
          onConfirm={() => setStep('settings')}
        />
        <ExtAppFeatureSettingsDialog
          open={step === 'settings'}
          onBack={() => setStep('enable')}
          onSkip={() => setStep('closed')}
          onSave={() => setStep('closed')}
        />
      </div>
    </div>
  );
}
