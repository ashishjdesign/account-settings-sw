import React from 'react';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard } from './_chrome';
import { FeatureDisableConfirm } from './_assistantDialogs';

/* -----------------------------------------------------------------------------
 * Email-to-Fax Feature Settings — Turn off Email-to-Fax confirm
 * (Figma file xGbu5327bj9YvYed8lxZQk, node 2050-30514)
 *
 * Standard disable confirm. No dependent features below Email-to-Fax, so the
 * dialog has just the standard "feature will be turned off..." paragraph.
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

export function ConceptSummaryEmailToFaxDisable() {
  const [open, setOpen] = React.useState(true);
  const [emailToFaxOn, setEmailToFaxOn] = React.useState(true);

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          <FeatureDisableConfirm
            open={open}
            featureName="Email-to-Fax"
            onCancel={() => setOpen(false)}
            onConfirm={() => {
              setEmailToFaxOn(false);
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
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
          onManage={() => {}}
        />
        <SettingCard
          title="Email-to-Fax"
          icon={<Icon name="email-to-fax" />}
          switchOn={emailToFaxOn}
          description="Allow this account to send faxes using Email-to-fax feature."
          summary={
            emailToFaxOn
              ? [
                  { label: 'User default:', value: 'On' },
                  { label: 'User access:', value: 'Allowed' },
                ]
              : undefined
          }
          onManage={() => {}}
        />
      </div>
    </FeatureSettingsShell>
  );
}
