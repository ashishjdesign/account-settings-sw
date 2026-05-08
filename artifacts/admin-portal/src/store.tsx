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

export type ExtAppConfig = FeatureConfig & {
  launchUrl: string;
  trigger: 'A call begins to ring' | 'A call is answered';
};

export type PhoneState = {
  externalAppOn: boolean;
  extApp: ExtAppConfig;
  autoAnswer: FeatureConfig;
  conferenceCallsOn: boolean;
};

export type AiState = {
  masterOn: boolean;
  aiAssistant: FeatureConfig & { customize: AiAssistantCustomize };
  autoCallNotes: FeatureConfig;
  realTimeAnswers: FeatureConfig;
  transcripts: FeatureConfig;
  writingAssist: FeatureConfig;
};

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
    },
    autoAnswer: { on: true, defaultVal: 'Off', allowChange: true, customUsers: 0 },
    conferenceCallsOn: false,
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
    autoCallNotes: { on: true, defaultVal: 'On', allowChange: true, customUsers: 0 },
    realTimeAnswers: { on: true, defaultVal: 'On', allowChange: true, customUsers: 12 },
    transcripts: { on: true, defaultVal: 'On', allowChange: false, customUsers: 0 },
    writingAssist: { on: false, defaultVal: 'Off', allowChange: true, customUsers: 8 },
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
  | { type: 'SET_PHONE_CONFERENCE'; payload: boolean }
  | { type: 'PATCH_PHONE_AUTO_ANSWER'; payload: Partial<FeatureConfig> }
  | { type: 'PATCH_AI_ASSISTANT'; payload: Partial<FeatureConfig> }
  | { type: 'PATCH_AI_AUTO_NOTES'; payload: Partial<FeatureConfig> }
  | { type: 'PATCH_AI_ASSISTANT_CUSTOMIZE'; payload: Partial<AiAssistantCustomize> }
  | { type: 'PATCH_AI_REAL_TIME_ANSWERS'; payload: Partial<FeatureConfig> }
  | { type: 'PATCH_AI_TRANSCRIPTS'; payload: Partial<FeatureConfig> }
  | { type: 'PATCH_AI_WRITING_ASSIST'; payload: Partial<FeatureConfig> }
  | { type: 'RESET_OVERRIDES_AI_RT'; payload: 'realTimeAnswers' | 'transcripts' | 'writingAssist' }
  | { type: 'SET_SMS'; payload: boolean }
  | { type: 'PATCH_FAX'; payload: Partial<FeatureConfig> }
  | { type: 'SET_EMAIL_TO_FAX'; payload: boolean }
  | { type: 'PATCH_FAX_CUSTOMIZE'; payload: Partial<FaxConfig> }
  | { type: 'RESET_OVERRIDES_AI'; payload: 'aiAssistant' | 'autoCallNotes' | 'realTimeAnswers' | 'transcripts' | 'writingAssist' };

const TOTAL_USERS = 98;

function withSnapshot(state: AppState): AppState {
  return { ...state, undoSnapshot: { ...state, undoSnapshot: null } };
}

function applyFeaturePatch(current: FeatureConfig, patch: Partial<FeatureConfig>): FeatureConfig {
  const next: FeatureConfig = { ...current, ...patch };
  // When the admin flips the default, users previously on the default are now
  // on a non-default value (and vice versa) — swap the override count so the
  // X/Y "users using default" metric updates live.
  if (patch.defaultVal !== undefined && patch.defaultVal !== current.defaultVal) {
    next.customUsers = Math.max(0, TOTAL_USERS - current.customUsers);
  }
  return next;
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
      // Preserve url/trigger when not in patch
      next.launchUrl = action.payload.launchUrl ?? state.phone.extApp.launchUrl;
      next.trigger = action.payload.trigger ?? state.phone.extApp.trigger;
      return {
        ...withSnapshot(state),
        phone: {
          ...state.phone,
          externalAppOn: next.on,
          extApp: next,
        },
      };
    }
    case 'SET_PHONE_CONFERENCE':
      return { ...withSnapshot(state), phone: { ...state.phone, conferenceCallsOn: action.payload } };
    case 'PATCH_PHONE_AUTO_ANSWER':
      return {
        ...withSnapshot(state),
        phone: {
          ...state.phone,
          autoAnswer: applyFeaturePatch(state.phone.autoAnswer, action.payload),
        },
      };
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
    case 'PATCH_AI_AUTO_NOTES':
      return {
        ...withSnapshot(state),
        ai: {
          ...state.ai,
          autoCallNotes: applyFeaturePatch(state.ai.autoCallNotes, action.payload),
        },
      };
    case 'PATCH_AI_REAL_TIME_ANSWERS':
      return {
        ...withSnapshot(state),
        ai: { ...state.ai, realTimeAnswers: applyFeaturePatch(state.ai.realTimeAnswers, action.payload) },
      };
    case 'PATCH_AI_TRANSCRIPTS':
      return {
        ...withSnapshot(state),
        ai: { ...state.ai, transcripts: applyFeaturePatch(state.ai.transcripts, action.payload) },
      };
    case 'PATCH_AI_WRITING_ASSIST':
      return {
        ...withSnapshot(state),
        ai: { ...state.ai, writingAssist: applyFeaturePatch(state.ai.writingAssist, action.payload) },
      };
    case 'RESET_OVERRIDES_AI_RT': {
      const k = action.payload;
      return {
        ...withSnapshot(state),
        ai: { ...state.ai, [k]: { ...state.ai[k], customUsers: 0 } },
      };
    }
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
