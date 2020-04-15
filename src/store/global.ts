export type GameStates = 'INIT' | 'SETTING_UP' | 'PLAYING';

export interface State {
  genres: string[];
  difficulty: string;
  gameState: GameStates;
  points: number;
}

export const initialState: State = {
  genres: [],
  difficulty: '15',
  gameState: 'INIT',
  points: 0,
};

interface SwitchGameStateAction {
  type: 'SWITCH_GAME_STATE';
  payload: {
    nextState: GameStates;
  };
}

interface SetGenresAction {
  type: 'SET_GENRES';
  payload: {
    genres: string[];
  };
}

interface SetDifficultyAction {
  type: 'SET_DIFFICULTY';
  payload: {
    difficulty: string;
  };
}

interface IncrementPointsAction {
  type: 'INCREMENT_POINTS';
}

interface ClearPointsAction {
  type: 'CLEAR_POINTS';
}

export type Action =
  | SetGenresAction
  | SetDifficultyAction
  | SwitchGameStateAction
  | IncrementPointsAction
  | ClearPointsAction;

const isSwitchGameState = (action: Action): action is SwitchGameStateAction => {
  return action.type === 'SWITCH_GAME_STATE';
};

const isSetGenresAction = (action: Action): action is SetGenresAction => {
  return action.type === 'SET_GENRES';
};

const isSetDifficultyAction = (action: Action): action is SetDifficultyAction => {
  return action.type === 'SET_DIFFICULTY';
};

const isIncrementPointsAction = (action: Action): action is IncrementPointsAction => {
  return action.type === 'INCREMENT_POINTS';
};

const isClearPointsAction = (action: Action): action is ClearPointsAction => {
  return action.type === 'CLEAR_POINTS';
};

const globalReducer = (state: State = initialState, action: Action) => {
  if (isSwitchGameState(action)) {
    return { ...state, gameState: action.payload.nextState };
  }

  if (isSetGenresAction(action)) {
    return { ...state, genres: action.payload.genres };
  }

  if (isSetDifficultyAction(action)) {
    return { ...state, difficulty: action.payload.difficulty };
  }

  if (isIncrementPointsAction(action)) {
    return { ...state, points: state.points + 1 };
  }

  if (isClearPointsAction(action)) {
    return { ...state, points: 0 };
  }

  return state;
};

export const switchGameStateAction = (nextState: GameStates): SwitchGameStateAction => ({
  type: 'SWITCH_GAME_STATE',
  payload: { nextState },
});

export const setGenresAction = (genres: string[]): SetGenresAction => ({
  type: 'SET_GENRES',
  payload: { genres },
});

export const setDifficultyAction = (difficulty: string): SetDifficultyAction => ({
  type: 'SET_DIFFICULTY',
  payload: { difficulty },
});

export const incrementPointsAction = (): IncrementPointsAction => ({
  type: 'INCREMENT_POINTS',
});

export const clearPointsAction = (): ClearPointsAction => ({
  type: 'CLEAR_POINTS',
});

export default globalReducer;
