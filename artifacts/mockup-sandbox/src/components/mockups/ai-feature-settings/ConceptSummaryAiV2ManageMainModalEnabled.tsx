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
  TurnOnRetentionConfirmDialog,
  ChangeRetentionConfirmDialog,
  RETENTION_PERIODS,
  type RetentionValue,
} from './_retention';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — "Manage AI features" modal, retention enabled
 * (Figma 1969-7046, popper Figma 2015-39944)
 *
 * Click-through prototype starting state: retention ON @ 365 days.
 * - Changing the period + Save     → "Change retention confirm" dialog
 * - Toggling retention OFF + Save  → commits directly (closes modal)
 * - Re-opening with retention OFF and toggling back ON
 *                                  → "Turn on retention confirm" dialog
 * --------------------------------------------------------------------------- */

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp }: { as: IconCmp }) => (
  <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
);

const DEFAULT_PERIOD: RetentionValue = RETENTION_PERIODS[0].value;

type Step =
  | { kind: 'manage' }
  | { kind: 'turn-on-confirm'; pendingPeriod: RetentionValue }
  | { kind: 'change-confirm'; pendingPeriod: RetentionValue }
  | { kind: 'closed' };

function periodLabel(value: RetentionValue) {
  return RETENTION_PERIODS.find((p) => p.value === value)?.label ?? `${value} days`;
}

export function ConceptSummaryAiV2ManageMainModalEnabled() {
  const [retentionOn, setRetentionOn] = React.useState(true);
  const [period, setPeriod] = React.useState<RetentionValue>(DEFAULT_PERIOD);
  const [step, setStep] = React.useState<Step>({ kind: 'manage' });

  const summaryValue = retentionOn ? periodLabel(period) : 'Disabled';

  const handleManageSave = (next: { retentionOn: boolean; period: RetentionValue }) => {
    if (retentionOn && !next.retentionOn) {
      setRetentionOn(false);
      setStep({ kind: 'closed' });
      return;
    }
    if (!retentionOn && next.retentionOn) {
      setStep({ kind: 'turn-on-confirm', pendingPeriod: next.period });
      return;
    }
    if (retentionOn && next.retentionOn && next.period !== period) {
      setStep({ kind: 'change-confirm', pendingPeriod: next.period });
      return;
    }
    setStep({ kind: 'closed' });
  };

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          <ManageAiFeaturesDialog
            open={
              step.kind === 'manage' ||
              step.kind === 'turn-on-confirm' ||
              step.kind === 'change-confirm'
            }
            initialRetentionOn={retentionOn}
            initialPeriod={period}
            onCancel={() => setStep({ kind: 'closed' })}
            onSave={handleManageSave}
            onRequestTurnOn={(p) => setStep({ kind: 'turn-on-confirm', pendingPeriod: p })}
          />

          <TurnOnRetentionConfirmDialog
            open={step.kind === 'turn-on-confirm'}
            period={step.kind === 'turn-on-confirm' ? step.pendingPeriod : period}
            onPeriodChange={(p) =>
              setStep((s) => (s.kind === 'turn-on-confirm' ? { ...s, pendingPeriod: p } : s))
            }
            onCancel={() => setStep({ kind: 'manage' })}
            onConfirm={() => {
              if (step.kind !== 'turn-on-confirm') return;
              setRetentionOn(true);
              setPeriod(step.pendingPeriod);
              setStep({ kind: 'manage' });
            }}
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
          description="A personal assistant that helps you boost productivity."
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
