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

export type PhoneState = {
  externalAppOn: boolean;
  autoAnswer: FeatureConfig;
  conferenceCallsOn: boolean;
};

export type AiState = {
  masterOn: boolean;
  aiAssistant: FeatureConfig & { customize: AiAssistantCustomize };
  autoCallNotes: FeatureConfig;
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
  | { type: 'SET_PHONE_CONFERENCE'; payload: boolean }
  | { type: 'PATCH_PHONE_AUTO_ANSWER'; payload: Partial<FeatureConfig> }
  | { type: 'PATCH_AI_ASSISTANT'; payload: Partial<FeatureConfig> }
  | { type: 'PATCH_AI_AUTO_NOTES'; payload: Partial<FeatureConfig> }
  | { type: 'PATCH_AI_ASSISTANT_CUSTOMIZE'; payload: Partial<AiAssistantCustomize> }
  | { type: 'SET_SMS'; payload: boolean }
  | { type: 'PATCH_FAX'; payload: Partial<FeatureConfig> }
  | { type: 'SET_EMAIL_TO_FAX'; payload: boolean }
  | { type: 'PATCH_FAX_CUSTOMIZE'; payload: Partial<FaxConfig> }
  | { type: 'RESET_OVERRIDES_AI'; payload: 'aiAssistant' | 'autoCallNotes' };

function withSnapshot(state: AppState): AppState {
  return { ...state, undoSnapshot: { ...state, undoSnapshot: null } };
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
        general: { ...state.general, guides: { ...state.general.guides, ...action.payload } },
      };
    case 'SET_GENERAL_USER_ACTIVATION':
      return {
        ...withSnapshot(state),
        general: { ...state.general, userActivationOn: action.payload },
      };
    case 'SET_PHONE_EXTERNAL_APP':
      return { ...withSnapshot(state), phone: { ...state.phone, externalAppOn: action.payload } };
    case 'SET_PHONE_CONFERENCE':
      return { ...withSnapshot(state), phone: { ...state.phone, conferenceCallsOn: action.payload } };
    case 'PATCH_PHONE_AUTO_ANSWER':
      return {
        ...withSnapshot(state),
        phone: {
          ...state.phone,
          autoAnswer: { ...state.phone.autoAnswer, ...action.payload },
        },
      };
    case 'PATCH_AI_ASSISTANT':
      return {
        ...withSnapshot(state),
        ai: {
          ...state.ai,
          aiAssistant: { ...state.ai.aiAssistant, ...action.payload },
        },
      };
    case 'PATCH_AI_AUTO_NOTES':
      return {
        ...withSnapshot(state),
        ai: {
          ...state.ai,
          autoCallNotes: { ...state.ai.autoCallNotes, ...action.payload },
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
        fax: { ...state.fax, fax: { ...state.fax.fax, ...action.payload } },
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
