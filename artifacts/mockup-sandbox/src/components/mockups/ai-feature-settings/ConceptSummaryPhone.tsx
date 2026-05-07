import { Phone, PhoneIncoming, Voicemail, Mic } from 'lucide-react';
import { FeatureSettingsLayout, SectionHeading, SettingCard } from './_chrome';

export function ConceptSummaryPhone() {
  return (
    <FeatureSettingsLayout selectedTab="Phone">
      <SettingCard
        title="Call queue"
        switchOn
        icon={<PhoneIncoming className="h-5 w-5" strokeWidth={1.6} />}
        description="Route incoming calls to a group of users so the next available agent picks up."
        summary={[
          { label: 'Overflow:', value: 'Voicemail' },
          { value: 'Wait time 30s' },
        ]}
        onManage={() => {}}
      />

      <SettingCard
        title="Caller ID"
        switchOn
        icon={<Phone className="h-5 w-5" strokeWidth={1.6} />}
        description="Choose what number is shown to the people you call from this account."
        summary={[
          { label: 'User default:', value: 'Direct number' },
          { value: 'Users can change this setting' },
        ]}
        onManage={() => {}}
      />

      <SectionHeading>Call handling</SectionHeading>

      <SettingCard
        title="Voicemail"
        switchOn
        icon={<Voicemail className="h-5 w-5" strokeWidth={1.6} />}
        description="Let callers leave a recorded message when users are unavailable."
        summary={[
          { label: 'Greeting:', value: 'Default' },
          { value: 'Email notifications on' },
        ]}
        onManage={() => {}}
      />

      <SettingCard
        title="Automatic call recording"
        switchOn={false}
        icon={<Mic className="h-5 w-5" strokeWidth={1.6} />}
        description="Record inbound and outbound calls automatically for compliance and quality review."
      />
    </FeatureSettingsLayout>
  );
}
