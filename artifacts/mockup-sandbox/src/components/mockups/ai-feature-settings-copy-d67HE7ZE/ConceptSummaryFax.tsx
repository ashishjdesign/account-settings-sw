import { FeatureSettingsLayout, SettingCard } from './_chrome';

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

export function ConceptSummaryFax() {
  return (
    <FeatureSettingsLayout selectedTab="Fax">
      <SettingCard
        title="Fax"
        switchOn
        icon={<Icon name="fax" />}
        description="Allow this account to access fax settings."
        summary={[
          { label: 'User default:', value: 'On' },
          { label: 'User access:', value: 'Allowed' },
        ]}
        onManage={() => {}}
      />

      <SettingCard
        title="Email-to-Fax"
        switchOn
        icon={<Icon name="email-to-fax" />}
        description="Allow this account to send faxes using Email-to-fax feature."
        summary={[
          { label: 'User default:', value: 'On' },
          { label: 'User access:', value: 'Allowed' },
        ]}
        onManage={() => {}}
      />
    </FeatureSettingsLayout>
  );
}
