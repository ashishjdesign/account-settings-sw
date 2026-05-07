import { Printer, FileText, Mail } from 'lucide-react';
import { FeatureSettingsLayout, SectionHeading, SettingCard } from './_chrome';

export function ConceptSummaryFax() {
  return (
    <FeatureSettingsLayout selectedTab="Fax">
      <SettingCard
        title="Fax"
        switchOn
        icon={<Printer className="h-5 w-5" strokeWidth={1.6} />}
        description="Allow users to send and receive faxes online from their RingCentral account."
        summary={[
          { label: 'User default:', value: 'On' },
          { value: 'Users can change this setting' },
        ]}
        onManage={() => {}}
      />

      <SectionHeading>Delivery</SectionHeading>

      <SettingCard
        title="Inbound fax delivery"
        switchOn
        icon={<Mail className="h-5 w-5" strokeWidth={1.6} />}
        description="Choose how received faxes are delivered to users."
        summary={[
          { label: 'Delivery:', value: 'Email + RingCentral app' },
          { value: 'PDF attachment' },
        ]}
        onManage={() => {}}
      />

      <SettingCard
        title="Cover page"
        switchOn={false}
        icon={<FileText className="h-5 w-5" strokeWidth={1.6} />}
        description="Add a default cover page to outbound faxes with your company logo and contact info."
      />
    </FeatureSettingsLayout>
  );
}
