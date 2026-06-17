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
import { FeatureSettingsShell, SpringSwitch } from './_shared';
import {
  AvaDisableConfirm,
  AvaManageDialog,
  AvaManageDefaultOffConfirm,
  AvaManageRestrictAccessConfirm,
  FeatureManageDialog,
} from './_assistantDialogs';

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
 * Turning AVA off (its parent switch) opens the "Turn off AVA" confirmation
 * (Figma 2454-8876). Confirming turns AVA off and hides its 5 dependent
 * features. The children themselves are display-only.
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
 * its own content column. The switch defaults to a static on state; pass
 * `checked` + `onCheckedChange` to make the parent switch interactive. */
function FeatureBody({
  title,
  description,
  checked = true,
  onCheckedChange,
  onManage,
  children,
}: React.PropsWithChildren<{
  title: string;
  description: string;
  checked?: boolean;
  onCheckedChange?: (next: boolean) => void;
  onManage?: () => void;
}>) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex flex-col gap-2">
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
            onClick={onManage}
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

export function ConceptSummaryAiV2AvaDetail({
  onBack,
  startConfirmOpen = false,
  startManageOpen = false,
  startDefaultOffConfirmOpen = false,
  startRestrictAccessConfirmOpen = false,
}: {
  onBack?: () => void;
  /* When true the "Turn off AVA" confirmation is shown on mount — used by the
   * standalone canvas frame that documents the modal state. */
  startConfirmOpen?: boolean;
  /* When true the "Manage AVA" dialog is shown on mount — used by the standalone
   * canvas frame that documents the manage state. */
  startManageOpen?: boolean;
  /* When true the "Turn off default for users?" confirmation is shown on mount —
   * used by the standalone canvas frame that documents that modal state. */
  startDefaultOffConfirmOpen?: boolean;
  /* When true the "Restrict users from changing this setting?" confirmation is
   * shown on mount — used by the standalone canvas frame that documents it. */
  startRestrictAccessConfirmOpen?: boolean;
}) {
  const [avaOn, setAvaOn] = React.useState(true);
  const [confirmOpen, setConfirmOpen] = React.useState(startConfirmOpen);
  const [manageOpen, setManageOpen] = React.useState(startManageOpen);
  /* Confirmation shown when Manage AVA is saved with the user default set to Off
   * (cascades the off default to AVA's dependent features). */
  const [defaultOffConfirmOpen, setDefaultOffConfirmOpen] =
    React.useState(startDefaultOffConfirmOpen);
  /* Confirmation shown when Manage AVA is saved with "User access" unchecked
   * (cascades the restriction to AVA's dependent features). */
  const [restrictAccessConfirmOpen, setRestrictAccessConfirmOpen] =
    React.useState(startRestrictAccessConfirmOpen);
  /* Which dependent feature's "Manage" dialog is open (null = none). */
  const [manageChild, setManageChild] = React.useState<string | null>(null);

  /* Toggling the parent switch off asks for confirmation first; toggling it back
   * on restores it directly (re-enable has no confirmation). */
  const handleAvaSwitch = (next: boolean) => {
    if (next) {
      setAvaOn(true);
    } else {
      setConfirmOpen(true);
    }
  };

  /* When embedded in the parent AI tab, `onBack` returns to the in-page view.
   * When rendered as its own canvas frame (no onBack), navigate the iframe back
   * to the AI tab preview so the back arrow still returns to the AI tab. */
  const handleBack =
    onBack ??
    (() => {
      const { pathname, search } = window.location;
      const re = /ConceptSummaryAiV2(AvaDetail|AvaDisableConfirm|AvaManageDefaultOffConfirm|AvaManageRestrictAccessConfirm|AvaManage)\/?$/;
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
          <AvaDisableConfirm
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={() => {
              setAvaOn(false);
              setConfirmOpen(false);
            }}
          />
          <AvaManageDialog
            open={manageOpen}
            onCancel={() => setManageOpen(false)}
            onSave={({ defaultVal, allowChange }) => {
              setManageOpen(false);
              /* AVA is a parent, so saving a change that cascades to its
               * dependent features needs confirmation first: an Off user
               * default cascades the off default; unchecking User access
               * cascades the restriction. */
              if (defaultVal === 'Off') setDefaultOffConfirmOpen(true);
              else if (!allowChange) setRestrictAccessConfirmOpen(true);
            }}
            initialDefaultVal="On"
            initialAllowChange
            customUsersCount={26}
          />
          <AvaManageDefaultOffConfirm
            open={defaultOffConfirmOpen}
            onCancel={() => setDefaultOffConfirmOpen(false)}
            onConfirm={() => setDefaultOffConfirmOpen(false)}
          />
          <AvaManageRestrictAccessConfirm
            open={restrictAccessConfirmOpen}
            onCancel={() => setRestrictAccessConfirmOpen(false)}
            onConfirm={() => setRestrictAccessConfirmOpen(false)}
          />
          {/* Per-child "Manage" dialog (User deployment). One instance reused for
           * whichever dependent feature's Manage button was clicked. */}
          <FeatureManageDialog
            open={manageChild !== null}
            featureName={manageChild ?? ''}
            onCancel={() => setManageChild(null)}
            onSave={() => setManageChild(null)}
            initialDefaultVal="On"
            initialAllowChange
            customUsersCount={26}
          />
        </div>
      }
    >
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
          <FeatureBody
            title={AVA.title}
            description={AVA.description}
            checked={avaOn}
            onCheckedChange={handleAvaSwitch}
            onManage={() => setManageOpen(true)}
          >
            {/* Dependent features — hidden once AVA is turned off. Indented to
             * sit under AVA, divided by hairlines. */}
            {avaOn && (
              <div className="mt-4 flex flex-col">
                {CHILDREN.map((child) => (
                  <div
                    key={child.title}
                    className="flex items-start gap-4 border-t border-[var(--sui-colors-neutral-b4)] py-4"
                  >
                    <FeatureIcon as={child.icon} />
                    <FeatureBody
                      title={child.title}
                      description={child.description}
                      onManage={() => setManageChild(child.title)}
                    />
                  </div>
                ))}
              </div>
            )}
          </FeatureBody>
        </div>
      </section>
    </FeatureSettingsShell>
  );
}
