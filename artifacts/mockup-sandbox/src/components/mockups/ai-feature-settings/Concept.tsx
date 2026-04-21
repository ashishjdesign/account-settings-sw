import React from 'react';
import {
  FeatureSettingsShell,
  PillTab,
  SpringSelect,
  SpringSwitch,
  LabelWithInfo,
  SubRow,
  UserDefaultsRow,
  UserPermissionsRow,
} from './_shared';

/* -----------------------------------------------------------------------------
 * Spring "Setting card" — bordered white card with a header row and optional
 * inline sub-settings (children). This variant is unique to the Concept tab,
 * so it stays local rather than living in the shared module.
 * --------------------------------------------------------------------------- */
function SettingCard({
  title,
  description,
  switchOn,
  icon = 'ai-stars',
  children,
}: React.PropsWithChildren<{
  title: string;
  description: React.ReactNode;
  switchOn: boolean;
  icon?: 'ai-stars' | 'ai-lightbulb' | 'ai-writer';
}>) {
  return (
    <section className="flex items-start gap-4 rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
      {/* Icon column — fixed 32px-tall block to align with title row */}
      <div className="flex h-[32px] items-center justify-center shrink-0">
        <img
          src={`/__mockup/figma-ref/icons/${icon}.svg`}
          alt=""
          aria-hidden="true"
          width={20}
          height={20}
          className="block h-5 w-5 shrink-0"
        />
      </div>

      {/* Content column */}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        {/* Header: title + switch, then description */}
        <div className="flex w-full flex-col gap-1">
          <div className="flex min-h-[32px] w-full items-center gap-4">
            <h3 className="flex-1 truncate text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              {title}
            </h3>
            <SpringSwitch checked={switchOn} />
          </div>
          <p className="pr-[130px] text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
            {description}{' '}
            <a href="#" className="font-normal text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]">
              Learn more
            </a>
          </p>
        </div>

        {/* Sub-settings (indented under title, top border separates them) */}
        {children && (
          <div className="flex w-full flex-col border-t border-[var(--sui-colors-neutral-b4)] pt-4">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * MAIN
 * --------------------------------------------------------------------------- */
export function Concept() {
  return (
    <FeatureSettingsShell>
      <div className="mb-6 flex flex-wrap gap-2">
        <PillTab label="General" />
        <PillTab label="Phone" />
        <PillTab label="AI" selected />
        <PillTab label="SMS" />
        <PillTab label="Fax" />
      </div>

      <div className="flex flex-col gap-4">
        <SettingCard
          title="AI features"
          switchOn
          description="Turn on AI support for calls, messages and video meetings. Deliver real-time answers, call notes, transcripts and meeting recaps to help teams stay focused and organized. Empower users to communicate clearly with built-in writing and polishing tools."
        />

        <SettingCard
          title="AI Assistant"
          switchOn
          icon="ai-lightbulb"
          description="A personal assistant that helps you boost productivity."
        >
          <SubRow>
            <LabelWithInfo>AI notes and transcriptions retention period</LabelWithInfo>
            <SpringSelect value="365 days (Default)" width={200} />
          </SubRow>
          <UserDefaultsRow />
          <UserPermissionsRow />
        </SettingCard>

        <SettingCard
          title="Automatic call notes"
          switchOn
          icon="ai-writer"
          description="Generate call notes automatically for all your devices."
        >
          <UserDefaultsRow />
          <UserPermissionsRow />
        </SettingCard>
      </div>
    </FeatureSettingsShell>
  );
}
