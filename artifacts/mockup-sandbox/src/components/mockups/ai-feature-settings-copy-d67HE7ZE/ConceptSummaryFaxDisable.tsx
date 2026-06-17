import React from 'react';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard } from './_chrome';
import { FeatureDisableConfirm } from './_assistantDialogs';

/* -----------------------------------------------------------------------------
 * Fax Feature Settings — Turn off Fax confirm
 * (Figma file xGbu5327bj9YvYed8lxZQk, node 2040-44839)
 *
 * Email-to-Fax depends on Fax, so the disable dialog calls it out and the
 * Email-to-Fax card hides once Fax is turned off.
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

export function ConceptSummaryFaxDisable() {
  const [open, setOpen] = React.useState(true);
  const [faxOn, setFaxOn] = React.useState(true);

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          <FeatureDisableConfirm
            open={open}
            featureName="Fax"
            dependentNote={
              <>
                <span className="font-bold">Email-to-Fax</span> will also be turned off.
              </>
            }
            onCancel={() => setOpen(false)}
            onConfirm={() => {
              setFaxOn(false);
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
                  { label: 'User default:', value: 'On' },
                  { label: 'User access:', value: 'Allowed' },
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
