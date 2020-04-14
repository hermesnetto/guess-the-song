/** Action Types */

export const SET_GENRES = 'global/SET_GENRES';
export const SET_DIFFICULTY = 'global/SET_DIFFICULTY';
export const SWITCH_GAME_STATE = 'global/SWITCH_GAME_STATE';
export const INCREMENT_POINTS = 'global/INCREMENT_POINTS';

/** State */

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

/** Actions */

interface SwitchGameStateAction {
  type: typeof SWITCH_GAME_STATE;
  payload: {
    nextState: GameStates;
  };
}

interface SetGenresAction {
  type: typeof SET_GENRES;
  payload: {
    genres: string[];
  };
}

interface SetDifficultyAction {
  type: typeof SET_DIFFICULTY;
  payload: {
    difficulty: string;
  };
}

interface IncrementPointsAction {
  type: typeof INCREMENT_POINTS;
}

export type Action =
  | SetGenresAction
  | SetDifficultyAction
  | SwitchGameStateAction
  | IncrementPointsAction;

/** Action checkers */

function isSwitchGameState(action: Action): action is SwitchGameStateAction {
  return action.type === SWITCH_GAME_STATE;
}

function isSetGenresAction(action: Action): action is SetGenresAction {
  return action.type === SET_GENRES;
}

function isSetDifficultyAction(action: Action): action is SetDifficultyAction {
  return action.type === SET_DIFFICULTY;
}

function isIncrementPointsAction(action: Action): action is IncrementPointsAction {
  return action.type === INCREMENT_POINTS;
}

/** Reducer */

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

/** Action Creators */

export function switchGameStateAction(nextState: GameStates): SwitchGameStateAction {
  return {
    type: SWITCH_GAME_STATE,
    payload: { nextState },
  };
}

export function setGenresAction(genres: string[]): SetGenresAction {
  return {
    type: SET_GENRES,
    payload: { genres },
  };
}

export function setDifficultyAction(difficulty: string): SetDifficultyAction {
  return {
    type: SET_DIFFICULTY,
    payload: { difficulty },
  };
}

export function incrementPointsAction(): IncrementPointsAction {
  return {
    type: INCREMENT_POINTS,
  };
}

export default globalReducer;
