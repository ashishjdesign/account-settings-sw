import { MessageSquare, Users, ShieldCheck } from 'lucide-react';
import { FeatureSettingsLayout, SectionHeading, SettingCard } from './_chrome';

export function ConceptSummarySMS() {
  return (
    <FeatureSettingsLayout selectedTab="SMS">
      <SettingCard
        title="SMS"
        switchOn
        icon={<MessageSquare className="h-5 w-5" strokeWidth={1.6} />}
        description="Allow users to send and receive text messages from their RingCentral number."
        summary={[
          { label: 'User default:', value: 'On' },
          { value: 'Users can change this setting' },
        ]}
        onManage={() => {}}
      />

      <SettingCard
        title="Group messaging"
        switchOn
        icon={<Users className="h-5 w-5" strokeWidth={1.6} />}
        description="Let users include up to 10 participants in a single text conversation."
        summary={[
          { label: 'Max participants:', value: '10' },
        ]}
        onManage={() => {}}
      />

      <SectionHeading>Compliance</SectionHeading>

      <SettingCard
        title="High-volume SMS (10DLC)"
        switchOn
        icon={<ShieldCheck className="h-5 w-5" strokeWidth={1.6} />}
        description="Register your brand and campaigns with carriers to send business text messages at scale."
        summary={[
          { label: 'Brand:', value: 'Registered' },
          { value: '2 active campaigns' },
        ]}
        onManage={() => {}}
      />
    </FeatureSettingsLayout>
  );
}
