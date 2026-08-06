import React from 'react';
import { ArrowLeftMd, AiWriterAltMd, AiSummaryMd, GlobeMd } from '@ringcentral/spring-icon';
import { FeatureSettingsShell, SpringSwitch } from './_shared';
import { FeatureDisableConfirm, FeatureManageDialog } from './_assistantDialogs';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Chat AI detail inner page
 *
 * Reached by clicking the "Chat AI" parent card's CaretRight chevron on the
 * master-ON AI tab (ConceptSummaryAiV2OnPartial). The Chat AI page groups the
 * chat-related AI features into four independent bordered cards:
 *   AI writer for messaging, AI summary, AI translation, AI writer for SMS.
 *
 * This is an ARCHITECTURE-only regrouping: each feature keeps its own
 * independent management UX (deployment pills, toggle/Manage/confirm flow) —
 * there is no parent→child cascade between them.
 *
 * `onBack` returns to the AI tab. When rendered as its own canvas frame (no
 * onBack), the back arrow navigates the iframe back to the AI tab preview.
 * --------------------------------------------------------------------------- */

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp, size = 20 }: { as: IconCmp; size?: number }) => (
  <Cmp width={size} height={size} fill="currentColor" aria-hidden focusable={false} />
);

type Feature = {
  title: string;
  icon: IconCmp;
  description: string;
};

/* A feature's user-deployment settings, shown as the "User default / User
 * access" pills and edited through the Manage dialog. */
type Deploy = { defaultVal: 'On' | 'Off'; allowChange: boolean };

const FEATURES: Feature[] = [
  {
    title: 'AI writer for messaging',
    icon: AiWriterAltMd,
    description:
      'Uses AI to draft and refine messages — check grammar, adjust tone or length, and translate to other languages.',
  },
  {
    title: 'AI summary',
    icon: AiSummaryMd,
    description: 'Provides AI summaries that highlight key conversation points.',
  },
  {
    title: 'AI translation',
    icon: GlobeMd,
    description: 'Uses AI to translate chats, messages, and transcripts across languages.',
  },
  {
    title: 'AI writer for SMS',
    icon: AiWriterAltMd,
    description:
      'Uses AI to draft and refine messages — check grammar, adjust tone or length, and translate to other languages.',
  },
];

function FeatureIcon({ as }: { as: IconCmp }) {
  return (
    <div className="flex h-[32px] w-5 shrink-0 items-center justify-center text-[var(--sui-colors-neutral-b1)]">
      <SpringIcon as={as} />
    </div>
  );
}

/* A single top-level feature's content column: title + switch, description,
 * pills + Manage. Independent — no nested dependents and no cascade. */
function FeatureBody({
  title,
  description,
  checked,
  onCheckedChange,
  deploy,
  onManage,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  deploy: Deploy;
  onManage: () => void;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="flex min-h-[32px] w-full items-center gap-4">
        <h3 className="flex-1 truncate text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
          {title}
        </h3>
        <SpringSwitch checked={checked} onCheckedChange={onCheckedChange} aria-label={title} />
      </div>

      <p className="pr-[130px] text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
        {description}{' '}
        <a
          href="#"
          className="font-normal text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
        >
          Learn more
        </a>
      </p>

      {/* User-deployment row (pills + Manage) is only meaningful while the
       * feature is on; once it's switched off the deployment settings are
       * hidden entirely (no dimmed/secondary content). */}
      {checked && (
        <div className="mt-2 flex w-full items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            {[
              { label: 'User default:', value: deploy.defaultVal },
              { label: 'User access:', value: deploy.allowChange ? 'Allowed' : 'Restricted' },
            ].map((seg, i) => (
              <div
                key={i}
                className="flex h-[32px] items-center gap-2 whitespace-nowrap rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]"
              >
                <span className="font-semibold">{seg.label}</span>
                <span className="font-normal">{seg.value}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={onManage}
            className="inline-flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] px-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-primary-b)] transition-colors hover:text-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
          >
            Manage
          </button>
        </div>
      )}
    </div>
  );
}

export function ConceptSummaryAiV2ChatAiDetail({ onBack }: { onBack?: () => void }) {
  /* Per-feature on/off state (all on by default). */
  const [featureOn, setFeatureOn] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(FEATURES.map((f) => [f.title, true])),
  );
  /* Per-feature user-deployment state (all on/allowed by default). */
  const [deploy, setDeploy] = React.useState<Record<string, Deploy>>(() =>
    Object.fromEntries(FEATURES.map((f) => [f.title, { defaultVal: 'On', allowChange: true }])),
  );
  /* Which feature's "Turn off …?" confirmation is open (null = none). */
  const [disableFeature, setDisableFeature] = React.useState<string | null>(null);
  /* Which feature's "Manage" dialog is open (null = none). */
  const [manageFeature, setManageFeature] = React.useState<string | null>(null);

  /* Toggling a feature off asks for confirmation first; toggling it back on
   * restores it directly (re-enable has no confirmation). */
  const handleSwitch = (title: string, next: boolean) => {
    if (next) {
      setFeatureOn((prev) => ({ ...prev, [title]: true }));
    } else {
      setDisableFeature(title);
    }
  };

  /* When embedded in the parent AI tab, `onBack` returns to the in-page view.
   * When rendered as its own canvas frame (no onBack), navigate the iframe back
   * to the AI tab preview so the back arrow still returns to the AI tab. */
  const handleBack =
    onBack ??
    (() => {
      const { pathname, search } = window.location;
      const re = /ConceptSummaryAiV2ChatAiDetail\/?$/;
      const target = re.test(pathname)
        ? pathname.replace(re, 'ConceptSummaryAiV2OnPartial') + search
        : `${import.meta.env.BASE_URL.replace(/\/$/, '')}/preview/ai-feature-settings/ConceptSummaryAiV2OnPartial`;
      window.location.assign(target);
    });

  return (
    <FeatureSettingsShell
      flexLayout
      showFooterActions={false}
      after={
        <div className="spring-scope">
          {/* Org-level disable confirm — one instance reused for whichever
           * feature's switch was turned off. */}
          <FeatureDisableConfirm
            open={disableFeature !== null}
            featureName={disableFeature ?? ''}
            onCancel={() => setDisableFeature(null)}
            onConfirm={() => {
              if (disableFeature) {
                setFeatureOn((prev) => ({ ...prev, [disableFeature]: false }));
              }
              setDisableFeature(null);
            }}
          />
          {/* "Manage" dialog (User deployment) — one instance reused for
           * whichever feature's Manage button was clicked. */}
          <FeatureManageDialog
            open={manageFeature !== null}
            featureName={manageFeature ?? ''}
            onCancel={() => setManageFeature(null)}
            onSave={(next) => {
              if (manageFeature) setDeploy((prev) => ({ ...prev, [manageFeature]: next }));
              setManageFeature(null);
            }}
            initialDefaultVal={manageFeature ? deploy[manageFeature].defaultVal : 'On'}
            initialAllowChange={manageFeature ? deploy[manageFeature].allowChange : true}
            customUsersCount={26}
          />
        </div>
      }
    >
      {/* Back row — ← Chat AI */}
      <button
        type="button"
        onClick={handleBack}
        className="mb-4 flex items-center gap-4 text-[var(--sui-colors-neutral-b1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)]/30"
      >
        <SpringIcon as={ArrowLeftMd} size={24} />
        <span className="text-[20px] font-semibold leading-[28px] tracking-[-0.2px]">Chat AI</span>
      </button>

      <div className="flex flex-col gap-4">
        {FEATURES.map((feature) => (
          <section
            key={feature.title}
            className="rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4"
          >
            <div className="flex items-start gap-4">
              <FeatureIcon as={feature.icon} />
              <FeatureBody
                title={feature.title}
                description={feature.description}
                checked={featureOn[feature.title]}
                onCheckedChange={(next) => handleSwitch(feature.title, next)}
                deploy={deploy[feature.title]}
                onManage={() => setManageFeature(feature.title)}
              />
            </div>
          </section>
        ))}
      </div>
    </FeatureSettingsShell>
  );
}
