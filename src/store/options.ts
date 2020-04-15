import { OptionSelector } from '../types';

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

const isSetItemsAction = (action: Action): action is SetItemsAction => {
  return action.type === SET_ITEMS;
};

const isToggleItemAction = (action: Action): action is ToggleItemAction => {
  return action.type === TOGGLE_ITEM;
};

const optionsReducer = (state: State, action: Action): State => {
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
};

export const setItemsAction = (items: OptionSelector[]): SetItemsAction => ({
  type: SET_ITEMS,
  payload: {
    items,
  },
});

export const toggleItemAction = (id: string, multiple?: boolean): ToggleItemAction => ({
  type: TOGGLE_ITEM,
  payload: {
    id,
    multiple,
  },
});

export default optionsReducer;
