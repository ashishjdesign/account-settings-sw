import React from 'react';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard } from './_chrome';
import { FeatureEnableConfirm } from './_assistantDialogs';

/* -----------------------------------------------------------------------------
 * Fax Feature Settings — Turn on Fax confirm
 * (Figma file xGbu5327bj9YvYed8lxZQk, node 2040-44943)
 *
 * Fax starts OFF (so Email-to-Fax is hidden). Clicking the Fax toggle opens
 * the deployment confirm. Confirming turns Fax on and reveals the Email-to-Fax
 * card with its prior state.
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

export function ConceptSummaryFaxEnable() {
  const [open, setOpen] = React.useState(true);
  const [faxOn, setFaxOn] = React.useState(false);
  const [defaultVal, setDefaultVal] = React.useState<'On' | 'Off'>('On');
  const [allowChange, setAllowChange] = React.useState(true);

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          <FeatureEnableConfirm
            open={open}
            featureName="Fax"
            initialDefaultVal={defaultVal}
            initialAllowChange={allowChange}
            customUsersCount={26}
            onCancel={() => setOpen(false)}
            onConfirm={(r) => {
              setDefaultVal(r.defaultVal);
              setAllowChange(r.allowChange);
              setFaxOn(true);
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
          switchOn={faxOn}
          description="Allow this account to access fax settings."
          summary={
            faxOn
              ? [
                  { label: 'User default:', value: defaultVal },
                  { label: 'User access:', value: allowChange ? 'Allowed' : 'Restricted' },
                ]
              : undefined
          }
          onManage={() => {}}
        />
        {faxOn && (
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
        )}
      </div>
    </FeatureSettingsShell>
  );
}
