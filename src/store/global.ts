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

export type Action =
  | SetGenresAction
  | SetDifficultyAction
  | SwitchGameStateAction
  | IncrementPointsAction;

function isSwitchGameState(action: Action): action is SwitchGameStateAction {
  return action.type === 'SWITCH_GAME_STATE';
}

function isSetGenresAction(action: Action): action is SetGenresAction {
  return action.type === 'SET_GENRES';
}

function isSetDifficultyAction(action: Action): action is SetDifficultyAction {
  return action.type === 'SET_DIFFICULTY';
}

function isIncrementPointsAction(action: Action): action is IncrementPointsAction {
  return action.type === 'INCREMENT_POINTS';
}

function globalReducer(state: State = initialState, action: Action) {
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

  return state;
}

export function switchGameStateAction(nextState: GameStates): SwitchGameStateAction {
  return {
    type: 'SWITCH_GAME_STATE',
    payload: { nextState },
  };
}

export function setGenresAction(genres: string[]): SetGenresAction {
  return {
    type: 'SET_GENRES',
    payload: { genres },
  };
}

export function setDifficultyAction(difficulty: string): SetDifficultyAction {
  return {
    type: 'SET_DIFFICULTY',
    payload: { difficulty },
  };
}

export function incrementPointsAction(): IncrementPointsAction {
  return {
    type: 'INCREMENT_POINTS',
  };
}

export default globalReducer;
