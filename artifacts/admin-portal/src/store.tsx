import React, { createContext, useContext, useReducer } from 'react';

export type FeatureConfig = {
  on: boolean;
  defaultVal: 'On' | 'Off';
  allowChange: boolean;
  customUsers: number;
};

export type FaxConfig = {
  international: boolean;
  coverPage: 'None' | 'Standard' | 'Branded';
  retention: '' | '30 days' | '90 days' | '365 days';
};

export type AiAssistantCustomize = {
  transcriptLanguage: 'English' | 'Spanish' | 'French';
  transcriptRetention: '' | '30 days' | '90 days' | '365 days';
  shareWithManagers: boolean;
};

export type GeneralState = {
  userActivationOn: boolean;
  guides: FeatureConfig;
};

export type AutoAnswerDelay =
  | 'Immediately'
  | '5 seconds'
  | '10 seconds'
  | '15 seconds'
  | '20 seconds'
  | '25 seconds';

export const AUTO_ANSWER_DELAY_OPTIONS: AutoAnswerDelay[] = [
  'Immediately',
  '5 seconds',
  '10 seconds',
  '15 seconds',
  '20 seconds',
  '25 seconds',
];

export type AutoAnswerConfig = FeatureConfig & {
  delay: AutoAnswerDelay;
};

export type ExtAppConfig = FeatureConfig & {
  launchUrl: string;
  trigger: 'A call begins to ring' | 'A call is answered';
  // True once the admin has completed the first-time enable flow at
  // least once. Subsequent re-enables show the full deployment dialog
  // (with default user-count link + custom-users validation).
  everEnabled: boolean;
};

export type PhoneState = {
  externalAppOn: boolean;
  extApp: ExtAppConfig;
  autoAnswer: AutoAnswerConfig;
  conference: FeatureConfig;
};

export type AiState = {
  masterOn: boolean;
  aiAssistant: FeatureConfig & { customize: AiAssistantCustomize };
  // Phone group
  closedCaptioning: FeatureConfig;
  liveTranscripts: FeatureConfig;
  aiNotes: FeatureConfig;
  aiVoicemailSummaries: FeatureConfig;
  // Chat group
  aiWriterMessaging: FeatureConfig;
  aiSummary: FeatureConfig;
  aiTranslation: FeatureConfig;
  // SMS group
  aiWriterSms: FeatureConfig;
};

export type AiFeatureKey =
  | 'aiAssistant'
  | 'closedCaptioning'
  | 'liveTranscripts'
  | 'aiNotes'
  | 'aiVoicemailSummaries'
  | 'aiWriterMessaging'
  | 'aiSummary'
  | 'aiTranslation'
  | 'aiWriterSms';

export type SmsState = {
  smsOn: boolean;
};

export type FaxState = {
  fax: FeatureConfig & { customize: FaxConfig };
  emailToFaxOn: boolean;
};

export type AppState = {
  general: GeneralState;
  phone: PhoneState;
  ai: AiState;
  sms: SmsState;
  fax: FaxState;
  simulateError: boolean;
  undoSnapshot: AppState | null;
};

const initialState: AppState = {
  general: {
    userActivationOn: false,
    guides: { on: true, defaultVal: 'On', allowChange: true, customUsers: 26 },
  },
  phone: {
    externalAppOn: false,
    extApp: {
      on: false,
      defaultVal: 'On',
      allowChange: true,
      customUsers: 0,
      launchUrl: '',
      trigger: 'A call begins to ring',
      everEnabled: false,
    },
    autoAnswer: { on: true, defaultVal: 'Off', allowChange: true, customUsers: 26, delay: 'Immediately' },
    conference: { on: true, defaultVal: 'On', allowChange: true, customUsers: 26 },
  },
  ai: {
    masterOn: true,
    aiAssistant: {
      on: true,
      defaultVal: 'On',
      allowChange: true,
      customUsers: 26,
      customize: {
        transcriptLanguage: 'English',
        transcriptRetention: '365 days',
        shareWithManagers: false,
      },
    },
    closedCaptioning: { on: true, defaultVal: 'On', allowChange: true, customUsers: 0 },
    liveTranscripts: { on: true, defaultVal: 'On', allowChange: true, customUsers: 0 },
    aiNotes: { on: true, defaultVal: 'On', allowChange: true, customUsers: 0 },
    aiVoicemailSummaries: { on: true, defaultVal: 'On', allowChange: true, customUsers: 0 },
    aiWriterMessaging: { on: true, defaultVal: 'On', allowChange: true, customUsers: 0 },
    aiSummary: { on: true, defaultVal: 'On', allowChange: true, customUsers: 0 },
    aiTranslation: { on: true, defaultVal: 'On', allowChange: true, customUsers: 0 },
    aiWriterSms: { on: true, defaultVal: 'On', allowChange: true, customUsers: 0 },
  },
  sms: { smsOn: true },
  fax: {
    fax: {
      on: true,
      defaultVal: 'On',
      allowChange: true,
      customUsers: 0,
      customize: { international: false, coverPage: 'Standard', retention: '90 days' },
    },
    emailToFaxOn: false,
  },
  simulateError: false,
  undoSnapshot: null,
};

type Action =
  | { type: 'SNAPSHOT' }
  | { type: 'UNDO' }
  | { type: 'TOGGLE_SIMULATE_ERROR' }
  | { type: 'TOGGLE_MASTER_AI'; payload: boolean }
  | { type: 'PATCH_GENERAL_GUIDES'; payload: Partial<FeatureConfig> }
  | { type: 'SET_GENERAL_USER_ACTIVATION'; payload: boolean }
  | { type: 'SET_PHONE_EXTERNAL_APP'; payload: boolean }
  | { type: 'PATCH_PHONE_EXT_APP'; payload: Partial<ExtAppConfig> }
  | { type: 'PATCH_PHONE_CONFERENCE'; payload: Partial<FeatureConfig> }
  | { type: 'PATCH_PHONE_AUTO_ANSWER'; payload: Partial<AutoAnswerConfig> }
  | { type: 'PATCH_AI_ASSISTANT'; payload: Partial<FeatureConfig> }
  | { type: 'PATCH_AI_FEATURE'; key: Exclude<AiFeatureKey, 'aiAssistant'>; payload: Partial<FeatureConfig> }
  | { type: 'PATCH_AI_ASSISTANT_CUSTOMIZE'; payload: Partial<AiAssistantCustomize> }
  | { type: 'SET_SMS'; payload: boolean }
  | { type: 'PATCH_FAX'; payload: Partial<FeatureConfig> }
  | { type: 'SET_EMAIL_TO_FAX'; payload: boolean }
  | { type: 'PATCH_FAX_CUSTOMIZE'; payload: Partial<FaxConfig> }
  | { type: 'RESET_OVERRIDES_AI'; payload: AiFeatureKey };

function withSnapshot(state: AppState): AppState {
  return { ...state, undoSnapshot: { ...state, undoSnapshot: null } };
}

function applyFeaturePatch(current: FeatureConfig, patch: Partial<FeatureConfig>): FeatureConfig {
  // `customUsers` counts users who have overridden the default in their own
  // settings (only meaningful when User access is Allowed). It is independent
  // of which value (On/Off) is currently the default — flipping the default
  // does not move users between "using default" and "overriding default".
  // Only explicit patches (e.g. "Reset all to default" → 0) change it.
  return { ...current, ...patch };
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SNAPSHOT':
      return withSnapshot(state);
    case 'UNDO':
      return state.undoSnapshot
        ? { ...state.undoSnapshot, undoSnapshot: null, simulateError: state.simulateError }
        : state;
    case 'TOGGLE_SIMULATE_ERROR':
      return { ...state, simulateError: !state.simulateError };
    case 'TOGGLE_MASTER_AI':
      return { ...withSnapshot(state), ai: { ...state.ai, masterOn: action.payload } };
    case 'PATCH_GENERAL_GUIDES':
      return {
        ...withSnapshot(state),
        general: { ...state.general, guides: applyFeaturePatch(state.general.guides, action.payload) },
      };
    case 'SET_GENERAL_USER_ACTIVATION':
      return {
        ...withSnapshot(state),
        general: { ...state.general, userActivationOn: action.payload },
      };
    case 'SET_PHONE_EXTERNAL_APP':
      return {
        ...withSnapshot(state),
        phone: {
          ...state.phone,
          externalAppOn: action.payload,
          extApp: { ...state.phone.extApp, on: action.payload },
        },
      };
    case 'PATCH_PHONE_EXT_APP': {
      const next = applyFeaturePatch(state.phone.extApp, action.payload) as ExtAppConfig;
      // Preserve url/trigger/everEnabled when not in patch
      next.launchUrl = action.payload.launchUrl ?? state.phone.extApp.launchUrl;
      next.trigger = action.payload.trigger ?? state.phone.extApp.trigger;
      next.everEnabled = action.payload.everEnabled ?? state.phone.extApp.everEnabled;
      return {
        ...withSnapshot(state),
        phone: {
          ...state.phone,
          externalAppOn: next.on,
          extApp: next,
        },
      };
    }
    case 'PATCH_PHONE_CONFERENCE':
      return {
        ...withSnapshot(state),
        phone: {
          ...state.phone,
          conference: applyFeaturePatch(state.phone.conference, action.payload),
        },
      };
    case 'PATCH_PHONE_AUTO_ANSWER': {
      const next = applyFeaturePatch(state.phone.autoAnswer, action.payload) as AutoAnswerConfig;
      next.delay = action.payload.delay ?? state.phone.autoAnswer.delay;
      return {
        ...withSnapshot(state),
        phone: {
          ...state.phone,
          autoAnswer: next,
        },
      };
    }
    case 'PATCH_AI_ASSISTANT':
      return {
        ...withSnapshot(state),
        ai: {
          ...state.ai,
          aiAssistant: {
            ...applyFeaturePatch(state.ai.aiAssistant, action.payload),
            customize: state.ai.aiAssistant.customize,
          },
        },
      };
    case 'PATCH_AI_FEATURE':
      return {
        ...withSnapshot(state),
        ai: {
          ...state.ai,
          [action.key]: applyFeaturePatch(state.ai[action.key], action.payload),
        },
      };
    case 'PATCH_AI_ASSISTANT_CUSTOMIZE':
      return {
        ...withSnapshot(state),
        ai: {
          ...state.ai,
          aiAssistant: {
            ...state.ai.aiAssistant,
            customize: { ...state.ai.aiAssistant.customize, ...action.payload },
          },
        },
      };
    case 'SET_SMS':
      return { ...withSnapshot(state), sms: { smsOn: action.payload } };
    case 'PATCH_FAX':
      return {
        ...withSnapshot(state),
        fax: {
          ...state.fax,
          fax: {
            ...applyFeaturePatch(state.fax.fax, action.payload),
            customize: state.fax.fax.customize,
          },
        },
      };
    case 'SET_EMAIL_TO_FAX':
      return { ...withSnapshot(state), fax: { ...state.fax, emailToFaxOn: action.payload } };
    case 'PATCH_FAX_CUSTOMIZE':
      return {
        ...withSnapshot(state),
        fax: {
          ...state.fax,
          fax: {
            ...state.fax.fax,
            customize: { ...state.fax.fax.customize, ...action.payload },
          },
        },
      };
    case 'RESET_OVERRIDES_AI': {
      const key = action.payload;
      return {
        ...withSnapshot(state),
        ai: {
          ...state.ai,
          [key]: { ...state.ai[key], customUsers: 0 },
        },
      };
    }
    default:
      return state;
  }
}

const SettingsContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
