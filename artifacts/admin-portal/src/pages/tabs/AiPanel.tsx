import React, { useState } from 'react';
import {
  AiStarsMd,
  AiLightBulbMd,
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
  AssistantEnableConfirmDialog,
  AssistantManageDefaultOffConfirmDialog,
  FeatureEnableConfirmDialog,
} from './_assistantConfirms';

/* Spring DS icons render as 32×32 SVG with no fill — render at 20×20 with
 * fill="currentColor" so they inherit the SettingCard icon-slot color. */
type SpringIconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp }: { as: SpringIconCmp }) => (
  <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
);

type FeatureItem = {
  key: AiFeatureKey;
  title: string;
  icon: React.ReactNode;
  description: React.ReactNode;
};

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

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-1 pt-2 text-[12px] font-medium leading-[16px] text-[var(--sui-colors-neutral-b2)]">
      {children}
    </div>
  );
}

export default function AiPanel() {
  const { state, dispatch } = useSettings();
  const { masterOn, aiAssistant } = state.ai;

  const customRetention = state.ai.customRetention;
  const [masterConfirmOpen, setMasterConfirmOpen] = useState(false);
  const [masterEnableConfirmOpen, setMasterEnableConfirmOpen] = useState(false);
  const [assistantDisableConfirmOpen, setAssistantDisableConfirmOpen] = useState(false);
  const [assistantEnableConfirmOpen, setAssistantEnableConfirmOpen] = useState(false);
  // Pending Manage AI Assistant save awaiting the secondary "default → Off"
  // confirm (Figma 2035-41300). Non-null while the confirm is open.
  const [assistantPendingSave, setAssistantPendingSave] = useState<
    { defaultVal: 'On' | 'Off'; allowChange: boolean } | null
  >(null);
  const [manageModal, setManageModal] = useState<'aiFeatures' | 'aiAssistant' | null>(null);

  // Sub-feature (Phone / Chat / SMS) flow state. Each holds the AiFeatureKey
  // currently being managed / disabled / enabled. Only one is active at a time.
  type SubKey = Exclude<AiFeatureKey, 'aiAssistant'>;
  const [subManageKey, setSubManageKey] = useState<SubKey | null>(null);
  const [subDisableKey, setSubDisableKey] = useState<SubKey | null>(null);
  const [subEnableKey, setSubEnableKey] = useState<SubKey | null>(null);

  // Pending values awaiting confirm-dialog approval (turn-on / change).
  // Use state (not ref) so the period <select> in the turn-on confirm
  // dialog is reactive when the user picks a different duration.
  const [pending, setPending] = useState<{ on: boolean; period: AiRetentionPeriod } | null>(null);
  const [aiTurnOnConfirmOpen, setAiTurnOnConfirmOpen] = useState(false);
  const [aiChangeConfirmOpen, setAiChangeConfirmOpen] = useState(false);

  // True when the turn-on confirm was triggered by the toggle inside the
  // Manage modal (we keep the Manage modal open after committing, so the user
  // sees the "retention enabled" state). False when triggered by Save.
  const [turnOnFromToggle, setTurnOnFromToggle] = useState(false);

  const handleManageSave = ({
    retentionOn, period,
  }: { retentionOn: boolean; period: AiRetentionPeriod }) => {
    const wasOn = customRetention.on;
    if (wasOn && !retentionOn) {
      // Turning OFF — commit directly
      dispatch({ type: 'PATCH_AI_CUSTOM_RETENTION', payload: { on: false } });
      setManageModal(null);
      showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
      return;
    }
    if (!wasOn && retentionOn) {
      // Save with retention freshly toggled on (rare — the toggle normally
      // intercepts via onRequestTurnOn, but kept as a safety net).
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

  const SUB_FEATURE_KEYS: Exclude<AiFeatureKey, 'aiAssistant'>[] = [
    'closedCaptioning', 'liveTranscripts', 'aiNotes', 'aiVoicemailSummaries',
    'aiWriterMessaging', 'aiSummary', 'aiTranslation', 'aiWriterSms',
  ];

  const commitAssistantSave = (
    result: { defaultVal: 'On' | 'Off'; allowChange: boolean },
    cascadeSubFeatureDefaultsOff: boolean,
  ) => {
    dispatch({
      type: 'PATCH_AI_ASSISTANT',
      payload: { defaultVal: result.defaultVal, allowChange: result.allowChange },
    });
    if (cascadeSubFeatureDefaultsOff) {
      // Phone / chat / SMS AI features depend on AI Assistant, so when its
      // user-default flips to Off the dependents must follow (Figma 2035-41300).
      for (const key of SUB_FEATURE_KEYS) {
        dispatch({ type: 'PATCH_AI_FEATURE', key, payload: { defaultVal: 'Off' } });
      }
    }
    setManageModal(null);
    setAssistantPendingSave(null);
    showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
  };

  const handleSaveAssistant = (result: { defaultVal: 'On' | 'Off'; allowChange: boolean }) => {
    if (state.simulateError) {
      dispatch({ type: 'TOGGLE_SIMULATE_ERROR' });
      return;
    }
    // Default flipped On → Off: warn that dependent sub-feature defaults will
    // also become Off. Otherwise save immediately.
    if (result.defaultVal === 'Off' && aiAssistant.defaultVal === 'On') {
      setAssistantPendingSave(result);
      return;
    }
    commitAssistantSave(result, false);
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
    setMasterConfirmOpen(false);
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
    // Cascade dependents off. When AI Assistant is re-enabled the Phone /
    // Chat / SMS cards reappear in the OFF state so the admin must explicitly
    // re-validate each one (per product direction — no silent restore).
    for (const key of SUB_FEATURE_KEYS) {
      dispatch({ type: 'PATCH_AI_FEATURE', key, payload: { on: false } });
    }
    setAssistantDisableConfirmOpen(false);
    showToast('AI Assistant turned off', () => dispatch({ type: 'UNDO' }));
  };

  const confirmAssistantOn = (result: {
    defaultVal: 'On' | 'Off';
    allowChange: boolean;
    customAction: 'reset' | 'restore';
  }) => {
    dispatch({
      type: 'PATCH_AI_ASSISTANT',
      payload: {
        on: true,
        defaultVal: result.defaultVal,
        allowChange: result.allowChange,
        // 'reset' clears custom-user overrides; 'restore' keeps them
        customUsers: result.customAction === 'reset' ? 0 : aiAssistant.customUsers,
      },
    });
    setAssistantEnableConfirmOpen(false);
    showToast('AI Assistant turned on', () => dispatch({ type: 'UNDO' }));
  };

  const toggleSubFeature = (key: SubKey) => {
    if (!masterOn) return;
    const cur = state.ai[key].on;
    if (cur) setSubDisableKey(key);
    else setSubEnableKey(key);
  };

  // Lookup of feature title by key — used by sub-feature dialogs so we don't
  // need to thread the label through every confirm.
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
    const cfg =
      item.key === 'aiAssistant' ? aiAssistant : state.ai[item.key as Exclude<AiFeatureKey, 'aiAssistant'>];
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
        onManage={
          cfg.on && masterOn ? () => setSubManageKey(item.key as SubKey) : undefined
        }
        onSwitchClick={
          item.key === 'aiAssistant'
            ? undefined
            : () => toggleSubFeature(item.key as SubKey)
        }
      />
    );
  };

  const retentionDisplay = customRetention.on ? periodLabel(customRetention.period) : 'Disabled';

  return (
    <div className="flex flex-col gap-4">
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

      {/* When the master AI features toggle is off, hide AI Assistant and all
       * sub-feature cards entirely (they are not just disabled — they're gone). */}
      {masterOn && (
        <>
          {/* AI Assistant */}
          <SettingCard
            title="AI Assistant"
            switchOn={aiAssistant.on}
            icon={<SpringIcon as={AiLightBulbMd} />}
            description="A personal assistant that helps you boost productivity."
            summary={
              aiAssistant.on
                ? [
                    { label: 'User default:', value: aiAssistant.defaultVal },
                    { label: 'User access:', value: aiAssistant.allowChange ? 'Allowed' : 'Restricted' },
                  ]
                : undefined
            }
            onManage={() => setManageModal('aiAssistant')}
            onSwitchClick={handleAssistantToggle}
          />

          {/* Phone / Chat / SMS sub-features depend on AI Assistant — hidden
           * entirely when the assistant is off, mirroring the master toggle. */}
          {aiAssistant.on && (
            <>
              <GroupLabel>Phone</GroupLabel>
              {PHONE_ITEMS.map(renderFeatureCard)}

              <GroupLabel>Chat</GroupLabel>
              {CHAT_ITEMS.map(renderFeatureCard)}

              <GroupLabel>SMS</GroupLabel>
              {SMS_ITEMS.map(renderFeatureCard)}
            </>
          )}
        </>
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
                <span className="font-bold">AI Assistant </span>
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
        title={<>Turn off AI Assistant for your organization?</>}
        body={
          <>
            <p>
              This feature will be turned off for your account and no longer available to users.
              When turned back on, previous user settings can be restored.
            </p>
            <p>
              <span className="font-bold">Phone, chat</span> and{' '}
              <span className="font-bold">SMS AI features</span> will also be turned off.
            </p>
          </>
        }
        onCancel={() => setAssistantDisableConfirmOpen(false)}
        onConfirm={confirmAssistantOff}
      />

      <AssistantEnableConfirmDialog
        open={assistantEnableConfirmOpen}
        initialDefaultVal={aiAssistant.defaultVal}
        initialAllowChange={aiAssistant.allowChange}
        customCount={aiAssistant.customUsers}
        onCancel={() => setAssistantEnableConfirmOpen(false)}
        onConfirm={confirmAssistantOn}
      />

      <SpringFeatureManageDialog
        open={manageModal === 'aiAssistant'}
        title="Manage AI Assistant"
        defaultVal={aiAssistant.defaultVal}
        allowChange={aiAssistant.allowChange}
        customCount={aiAssistant.customUsers}
        onCancel={() => setManageModal(null)}
        onConfirm={handleSaveAssistant}
        error={state.simulateError}
      />

      <AssistantManageDefaultOffConfirmDialog
        open={assistantPendingSave !== null}
        onCancel={() => setAssistantPendingSave(null)}
        onConfirm={() => assistantPendingSave && commitAssistantSave(assistantPendingSave, true)}
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
          <p>
            This feature will be turned off for your account and no longer available to users.
            When turned back on, previous user settings can be restored.
          </p>
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
