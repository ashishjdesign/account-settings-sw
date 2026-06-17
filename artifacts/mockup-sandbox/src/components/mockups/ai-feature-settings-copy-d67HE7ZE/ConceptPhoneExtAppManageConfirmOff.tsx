import React from 'react';
import { FeatureSettingsLayout, SettingCard } from './_chrome';
import { ExtAppManageDialog } from './_dialogs';

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

export function ConceptPhoneExtAppManageConfirmOff() {
  return (
    <div className="relative">
      <FeatureSettingsLayout selectedTab="Phone">
        <SettingCard
          title="Launch an external app for incoming calls"
          switchOn
          icon={<Icon name="tear-out-window" />}
          description="Have incoming calls open an external app or website, like a CRM system or online database."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
          onManage={() => {}}
        />

        <SettingCard
          title="Auto-answer calls"
          switchOn
          icon={<Icon name="active-call" />}
          description="Allow users to turn on Auto-Answer for incoming calls in the RingCentral desktop app."
          summary={[
            { label: 'User default:', value: 'Off' },
            { label: 'User access:', value: 'Allowed' },
          ]}
          onManage={() => {}}
        />

        <SettingCard
          title="Conference calls"
          switchOn={false}
          icon={<Icon name="conference" />}
          description="Allow hosts to leave conference call without ending them."
        />
      </FeatureSettingsLayout>

      <div className="spring-scope">
        <ExtAppManageDialog
          open
          defaultVal="On"
          allowChange
          launchUrl=""
          trigger="A call begins to ring"
          customCount={2}
          onCancel={() => {}}
          onSave={() => {}}
        />

        {/* Confirmation overlay (Figma node 1991:28574) shown when the user
            tries to Save with an empty URL while the default is still On. */}
        <div className="absolute inset-0 z-[60] flex items-start justify-center pt-24">
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 flex w-[600px] max-w-[calc(100%-32px)] flex-col rounded-[12px] bg-white"
            style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.18)' }}
          >
            <div className="flex flex-col gap-8 px-6 pb-10 pt-6">
              <h2 className="py-3 text-[24px] font-normal leading-[32px] text-[var(--sui-colors-neutral-b1)]">
                Turn off default for users?
              </h2>
              <div className="flex flex-col gap-3 text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                <p>
                  <strong>Launch an external app for incoming calls</strong> doesn’t have a URL.
                </p>
                <p>
                  The default for users can’t stay on without a URL and will be turned{' '}
                  <strong>off</strong>.
                </p>
              </div>
            </div>
            <div className="border-t border-[var(--sui-colors-neutral-b4)]/50" />
            <div className="flex justify-end gap-2 px-6 pt-5 pb-5">
              <button
                type="button"
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] border border-black/20 bg-white px-4 text-[15px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b0)] transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40"
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex h-[36px] min-w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[var(--sui-colors-primary-b)] px-4 text-[15px] font-medium leading-[20px] text-white transition-colors hover:bg-[var(--sui-colors-primary-b-high-contrast)]"
              >
                Turn off default &amp; save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
