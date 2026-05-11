import React, { useState } from 'react';
import { Captions, Mic, FileText, Voicemail, PenLine, ListChecks, Languages } from 'lucide-react';
import { useSettings } from '../../store';
import type { AiFeatureKey } from '../../store';
import {
  SettingCard,
  SpringConfirmDialog,
  SpringDialog,
  SpringFeatureManageDialog,
  SpringSelect,
  SubRow,
  LabelWithInfo,
  showToast,
} from '../../components/shared';

const RETENTION_OPTIONS = ['30 days', '90 days', '365 days'] as const;

type FeatureItem = {
  key: AiFeatureKey;
  title: string;
  icon: string | React.ReactNode;
  description: React.ReactNode;
};

const PHONE_ITEMS: FeatureItem[] = [
  {
    key: 'closedCaptioning',
    title: 'Closed captioning',
    icon: <Captions className="h-5 w-5" />,
    description: 'Uses AI to display real-time captions during phone calls.',
  },
  {
    key: 'liveTranscripts',
    title: 'Live transcripts',
    icon: <Mic className="h-5 w-5" />,
    description: 'Provides real-time AI-generated call transcripts.',
  },
  {
    key: 'aiNotes',
    title: 'AI notes',
    icon: 'ai-writer',
    description: 'Generate call notes automatically for all your devices.',
  },
  {
    key: 'aiVoicemailSummaries',
    title: 'AI voicemail summaries',
    icon: <Voicemail className="h-5 w-5" />,
    description:
      'Delivers AI-generated summaries of voicemails, including key details and follow-up items.',
  },
];

const CHAT_ITEMS: FeatureItem[] = [
  {
    key: 'aiWriterMessaging',
    title: 'AI writer for messaging',
    icon: <PenLine className="h-5 w-5" />,
    description:
      'Uses AI to draft and refine messages — check grammar, adjust tone or length, and translate to other languages.',
  },
  {
    key: 'aiSummary',
    title: 'AI summary',
    icon: <ListChecks className="h-5 w-5" />,
    description: 'Provides AI summaries that highlight key conversation points.',
  },
  {
    key: 'aiTranslation',
    title: 'AI translation',
    icon: <Languages className="h-5 w-5" />,
    description: 'Uses AI to translate chats, messages, and transcripts across languages.',
  },
];

const SMS_ITEMS: FeatureItem[] = [
  {
    key: 'aiWriterSms',
    title: 'AI writer for SMS',
    icon: <PenLine className="h-5 w-5" />,
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

  const [masterConfirmOpen, setMasterConfirmOpen] = useState(false);
  const [manageModal, setManageModal] = useState<'aiFeatures' | 'aiAssistant' | null>(null);
  const [editRetention, setEditRetention] = useState<'30 days' | '90 days' | '365 days'>('365 days');

  const openManageAiFeatures = () => {
    const r = aiAssistant.customize.transcriptRetention;
    setEditRetention(r === '' ? '365 days' : r);
    setManageModal('aiFeatures');
  };

  const handleSaveAiFeatures = () => {
    if (state.simulateError) {
      dispatch({ type: 'TOGGLE_SIMULATE_ERROR' });
      return;
    }
    dispatch({
      type: 'PATCH_AI_ASSISTANT_CUSTOMIZE',
      payload: { transcriptRetention: editRetention },
    });
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

  const retentionDisplay =
    aiAssistant.customize.transcriptRetention === '' || aiAssistant.customize.transcriptRetention === '365 days'
      ? 'Disabled'
      : aiAssistant.customize.transcriptRetention;

  return (
    <div className="flex flex-col gap-4">
      {/* AI features (master) */}
      <SettingCard
        title="AI features"
        switchOn={masterOn}
        icon="ai-stars"
        description="Turn on AI support for calls, messages and video meetings. Deliver real-time answers, call notes, transcripts and meeting recaps to help teams stay focused and organized. Empower users to communicate clearly with built-in writing and polishing tools."
        summary={[{ label: 'AI data custom retention period:', value: retentionDisplay }]}
        onManage={openManageAiFeatures}
        onSwitchClick={handleMasterToggle}
      />

      {/* AI Assistant */}
      <SettingCard
        title="AI Assistant"
        switchOn={aiAssistant.on && masterOn}
        disabled={!masterOn}
        icon="ai-lightbulb"
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
        title="Turn off AI features?"
        body="This will turn off AI features for 98 users. Continue?"
        onCancel={() => setMasterConfirmOpen(false)}
        onConfirm={confirmMasterOff}
      />

      <SpringDialog
        open={manageModal === 'aiFeatures'}
        title="Manage AI features"
        onClose={() => setManageModal(null)}
        onSave={handleSaveAiFeatures}
        error={state.simulateError}
      >
        <SubRow>
          <LabelWithInfo>AI notes and transcriptions retention period</LabelWithInfo>
          <SpringSelect
            value={editRetention}
            options={[...RETENTION_OPTIONS]}
            onChange={(v) => {
              const next = RETENTION_OPTIONS.find((o) => o === v);
              if (next) setEditRetention(next);
            }}
            width={200}
          />
        </SubRow>
      </SpringDialog>

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
