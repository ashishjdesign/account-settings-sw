import React from 'react';
import {
  ArrowLeftMd,
  ClosedCaptionsMd,
  TranscriptionMd,
  SmartNotesMd,
  VoicemailMd,
} from '@ringcentral/spring-icon';
import { FeatureSettingsShell, SpringSwitch } from './_shared';
import {
  ClosedCaptioningDisableConfirm,
  FeatureManageDialog,
  FeatureChildDisableConfirm,
  FeatureDisableConfirm,
  ClosedCaptioningManageDefaultOffConfirm,
  ClosedCaptioningManageRestrictAccessConfirm,
  LiveTranscriptsDisableConfirm,
  LiveTranscriptsManageDefaultOffConfirm,
  LiveTranscriptsManageRestrictAccessConfirm,
} from './_assistantDialogs';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Phone AI detail inner page
 *
 * Reached by clicking the "Phone AI" parent card's CaretRight chevron on the
 * master-ON AI tab (ConceptSummaryAiV2OnPartial). The Phone AI page groups the
 * phone-related AI features into two bordered cards:
 *   Card 1: Closed captioning (parent) with Live transcripts nested INSIDE its
 *           content column, and AI notes nested one level deeper as a
 *           dependent of Live transcripts (36px left indent).
 *   Card 2: AI voicemail summaries — an independent, top-level feature.
 *
 * This is an ARCHITECTURE-only regrouping: the per-feature management UX
 * (deployment pills, parent→child cascade, toggle/Manage/confirm flows) is the
 * same as before — Closed captioning behaves exactly as it did on its own
 * detail page (ConceptSummaryAiV2ClosedCaptioningDetail).
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

const CAPTIONING: Feature = {
  title: 'Closed captioning',
  icon: ClosedCaptionsMd,
  description: 'Uses AI to display real-time captions during phone calls.',
};

/* Live transcripts is Closed captioning's direct dependent; AI notes is now a
 * dependent of Live transcripts (nested one level deeper). */
const LIVE_TRANSCRIPTS: Feature = {
  title: 'Live transcripts',
  icon: TranscriptionMd,
  description: 'Provides real-time AI-generated call transcripts.',
};

const AI_NOTES: Feature = {
  title: 'AI notes',
  icon: SmartNotesMd,
  description: 'Generate call notes automatically for all your devices.',
};

const CAPTIONING_CHILDREN: Feature[] = [LIVE_TRANSCRIPTS, AI_NOTES];

const VOICEMAIL: Feature = {
  title: 'AI voicemail summaries',
  icon: VoicemailMd,
  description:
    'Delivers AI-generated summaries of voicemails, including key details and follow-up items.',
};

/* A single feature's content column: title + switch, description, pills + Manage.
 * The icon column is supplied by the row wrapper so a parent and its children
 * can be indented independently. `children` lets a parent nest its dependent
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

export function ConceptSummaryAiV2PhoneAiDetail({
  onBack,
}: {
  onBack?: () => void;
}) {
  /* ---- Closed captioning (parent + dependents) ---- */
  const [captioningOn, setCaptioningOn] = React.useState(true);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const [parentDeploy, setParentDeploy] = React.useState<Deploy>({
    defaultVal: 'On',
    allowChange: true,
  });
  const [childDeploy, setChildDeploy] = React.useState<Record<string, Deploy>>(() =>
    Object.fromEntries(
      CAPTIONING_CHILDREN.map((c) => [c.title, { defaultVal: 'On', allowChange: true }]),
    ),
  );

  const [manageOpen, setManageOpen] = React.useState(false);
  const [pendingParent, setPendingParent] = React.useState<Deploy | null>(null);
  const [defaultOffConfirmOpen, setDefaultOffConfirmOpen] = React.useState(false);
  const [restrictAccessConfirmOpen, setRestrictAccessConfirmOpen] = React.useState(false);

  const [manageChild, setManageChild] = React.useState<string | null>(null);
  const [childOn, setChildOn] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(CAPTIONING_CHILDREN.map((c) => [c.title, true])),
  );
  const [disableChild, setDisableChild] = React.useState<string | null>(null);

  /* Live transcripts cascade dialogs — turning LT off (or saving its Manage
   * dialog with default Off / access Restricted) also affects its dependent,
   * AI notes, so each path confirms first. */
  const [ltDisableConfirmOpen, setLtDisableConfirmOpen] = React.useState(false);
  const [pendingLt, setPendingLt] = React.useState<Deploy | null>(null);
  const [ltDefaultOffConfirmOpen, setLtDefaultOffConfirmOpen] = React.useState(false);
  const [ltRestrictConfirmOpen, setLtRestrictConfirmOpen] = React.useState(false);

  /* ---- AI voicemail summaries (independent top-level feature) ---- */
  const [voicemailOn, setVoicemailOn] = React.useState(true);
  const [voicemailConfirmOpen, setVoicemailConfirmOpen] = React.useState(false);
  const [voicemailManageOpen, setVoicemailManageOpen] = React.useState(false);
  const [voicemailDeploy, setVoicemailDeploy] = React.useState<Deploy>({
    defaultVal: 'On',
    allowChange: true,
  });

  const handleCaptioningSwitch = (next: boolean) => {
    if (next) {
      setCaptioningOn(true);
    } else {
      setConfirmOpen(true);
    }
  };

  const handleChildSwitch = (title: string, next: boolean) => {
    if (next) {
      setChildOn((prev) => ({ ...prev, [title]: true }));
    } else if (title === LIVE_TRANSCRIPTS.title) {
      /* LT off cascades to AI notes — dedicated confirm. */
      setLtDisableConfirmOpen(true);
    } else {
      setDisableChild(title);
    }
  };

  /* Cascade Live transcripts' restrictive deployment down to AI notes: default
   * Off forces AI notes' default to Off; restricting access restricts AI notes
   * too. (Turning LT back On/Allowed leaves AI notes untouched.) */
  const applyLtDeploy = (next: Deploy) => {
    setChildDeploy((prev) => ({
      ...prev,
      [LIVE_TRANSCRIPTS.title]: next,
      [AI_NOTES.title]: {
        defaultVal: next.defaultVal === 'Off' ? 'Off' : prev[AI_NOTES.title].defaultVal,
        allowChange: next.allowChange === false ? false : prev[AI_NOTES.title].allowChange,
      },
    }));
  };

  const handleChildManageSave = (title: string, next: Deploy) => {
    setManageChild(null);
    if (title === LIVE_TRANSCRIPTS.title) {
      if (next.defaultVal === 'Off') {
        setPendingLt(next);
        setLtDefaultOffConfirmOpen(true);
        return;
      }
      if (!next.allowChange) {
        setPendingLt(next);
        setLtRestrictConfirmOpen(true);
        return;
      }
      applyLtDeploy(next);
      return;
    }
    setChildDeploy((prev) => ({ ...prev, [title]: next }));
  };

  const applyParentDeploy = (next: Deploy) => {
    setParentDeploy(next);
    setChildDeploy((prev) =>
      Object.fromEntries(
        CAPTIONING_CHILDREN.map((c) => [
          c.title,
          {
            defaultVal: next.defaultVal === 'Off' ? 'Off' : prev[c.title].defaultVal,
            allowChange: next.allowChange === false ? false : prev[c.title].allowChange,
          },
        ]),
      ),
    );
  };

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

  const handleVoicemailSwitch = (next: boolean) => {
    if (next) {
      setVoicemailOn(true);
    } else {
      setVoicemailConfirmOpen(true);
    }
  };

  /* When embedded in the parent AI tab, `onBack` returns to the in-page view.
   * When rendered as its own canvas frame (no onBack), navigate the iframe back
   * to the AI tab preview so the back arrow still returns to the AI tab. */
  const handleBack =
    onBack ??
    (() => {
      const { pathname, search } = window.location;
      const re = /ConceptSummaryAiV2PhoneAiDetail\/?$/;
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
          <FeatureManageDialog
            open={manageOpen}
            featureName="Closed captioning"
            onCancel={() => setManageOpen(false)}
            onSave={handleParentSave}
            initialDefaultVal={parentDeploy.defaultVal}
            initialAllowChange={parentDeploy.allowChange}
            customUsersCount={26}
            lockAllowChange
          />
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
          {/* Live transcripts + AI notes — user access is always Allowed (locked) */}
          <FeatureManageDialog
            open={manageChild !== null}
            featureName={manageChild ?? ''}
            onCancel={() => setManageChild(null)}
            onSave={(next) => {
              if (manageChild) handleChildManageSave(manageChild, next);
            }}
            initialDefaultVal={manageChild ? childDeploy[manageChild].defaultVal : 'On'}
            initialAllowChange={manageChild ? childDeploy[manageChild].allowChange : true}
            customUsersCount={26}
            lockAllowChange
          />
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
          {/* Live transcripts cascade confirms — AI notes is its dependent. */}
          <LiveTranscriptsDisableConfirm
            open={ltDisableConfirmOpen}
            onCancel={() => setLtDisableConfirmOpen(false)}
            onConfirm={() => {
              setChildOn((prev) => ({
                ...prev,
                [LIVE_TRANSCRIPTS.title]: false,
                [AI_NOTES.title]: false,
              }));
              setLtDisableConfirmOpen(false);
            }}
          />
          <LiveTranscriptsManageDefaultOffConfirm
            open={ltDefaultOffConfirmOpen}
            onCancel={() => {
              setLtDefaultOffConfirmOpen(false);
              setPendingLt(null);
            }}
            onConfirm={() => {
              setLtDefaultOffConfirmOpen(false);
              if (pendingLt && !pendingLt.allowChange) {
                setLtRestrictConfirmOpen(true);
              } else {
                if (pendingLt) applyLtDeploy(pendingLt);
                setPendingLt(null);
              }
            }}
          />
          <LiveTranscriptsManageRestrictAccessConfirm
            open={ltRestrictConfirmOpen}
            onCancel={() => {
              setLtRestrictConfirmOpen(false);
              setPendingLt(null);
            }}
            onConfirm={() => {
              if (pendingLt) applyLtDeploy(pendingLt);
              setLtRestrictConfirmOpen(false);
              setPendingLt(null);
            }}
          />
          {/* AI voicemail summaries — independent top-level feature: org-level
           * disable confirm + its own Manage dialog (no cascade). */}
          <FeatureDisableConfirm
            open={voicemailConfirmOpen}
            featureName="AI voicemail summaries"
            onCancel={() => setVoicemailConfirmOpen(false)}
            onConfirm={() => {
              setVoicemailOn(false);
              setVoicemailConfirmOpen(false);
            }}
          />
          <FeatureManageDialog
            open={voicemailManageOpen}
            featureName="AI voicemail summaries"
            onCancel={() => setVoicemailManageOpen(false)}
            onSave={(next) => {
              setVoicemailDeploy(next);
              setVoicemailManageOpen(false);
            }}
            initialDefaultVal={voicemailDeploy.defaultVal}
            initialAllowChange={voicemailDeploy.allowChange}
            customUsersCount={26}
          />
        </div>
      }
    >
      {/* Back row — ← Phone AI */}
      <button
        type="button"
        onClick={handleBack}
        className="mb-4 flex items-center gap-4 text-[var(--sui-colors-neutral-b1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)]/30"
      >
        <SpringIcon as={ArrowLeftMd} size={24} />
        <span className="text-[20px] font-semibold leading-[28px] tracking-[-0.2px]">Phone AI</span>
      </button>

      <div className="flex flex-col gap-4">
        {/* Card 1 — Closed captioning + its dependent features */}
        <section className="rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
          <div className="flex items-start gap-4">
            <FeatureIcon as={CAPTIONING.icon} />
            <FeatureBody
              title={CAPTIONING.title}
              description={CAPTIONING.description}
              checked={captioningOn}
              onCheckedChange={handleCaptioningSwitch}
              deploy={parentDeploy}
              onManage={() => setManageOpen(true)}
            >
              {captioningOn && (
                <div className="mt-4 flex flex-col">
                  {/* Live transcripts — CC's dependent; AI notes nests inside
                   * its content column (36px left indent = icon 20px + gap
                   * 16px) so it reads as LT's dependent. */}
                  <div className="flex items-start gap-4 border-t border-[var(--sui-colors-neutral-b4)] py-4">
                    <FeatureIcon as={LIVE_TRANSCRIPTS.icon} />
                    <FeatureBody
                      title={LIVE_TRANSCRIPTS.title}
                      description={LIVE_TRANSCRIPTS.description}
                      checked={childOn[LIVE_TRANSCRIPTS.title]}
                      onCheckedChange={(next) => handleChildSwitch(LIVE_TRANSCRIPTS.title, next)}
                      deploy={childDeploy[LIVE_TRANSCRIPTS.title]}
                      onManage={() => setManageChild(LIVE_TRANSCRIPTS.title)}
                    >
                      {childOn[LIVE_TRANSCRIPTS.title] && (
                        <div className="mt-4 flex items-start gap-4 border-t border-[var(--sui-colors-neutral-b4)] pt-4">
                          <FeatureIcon as={AI_NOTES.icon} />
                          <FeatureBody
                            title={AI_NOTES.title}
                            description={AI_NOTES.description}
                            checked={childOn[AI_NOTES.title]}
                            onCheckedChange={(next) => handleChildSwitch(AI_NOTES.title, next)}
                            deploy={childDeploy[AI_NOTES.title]}
                            onManage={() => setManageChild(AI_NOTES.title)}
                          />
                        </div>
                      )}
                    </FeatureBody>
                  </div>
                </div>
              )}
            </FeatureBody>
          </div>
        </section>

        {/* Card 2 — AI voicemail summaries (independent feature) */}
        <section className="rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
          <div className="flex items-start gap-4">
            <FeatureIcon as={VOICEMAIL.icon} />
            <FeatureBody
              title={VOICEMAIL.title}
              description={VOICEMAIL.description}
              checked={voicemailOn}
              onCheckedChange={handleVoicemailSwitch}
              deploy={voicemailDeploy}
              onManage={() => setVoicemailManageOpen(true)}
            />
          </div>
        </section>
      </div>
    </FeatureSettingsShell>
  );
}
