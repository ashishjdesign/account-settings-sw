import React from 'react';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard } from './_chrome';
import { FeatureManageDialog } from './_assistantDialogs';

/* -----------------------------------------------------------------------------
 * Fax Feature Settings — Manage Fax dialog
 * (Figma file xGbu5327bj9YvYed8lxZQk, node 2040-45173)
 *
 * Same Manage chrome as the Closed-captioning manage dialog, parameterized
 * for the "Fax" feature. The Fax tab also lists a dependent Email-to-Fax
 * card; turning Fax off later will hide that row, but on this screen Fax is
 * on and both cards are visible.
 * --------------------------------------------------------------------------- */

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

export function ConceptSummaryFaxManage() {
  const [open, setOpen] = React.useState(true);
  const [defaultVal, setDefaultVal] = React.useState<'On' | 'Off'>('On');
  const [allowChange, setAllowChange] = React.useState(true);

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          <FeatureManageDialog
            open={open}
            featureName="Fax"
            initialDefaultVal={defaultVal}
            initialAllowChange={allowChange}
            onCancel={() => setOpen(false)}
            onSave={(r) => {
              setDefaultVal(r.defaultVal);
              setAllowChange(r.allowChange);
              setOpen(false);
            }}
          />
        </div>
      }
    >
      <PillTabs selected="Fax" />

      <div className="flex flex-col gap-4">
        <SettingCard
          title="Fax"
          icon={<Icon name="fax" />}
          switchOn
          description="Allow this account to access fax settings."
          summary={[
            { label: 'User default:', value: defaultVal },
            { label: 'User access:', value: allowChange ? 'Allowed' : 'Restricted' },
          ]}
          onManage={() => setOpen(true)}
        />
        <SettingCard
          title="Email-to-Fax"
          icon={<Icon name="email-to-fax" />}
          switchOn
          description="Allow this account to send faxes using Email-to-fax feature."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
          onManage={() => {}}
        />
      </div>
    </FeatureSettingsShell>
  );
}
