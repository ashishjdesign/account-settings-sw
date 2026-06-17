import React from 'react';
import {
  ArrowLeftMd,
  ClosedCaptionsMd,
  TranscriptionMd,
  SmartNotesMd,
} from '@ringcentral/spring-icon';
import { FeatureSettingsShell, SpringSwitch } from './_shared';
import {
  ClosedCaptioningDisableConfirm,
  FeatureManageDialog,
  FeatureChildDisableConfirm,
  ClosedCaptioningManageDefaultOffConfirm,
  ClosedCaptioningManageRestrictAccessConfirm,
} from './_assistantDialogs';

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
 * Turning Closed captioning off (its parent switch) opens the "Turn off Closed
 * captioning" confirmation (Figma 2495-9886). Confirming turns the parent off
 * and hides its 2 dependent features.
 *
 * Managing the parent's user deployment cascades to the dependents: saving the
 * Manage Closed captioning dialog with the user default set to Off (after the
 * "Turn off default for users?" confirmation) defaults the dependents off too;
 * restricting user access (after the "Restrict users from changing this
 * setting?" confirmation) restricts the dependents too. The deployment pills on
 * each row reflect this live.
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

/* A single feature's content column: title + switch, description, pills + Manage.
 * The icon column is supplied by the row wrapper so the parent and its children
 * can be indented independently. `children` lets the parent nest its dependent
 * features inside its own content column. Pass `checked` + `onCheckedChange` to
 * make the switch interactive; `deploy` drives the live "User default / User
 * access" pills. */
function FeatureBody({
  title,
  description,
  checked = true,
  onCheckedChange,
  deploy,
  onManage,
  children,
}: React.PropsWithChildren<{
  title: string;
  description: string;
  checked?: boolean;
  onCheckedChange?: (next: boolean) => void;
  deploy: Deploy;
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

export function ConceptSummaryAiV2ClosedCaptioningDetail({
  onBack,
  startConfirmOpen = false,
}: {
  onBack?: () => void;
  /* When true the "Turn off Closed captioning" confirmation is shown on mount —
   * used by the standalone canvas frame that documents the modal state. */
  startConfirmOpen?: boolean;
}) {
  const [captioningOn, setCaptioningOn] = React.useState(true);
  const [confirmOpen, setConfirmOpen] = React.useState(startConfirmOpen);

  /* Parent user-deployment state, reflected live in its pills. */
  const [parentDeploy, setParentDeploy] = React.useState<Deploy>({
    defaultVal: 'On',
    allowChange: true,
  });
  /* Per-child user-deployment state (all on/allowed by default). The parent
   * Manage cascade writes into these so the dependents' pills follow the parent. */
  const [childDeploy, setChildDeploy] = React.useState<Record<string, Deploy>>(() =>
    Object.fromEntries(CHILDREN.map((c) => [c.title, { defaultVal: 'On', allowChange: true }])),
  );

  /* Parent "Manage" dialog + the deployment values awaiting a cascade
   * confirmation (saved but not yet applied until the user confirms). */
  const [manageOpen, setManageOpen] = React.useState(false);
  const [pendingParent, setPendingParent] = React.useState<Deploy | null>(null);
  const [defaultOffConfirmOpen, setDefaultOffConfirmOpen] = React.useState(false);
  const [restrictAccessConfirmOpen, setRestrictAccessConfirmOpen] = React.useState(false);

  /* Which dependent feature's "Manage" dialog is open (null = none). */
  const [manageChild, setManageChild] = React.useState<string | null>(null);
  /* Per-child on/off (switch) state (all on by default). Turning a child off
   * hides its own user-deployment row (pills + Manage). */
  const [childOn, setChildOn] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(CHILDREN.map((c) => [c.title, true])),
  );
  /* Which child's "Turn off …?" confirmation is open (null = none). */
  const [disableChild, setDisableChild] = React.useState<string | null>(null);

  /* Toggling the parent switch off asks for confirmation first; toggling it back
   * on restores it directly (re-enable has no confirmation). */
  const handleCaptioningSwitch = (next: boolean) => {
    if (next) {
      setCaptioningOn(true);
    } else {
      setConfirmOpen(true);
    }
  };

  /* A child switch turned off asks for confirmation first; turned back on
   * restores it directly (re-enable has no confirmation). */
  const handleChildSwitch = (title: string, next: boolean) => {
    if (next) {
      setChildOn((prev) => ({ ...prev, [title]: true }));
    } else {
      setDisableChild(title);
    }
  };

  /* Apply a saved parent deployment and cascade it to the dependents. Because
   * Closed captioning is a parent, defaulting it off defaults its dependents
   * off, and restricting it restricts its dependents — each dimension cascades
   * independently (turning the default back on / re-allowing leaves the
   * dependents untouched). */
  const applyParentDeploy = (next: Deploy) => {
    setParentDeploy(next);
    setChildDeploy((prev) =>
      Object.fromEntries(
        CHILDREN.map((c) => [
          c.title,
          {
            defaultVal: next.defaultVal === 'Off' ? 'Off' : prev[c.title].defaultVal,
            allowChange: next.allowChange === false ? false : prev[c.title].allowChange,
          },
        ]),
      ),
    );
  };

  /* Saving the parent Manage dialog. Turning the user default off, or
   * restricting access, opens the matching cascade confirmation before applying
   * (default off takes precedence). Any other change applies directly. */
  const handleParentSave = (next: Deploy) => {
    setManageOpen(false);
    if (next.defaultVal === 'Off') {
      setPendingParent(next);
      setDefaultOffConfirmOpen(true);
    } else if (!next.allowChange) {
      setPendingParent(next);
      setRestrictAccessConfirmOpen(true);
    } else {
      applyParentDeploy(next);
    }
  };

  /* When embedded in the parent AI tab, `onBack` returns to the in-page view.
   * When rendered as its own canvas frame (no onBack), navigate the iframe back
   * to the AI tab preview so the back arrow still returns to the AI tab. */
  const handleBack =
    onBack ??
    (() => {
      const { pathname, search } = window.location;
      const re = /ConceptSummaryAiV2ClosedCaptioning(Detail|DisableConfirm)\/?$/;
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
          <ClosedCaptioningDisableConfirm
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={() => {
              setCaptioningOn(false);
              setConfirmOpen(false);
            }}
          />
          {/* Parent "Manage" dialog. Saving with the user default set to Off, or
           * with user access restricted, opens the matching cascade confirmation
           * (default off takes precedence). */}
          <FeatureManageDialog
            open={manageOpen}
            featureName="Closed captioning"
            onCancel={() => setManageOpen(false)}
            onSave={handleParentSave}
            initialDefaultVal={parentDeploy.defaultVal}
            initialAllowChange={parentDeploy.allowChange}
            customUsersCount={26}
          />
          {/* Cascade confirmation — Closed captioning defaulted off for users
           * also defaults its dependents (Live transcripts, AI notes) off. */}
          <ClosedCaptioningManageDefaultOffConfirm
            open={defaultOffConfirmOpen}
            onCancel={() => {
              setDefaultOffConfirmOpen(false);
              setPendingParent(null);
            }}
            onConfirm={() => {
              if (pendingParent) applyParentDeploy(pendingParent);
              setDefaultOffConfirmOpen(false);
              setPendingParent(null);
            }}
          />
          {/* Cascade confirmation — restricting Closed captioning also restricts
           * its dependents. */}
          <ClosedCaptioningManageRestrictAccessConfirm
            open={restrictAccessConfirmOpen}
            onCancel={() => {
              setRestrictAccessConfirmOpen(false);
              setPendingParent(null);
            }}
            onConfirm={() => {
              if (pendingParent) applyParentDeploy(pendingParent);
              setRestrictAccessConfirmOpen(false);
              setPendingParent(null);
            }}
          />
          {/* Per-child "Manage" dialog (User deployment). One instance reused for
           * whichever dependent feature's Manage button was clicked. Saving
           * updates that child's own pills. */}
          <FeatureManageDialog
            open={manageChild !== null}
            featureName={manageChild ?? ''}
            onCancel={() => setManageChild(null)}
            onSave={(next) => {
              if (manageChild) setChildDeploy((prev) => ({ ...prev, [manageChild]: next }));
              setManageChild(null);
            }}
            initialDefaultVal={manageChild ? childDeploy[manageChild].defaultVal : 'On'}
            initialAllowChange={manageChild ? childDeploy[manageChild].allowChange : true}
            customUsersCount={26}
          />
          {/* Per-child "Turn off …?" confirmation. Confirming turns the child off
           * and hides its user-deployment row. */}
          <FeatureChildDisableConfirm
            open={disableChild !== null}
            featureName={disableChild ?? ''}
            onCancel={() => setDisableChild(null)}
            onConfirm={() => {
              if (disableChild) {
                setChildOn((prev) => ({ ...prev, [disableChild]: false }));
              }
              setDisableChild(null);
            }}
          />
        </div>
      }
    >
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
          <FeatureBody
            title={PARENT.title}
            description={PARENT.description}
            checked={captioningOn}
            onCheckedChange={handleCaptioningSwitch}
            deploy={parentDeploy}
            onManage={() => setManageOpen(true)}
          >
            {/* Dependent features — hidden once Closed captioning is turned off.
             * Indented to sit under the parent, divided by hairlines. */}
            {captioningOn && (
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
                      checked={childOn[child.title]}
                      onCheckedChange={(next) => handleChildSwitch(child.title, next)}
                      deploy={childDeploy[child.title]}
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
