import { ExternalLink, PhoneCall, Users } from 'lucide-react';
import { FeatureSettingsLayout, SettingCard } from './_chrome';

export function ConceptSummaryPhone() {
  return (
    <FeatureSettingsLayout selectedTab="Phone">
      <SettingCard
        title="Launch an external app for incoming calls"
        switchOn={false}
        icon={<ExternalLink className="h-5 w-5" strokeWidth={1.6} />}
        description="Have incoming calls open an external app or website, like a CRM system or online database."
      />

      <SettingCard
        title="Auto-answer calls"
        switchOn
        icon={<PhoneCall className="h-5 w-5" strokeWidth={1.6} />}
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
        icon={<Users className="h-5 w-5" strokeWidth={1.6} />}
        description="Allow hosts to leave conference call without ending them."
      />
    </FeatureSettingsLayout>
  );
}
