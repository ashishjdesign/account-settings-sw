import React, { createContext, useContext, useReducer, useCallback } from 'react';

export type FeatureConfig = {
  on: boolean;
  defaultVal: 'On' | 'Off';
  allowChange: boolean;
  customUsers: number;
};

export type FaxConfig = {
  international: boolean;
  coverPage: 'None' | 'Standard' | 'Branded';
  retention: '30 days' | '90 days' | '365 days';
};

export type AppState = {
  general: {
    userActivationOn: boolean;
    guides: FeatureConfig;
  };
  phone: {
    externalAppOn: boolean;
    autoAnswer: FeatureConfig;
    conferenceCallsOn: boolean;
  };
  ai: {
    masterOn: boolean;
    aiAssistant: FeatureConfig;
    autoCallNotes: FeatureConfig;
  };
  sms: {
    smsOn: boolean;
  };
  fax: {
    fax: FeatureConfig & { customize: FaxConfig };
    emailToFaxOn: boolean;
  };
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
    aiAssistant: { on: true, defaultVal: 'On', allowChange: true, customUsers: 26 },
    autoCallNotes: { on: true, defaultVal: 'On', allowChange: true, customUsers: 0 },
  },
  sms: {
    smsOn: true,
  },
  fax: {
    fax: { 
      on: true, 
      defaultVal: 'On', 
      allowChange: true, 
      customUsers: 0,
      customize: { international: false, coverPage: 'Standard', retention: '90 days' } 
    },
    emailToFaxOn: false,
  },
  simulateError: false,
  undoSnapshot: null,
};

type Action =
  | { type: 'TOGGLE_MASTER_AI'; payload: boolean }
  | { type: 'UPDATE_FEATURE'; payload: { tab: keyof AppState; feature: string; data: Partial<FeatureConfig> | boolean } }
  | { type: 'UPDATE_FAX_CUSTOMIZE'; payload: Partial<FaxConfig> }
  | { type: 'RESET_OVERRIDES'; payload: { tab: keyof AppState; feature: string } }
  | { type: 'UNDO' }
  | { type: 'TOGGLE_SIMULATE_ERROR' }
  | { type: 'SNAPSHOT' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SNAPSHOT':
      return { ...state, undoSnapshot: { ...state, undoSnapshot: null } };
    case 'TOGGLE_MASTER_AI': {
      const on = action.payload;
      return {
        ...state,
        undoSnapshot: { ...state, undoSnapshot: null },
        ai: {
          ...state.ai,
          masterOn: on,
        }
      };
    }
    case 'UPDATE_FEATURE': {
      const { tab, feature, data } = action.payload;
      const tabState = state[tab as keyof AppState] as any;
      const currentFeature = tabState[feature];
      
      const newFeatureState = typeof currentFeature === 'boolean' 
        ? data 
        : { ...currentFeature, ...(data as any) };

      return {
        ...state,
        undoSnapshot: { ...state, undoSnapshot: null },
        [tab]: {
          ...tabState,
          [feature]: newFeatureState,
        }
      };
    }
    case 'UPDATE_FAX_CUSTOMIZE': {
      return {
        ...state,
        undoSnapshot: { ...state, undoSnapshot: null },
        fax: {
          ...state.fax,
          fax: {
            ...state.fax.fax,
            customize: { ...state.fax.fax.customize, ...action.payload }
          }
        }
      };
    }
    case 'RESET_OVERRIDES': {
      const { tab, feature } = action.payload;
      const tabState = state[tab as keyof AppState] as any;
      return {
        ...state,
        undoSnapshot: { ...state, undoSnapshot: null },
        [tab]: {
          ...tabState,
          [feature]: { ...tabState[feature], customUsers: 0 }
        }
      };
    }
    case 'UNDO': {
      if (state.undoSnapshot) {
        return { ...state.undoSnapshot, undoSnapshot: null, simulateError: state.simulateError };
      }
      return state;
    }
    case 'TOGGLE_SIMULATE_ERROR':
      return { ...state, simulateError: !state.simulateError };
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
