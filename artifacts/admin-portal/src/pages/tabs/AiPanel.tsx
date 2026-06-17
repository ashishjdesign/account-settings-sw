import React, { useState, useEffect } from 'react';
import { useSearch, useLocation } from 'wouter';
import {
  AiStarsMd,
  AvaMd,
  AiSearchMd,
  MessagesMd,
  PuzzleMd,
  AiAsAgentMd,
  ResourceCenterMd,
  AiWriterAltMd,
  AiSummaryMd,
  SmartNotesMd,
  ClosedCaptionsMd,
  TranscriptMd,
  VoicemailMd,
  GlobeMd,
} from '@ringcentral/spring-icon';
import { useSettings } from '../../store';
import type { AiFeatureKey, AiRetentionPeriod } from '../../store';
import {
  SettingCard,
  SectionHeading,
  ParentCard,
  FeatureDetailPage,
  FeatureDetailRow,
  SpringIcon,
  SpringConfirmDialog,
  SpringFeatureManageDialog,
  showToast,
} from '../../components/shared';
import {
  ManageAiFeaturesDialog,
  RetentionConfirmDialog,
  periodLabel,
} from './_aiRetention';
import {
  AssistantReEnableConfirmDialog,
  FeatureEnableConfirmDialog,
} from './_assistantConfirms';

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type FeatureItem = {
  key: AiFeatureKey;
  title: string;
  icon: React.ReactNode;
  description: React.ReactNode;
};

const ALLOWED = [
  { label: 'User default:', value: 'On' },
  { label: 'User access:', value: 'Allowed' },
];

/* AVA's dependent features (Figma 2445-6666). These are new concepts not yet
 * backed by individual store state, so they render display-only inside the AVA
 * detail page (matching the static design). */
const AVA_CHILDREN: { title: string; icon: IconCmp; description: string }[] = [
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

/* Closed captioning's dependent features (Figma 2445-8025) — these ARE backed
 * by real store state, so their toggles / Manage flows are fully wired. */
const CC_CHILDREN: { key: Exclude<AiFeatureKey, 'aiAssistant'>; title: string; icon: IconCmp; description: string }[] = [
  {
    key: 'liveTranscripts',
    title: 'Live transcripts',
    icon: TranscriptMd,
    description: 'Provides real-time AI-generated call transcripts.',
  },
  {
    key: 'aiNotes',
    title: 'AI notes',
    icon: SmartNotesMd,
    description: 'Generate call notes automatically for all your devices.',
  },
];

const PHONE_ITEMS: FeatureItem[] = [
  {
    key: 'closedCaptioning',
    title: 'Closed captioning',
    icon: <SpringIcon as={ClosedCaptionsMd} />,
    description: 'Uses AI to display real-time captions during phone calls.',
  },
  {
    key: 'liveTranscripts',
    title: 'Live transcripts',
    icon: <SpringIcon as={TranscriptMd} />,
    description: 'Provides real-time AI-generated call transcripts.',
  },
  {
    key: 'aiNotes',
    title: 'AI notes',
    icon: <SpringIcon as={SmartNotesMd} />,
    description: 'Generate call notes automatically for all your devices.',
  },
  {
    key: 'aiVoicemailSummaries',
    title: 'AI voicemail summaries',
    icon: <SpringIcon as={VoicemailMd} />,
    description:
      'Delivers AI-generated summaries of voicemails, including key details and follow-up items.',
  },
];

const CHAT_ITEMS: FeatureItem[] = [
  {
    key: 'aiWriterMessaging',
    title: 'AI writer for messaging',
    icon: <SpringIcon as={AiWriterAltMd} />,
    description:
      'Uses AI to draft and refine messages — check grammar, adjust tone or length, and translate to other languages.',
  },
  {
    key: 'aiSummary',
    title: 'AI summary',
    icon: <SpringIcon as={AiSummaryMd} />,
    description: 'Provides AI summaries that highlight key conversation points.',
  },
  {
    key: 'aiTranslation',
    title: 'AI translation',
    icon: <SpringIcon as={GlobeMd} />,
    description: 'Uses AI to translate chats, messages, and transcripts across languages.',
  },
];

const SMS_ITEMS: FeatureItem[] = [
  {
    key: 'aiWriterSms',
    title: 'AI writer for SMS',
    icon: <SpringIcon as={AiWriterAltMd} />,
    description:
      'Uses AI to draft and refine messages — check grammar, adjust tone or length, and translate to other languages.',
  },
];

export default function AiPanel() {
  const { state, dispatch } = useSettings();
  const { masterOn, aiAssistant } = state.ai;

  // Which page of the AI tab is showing — driven by the `?detail=` URL param so
  // the AVA / Closed captioning detail views are deep-linkable and back/forward
  // works. Default (no param) = the main list.
  const search = useSearch();
  const [, setLocation] = useLocation();
  const detailParam = new URLSearchParams(search).get('detail');
  const page: 'main' | 'ava' | 'closedCaptioning' =
    detailParam === 'ava'
      ? 'ava'
      : detailParam === 'closedCaptioning'
        ? 'closedCaptioning'
        : 'main';
  const openDetail = (d: 'ava' | 'closedCaptioning') =>
    setLocation(`/feature-settings/ai?detail=${d}`);
  const backToMain = () => setLocation('/feature-settings/ai');

  // Cascade gate: AVA — and therefore the Phone / Chat / SMS features that
  // depend on it — is only active when both master AI and AVA are on.
  const avaActive = masterOn && aiAssistant.on;

  // Guard deep links: a detail view is only reachable when its parent is on.
  // `?detail=ava` needs master AI on; `?detail=closedCaptioning` needs AVA on.
  // Normalize an invalid `?detail=` back to the main list.
  useEffect(() => {
    if (detailParam === 'ava' && !masterOn) {
      setLocation('/feature-settings/ai', { replace: true });
    } else if (detailParam === 'closedCaptioning' && !avaActive) {
      setLocation('/feature-settings/ai', { replace: true });
    }
  }, [detailParam, masterOn, avaActive, setLocation]);

  const customRetention = state.ai.customRetention;
  const [masterConfirmOpen, setMasterConfirmOpen] = useState(false);
  const [masterEnableConfirmOpen, setMasterEnableConfirmOpen] = useState(false);
  const [assistantDisableConfirmOpen, setAssistantDisableConfirmOpen] = useState(false);
  const [assistantEnableConfirmOpen, setAssistantEnableConfirmOpen] = useState(false);
  const [manageModal, setManageModal] = useState<'aiFeatures' | null>(null);

  // Sub-feature (Phone / Chat / SMS) flow state. Each holds the AiFeatureKey
  // currently being managed / disabled / enabled. Only one is active at a time.
  type SubKey = Exclude<AiFeatureKey, 'aiAssistant'>;
  const [subManageKey, setSubManageKey] = useState<SubKey | null>(null);
  const [subDisableKey, setSubDisableKey] = useState<SubKey | null>(null);
  const [subEnableKey, setSubEnableKey] = useState<SubKey | null>(null);

  // Pending values awaiting confirm-dialog approval (turn-on / change).
  const [pending, setPending] = useState<{ on: boolean; period: AiRetentionPeriod } | null>(null);
  const [aiTurnOnConfirmOpen, setAiTurnOnConfirmOpen] = useState(false);
  const [aiChangeConfirmOpen, setAiChangeConfirmOpen] = useState(false);

  // True when the turn-on confirm was triggered by the toggle inside the
  // Manage modal (we keep the Manage modal open after committing).
  const [turnOnFromToggle, setTurnOnFromToggle] = useState(false);

  const handleManageSave = ({
    retentionOn, period,
  }: { retentionOn: boolean; period: AiRetentionPeriod }) => {
    const wasOn = customRetention.on;
    if (wasOn && !retentionOn) {
      dispatch({ type: 'PATCH_AI_CUSTOM_RETENTION', payload: { on: false } });
      setManageModal(null);
      showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
      return;
    }
    if (!wasOn && retentionOn) {
      setPending({ on: true, period });
      setTurnOnFromToggle(false);
      setAiTurnOnConfirmOpen(true);
      return;
    }
    if (wasOn && retentionOn && period !== customRetention.period) {
      setPending({ on: true, period });
      setAiChangeConfirmOpen(true);
      return;
    }
    setManageModal(null);
  };

  const commitPending = () => {
    if (pending) {
      dispatch({
        type: 'PATCH_AI_CUSTOM_RETENTION',
        payload: { on: pending.on, period: pending.period },
      });
    }
    const keepManageOpen = aiTurnOnConfirmOpen && turnOnFromToggle;
    setPending(null);
    setAiTurnOnConfirmOpen(false);
    setAiChangeConfirmOpen(false);
    setTurnOnFromToggle(false);
    if (!keepManageOpen) setManageModal(null);
    showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
  };

  const handleMasterToggle = () => {
    if (masterOn) {
      setMasterConfirmOpen(true);
    } else {
      setMasterEnableConfirmOpen(true);
    }
  };

  const confirmMasterOff = () => {
    dispatch({ type: 'TOGGLE_MASTER_AI', payload: false });
    // Cascade AVA off so re-enabling AI features requires explicit re-validation
    // of AVA. Sub-feature on/off states are preserved for restoration.
    dispatch({ type: 'PATCH_AI_ASSISTANT', payload: { on: false } });
    setMasterConfirmOpen(false);
    backToMain();
    showToast('AI features turned off', () => dispatch({ type: 'UNDO' }));
  };

  const confirmMasterOn = () => {
    dispatch({ type: 'TOGGLE_MASTER_AI', payload: true });
    setMasterEnableConfirmOpen(false);
    showToast('AI features turned on', () => dispatch({ type: 'UNDO' }));
  };

  const handleAssistantToggle = () => {
    if (aiAssistant.on) {
      setAssistantDisableConfirmOpen(true);
    } else {
      setAssistantEnableConfirmOpen(true);
    }
  };

  const confirmAssistantOff = () => {
    dispatch({ type: 'PATCH_AI_ASSISTANT', payload: { on: false } });
    setAssistantDisableConfirmOpen(false);
    showToast('AVA turned off', () => dispatch({ type: 'UNDO' }));
  };

  const confirmAssistantOn = () => {
    dispatch({ type: 'PATCH_AI_ASSISTANT', payload: { on: true } });
    setAssistantEnableConfirmOpen(false);
    showToast('AVA turned on', () => dispatch({ type: 'UNDO' }));
  };

  const toggleSubFeature = (key: SubKey) => {
    if (!avaActive) return;
    const cur = state.ai[key].on;
    if (cur) setSubDisableKey(key);
    else setSubEnableKey(key);
  };

  // Lookup of feature title by key — used by sub-feature dialogs.
  const ALL_SUB_ITEMS: FeatureItem[] = [...PHONE_ITEMS, ...CHAT_ITEMS, ...SMS_ITEMS];
  const labelFor = (key: SubKey) =>
    ALL_SUB_ITEMS.find((i) => i.key === key)?.title ?? String(key);

  const confirmSubDisable = () => {
    if (!subDisableKey) return;
    const key = subDisableKey;
    dispatch({ type: 'PATCH_AI_FEATURE', key, payload: { on: false } });
    setSubDisableKey(null);
    showToast(`${labelFor(key)} turned off`, () => dispatch({ type: 'UNDO' }));
  };

  const confirmSubEnable = (
    result: { defaultVal: 'On' | 'Off'; allowChange: boolean; customAction: 'reset' | 'restore' },
  ) => {
    if (!subEnableKey) return;
    const key = subEnableKey;
    dispatch({
      type: 'PATCH_AI_FEATURE',
      key,
      payload: {
        on: true,
        defaultVal: result.defaultVal,
        allowChange: result.allowChange,
        customUsers: result.customAction === 'reset' ? 0 : state.ai[key].customUsers,
      },
    });
    setSubEnableKey(null);
    showToast(`${labelFor(key)} turned on`, () => dispatch({ type: 'UNDO' }));
  };

  const saveSubManage = (
    result: { defaultVal: 'On' | 'Off'; allowChange: boolean },
  ) => {
    if (!subManageKey) return;
    const key = subManageKey;
    dispatch({
      type: 'PATCH_AI_FEATURE',
      key,
      payload: { defaultVal: result.defaultVal, allowChange: result.allowChange },
    });
    setSubManageKey(null);
    showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
  };

  const renderFeatureCard = (item: FeatureItem) => {
    const cfg = state.ai[item.key as Exclude<AiFeatureKey, 'aiAssistant'>];
    return (
      <SettingCard
        key={item.key}
        title={item.title}
        switchOn={cfg.on && masterOn}
        disabled={!masterOn}
        icon={item.icon}
        description={item.description}
        summary={
          cfg.on && masterOn
            ? [
                { label: 'User default:', value: cfg.defaultVal },
                { label: 'User access:', value: cfg.allowChange ? 'Allowed' : 'Restricted' },
              ]
            : undefined
        }
        onManage={cfg.on && masterOn ? () => setSubManageKey(item.key as SubKey) : undefined}
        onSwitchClick={() => toggleSubFeature(item.key as SubKey)}
      />
    );
  };

  // A fully-wired detail row for a real sub-feature (used in the CC detail).
  const renderWiredDetailRow = (
    key: SubKey,
    icon: IconCmp,
    title: string,
    description: string,
    nested: boolean,
    children?: React.ReactNode,
  ) => {
    const cfg = state.ai[key];
    const on = cfg.on && avaActive;
    return (
      <FeatureDetailRow
        key={key}
        nested={nested}
        icon={<SpringIcon as={icon} />}
        title={title}
        description={description}
        switchOn={on}
        disabled={!avaActive}
        summary={
          on
            ? [
                { label: 'User default:', value: cfg.defaultVal },
                { label: 'User access:', value: cfg.allowChange ? 'Allowed' : 'Restricted' },
              ]
            : undefined
        }
        onManage={on ? () => setSubManageKey(key) : undefined}
        onSwitchClick={() => toggleSubFeature(key)}
      >
        {children}
      </FeatureDetailRow>
    );
  };

  const retentionDisplay = customRetention.on ? periodLabel(customRetention.period) : 'Disabled';

  const aiVoicemail = PHONE_ITEMS.find((i) => i.key === 'aiVoicemailSummaries')!;

  return (
    <div className="flex flex-col gap-4">
      {page === 'main' && (
        <>
          {/* AI features (master) */}
          <SettingCard
            title="AI features"
            switchOn={masterOn}
            icon={<SpringIcon as={AiStarsMd} />}
            description="Turn on AI support for calls, messages and video meetings. Deliver real-time answers, call notes, transcripts and meeting recaps to help teams stay focused and organized. Empower users to communicate clearly with built-in writing and polishing tools."
            summary={masterOn ? [{ label: 'AI data custom retention period:', value: retentionDisplay }] : undefined}
            onManage={() => setManageModal('aiFeatures')}
            onSwitchClick={handleMasterToggle}
          />

          {/* When master AI features is off, hide AVA and all sub-features. */}
          {masterOn && (
            <>
              {/* AI Bot — AVA replaces AI Assistant: a parent card whose detail
               * page holds its 5 dependent features. */}
              <SectionHeading>AI Bot</SectionHeading>
              <ParentCard
                title="AVA"
                icon={<SpringIcon as={AvaMd} />}
                featureCount={AVA_CHILDREN.length}
                description="A personal assistant that helps you boost productivity."
                onOpen={() => openDetail('ava')}
              />

              {/* Phone / Chat / SMS depend on AVA — hidden when AVA is off. */}
              {aiAssistant.on && (
                <>
                  <SectionHeading>Phone</SectionHeading>
                  <ParentCard
                    title="Closed captioning"
                    icon={<SpringIcon as={ClosedCaptionsMd} />}
                    featureCount={CC_CHILDREN.length}
                    description="Uses AI to display real-time captions during phone calls."
                    onOpen={() => openDetail('closedCaptioning')}
                  />
                  {renderFeatureCard(aiVoicemail)}

                  <SectionHeading>Chat</SectionHeading>
                  {CHAT_ITEMS.map(renderFeatureCard)}

                  <SectionHeading>SMS</SectionHeading>
                  {SMS_ITEMS.map(renderFeatureCard)}
                </>
              )}
            </>
          )}
        </>
      )}

      {/* AVA detail — parent switch is wired to AVA on/off; the 5 dependent
       * features are display-only (no backing store state yet). */}
      {page === 'ava' && (
        <FeatureDetailPage title="AVA" onBack={backToMain}>
          <FeatureDetailRow
            icon={<SpringIcon as={AvaMd} />}
            title="AVA"
            description="A personal assistant that helps you boost productivity."
            switchOn={avaActive}
            disabled={!masterOn}
            summary={avaActive ? ALLOWED : undefined}
            onSwitchClick={handleAssistantToggle}
          >
            {AVA_CHILDREN.map((c) => (
              <FeatureDetailRow
                key={c.title}
                nested
                icon={<SpringIcon as={c.icon} />}
                title={c.title}
                description={c.description}
                switchOn={avaActive}
                disabled={!avaActive}
                summary={avaActive ? ALLOWED : undefined}
              />
            ))}
          </FeatureDetailRow>
        </FeatureDetailPage>
      )}

      {/* Closed captioning detail — fully wired (CC + Live transcripts + AI
       * notes all have real store state). */}
      {page === 'closedCaptioning' && (
        <FeatureDetailPage title="Closed captioning" onBack={backToMain}>
          {renderWiredDetailRow(
            'closedCaptioning',
            ClosedCaptionsMd,
            'Closed captioning',
            'Uses AI to display real-time captions during phone calls.',
            false,
            CC_CHILDREN.map((c) =>
              renderWiredDetailRow(c.key, c.icon, c.title, c.description, true),
            ),
          )}
        </FeatureDetailPage>
      )}

      <SpringConfirmDialog
        open={masterConfirmOpen}
        confirmLabel="Turn off"
        title={<>Turn off <span className="font-normal">AI features</span> for your organization?</>}
        body={
          <>
            <p>This will disable all AI features across your entire account and hide it from all users.</p>
            <div className="flex flex-col gap-0">
              <p>
                <span className="font-bold">AVA </span>
                with <span className="font-bold">phone, chat </span>
                and <span className="font-bold">SMS AI features </span>
                will also be turned off.
              </p>
              <p>If you turn it back on, previous user settings will be restored.</p>
            </div>
          </>
        }
        onCancel={() => setMasterConfirmOpen(false)}
        onConfirm={confirmMasterOff}
      />

      <SpringConfirmDialog
        open={masterEnableConfirmOpen}
        confirmLabel="Turn on"
        title={<>Turn on <span className="font-normal">AI features</span> for your organization?</>}
        body={<p>This will turn AI features back on across your entire account.</p>}
        onCancel={() => setMasterEnableConfirmOpen(false)}
        onConfirm={confirmMasterOn}
      />

      <ManageAiFeaturesDialog
        open={manageModal === 'aiFeatures'}
        initialRetentionOn={customRetention.on}
        initialPeriod={customRetention.period}
        onCancel={() => setManageModal(null)}
        onSave={handleManageSave}
        onRequestTurnOn={(p) => {
          setPending({ on: true, period: p });
          setTurnOnFromToggle(true);
          setAiTurnOnConfirmOpen(true);
        }}
      />

      <RetentionConfirmDialog
        open={aiTurnOnConfirmOpen}
        variant="turn-on"
        period={pending?.period ?? customRetention.period}
        onPeriodChange={(p) =>
          setPending((cur) => (cur ? { ...cur, period: p } : { on: true, period: p }))
        }
        onCancel={() => {
          setAiTurnOnConfirmOpen(false);
          setPending(null);
        }}
        onConfirm={commitPending}
      />

      <RetentionConfirmDialog
        open={aiChangeConfirmOpen}
        variant="change"
        period={pending?.period ?? customRetention.period}
        onCancel={() => {
          setAiChangeConfirmOpen(false);
          setPending(null);
        }}
        onConfirm={commitPending}
      />

      <SpringConfirmDialog
        open={assistantDisableConfirmOpen}
        confirmLabel="Turn off"
        title={<>Turn off AVA for your organization?</>}
        body={
          <>
            <p>
              This feature will be turned off for your account and no longer available to users.
              When turned back on, previous user settings can be restored.
            </p>
            <p>
              <span className="font-bold">Query, Messaging, Integrations, Actions</span> and{' '}
              <span className="font-bold">Knowledge Bases</span> will also be turned off.
            </p>
          </>
        }
        onCancel={() => setAssistantDisableConfirmOpen(false)}
        onConfirm={confirmAssistantOff}
      />

      <AssistantReEnableConfirmDialog
        open={assistantEnableConfirmOpen}
        onCancel={() => setAssistantEnableConfirmOpen(false)}
        onConfirm={confirmAssistantOn}
      />

      {/* Sub-feature (Phone / Chat / SMS) Manage dialog */}
      <SpringFeatureManageDialog
        open={subManageKey !== null}
        title={subManageKey ? `Manage ${labelFor(subManageKey)}` : ''}
        defaultVal={subManageKey ? state.ai[subManageKey].defaultVal : 'On'}
        allowChange={subManageKey ? state.ai[subManageKey].allowChange : true}
        customCount={subManageKey ? state.ai[subManageKey].customUsers : 0}
        onCancel={() => setSubManageKey(null)}
        onConfirm={saveSubManage}
      />

      {/* Sub-feature Turn off confirm */}
      <SpringConfirmDialog
        open={subDisableKey !== null}
        confirmLabel="Turn off"
        title={
          subDisableKey ? <>Turn off {labelFor(subDisableKey)} for your organization?</> : null
        }
        body={
          <>
            <p>
              This feature will be turned off for your account and no longer available to users.
              When turned back on, previous user settings can be restored.
            </p>
            {subDisableKey === 'closedCaptioning' && (
              <p>
                <span className="font-bold">Live transcripts</span> and{' '}
                <span className="font-bold">AI notes</span> will also be turned off.
              </p>
            )}
          </>
        }
        onCancel={() => setSubDisableKey(null)}
        onConfirm={confirmSubDisable}
      />

      {/* Sub-feature Turn on confirm */}
      <FeatureEnableConfirmDialog
        open={subEnableKey !== null}
        featureName={subEnableKey ? labelFor(subEnableKey) : ''}
        initialDefaultVal={subEnableKey ? state.ai[subEnableKey].defaultVal : 'On'}
        initialAllowChange={subEnableKey ? state.ai[subEnableKey].allowChange : true}
        customCount={subEnableKey ? state.ai[subEnableKey].customUsers : 0}
        onCancel={() => setSubEnableKey(null)}
        onConfirm={confirmSubEnable}
      />
    </div>
  );
}
