import React from 'react';
import {
  ArrowLeftMd,
  AvaMd,
  AiSearchMd,
  MessagesMd,
  PuzzleMd,
  AiAsAgentMd,
  ResourceCenterMd,
} from '@ringcentral/spring-icon';
import { cn } from '@/lib/utils';
import { FeatureSettingsShell, SpringSwitch } from './_shared';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — AVA detail inner page (Figma 2445-6666)
 *
 * Reached by clicking the AVA parent card's CaretRight chevron on the master-ON
 * AI tab (ConceptSummaryAiV2OnPartial). One bordered card with AVA at the top
 * and its 5 child features (Query, Messaging, Integrations, Actions, Knowledge
 * Base) nested INSIDE AVA's content column — i.e. indented one icon column to
 * the right so the children read as dependents of AVA. Each row carries its own
 * switch, description, "User default / User access" pills and a Manage link.
 * Children are separated from each other (and from AVA) by hairline dividers.
 *
 * `onBack` returns to the AI tab. When rendered as its own canvas frame (no
 * onBack), the back affordance is inert.
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

const AVA: Feature = {
  title: 'AVA',
  icon: AvaMd,
  description: 'A personal assistant that helps you boost productivity.',
};

const CHILDREN: Feature[] = [
  {
    title: 'Query',
    icon: AiSearchMd,
    description: 'Use content from calls and meetings to generate AI guidance.',
  },
  {
    title: 'Messaging',
    icon: MessagesMd,
    description: 'Use messaging content for internal productivity.',
  },
  {
    title: 'Integrations',
    icon: PuzzleMd,
    description:
      'Allow integrations with Email, Calendar, and CRM to provide additional guidance and actions.',
  },
  {
    title: 'Actions',
    icon: AiAsAgentMd,
    description: 'Enable AVA to make agentic actions for you. Include config and productivity.',
  },
  {
    title: 'Knowledge Base',
    icon: ResourceCenterMd,
    description: "Allow AVA to look through KB's and generate summarized and guided responses.",
  },
];

const PILLS = [
  { label: 'User default:', value: 'On' },
  { label: 'User access:', value: 'Allowed' },
];

/* A single feature's content column: title + switch, description, pills + Manage.
 * The icon column is supplied by the row wrapper so AVA and its children can be
 * indented independently. `children` lets AVA nest its dependent features inside
 * its own content column. */
function FeatureBody({
  title,
  description,
  children,
}: React.PropsWithChildren<{ title: string; description: string }>) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex flex-col gap-2">
        <div className="flex min-h-[32px] w-full items-center gap-4">
          <h3 className="flex-1 truncate text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
            {title}
          </h3>
          <SpringSwitch checked aria-label={title} />
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

        <div className="mt-2 flex w-full items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            {PILLS.map((seg, i) => (
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
            className="inline-flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] px-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-primary-b)] transition-colors hover:text-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30"
          >
            Manage
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}

function FeatureIcon({ as }: { as: IconCmp }) {
  return (
    <div className="flex h-[32px] w-5 shrink-0 items-center justify-center text-[var(--sui-colors-neutral-b1)]">
      <SpringIcon as={as} />
    </div>
  );
}

export function ConceptSummaryAiV2AvaDetail({ onBack }: { onBack?: () => void }) {
  /* When embedded in the parent AI tab, `onBack` returns to the in-page view.
   * When rendered as its own canvas frame (no onBack), navigate the iframe back
   * to the AI tab preview so the back arrow still returns to the AI tab. */
  const handleBack =
    onBack ??
    (() => {
      const { pathname, search } = window.location;
      const aiTabRe = /ConceptSummaryAiV2AvaDetail\/?$/;
      const target = aiTabRe.test(pathname)
        ? pathname.replace(aiTabRe, 'ConceptSummaryAiV2OnPartial') + search
        : `${import.meta.env.BASE_URL.replace(/\/$/, '')}/preview/ai-feature-settings/ConceptSummaryAiV2OnPartial`;
      window.location.assign(target);
    });

  return (
    <FeatureSettingsShell flexLayout showFooterActions={false}>
      {/* Back row — ← AVA */}
      <button
        type="button"
        onClick={handleBack}
        className="mb-4 flex items-center gap-4 text-[var(--sui-colors-neutral-b1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)]/30"
      >
        <SpringIcon as={ArrowLeftMd} size={24} />
        <span className="text-[20px] font-semibold leading-[28px] tracking-[-0.2px]">AVA</span>
      </button>

      <section className="rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
        {/* AVA parent — its dependent features are nested inside its content column */}
        <div className="flex items-start gap-4">
          <FeatureIcon as={AVA.icon} />
          <FeatureBody title={AVA.title} description={AVA.description}>
            {/* Dependent features — indented to sit under AVA, divided hairlines */}
            <div className="mt-4 flex flex-col">
              {CHILDREN.map((child) => (
                <div
                  key={child.title}
                  className="flex items-start gap-4 border-t border-[var(--sui-colors-neutral-b4)] py-4"
                >
                  <FeatureIcon as={child.icon} />
                  <FeatureBody title={child.title} description={child.description} />
                </div>
              ))}
            </div>
          </FeatureBody>
        </div>
      </section>
    </FeatureSettingsShell>
  );
}
