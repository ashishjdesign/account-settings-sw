import React from 'react';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard } from './_chrome';
import { DialogShell, DialogFooter, Radio, UserDeploymentCard } from './_assistantDialogs';
import { SecuritySnackbar, ConsentRow } from './ConceptSummaryEmailToFaxEnable';

/* -----------------------------------------------------------------------------
 * Email-to-Fax Feature Settings — Re-enable (second-time turn-on) confirm
 * (Figma file xGbu5327bj9YvYed8lxZQk, node 2050-30618)
 *
 * Same as the first-time enable, plus the "X/XX users using default" pill and
 * a custom-users reset/restore decision because prior user settings exist.
 * --------------------------------------------------------------------------- */

const TOTAL_USERS = 98;

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

function EmailToFaxReEnableConfirm({
  open, onCancel, onConfirm,
  customUsersCount = 26,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: (r: {
    defaultVal: 'On' | 'Off';
    allowChange: boolean;
    customAction: 'reset' | 'restore';
  }) => void;
  customUsersCount?: number;
}) {
  const [defaultVal, setDefaultVal] = React.useState<'On' | 'Off'>('On');
  const [allowChange, setAllowChange] = React.useState(true);
  const [customAction, setCustomAction] = React.useState<'reset' | 'restore'>('reset');
  const [consent, setConsent] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setDefaultVal('On');
      setAllowChange(true);
      setCustomAction('reset');
      setConsent(false);
    }
  }, [open]);

  const defaultUsersCount = Math.max(0, TOTAL_USERS - customUsersCount);

  return (
    <DialogShell
      open={open}
      ariaLabel="Turn on Email-to-Fax"
      onClose={onCancel}
      width={820}
    >
      <div className="flex flex-col gap-6 px-6 pb-8 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Turn on Email-to-Fax for your organization?
        </h2>
        <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          This feature will be enabled for your account. Configure how it should be deployed to
          users below.
        </p>

        <UserDeploymentCard
          defaultVal={defaultVal}
          onDefaultValChange={setDefaultVal}
          allowChange={allowChange}
          onAllowChangeChange={setAllowChange}
          defaultUsersCount={defaultUsersCount}
        />

        {customUsersCount > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              <button
                type="button"
                className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
              >
                {customUsersCount}/{TOTAL_USERS} users
              </button>{' '}
              have custom settings for this feature. What would you like to do with these users?
            </p>
            <div className="flex items-center gap-6">
              <Radio
                checked={customAction === 'reset'}
                onChange={() => setCustomAction('reset')}
                label="Reset all to default"
              />
              <Radio
                checked={customAction === 'restore'}
                onChange={() => setCustomAction('restore')}
                label="Restore their custom settings"
              />
            </div>
          </div>
        )}

        <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />

        <SecuritySnackbar />

        <div className="flex flex-col gap-3">
          <p className="text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            If your email domain doesn't meet the security requirements, it may result in
            the following:
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-6 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            <li>Your email may be spoofed and/or rejected by the Email-to-fax system.</li>
            <li>
              In cases of suspicious email activities, our Service Abuse and Fraud team
              may turn off Email-to-fax for the account.
            </li>
          </ul>

          <ConsentRow checked={consent} onChange={setConsent} />
        </div>
      </div>
      <DialogFooter
        onCancel={onCancel}
        onConfirm={() => onConfirm({ defaultVal, allowChange, customAction })}
        confirmLabel="Turn on"
        confirmDisabled={!consent}
      />
    </DialogShell>
  );
}

export function ConceptSummaryEmailToFaxReEnable() {
  const [open, setOpen] = React.useState(true);
  const [emailToFaxOn, setEmailToFaxOn] = React.useState(false);
  const [defaultVal, setDefaultVal] = React.useState<'On' | 'Off'>('On');
  const [allowChange, setAllowChange] = React.useState(true);

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          <EmailToFaxReEnableConfirm
            open={open}
            onCancel={() => setOpen(false)}
            onConfirm={(r) => {
              setDefaultVal(r.defaultVal);
              setAllowChange(r.allowChange);
              setEmailToFaxOn(true);
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
                  { label: 'User default:', value: defaultVal },
                  { label: 'User access:', value: allowChange ? 'Allowed' : 'Restricted' },
                ]
              : undefined
          }
          onManage={() => {}}
        />
      </div>
    </FeatureSettingsShell>
  );
}
