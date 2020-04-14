import { OptionSelector } from '../../types';

export const SET_ITEMS = 'options/SET-ITEMS';
export const TOGGLE_ITEM = 'options/TOGGLE-ITEM';

interface State {
  items: OptionSelector[];
}

interface SetItemsAction {
  type: typeof SET_ITEMS;
  payload: {
    items: OptionSelector[];
  };
}

interface ToggleItemAction {
  type: typeof TOGGLE_ITEM;
  payload: {
    id: string;
    multiple?: boolean;
  };
}

export type Action = SetItemsAction | ToggleItemAction;

function isSetItemsAction(action: Action): action is SetItemsAction {
  return action.type === SET_ITEMS;
}

function isToggleItemAction(action: Action): action is ToggleItemAction {
  return action.type === TOGGLE_ITEM;
}

function optionsReducer(state: State, action: Action) {
  if (isSetItemsAction(action)) {
    return {
      items: action.payload.items,
    };
  }

  if (isToggleItemAction(action)) {
    if (!action.payload.multiple) {
      return {
        items: state.items.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, selected: true };
          }
          return { ...item, selected: false };
        }),
      };
    }

    return {
      items: state.items.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, selected: !item.selected };
        }
        return item;
      }),
    };
  }

  return state;
}

export function setItemsAction(items: OptionSelector[]): SetItemsAction {
  return {
    type: SET_ITEMS,
    payload: {
      items,
    },
  };
}

export function toggleItemAction(id: string, multiple?: boolean): ToggleItemAction {
  return {
    type: TOGGLE_ITEM,
    payload: {
      id,
      multiple,
    },
  };
}

export default optionsReducer;
