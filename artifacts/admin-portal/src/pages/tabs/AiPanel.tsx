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
  const [manageModal, setManageModal] = useState<'aiFeatures' | 'aiAssistant' | null>(null);

  // Pending values awaiting confirm-dialog approval (turn-on / change).
  // Use state (not ref) so the period <select> in the turn-on confirm
  // dialog is reactive when the user picks a different duration.
  const [pending, setPending] = useState<{ on: boolean; period: AiRetentionPeriod } | null>(null);
  const [aiTurnOnConfirmOpen, setAiTurnOnConfirmOpen] = useState(false);
  const [aiChangeConfirmOpen, setAiChangeConfirmOpen] = useState(false);

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
      setPending({ on: true, period });
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
    setPending(null);
    setAiTurnOnConfirmOpen(false);
    setAiChangeConfirmOpen(false);
    setManageModal(null);
    showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
  };

  const handleSaveAssistant = (result: { defaultVal: 'On' | 'Off'; allowChange: boolean }) => {
    if (state.simulateError) {
      dispatch({ type: 'TOGGLE_SIMULATE_ERROR' });
      return;
    }
    dispatch({
      type: 'PATCH_AI_ASSISTANT',
      payload: { defaultVal: result.defaultVal, allowChange: result.allowChange },
    });
    setManageModal(null);
    showToast('Settings were updated.', () => dispatch({ type: 'UNDO' }));
  };

  const handleMasterToggle = () => {
    if (masterOn) {
      setMasterConfirmOpen(true);
    } else {
      dispatch({ type: 'TOGGLE_MASTER_AI', payload: true });
      showToast('AI features turned on', () => dispatch({ type: 'UNDO' }));
    }
  };

  const confirmMasterOff = () => {
    dispatch({ type: 'TOGGLE_MASTER_AI', payload: false });
    setMasterConfirmOpen(false);
    showToast('AI features turned off', () => dispatch({ type: 'UNDO' }));
  };

  const toggleSubFeature = (key: Exclude<AiFeatureKey, 'aiAssistant'>, label: string) => {
    if (!masterOn) return;
    const cur = state.ai[key].on;
    dispatch({ type: 'PATCH_AI_FEATURE', key, payload: { on: !cur } });
    showToast(`${label} turned ${cur ? 'off' : 'on'}`, () => dispatch({ type: 'UNDO' }));
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
        summary={[
          { label: 'User default:', value: cfg.defaultVal },
          { label: 'User access:', value: cfg.allowChange ? 'Allowed' : 'Restricted' },
        ]}
        onManage={() =>
          showToast(`Manage ${item.title} — coming soon`)
        }
        onSwitchClick={
          item.key === 'aiAssistant'
            ? undefined
            : () => toggleSubFeature(item.key as Exclude<AiFeatureKey, 'aiAssistant'>, item.title)
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
        summary={[{ label: 'AI data custom retention period:', value: retentionDisplay }]}
        onManage={() => setManageModal('aiFeatures')}
        onSwitchClick={handleMasterToggle}
      />

      {/* AI Assistant */}
      <SettingCard
        title="AI Assistant"
        switchOn={aiAssistant.on && masterOn}
        disabled={!masterOn}
        icon={<SpringIcon as={AiLightBulbMd} />}
        description="A personal assistant that helps you boost productivity."
        summary={[
          { label: 'User default:', value: aiAssistant.defaultVal },
          { label: 'User access:', value: aiAssistant.allowChange ? 'Allowed' : 'Restricted' },
        ]}
        onManage={() => setManageModal('aiAssistant')}
        onSwitchClick={() => {
          if (!masterOn) return;
          const cur = aiAssistant.on;
          dispatch({ type: 'PATCH_AI_ASSISTANT', payload: { on: !cur } });
          showToast(`AI Assistant turned ${cur ? 'off' : 'on'}`, () => dispatch({ type: 'UNDO' }));
        }}
      />

      <GroupLabel>Phone</GroupLabel>
      {PHONE_ITEMS.map(renderFeatureCard)}

      <GroupLabel>Chat</GroupLabel>
      {CHAT_ITEMS.map(renderFeatureCard)}

      <GroupLabel>SMS</GroupLabel>
      {SMS_ITEMS.map(renderFeatureCard)}

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

      <ManageAiFeaturesDialog
        open={manageModal === 'aiFeatures'}
        initialRetentionOn={customRetention.on}
        initialPeriod={customRetention.period}
        onCancel={() => setManageModal(null)}
        onSave={handleManageSave}
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

      <SpringFeatureManageDialog
        open={manageModal === 'aiAssistant'}
        title="Manage AI Assistant settings"
        defaultVal={aiAssistant.defaultVal}
        allowChange={aiAssistant.allowChange}
        customCount={aiAssistant.customUsers}
        onCancel={() => setManageModal(null)}
        onConfirm={handleSaveAssistant}
        error={state.simulateError}
      />
    </div>
  );
}
