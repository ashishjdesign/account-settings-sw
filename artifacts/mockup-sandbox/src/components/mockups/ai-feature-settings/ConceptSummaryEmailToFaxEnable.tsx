import React from 'react';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard } from './_chrome';
import { DialogShell, DialogFooter, Radio, Checkbox } from './_assistantDialogs';
// Checkbox imported for the User access row in the deployment card.

/* -----------------------------------------------------------------------------
 * Email-to-Fax Feature Settings — first-time turn-on confirm
 * (Figma file xGbu5327bj9YvYed8lxZQk, node 2041-9597)
 *
 * First-time enable: no "X/XX users using default" pill on the deployment card
 * (no prior user customizations exist yet). Includes Email-to-Fax security
 * snackbar, risk bullets, and a required indemnification consent checkbox.
 * Turn on stays disabled until the box is checked.
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

function FirstTimeUserDeploymentCard({
  defaultVal, onDefaultValChange,
  allowChange, onAllowChangeChange,
}: {
  defaultVal: 'On' | 'Off';
  onDefaultValChange: (v: 'On' | 'Off') => void;
  allowChange: boolean;
  onAllowChangeChange: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
        User deployment
      </h3>
      <div className="flex flex-col gap-4 rounded-[10px] border border-[#9E9FA4]/35 bg-white p-4">
        <div className="flex h-[32px] items-center gap-4 pr-4">
          <span className="text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            Default in user settings:
          </span>
          <div className="flex items-center gap-5">
            <Radio
              checked={defaultVal === 'On'}
              onChange={() => onDefaultValChange('On')}
              label="On"
            />
            <Radio
              checked={defaultVal === 'Off'}
              onChange={() => onDefaultValChange('Off')}
              label="Off"
            />
          </div>
        </div>

        <div className="border-t border-[var(--sui-colors-neutral-b4)]" />

        <div className="flex h-[32px] items-center gap-4">
          <span className="text-[14px] font-semibold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            User access:
          </span>
          <Checkbox
            checked={allowChange}
            onChange={onAllowChangeChange}
            label="Allow users to change their settings"
          />
        </div>
      </div>
    </div>
  );
}

function SecuritySnackbar() {
  return (
    <div className="flex min-h-[48px] w-full items-start gap-2 rounded-[10px] border border-[var(--sui-colors-neutral-b2)] bg-[var(--sui-colors-neutral-b4)]/50 px-4 py-3 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] backdrop-blur-[10px]">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="mt-[1px] shrink-0"
      >
        <circle cx="10" cy="10" r="8" fill="var(--sui-colors-neutral-b1)" />
        <rect x="9.25" y="8.5" width="1.5" height="6" rx="0.75" fill="white" />
        <circle cx="10" cy="6.25" r="0.9" fill="white" />
      </svg>
      <p className="flex-1 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]">
        To use Email-to-fax, your email domain needs to meet our security requirements.{' '}
        <button
          type="button"
          className="cursor-pointer text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
        >
          Learn More
        </button>
      </p>
    </div>
  );
}

function ConsentRow({
  checked, onChange,
}: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 pt-1">
      <span className="relative mt-[2px] flex h-[20px] w-[20px] shrink-0 items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={[
            'absolute inset-0 flex items-center justify-center rounded-[4px] border-[1.2px] transition-colors',
            checked
              ? 'border-transparent bg-[var(--sui-colors-primary-b)]'
              : 'border-[var(--sui-colors-neutral-b2)] bg-white',
          ].join(' ')}
        >
          {checked && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2.5 7.2 5.6 10.3 11.5 4.4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </span>
      <span className="flex-1 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]">
        By checking this box, I confirm that my email domain meets the required security
        standards. I acknowledge and agree that it is my sole responsibility to ensure my
        email domain remains compliant with those standards. I agree to indemnify and hold
        harmless RingCentral, its partners, and its affiliates for any and all liability
        resulting from my failure to comply with these requirements.
      </span>
    </label>
  );
}

function EmailToFaxFirstTimeEnableConfirm({
  open, onCancel, onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: (r: { defaultVal: 'On' | 'Off'; allowChange: boolean }) => void;
}) {
  const [defaultVal, setDefaultVal] = React.useState<'On' | 'Off'>('On');
  const [allowChange, setAllowChange] = React.useState(true);
  const [consent, setConsent] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setDefaultVal('On');
      setAllowChange(true);
      setConsent(false);
    }
  }, [open]);

  return (
    <DialogShell
      open={open}
      ariaLabel="Turn on Email-to-Fax"
      onClose={onCancel}
      width={800}
    >
      <div className="flex flex-col gap-6 px-6 pb-8 pt-9">
        <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b0)]">
          Turn on Email-to-Fax for your organization?
        </h2>
        <p className="text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          This feature will be enabled for your account. Configure how it should be deployed to
          users below.
        </p>

        <FirstTimeUserDeploymentCard
          defaultVal={defaultVal}
          onDefaultValChange={setDefaultVal}
          allowChange={allowChange}
          onAllowChangeChange={setAllowChange}
        />

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
        onConfirm={() => onConfirm({ defaultVal, allowChange })}
        confirmLabel="Turn on"
        confirmDisabled={!consent}
      />
    </DialogShell>
  );
}

export function ConceptSummaryEmailToFaxEnable() {
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
          <EmailToFaxFirstTimeEnableConfirm
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
