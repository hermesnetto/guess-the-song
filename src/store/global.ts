import { OptionSelector } from '../types';

/** Action Types */

export const SET_GENRES = 'global/SET_GENRES';
export const SET_DIFFICULTY = 'global/SET_DIFFICULTY';
export const SWITCH_GAME_STATE = 'global/SWITCH_GAME_STATE';

/** State */

export type GameStates = 'INIT' | 'SETTING_UP' | 'PLAYING';

export interface State {
  genres: OptionSelector[];
  difficulty: string | null;
  gameState: GameStates;
}

export const initialState: State = {
  genres: [],
  difficulty: null,
  gameState: 'INIT',
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
    genres: OptionSelector[];
  };
}

interface SetDifficultyAction {
  type: typeof SET_DIFFICULTY;
  payload: {
    difficulty: string;
  };
}

export type Action = SetGenresAction | SetDifficultyAction | SwitchGameStateAction;

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

  return state;
}

/** Action Creators */

export function switchGameStateAction(nextState: GameStates): SwitchGameStateAction {
  return {
    type: SWITCH_GAME_STATE,
    payload: { nextState },
  };
}

export function setGenresAction(genres: OptionSelector[]): SetGenresAction {
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

export default globalReducer;
