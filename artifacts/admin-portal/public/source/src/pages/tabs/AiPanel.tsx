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
  CallMd,
  Ivamd,
} from '@ringcentral/spring-icon';
import { useSettings } from '../../store';
import type { AiFeatureKey, AiCustomRetention } from '../../store';
import {
  SettingCard,
  ParentCard,
  FeatureDetailPage,
  FeatureDetailCard,
  FeatureDetailRow,
  SpringIcon,
  SpringSwitch,
  SpringConfirmDialog,
  SpringFeatureManageDialog,
  showToast,
} from '../../components/shared';
import {
  ManageAiFeaturesDialog,
  RetentionConfirmDialog,
  RetentionInfoSnackbar,
  VISIBLE_RETENTION_PRODUCTS,
  retentionDaysLabel,
} from './_aiRetention';
import {
  AssistantEnableConfirmDialog,
  FeatureEnableConfirmDialog,
  type AssistantEnableResult,
} from './_assistantConfirms';

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type FeatureItem = {
  key: AiFeatureKey;
  title: string;
  icon: React.ReactNode;
  description: React.ReactNode;
};

/* AVA's dependent features (Figma 2445-6666). These are new concepts not yet
 * backed by individual store state, so their on/off and per-feature deployment
 * config live in local component state (avaChildOn / avaChildCfg). */
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
    title: 'Call notes',
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
  const page: 'main' | 'ava' | 'phoneAi' | 'chatAi' =
    detailParam === 'ava'
      ? 'ava'
      : detailParam === 'phoneAi'
        ? 'phoneAi'
        : detailParam === 'chatAi'
          ? 'chatAi'
          : 'main';
  const openDetail = (d: 'ava' | 'phoneAi' | 'chatAi') =>
    setLocation(`/feature-settings/ai?detail=${d}`);
  const backToMain = () => setLocation('/feature-settings/ai');

  // AVA is active only when both master AI and AVA are on. This gates AVA's
  // own dependent features (the 5 shown inside the AVA detail page) — it does
  // NOT affect Phone / Chat, which depend only on master AI features.
  const avaActive = masterOn && aiAssistant.on;

  // Guard deep links: a detail view is only reachable when its parent is on.
  // `?detail=ava`, `?detail=phoneAi` and `?detail=chatAi` depend only on master
  // AI. Normalize an invalid `?detail=` back to the main list.
  useEffect(() => {
    if (
      (detailParam === 'ava' || detailParam === 'phoneAi' || detailParam === 'chatAi') &&
      !masterOn
    ) {
      setLocation('/feature-settings/ai', { replace: true });
    }
  }, [detailParam, masterOn, setLocation]);

  const customRetention = state.ai.customRetention;
  const [masterConfirmOpen, setMasterConfirmOpen] = useState(false);
  const [masterEnableConfirmOpen, setMasterEnableConfirmOpen] = useState(false);
  const [assistantDisableConfirmOpen, setAssistantDisableConfirmOpen] = useState(false);
  const [assistantEnableConfirmOpen, setAssistantEnableConfirmOpen] = useState(false);
  const [manageModal, setManageModal] = useState<'aiFeatures' | null>(null);

  // Sub-feature (Phone / Chat) flow state. Each holds the AiFeatureKey
  // currently being managed / disabled / enabled. Only one is active at a time.
  type SubKey = Exclude<AiFeatureKey, 'aiAssistant'>;
  const [subManageKey, setSubManageKey] = useState<SubKey | null>(null);
  const [avaManageOpen, setAvaManageOpen] = useState(false);
  // AVA's 5 dependent features have no global store state (they're new concepts
  // rendered display-only). Their per-feature deployment config is kept in local
  // state, keyed by title, so each one's Manage dialog opens and persists within
  // the page. `avaChildManage` holds which child's Manage dialog is open.
  const [avaChildManage, setAvaChildManage] = useState<string | null>(null);
  const [avaChildCfg, setAvaChildCfg] = useState<
    Record<string, { defaultVal: 'On' | 'Off'; allowChange: boolean }>
  >(() =>
    Object.fromEntries(
      AVA_CHILDREN.map((c) => [c.title, { defaultVal: 'On' as const, allowChange: true }]),
    ),
  );
  // AVA's 5 dependent features have no store state, so their on/off lives here,
  // keyed by title (all on by default). `avaChildDisable` / `avaChildEnable`
  // hold which child's turn-off / turn-on confirm dialog is currently shown.
  const [avaChildOn, setAvaChildOn] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(AVA_CHILDREN.map((c) => [c.title, true])),
  );
  const [avaChildDisable, setAvaChildDisable] = useState<string | null>(null);
  const [avaChildEnable, setAvaChildEnable] = useState<string | null>(null);
  // Pending AVA Manage selection awaiting cascade-confirm approval, plus which
  // confirm dialog is currently shown. Saving AVA with "User default: Off" or
  // "User access: Restricted" first asks the admin to confirm the change will
  // also cascade to the 5 dependent features.
  const [avaPending, setAvaPending] = useState<
    { defaultVal: 'On' | 'Off'; allowChange: boolean } | null
  >(null);
  const [avaDefaultOffConfirm, setAvaDefaultOffConfirm] = useState(false);
  const [avaRestrictConfirm, setAvaRestrictConfirm] = useState(false);
  // Phone AI features use simple enable/disable confirms. Their user deployment
  // is managed separately from the feature on/off control.
  const [phoneAiSimpleEnableKey, setPhoneAiSimpleEnableKey] = useState<SubKey | null>(null);
  const [ltEnableOpen, setLtEnableOpen] = useState(false);
  const [ltPendingAutoStart, setLtPendingAutoStart] = useState(state.ai.notesAutoStart);
  // "Manage Notes in-call behavior" modal — edits commit on Save only.
  const [notesManageOpen, setNotesManageOpen] = useState(false);
  const [notesPendingAutoStart, setNotesPendingAutoStart] = useState(state.ai.notesAutoStart);
  const [subDisableKey, setSubDisableKey] = useState<SubKey | null>(null);
  const [subEnableKey, setSubEnableKey] = useState<SubKey | null>(null);

  // Upward cascade: a child's user default can't be On while a parent's user
  // default is Off (Closed captioning → Live transcripts → Call notes). Instead
  // of disabling the choice, we confirm turning the parents' defaults on too.
  const [upPending, setUpPending] = useState<{
    key: SubKey;
    parentsOff: SubKey[];
    payload: Partial<{ on: boolean; defaultVal: 'On' | 'Off'; allowChange: boolean; customUsers: number }>;
    toastMsg: string;
    notesAutoStart?: boolean;
    forceAutomaticOn?: boolean;
  } | null>(null);

  /** Parents in the CC → LT → Call notes chain whose user default is Off. */
  const parentsWithDefaultOff = (key: SubKey): SubKey[] => {
    const parents: SubKey[] =
      key === 'liveTranscripts'
        ? ['closedCaptioning']
        : key === 'aiNotes'
          ? ['closedCaptioning', 'liveTranscripts']
          : [];
    return parents.filter((p) => state.ai[p].defaultVal === 'Off');
  };

  const currentAutomaticBehaviorForced =
    (state.ai.liveTranscripts.on &&
      state.ai.liveTranscripts.defaultVal === 'On' &&
      !state.ai.liveTranscripts.allowChange) ||
    (state.ai.aiNotes.on &&
      state.ai.aiNotes.defaultVal === 'On' &&
      !state.ai.aiNotes.allowChange);

  const deploymentWillNewlyForceAutomatic = (
    key: SubKey,
    result: { defaultVal: 'On' | 'Off'; allowChange: boolean },
    featureWillBeOn = state.ai[key].on,
    parentsDefaultingOn: SubKey[] = [],
  ) => {
    const changedFeatureWillForce =
      featureWillBeOn &&
      (key === 'liveTranscripts' || key === 'aiNotes') &&
      result.defaultVal === 'On' &&
      !result.allowChange;
    const liveTranscriptsParentWillForce =
      parentsDefaultingOn.includes('liveTranscripts') &&
      state.ai.liveTranscripts.on &&
      !state.ai.liveTranscripts.allowChange;
    const automaticBehaviorCurrentlyOn =
      currentAutomaticBehaviorForced || state.ai.notesAutoStart;
    return (
      !automaticBehaviorCurrentlyOn &&
      (changedFeatureWillForce || liveTranscriptsParentWillForce)
    );
  };

  const commitUpCascade = () => {
    if (!upPending) return;
    // One CASCADE dispatch: the child gets its full payload, each Off parent
    // gets its user default turned On — a single Undo reverts everything.
    if (upPending.key === 'liveTranscripts' && upPending.notesAutoStart !== undefined) {
      dispatch({
        type: 'ENABLE_LIVE_TRANSCRIPTS',
        payload: {
          notesAutoStart: upPending.notesAutoStart,
          featurePatch: upPending.payload,
          parentDefaultOn: true,
        },
      });
    } else {
      dispatch({
        type: 'CASCADE_AI_FEATURE',
        key: upPending.key,
        childKeys: upPending.parentsOff,
        payload: upPending.payload,
        childPayload: { defaultVal: 'On' },
      });
    }
    const msg = upPending.toastMsg;
    setUpPending(null);
    showToast(msg, () => dispatch({ type: 'UNDO' }));
  };

  // Pending retention values awaiting the shorter-period confirm dialog.
  const [pending, setPending] = useState<AiCustomRetention | null>(null);
  const [aiChangeConfirmOpen, setAiChangeConfirmOpen] = useState(false);

  // Retention is always on (account preconfigured) — the admin can only
  // change the per-product periods. Any product going shorter risks data
  // loss, so it confirms first; longer-only changes commit directly.
  const handleManageSave = (next: AiCustomRetention) => {
    const changed = VISIBLE_RETENTION_PRODUCTS.some((p) => next[p.key] !== customRetention[p.key]);
    if (!changed) {
      setManageModal(null);
      return;
    }
    const anyShorter = VISIBLE_RETENTION_PRODUCTS.some((p) => next[p.key] < customRetention[p.key]);
    if (anyShorter) {
      setPending(next);
      setAiChangeConfirmOpen(true);
      return;
    }
    dispatch({ type: 'PATCH_AI_CUSTOM_RETENTION', payload: next });
    setManageModal(null);
    showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
  };

  const commitPending = () => {
    if (pending) {
      dispatch({ type: 'PATCH_AI_CUSTOM_RETENTION', payload: pending });
    }
    setPending(null);
    setAiChangeConfirmOpen(false);
    setManageModal(null);
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

  const confirmAssistantOn = (result: AssistantEnableResult) => {
    dispatch({
      type: 'PATCH_AI_ASSISTANT',
      payload: {
        on: true,
        defaultVal: result.defaultVal,
        allowChange: result.allowChange,
        customUsers: result.customAction === 'reset' ? 0 : aiAssistant.customUsers,
      },
    });
    setAssistantEnableConfirmOpen(false);
    showToast('AVA turned on', () => dispatch({ type: 'UNDO' }));
  };

  const toggleSubFeature = (key: SubKey) => {
    if (!masterOn) return;
    const cur = state.ai[key].on;
    if (cur) setSubDisableKey(key);
    else setSubEnableKey(key);
  };

  // Lookup of feature title by key — used by sub-feature dialogs.
  const ALL_SUB_ITEMS: FeatureItem[] = [...PHONE_ITEMS, ...CHAT_ITEMS];
  const labelFor = (key: SubKey) =>
    ALL_SUB_ITEMS.find((i) => i.key === key)?.title ?? String(key);

  const confirmSubDisable = () => {
    if (!subDisableKey) return;
    const key = subDisableKey;
    if (key === 'closedCaptioning') {
      // Closed captioning parents Live transcripts, which parents Call notes —
      // turning CC off turns the whole chain off in one dispatch so a single
      // Undo restores everything together (matches the confirm dialog copy).
      dispatch({
        type: 'CASCADE_AI_FEATURE',
        key: 'closedCaptioning',
        childKeys: ['liveTranscripts', 'aiNotes'],
        payload: { on: false },
        childPayload: { on: false },
      });
    } else if (key === 'liveTranscripts') {
      // Live transcripts parents Call notes — turn both off in one dispatch so a
      // single Undo restores them together (matches the confirm dialog copy).
      dispatch({
        type: 'CASCADE_AI_FEATURE',
        key: 'liveTranscripts',
        childKeys: ['aiNotes'],
        payload: { on: false },
        childPayload: { on: false },
      });
    } else {
      dispatch({ type: 'PATCH_AI_FEATURE', key, payload: { on: false } });
    }
    setSubDisableKey(null);
    showToast(`${labelFor(key)} turned off`, () => dispatch({ type: 'UNDO' }));
  };

  const confirmSubEnable = (
    result: { defaultVal: 'On' | 'Off'; allowChange: boolean; customAction: 'reset' | 'restore' },
  ) => {
    if (!subEnableKey) return;
    const key = subEnableKey;
    const payload = {
      on: true,
      defaultVal: result.defaultVal,
      allowChange: result.allowChange,
      customUsers: result.customAction === 'reset' ? 0 : state.ai[key].customUsers,
    };
    // Child default On while a parent default is Off — confirm turning the
    // parents' user defaults on together.
    if (result.defaultVal === 'On') {
      const parentsOff = parentsWithDefaultOff(key);
      const forceAutomaticOn = deploymentWillNewlyForceAutomatic(key, result, true, parentsOff);
      if (parentsOff.length > 0 || forceAutomaticOn) {
        setUpPending({
          key,
          parentsOff,
          payload,
          forceAutomaticOn,
          toastMsg: `${labelFor(key)} turned on`,
        });
        setSubEnableKey(null);
        return;
      }
    }
    dispatch({ type: 'PATCH_AI_FEATURE', key, payload });
    setSubEnableKey(null);
    showToast(`${labelFor(key)} turned on`, () => dispatch({ type: 'UNDO' }));
  };

  const saveSubManage = (
    result: { defaultVal: 'On' | 'Off'; allowChange: boolean },
  ) => {
    if (!subManageKey) return;
    const key = subManageKey;
    // Child default On while a parent default is Off — confirm turning the
    // parents' user defaults on together.
    if (result.defaultVal === 'On') {
      const parentsOff = parentsWithDefaultOff(key);
      const forceAutomaticOn = deploymentWillNewlyForceAutomatic(
        key,
        result,
        state.ai[key].on,
        parentsOff,
      );
      if (parentsOff.length > 0 || forceAutomaticOn) {
        setUpPending({
          key,
          parentsOff,
          payload: { defaultVal: result.defaultVal, allowChange: result.allowChange },
          forceAutomaticOn,
          toastMsg: 'Settings were updated.',
        });
        setSubManageKey(null);
        return;
      }
    }
    dispatch({
      type: 'PATCH_AI_FEATURE',
      key,
      payload: { defaultVal: result.defaultVal, allowChange: result.allowChange },
    });
    setSubManageKey(null);
    showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
  };

  // Commit AVA's own deployment config and cascade the restrictive state down
  // to the 5 dependent features: a parent default of Off forces every child's
  // user default to Off, and restricting parent user access restricts every
  // child too. (Turning the parent back On/Allowed leaves children untouched.)
  const commitAvaManage = (
    result: { defaultVal: 'On' | 'Off'; allowChange: boolean },
  ) => {
    // Snapshot the children so the toast's Undo can roll back the cascade too
    // (store UNDO only reverts AVA's own parent state).
    const childSnapshot = avaChildCfg;
    dispatch({
      type: 'PATCH_AI_ASSISTANT',
      payload: { defaultVal: result.defaultVal, allowChange: result.allowChange },
    });
    if (result.defaultVal === 'Off' || result.allowChange === false) {
      setAvaChildCfg((prev) =>
        Object.fromEntries(
          Object.entries(prev).map(([title, cfg]) => [
            title,
            {
              defaultVal: result.defaultVal === 'Off' ? 'Off' : cfg.defaultVal,
              allowChange: result.allowChange === false ? false : cfg.allowChange,
            },
          ]),
        ),
      );
    }
    setAvaPending(null);
    setAvaDefaultOffConfirm(false);
    setAvaRestrictConfirm(false);
    setAvaManageOpen(false);
    showToast('Settings were updated.', () => {
      dispatch({ type: 'UNDO' });
      setAvaChildCfg(childSnapshot);
    });
  };

  const saveAvaManage = (
    result: { defaultVal: 'On' | 'Off'; allowChange: boolean },
  ) => {
    const wantsDefaultOff = result.defaultVal === 'Off';
    const wantsRestrict = result.allowChange === false;
    // Off and/or Restricted cascade to the children, so confirm first.
    if (wantsDefaultOff || wantsRestrict) {
      setAvaPending(result);
      setAvaManageOpen(false);
      if (wantsDefaultOff) setAvaDefaultOffConfirm(true);
      else setAvaRestrictConfirm(true);
      return;
    }
    commitAvaManage(result);
  };

  const saveAvaChildManage = (
    result: { defaultVal: 'On' | 'Off'; allowChange: boolean },
  ) => {
    if (!avaChildManage) return;
    const title = avaChildManage;
    setAvaChildCfg((prev) => ({
      ...prev,
      [title]: { defaultVal: result.defaultVal, allowChange: result.allowChange },
    }));
    setAvaChildManage(null);
    showToast('Settings were updated.');
  };

  // AVA dependent-feature on/off. These have no store state, so toggling just
  // routes to the turn-off / turn-on confirm dialog and commits to local state.
  const toggleAvaChild = (title: string) => {
    if (avaChildOn[title]) setAvaChildDisable(title);
    else setAvaChildEnable(title);
  };

  const confirmAvaChildDisable = () => {
    if (!avaChildDisable) return;
    const title = avaChildDisable;
    setAvaChildOn((prev) => ({ ...prev, [title]: false }));
    setAvaChildDisable(null);
    showToast(`${title} turned off`);
  };

  const confirmAvaChildEnable = (
    result: { defaultVal: 'On' | 'Off'; allowChange: boolean },
  ) => {
    if (!avaChildEnable) return;
    const title = avaChildEnable;
    setAvaChildOn((prev) => ({ ...prev, [title]: true }));
    setAvaChildCfg((prev) => ({
      ...prev,
      [title]: { defaultVal: result.defaultVal, allowChange: result.allowChange },
    }));
    setAvaChildEnable(null);
    showToast(`${title} turned on`);
  };

  // ── Phone AI feature toggles (CC / LT / CN / Voicemail) ─────────────────
  // All four features restore the standard user-deployment confirmation.
  // Live transcripts also includes the shared automatic-behavior choice.
  const handlePhoneAiToggle = (key: SubKey) => {
    if (!masterOn) return;
    if (state.ai[key].on) {
      setSubDisableKey(key);
    } else if (key === 'liveTranscripts') {
      setLtPendingAutoStart(state.ai.notesAutoStart);
      setLtEnableOpen(true);
    } else {
      setPhoneAiSimpleEnableKey(key);
    }
  };

  const confirmPhoneAiSimpleEnable = (result: AssistantEnableResult) => {
    if (!phoneAiSimpleEnableKey) return;
    const key = phoneAiSimpleEnableKey;
    const payload = {
      on: true,
      defaultVal: result.defaultVal,
      allowChange: result.allowChange,
      customUsers: result.customAction === 'reset' ? 0 : state.ai[key].customUsers,
    };
    if (result.defaultVal === 'On') {
      const parentsOff = parentsWithDefaultOff(key);
      const forceAutomaticOn = deploymentWillNewlyForceAutomatic(key, result, true, parentsOff);
      if (parentsOff.length > 0 || forceAutomaticOn) {
        setUpPending({
          key,
          parentsOff,
          payload,
          forceAutomaticOn,
          toastMsg: `${labelFor(key)} turned on`,
        });
        setPhoneAiSimpleEnableKey(null);
        return;
      }
    }
    dispatch({ type: 'PATCH_AI_FEATURE', key, payload });
    setPhoneAiSimpleEnableKey(null);
    showToast(`${labelFor(key)} turned on`, () => dispatch({ type: 'UNDO' }));
  };

  const openNotesManage = () => {
    if (automaticBehaviorForced) return;
    setNotesPendingAutoStart(state.ai.notesAutoStart);
    setNotesManageOpen(true);
  };

  const saveNotesManage = () => {
    dispatch({ type: 'SET_NOTES_AUTO_START', payload: notesPendingAutoStart });
    setNotesManageOpen(false);
    showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
  };

  const automaticBehaviorLabel = state.ai.aiNotes.on
    ? 'Automatic live transcripts & call notes'
    : 'Automatic live transcripts';
  const automaticBehaviorForced = currentAutomaticBehaviorForced;
  const automaticBehaviorOn = automaticBehaviorForced || state.ai.notesAutoStart;
  const deploymentSummary = (key: SubKey) => [
    { label: 'User default:', value: state.ai[key].defaultVal },
    { label: 'User access:', value: state.ai[key].allowChange ? 'Allowed' : 'Restricted' },
  ];

  // Shared automatic-behavior checkbox used by the LT turn-on dialog and the
  // dedicated Manage modal.
  const renderAutoNotesCheckbox = (
    checked: boolean,
    onToggle: () => void,
    showSectionLabel = false,
  ) => (
    <div className="flex flex-col gap-2">
      {showSectionLabel && (
        <h3 className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
          In-call behavior
        </h3>
      )}
      <div className="flex flex-col gap-3 rounded-[8px] border border-[var(--sui-colors-neutral-b4)] p-4">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={checked}
            aria-label={`Turn ${automaticBehaviorLabel.toLowerCase()} ${checked ? 'off' : 'on'}`}
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] transition-colors ${
              checked
                ? 'bg-[var(--sui-colors-primary-b)]'
                : 'border border-[var(--sui-colors-neutral-b3)] bg-white'
            }`}
          >
            {checked && (
              <svg viewBox="0 0 12 10" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="1.5 5 4.5 8 10.5 1.5" />
              </svg>
            )}
          </button>
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b1)]">
              {automaticBehaviorLabel}
            </p>
            <p className="text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b2)]">
              {state.ai.aiNotes.on
                ? 'Automatically start live transcripts and call notes for all calls.'
                : 'Automatically start live transcripts for all calls.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const confirmLtEnable = (result: AssistantEnableResult) => {
    const featurePatch = {
      defaultVal: result.defaultVal,
      allowChange: result.allowChange,
      customUsers:
        result.customAction === 'reset' ? 0 : state.ai.liveTranscripts.customUsers,
    };
    const parentsOff =
      result.defaultVal === 'On' ? parentsWithDefaultOff('liveTranscripts') : [];
    const forceAutomaticOn = deploymentWillNewlyForceAutomatic(
      'liveTranscripts',
      result,
      true,
      parentsOff,
    );
    if (parentsOff.length > 0 || forceAutomaticOn) {
      setUpPending({
        key: 'liveTranscripts',
        parentsOff,
        payload: featurePatch,
        notesAutoStart: ltPendingAutoStart,
        forceAutomaticOn,
        toastMsg: 'Live transcripts turned on',
      });
      setLtEnableOpen(false);
      return;
    }
    // One atomic dispatch → one undo snapshot for deployment, CC dependency,
    // Live transcripts, and the shared automatic behavior.
    dispatch({
      type: 'ENABLE_LIVE_TRANSCRIPTS',
      payload: { notesAutoStart: ltPendingAutoStart, featurePatch, parentDefaultOn: false },
    });
    setLtEnableOpen(false);
    showToast('Live transcripts turned on', () => dispatch({ type: 'UNDO' }));
  };

  // A fully-wired detail row for a real sub-feature (used in the Chat AI detail).
  const renderWiredDetailRow = (
    key: SubKey,
    icon: IconCmp,
    title: string,
    description: string,
    nested: boolean,
    children?: React.ReactNode,
    onManageOverride?: () => void,
  ) => {
    const cfg = state.ai[key];
    const on = cfg.on && masterOn;
    return (
      <FeatureDetailRow
        key={key}
        nested={nested}
        icon={<SpringIcon as={icon} />}
        title={title}
        description={description}
        switchOn={on}
        disabled={!masterOn}
        summary={
          on
            ? [
                { label: 'User default:', value: cfg.defaultVal },
                { label: 'User access:', value: cfg.allowChange ? 'Allowed' : 'Restricted' },
              ]
            : undefined
        }
        onManage={on ? (onManageOverride ?? (() => setSubManageKey(key))) : undefined}
        onSwitchClick={() => toggleSubFeature(key)}
      >
        {children}
      </FeatureDetailRow>
    );
  };

  const retentionSummary = VISIBLE_RETENTION_PRODUCTS.map((p) => ({
    label: `${p.shortLabel}:`,
    value: retentionDaysLabel(p.key, customRetention[p.key]),
  }));

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
            summary={masterOn ? retentionSummary : undefined}
            summaryHeading="AI data custom retention period"
            summaryDescription="Set how long AI-generated data is retained across supported AI features. This data is permanently deleted after the selected period."
            onManage={() => setManageModal('aiFeatures')}
            onSwitchClick={handleMasterToggle}
          />

          {/* When master AI features is off, hide AVA and all sub-features. */}
          {masterOn && (
            <>
              {/* AVA — a parent card whose detail page holds its 5 dependent
               * features. */}
              <ParentCard
                title="AVA"
                icon={<SpringIcon as={AvaMd} />}
                featureCount={AVA_CHILDREN.length}
                description="A personal AI virtual assistant that helps you boost productivity."
                onOpen={() => openDetail('ava')}
              />

              {/* Phone AI — parent card grouping the phone-related AI features
               * (Closed captioning + dependents, AI voicemail summaries). */}
              <ParentCard
                title="Phone AI"
                icon={<SpringIcon as={CallMd} />}
                featureCount={PHONE_ITEMS.length}
                description="AI features for phone calls, including captions, transcripts, notes, and voicemail summaries."
                onOpen={() => openDetail('phoneAi')}
              />

              {/* Chat AI — parent card grouping the chat-related AI features. */}
              <ParentCard
                title="Chat AI"
                icon={<SpringIcon as={Ivamd} />}
                featureCount={CHAT_ITEMS.length}
                description="AI features for messaging, including writing, summaries, and translation."
                onOpen={() => openDetail('chatAi')}
              />
            </>
          )}
        </>
      )}

      {/* AVA detail — parent switch is wired to AVA on/off; the 5 dependent
       * features are individually toggleable via local state (no backing store
       * yet), each with its own turn-off / turn-on confirm + Manage flow. */}
      {page === 'ava' && (
        <FeatureDetailPage title="AVA" onBack={backToMain}>
          <FeatureDetailCard>
            <FeatureDetailRow
              icon={<SpringIcon as={AvaMd} />}
              title="AVA"
              description="A personal AI virtual assistant that helps you boost productivity."
              switchOn={avaActive}
              disabled={!masterOn}
              summary={
                avaActive
                  ? [
                      { label: 'User default:', value: aiAssistant.defaultVal },
                      {
                        label: 'User access:',
                        value: aiAssistant.allowChange ? 'Allowed' : 'Restricted',
                      },
                    ]
                  : undefined
              }
              onManage={avaActive ? () => setAvaManageOpen(true) : undefined}
              onSwitchClick={handleAssistantToggle}
            >
              {avaActive &&
                AVA_CHILDREN.map((c) => {
                  const cfg = avaChildCfg[c.title];
                  const on = avaChildOn[c.title];
                  return (
                    <FeatureDetailRow
                      key={c.title}
                      nested
                      icon={<SpringIcon as={c.icon} />}
                      title={c.title}
                      description={c.description}
                      switchOn={on}
                      summary={
                        on
                          ? [
                              { label: 'User default:', value: cfg.defaultVal },
                              {
                                label: 'User access:',
                                value: cfg.allowChange ? 'Allowed' : 'Restricted',
                              },
                            ]
                          : undefined
                      }
                      onManage={on ? () => setAvaChildManage(c.title) : undefined}
                      onSwitchClick={() => toggleAvaChild(c.title)}
                    />
                  );
                })}
            </FeatureDetailRow>
          </FeatureDetailCard>
        </FeatureDetailPage>
      )}

      {/* Phone AI detail — three cards; on/off follows the CC → LT → Call notes chain.
       * Card 1: Closed captioning.
       * Card 2: Live transcripts + Call notes (LT is LT's own parent; CN
       *   nested inside. When LT is on, "Notes in-call behavior" section shows
       *   below using the established summary-row pattern.)
       * Card 3: AI voicemail summaries. */}
      {page === 'phoneAi' && (
        <FeatureDetailPage title="Phone AI" onBack={backToMain}>

          {/* ── Card 1: Closed captioning ── */}
          <FeatureDetailCard>
            <FeatureDetailRow
              icon={<SpringIcon as={ClosedCaptionsMd} />}
              title="Closed captioning"
              description="Uses AI to display real-time captions during phone calls."
              switchOn={state.ai.closedCaptioning.on && masterOn}
              disabled={!masterOn}
              onSwitchClick={() => handlePhoneAiToggle('closedCaptioning')}
              summary={deploymentSummary('closedCaptioning')}
              onManage={() => setSubManageKey('closedCaptioning')}
            />
          </FeatureDetailCard>

          {/* ── Card 2: Live transcripts + Call notes + in-call behavior ── */}
          {/* Hidden entirely while Closed captioning is off — LT depends on CC. */}
          {/* Custom card: py-4 only (no px) so the full-width border-t of the
           * in-call behavior section touches the card edges. Children own px-4. */}
          {state.ai.closedCaptioning.on && masterOn && (
          <section className="flex flex-col gap-4 rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white py-4">

            {/* LT row — icon + content (owns px-4) */}
            <div className="flex items-start gap-4 px-4">
              <div className="flex h-[32px] w-5 shrink-0 items-center justify-center text-[var(--sui-colors-neutral-b1)]">
                <SpringIcon as={TranscriptMd} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-4">

                {/* LT line item */}
                <div className="flex flex-col gap-2">
                  <div className="flex min-h-[32px] items-center gap-4">
                    <h3 className="flex-1 truncate text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      Live transcripts
                    </h3>
                    <SpringSwitch
                      checked={state.ai.liveTranscripts.on && masterOn}
                      disabled={!masterOn}
                      aria-label="Live transcripts"
                      onClick={(e: React.MouseEvent) => { e.preventDefault(); handlePhoneAiToggle('liveTranscripts'); }}
                    />
                  </div>
                  <p className="pr-[130px] text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                    Provides real-time AI-generated call transcripts.{' '}
                    <a href="#" onClick={(e) => e.preventDefault()} className="font-normal text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]">Learn more</a>
                  </p>
                  {state.ai.liveTranscripts.on && (
                    <div className="flex w-full items-center justify-between gap-4">
                      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                        {deploymentSummary('liveTranscripts').map((segment) => (
                          <div key={segment.label} className="flex h-[32px] items-center gap-2 whitespace-nowrap rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                            <span className="font-semibold">{segment.label}</span>
                            <span>{segment.value}</span>
                          </div>
                        ))}
                      </div>
                      <button type="button" aria-label="Manage Live transcripts user deployment" onClick={() => setSubManageKey('liveTranscripts')} className="h-[32px] shrink-0 rounded-[10px] px-1 text-[14px] font-medium text-[var(--sui-colors-primary-b)] hover:text-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30">Manage</button>
                    </div>
                  )}
                </div>

                {/* Call notes — border-t inside content column (indented by LT icon) */}
                {state.ai.liveTranscripts.on && masterOn && (
                  <div className="flex items-start gap-4 border-t border-[var(--sui-colors-neutral-b4)] pt-4">
                    <div className="flex h-[32px] w-5 shrink-0 items-center justify-center text-[var(--sui-colors-neutral-b1)]">
                      <SpringIcon as={SmartNotesMd} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex min-h-[32px] items-center gap-4">
                        <h4 className="flex-1 truncate text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                          Call notes
                        </h4>
                        <SpringSwitch
                          checked={state.ai.aiNotes.on && masterOn}
                          disabled={!masterOn}
                          aria-label="Call notes"
                          onClick={(e: React.MouseEvent) => { e.preventDefault(); handlePhoneAiToggle('aiNotes'); }}
                        />
                      </div>
                      <p className="pr-[130px] text-[14px] font-normal leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                        Generates call notes for all your devices.{' '}
                        <a href="#" onClick={(e) => e.preventDefault()} className="font-normal text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]">Learn more</a>
                      </p>
                      {state.ai.aiNotes.on && (
                        <div className="flex w-full items-center justify-between gap-4">
                          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                            {deploymentSummary('aiNotes').map((segment) => (
                              <div key={segment.label} className="flex h-[32px] items-center gap-2 whitespace-nowrap rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                                <span className="font-semibold">{segment.label}</span>
                                <span>{segment.value}</span>
                              </div>
                            ))}
                          </div>
                          <button type="button" aria-label="Manage Call notes user deployment" onClick={() => setSubManageKey('aiNotes')} className="h-[32px] shrink-0 rounded-[10px] px-1 text-[14px] font-medium text-[var(--sui-colors-primary-b)] hover:text-[var(--sui-colors-primary-b-high-contrast)] focus:outline-none focus:ring-2 focus:ring-[var(--sui-colors-primary-b)]/30">Manage</button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Notes in-call behavior — read-only summary pill + Manage.
             * Editing happens in the "Manage Notes in-call behavior" modal. */}
            {state.ai.liveTranscripts.on && masterOn && (
              <div className="px-4">
                <div className="flex items-center justify-between gap-4 border-t border-[var(--sui-colors-neutral-b4)] pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                      In-call behavior:
                    </span>
                    <div className="flex h-[32px] items-center gap-2 whitespace-nowrap rounded-[10px] bg-[var(--sui-colors-neutral-b5)] px-3 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b1)]">
                      <span className="font-semibold">{automaticBehaviorLabel}:</span>
                      <span className="font-normal">{automaticBehaviorOn ? 'On' : 'Off'}</span>
                    </div>
                  </div>
                  {automaticBehaviorForced ? (
                    <div className="group relative">
                      <button
                        type="button"
                        aria-disabled="true"
                        aria-describedby="automatic-behavior-locked-reason"
                        className="flex h-[32px] cursor-not-allowed items-center gap-1 rounded-[10px] px-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)] focus-visible:ring-offset-2"
                      >
                        Manage
                        <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.5">
                          <circle cx="8" cy="8" r="6.25" />
                          <path d="M8 7.1v4M8 4.6v.1" strokeLinecap="round" />
                        </svg>
                      </button>
                      <div
                        id="automatic-behavior-locked-reason"
                        role="tooltip"
                        className="pointer-events-none absolute bottom-full right-0 z-20 mb-2 hidden w-max max-w-[280px] rounded-[6px] bg-[var(--sui-colors-neutral-b0)] px-3 py-2 text-[12px] font-normal leading-[16px] text-white shadow-lg group-hover:block group-focus-within:block"
                      >
                        Always on because user access is restricted.
                      </div>
                    </div>
                  ) : <button
                    type="button"
                    aria-label={`Manage ${automaticBehaviorLabel}`}
                    onClick={openNotesManage}
                    className="h-[32px] shrink-0 rounded-[10px] px-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-primary-b)] hover:text-[var(--sui-colors-primary-b-high-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b)] focus-visible:ring-offset-2"
                  >
                    Manage
                  </button>
                  }
                </div>
              </div>
            )}

          </section>
          )}

          {/* ── Card 3: AI voicemail summaries ── */}
          <FeatureDetailCard>
            <FeatureDetailRow
              icon={<SpringIcon as={VoicemailMd} />}
              title="AI voicemail summaries"
              description="Delivers AI-generated summaries of voicemails, including key details and follow-up items."
              switchOn={state.ai.aiVoicemailSummaries.on && masterOn}
              disabled={!masterOn}
              onSwitchClick={() => handlePhoneAiToggle('aiVoicemailSummaries')}
              summary={deploymentSummary('aiVoicemailSummaries')}
              onManage={() => setSubManageKey('aiVoicemailSummaries')}
            />
          </FeatureDetailCard>

        </FeatureDetailPage>
      )}

      {/* Chat AI detail — four separate, independent feature cards. */}
      {page === 'chatAi' && (
        <FeatureDetailPage title="Chat AI" onBack={backToMain}>
          <FeatureDetailCard>
            {renderWiredDetailRow(
              'aiWriterMessaging',
              AiWriterAltMd,
              'AI writer for messaging',
              'Uses AI to draft and refine messages — check grammar, adjust tone or length, and translate to other languages.',
              false,
            )}
          </FeatureDetailCard>
          <FeatureDetailCard>
            {renderWiredDetailRow(
              'aiSummary',
              AiSummaryMd,
              'AI summary',
              'Provides AI summaries that highlight key conversation points.',
              false,
            )}
          </FeatureDetailCard>
          <FeatureDetailCard>
            {renderWiredDetailRow(
              'aiTranslation',
              GlobeMd,
              'AI translation',
              'Uses AI to translate chats, messages, and transcripts across languages.',
              false,
            )}
          </FeatureDetailCard>
          <FeatureDetailCard>
            {renderWiredDetailRow(
              'aiWriterSms',
              AiWriterAltMd,
              'AI writer for SMS',
              'Uses AI to draft and refine messages — check grammar, adjust tone or length, and translate to other languages.',
              false,
            )}
          </FeatureDetailCard>
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
            <RetentionInfoSnackbar>
              Turning off AI features won’t change your retention settings. Existing AI data will be permanently deleted when its configured retention period expires.
            </RetentionInfoSnackbar>
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
        initialRetention={customRetention}
        onCancel={() => setManageModal(null)}
        onSave={handleManageSave}
      />

      {/* Shorter-period change confirm (data-loss risk) */}
      <RetentionConfirmDialog
        open={aiChangeConfirmOpen}
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
              {' '}When turned back on, previous user settings can be restored.
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

      <AssistantEnableConfirmDialog
        open={assistantEnableConfirmOpen}
        initialDefaultVal={aiAssistant.defaultVal}
        initialAllowChange={aiAssistant.allowChange}
        customCount={aiAssistant.customUsers}
        onCancel={() => setAssistantEnableConfirmOpen(false)}
        onConfirm={confirmAssistantOn}
      />

      {/* Sub-feature (Phone / Chat) user-deployment Manage dialog. */}
      <SpringFeatureManageDialog
        open={subManageKey !== null}
        title={subManageKey ? `Manage ${labelFor(subManageKey)}` : ''}
        defaultVal={subManageKey ? state.ai[subManageKey].defaultVal : 'On'}
        allowChange={subManageKey ? state.ai[subManageKey].allowChange : true}
        customCount={subManageKey ? state.ai[subManageKey].customUsers : 0}
        onCancel={() => setSubManageKey(null)}
        onConfirm={saveSubManage}
      />

      {/* AVA Manage dialog (Figma 2454-9168) */}
      <SpringFeatureManageDialog
        open={avaManageOpen}
        title="Manage AVA"
        defaultVal={aiAssistant.defaultVal}
        allowChange={aiAssistant.allowChange}
        customCount={aiAssistant.customUsers}
        onCancel={() => setAvaManageOpen(false)}
        onConfirm={saveAvaManage}
      />

      {/* AVA "Turn off default for users?" cascade confirm (Figma 2454-9526) */}
      <SpringConfirmDialog
        open={avaDefaultOffConfirm}
        confirmLabel="Turn default off"
        title={<>Turn off default for users?</>}
        body={
          <>
            <p>
              <span className="font-bold">AVA</span> will default to off in user settings.
            </p>
            <p>
              <span className="font-bold">Query, Messaging, Integrations, Actions</span> and{' '}
              <span className="font-bold">Knowledge Bases</span> will also default to off.
            </p>
          </>
        }
        onCancel={() => {
          setAvaDefaultOffConfirm(false);
          setAvaPending(null);
        }}
        onConfirm={() => {
          setAvaDefaultOffConfirm(false);
          if (avaPending?.allowChange === false) {
            setAvaRestrictConfirm(true);
          } else if (avaPending) {
            commitAvaManage(avaPending);
          }
        }}
      />

      {/* AVA "Restrict users from changing this setting?" cascade confirm (Figma 2502-10410) */}
      <SpringConfirmDialog
        open={avaRestrictConfirm}
        confirmLabel="Restrict access"
        title={<>Restrict users from changing this setting?</>}
        body={
          <>
            <p>
              Users will no longer be able to change <span className="font-bold">AVA</span>.
            </p>
            <p>
              This restriction will also apply to{' '}
              <span className="font-bold">Query, Messaging, Integrations, Actions</span> and{' '}
              <span className="font-bold">Knowledge Bases</span>.
            </p>
          </>
        }
        onCancel={() => {
          setAvaRestrictConfirm(false);
          setAvaPending(null);
        }}
        onConfirm={() => {
          if (avaPending) commitAvaManage(avaPending);
        }}
      />

      {/* Live transcripts turn-on — standard deployment plus shared behavior. */}
      <FeatureEnableConfirmDialog
        open={ltEnableOpen}
        featureName="Live transcripts"
        initialDefaultVal={state.ai.liveTranscripts.defaultVal}
        initialAllowChange={state.ai.liveTranscripts.allowChange}
        customCount={state.ai.liveTranscripts.customUsers}
        extraContent={renderAutoNotesCheckbox(
          ltPendingAutoStart,
          () => setLtPendingAutoStart(!ltPendingAutoStart),
          true,
        )}
        onCancel={() => setLtEnableOpen(false)}
        onConfirm={confirmLtEnable}
      />

      {/* Manage Notes in-call behavior — read-only card summary edits here.
          Save stays disabled until the checkbox actually changes. */}
      <SpringConfirmDialog
        open={notesManageOpen}
        confirmLabel="Save"
        confirmDisabled={notesPendingAutoStart === state.ai.notesAutoStart}
        title={<>Manage {automaticBehaviorLabel.toLowerCase()}</>}
        body={renderAutoNotesCheckbox(notesPendingAutoStart, () =>
          setNotesPendingAutoStart(!notesPendingAutoStart),
        )}
        onCancel={() => setNotesManageOpen(false)}
        onConfirm={saveNotesManage}
      />

      {/* Standard user-deployment turn-on confirm for CC / Call notes / voicemail. */}
      <FeatureEnableConfirmDialog
        open={phoneAiSimpleEnableKey !== null}
        featureName={phoneAiSimpleEnableKey ? labelFor(phoneAiSimpleEnableKey) : ''}
        initialDefaultVal={
          phoneAiSimpleEnableKey ? state.ai[phoneAiSimpleEnableKey].defaultVal : 'On'
        }
        initialAllowChange={
          phoneAiSimpleEnableKey ? state.ai[phoneAiSimpleEnableKey].allowChange : true
        }
        customCount={
          phoneAiSimpleEnableKey ? state.ai[phoneAiSimpleEnableKey].customUsers : 0
        }
        onCancel={() => setPhoneAiSimpleEnableKey(null)}
        onConfirm={confirmPhoneAiSimpleEnable}
      />

      {/* AVA dependent-feature Manage dialog (Query / Messaging / Integrations /
       * Actions / Knowledge Base). One instance reused for whichever child's
       * Manage button was clicked. */}
      <SpringFeatureManageDialog
        open={avaChildManage !== null}
        title={avaChildManage ? `Manage ${avaChildManage}` : ''}
        defaultVal={avaChildManage ? avaChildCfg[avaChildManage].defaultVal : 'On'}
        allowChange={avaChildManage ? avaChildCfg[avaChildManage].allowChange : true}
        customCount={26}
        onCancel={() => setAvaChildManage(null)}
        onConfirm={saveAvaChildManage}
      />

      {/* AVA dependent-feature Turn off confirm */}
      <SpringConfirmDialog
        open={avaChildDisable !== null}
        confirmLabel="Turn off"
        title={avaChildDisable ? <>Turn off {avaChildDisable} for your organization?</> : null}
        body={
          <p>
            This feature will be turned off for your account and no longer available to users.
            When turned back on, previous user settings can be restored.
          </p>
        }
        onCancel={() => setAvaChildDisable(null)}
        onConfirm={confirmAvaChildDisable}
      />

      {/* AVA dependent-feature Turn on confirm */}
      <FeatureEnableConfirmDialog
        open={avaChildEnable !== null}
        featureName={avaChildEnable ?? ''}
        initialDefaultVal={avaChildEnable ? avaChildCfg[avaChildEnable].defaultVal : 'On'}
        initialAllowChange={avaChildEnable ? avaChildCfg[avaChildEnable].allowChange : true}
        customCount={26}
        onCancel={() => setAvaChildEnable(null)}
        onConfirm={confirmAvaChildEnable}
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
            {subDisableKey === 'closedCaptioning' && state.ai.liveTranscripts.on && (
              <p>
                <span className="font-bold">Live transcripts</span>
                {state.ai.aiNotes.on ? (
                  <>
                    {' and '}
                    <span className="font-bold">Call notes</span> will also be turned off.
                  </>
                ) : (
                  <> will also be turned off.</>
                )}
              </p>
            )}
            {subDisableKey === 'liveTranscripts' && state.ai.aiNotes.on && (
              <p>
                <span className="font-bold">Call notes</span> will also be turned off.
              </p>
            )}
          </>
        }
        onCancel={() => setSubDisableKey(null)}
        onConfirm={confirmSubDisable}
      />

      {/* Sub-feature Turn on confirm.
          CC, Live transcripts, and Call notes always allow users to manage their
          own setting — the checkbox is locked checked+disabled for those keys. */}
      <FeatureEnableConfirmDialog
        open={subEnableKey !== null}
        featureName={subEnableKey ? labelFor(subEnableKey) : ''}
        initialDefaultVal={subEnableKey ? state.ai[subEnableKey].defaultVal : 'On'}
        initialAllowChange={subEnableKey ? state.ai[subEnableKey].allowChange : true}
        customCount={subEnableKey ? state.ai[subEnableKey].customUsers : 0}
        onCancel={() => setSubEnableKey(null)}
        onConfirm={confirmSubEnable}
        lockAllowChange={
          subEnableKey === 'closedCaptioning' ||
          subEnableKey === 'liveTranscripts' ||
          subEnableKey === 'aiNotes'
        }
      />

      {/* Upward cascade confirm — child user default On while a parent's user
          default is Off (Live transcripts → Call notes). */}
      <SpringConfirmDialog
        open={upPending !== null}
        confirmLabel={upPending?.parentsOff.length ? 'Turn default on' : 'Confirm'}
        title={
          upPending?.parentsOff.length
            ? <>Turn on default for users?</>
            : <>Confirm deployment change?</>
        }
        body={
          upPending ? (
            <>
              {upPending.parentsOff.length > 0 && (
                <>
                  <p>
                    <span className="font-bold">{labelFor(upPending.key)}</span> will default to on
                    in user settings.
                  </p>
                  <p>
                    {upPending.parentsOff.map((p, i) => (
                      <React.Fragment key={p}>
                        {i > 0 && ' and '}
                        <span className="font-bold">{labelFor(p)}</span>
                      </React.Fragment>
                    ))}{' '}
                    will also default to on.
                  </p>
                </>
              )}
              {upPending.forceAutomaticOn && (
                <p>
                  <span className="font-bold">
                    {state.ai.aiNotes.on ||
                    (upPending.key === 'aiNotes' && upPending.payload.on === true)
                      ? 'Automatic live transcripts & call notes'
                      : 'Automatic live transcripts'}
                  </span>{' '}
                  will also be turned on because users are restricted from changing this setting.
                </p>
              )}
            </>
          ) : null
        }
        onCancel={() => setUpPending(null)}
        onConfirm={commitUpCascade}
      />
    </div>
  );
}
