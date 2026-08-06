import React from 'react';
import {
  AiStarsMd,
  AvaMd,
  AiWriterAltMd,
  AiSummaryMd,
  ClosedCaptionsMd,
  VoicemailMd,
  GlobeMd,
} from '@ringcentral/spring-icon';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard, ParentCard, SectionHeading } from './_chrome';
import {
  ManageAiFeaturesDialog,
  ChangeRetentionConfirmDialog,
  RETENTION_PERIODS,
  type RetentionValue,
} from './_retention';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — "Manage AI features" modal (Figma 2015-10201)
 *
 * Retention is always on, preconfigured to the account default (365 days).
 * There is no disabled state — admins can only change the period.
 * - Choosing a shorter period + Save → "Change retention confirm" dialog
 * - Choosing a longer period + Save  → commits directly (no data loss risk)
 * --------------------------------------------------------------------------- */

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp }: { as: IconCmp }) => (
  <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
);

const DEFAULT_PERIOD: RetentionValue = RETENTION_PERIODS[0].value;

type Step =
  | { kind: 'manage' }
  | { kind: 'change-confirm'; pendingPeriod: RetentionValue }
  | { kind: 'closed' };

function periodLabel(value: RetentionValue) {
  return RETENTION_PERIODS.find((p) => p.value === value)?.label ?? `${value} days`;
}

export function ConceptSummaryAiV2ManageMainModal() {
  const [period, setPeriod] = React.useState<RetentionValue>(DEFAULT_PERIOD);
  const [step, setStep] = React.useState<Step>({ kind: 'manage' });

  const summaryValue = periodLabel(period);

  const handleManageSave = (next: { period: RetentionValue }) => {
    if (next.period === period) {
      setStep({ kind: 'closed' });
      return;
    }
    // Shorter period may delete stored AI data — confirm first.
    if (Number(next.period) < Number(period)) {
      setStep({ kind: 'change-confirm', pendingPeriod: next.period });
      return;
    }
    setPeriod(next.period);
    setStep({ kind: 'closed' });
  };

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          <ManageAiFeaturesDialog
            open={step.kind === 'manage' || step.kind === 'change-confirm'}
            initialPeriod={period}
            onCancel={() => setStep({ kind: 'closed' })}
            onSave={handleManageSave}
          />

          <ChangeRetentionConfirmDialog
            open={step.kind === 'change-confirm'}
            onCancel={() => setStep({ kind: 'manage' })}
            onConfirm={() => {
              if (step.kind !== 'change-confirm') return;
              setPeriod(step.pendingPeriod);
              setStep({ kind: 'closed' });
            }}
          />
        </div>
      }
    >
      <PillTabs selected="AI" />

      <div className="flex flex-col gap-4">
        <SettingCard
          title="AI features"
          icon={<SpringIcon as={AiStarsMd} />}
          switchOn
          description="Turn on AI support for calls, messages and video meetings. Deliver real-time answers, call notes, transcripts and meeting recaps to help teams stay focused and organized. Empower users to communicate clearly with built-in writing and polishing tools."
          summary={[{ label: 'AI data custom retention period:', value: summaryValue }]}
          onManage={() => setStep({ kind: 'manage' })}
        />

        {/* AI Bot group — AVA replaces AI Assistant, parent of 5 features */}
        <SectionHeading>AI Bot</SectionHeading>
        <ParentCard
          title="AVA"
          icon={<SpringIcon as={AvaMd} />}
          featureCount={5}
          description="A personal AI virtual assistant that helps you boost productivity."
        />

        <SectionHeading>Phone</SectionHeading>
        <ParentCard
          title="Closed captioning"
          icon={<SpringIcon as={ClosedCaptionsMd} />}
          featureCount={2}
          description="Uses AI to display real-time captions during phone calls."
        />
        <SettingCard
          title="AI voicemail summaries"
          icon={<SpringIcon as={VoicemailMd} />}
          switchOn
          description="Delivers AI-generated summaries of voicemails, including key details and follow-up items."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
        />

        <SectionHeading>Chat</SectionHeading>
        <SettingCard
          title="AI writer for messaging"
          icon={<SpringIcon as={AiWriterAltMd} />}
          switchOn
          description="Uses AI to draft and refine messages — check grammar, adjust tone or length, and translate to other languages."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
        />
        <SettingCard
          title="AI summary"
          icon={<SpringIcon as={AiSummaryMd} />}
          switchOn
          description="Provides AI summaries that highlight key conversation points."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
        />
        <SettingCard
          title="AI translation"
          icon={<SpringIcon as={GlobeMd} />}
          switchOn
          description="Uses AI to translate chats, messages, and transcripts across languages."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
        />

        <SectionHeading>SMS</SectionHeading>
        <SettingCard
          title="AI writer for SMS"
          icon={<SpringIcon as={AiWriterAltMd} />}
          switchOn
          description="Uses AI to draft and refine messages — check grammar, adjust tone or length, and translate to other languages."
          summary={[
            { label: 'User default:', value: 'On' },
            { label: 'User access:', value: 'Allowed' },
          ]}
        />
      </div>
    </FeatureSettingsShell>
  );
}
