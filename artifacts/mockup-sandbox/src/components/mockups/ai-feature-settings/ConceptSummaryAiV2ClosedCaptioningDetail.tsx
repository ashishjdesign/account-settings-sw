import React from 'react';
import {
  ArrowLeftMd,
  ClosedCaptionsMd,
  TranscriptionMd,
  SmartNotesMd,
} from '@ringcentral/spring-icon';
import { FeatureSettingsShell, SpringSwitch } from './_shared';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Closed captioning detail inner page (Figma 2445-8025)
 *
 * Reached by clicking the Closed captioning parent card's CaretRight chevron on
 * the master-ON AI tab (ConceptSummaryAiV2OnPartial). One bordered card with
 * Closed captioning at the top and its 2 child features (Live transcripts, AI
 * notes) nested INSIDE the parent's content column — indented one icon column to
 * the right so the children read as dependents of Closed captioning. Each row
 * carries its own switch, description, "User default / User access" pills and a
 * Manage link. Children are separated by hairline dividers.
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

const PARENT: Feature = {
  title: 'Closed captioning',
  icon: ClosedCaptionsMd,
  description: 'Uses AI to display real-time captions during phone calls.',
};

const CHILDREN: Feature[] = [
  {
    title: 'Live transcripts',
    icon: TranscriptionMd,
    description: 'Provides real-time AI-generated call transcripts.',
  },
  {
    title: 'AI notes',
    icon: SmartNotesMd,
    description: 'Generate call notes automatically for all your devices.',
  },
];

const PILLS = [
  { label: 'User default:', value: 'On' },
  { label: 'User access:', value: 'Allowed' },
];

/* A single feature's content column: title + switch, description, pills + Manage.
 * The icon column is supplied by the row wrapper so the parent and its children
 * can be indented independently. `children` lets the parent nest its dependent
 * features inside its own content column. */
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

export function ConceptSummaryAiV2ClosedCaptioningDetail({ onBack }: { onBack?: () => void }) {
  /* When embedded in the parent AI tab, `onBack` returns to the in-page view.
   * When rendered as its own canvas frame (no onBack), navigate the iframe back
   * to the AI tab preview so the back arrow still returns to the AI tab. */
  const handleBack =
    onBack ??
    (() => {
      const { pathname, search } = window.location;
      const re = /ConceptSummaryAiV2ClosedCaptioningDetail\/?$/;
      const target = re.test(pathname)
        ? pathname.replace(re, 'ConceptSummaryAiV2OnPartial') + search
        : `${import.meta.env.BASE_URL.replace(/\/$/, '')}/preview/ai-feature-settings/ConceptSummaryAiV2OnPartial`;
      window.location.assign(target);
    });

  return (
    <FeatureSettingsShell flexLayout showFooterActions={false}>
      {/* Back row — ← Closed captioning */}
      <button
        type="button"
        onClick={handleBack}
        className="mb-4 flex items-center gap-4 text-[var(--sui-colors-neutral-b1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)]/30"
      >
        <SpringIcon as={ArrowLeftMd} size={24} />
        <span className="text-[20px] font-semibold leading-[28px] tracking-[-0.2px]">
          Closed captioning
        </span>
      </button>

      <section className="rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
        {/* Parent — its dependent features are nested inside its content column */}
        <div className="flex items-start gap-4">
          <FeatureIcon as={PARENT.icon} />
          <FeatureBody title={PARENT.title} description={PARENT.description}>
            {/* Dependent features — indented to sit under the parent, divided hairlines */}
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
