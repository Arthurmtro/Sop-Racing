import { createContext, ReactNode, useReducer, useContext } from "react";
import { IEGlobalState } from "../../types/state";
import equipItem from "../../utils/equipItem";
import sellItem from "../../utils/sellItem";

// An enum with all the types of actions to use in our reducer
export enum GlobalStateActionKind {
  INIT_STATE = "INIT_STATE",
  END_LOADED = "END_LOADED",
  EQUIP_ITEM = "EQUIP_ITEM",
  SELL_ITEM = "SELL_ITEM",
  BUY_ITEM = "BUY_ITEM",
}

// An interface for our actions
export interface GlobalStateAction {
  type: GlobalStateActionKind;
  payload: any;
}

export interface Context {
  state: IEGlobalState;
  dispatch: React.Dispatch<GlobalStateAction>;
}

export function stateReducer(state: IEGlobalState, action: GlobalStateAction) {
  const { type, payload } = action;

  switch (type) {
    case GlobalStateActionKind.INIT_STATE: {
      return {
        ...state,
        items: payload.items,
        teams: payload.teams,
        inventory: payload.inventory,
        races: payload.races,
        personal_team: payload.personal_team,
      };
    }
    case GlobalStateActionKind.END_LOADED: {
      return {
        ...state,
        loaded: payload,
      };
    }
    case GlobalStateActionKind.SELL_ITEM: {
      if (state?.inventory?.items === undefined || state?.items === undefined) {
        return {
          ...state,
        };
      }

      const newItemsSell = state.inventory.items.filter(
        (it) => it.item.id !== payload
      );

      sellItem(payload);

      return {
        ...state,
        inventory: {
          ...state.inventory,
          items: newItemsSell,
        },
      };
    }
    case GlobalStateActionKind.EQUIP_ITEM: {
      if (state?.inventory?.items === undefined || state?.items === undefined) {
        return {
          ...state,
        };
      }

      const newItem = state?.items.find((i) => i.id === payload);

      const newItems = state.inventory.items.map((item) => {
        if (item.isEquipped && item.item.type === newItem?.type) {
          return { ...item, isEquipped: false };
        }

        if (!item.isEquipped && item.item.id === newItem?.id) {
          return { ...item, isEquipped: true };
        }
        return item;
      });

      equipItem(payload);

      return {
        ...state,
        inventory: {
          ...state.inventory,
          items: newItems,
        },
      };
    }
    default:
      return state;
  }
}

export const GlobalStateContext = createContext<Context>({
  state: {},
  dispatch: () => null,
});

//initial state
const initialState: IEGlobalState = {};

// context
const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  //@ts-ignore
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const truc = () => useContext(GlobalStateContext);

export default GlobalStateProvider;
