import type { ReducerAction, ReducerState, Dispatch } from 'react';

import { useEffect, useReducer } from "react";

import { Item } from "../../utils/database/collections/ark/ItemsModel";
import { Member } from "../../utils/database/collections/ark/MembersModel";
import { Species } from "../../utils/database/collections/ark/SpeciesModel";
import { TameColor } from "../../utils/database/collections/ark/TamesColorsModel";
import { Tame } from "../../utils/database/collections/ark/TamesModel";

type props = {
  members?: Member[];
  tames?: Tame[];
  items?: Item[];
  colors?: TameColor[];
  species?: Species[];
}

export type reducerState = {
  data?: props;
  filteredDate?: any;
  keys?: {
    collection?: string[];
    tame?: string[];
    member?: string[];
    item?: string[];
    color?: string[];
    species?: string[];
  }
  filter?: {
    isFiltered: boolean;
    value?: string;
  }
  tab: string;
}  
  
type reducerAction = {
  type: string;
  data: any;
}

export type reducerReturn = {
  state: reducerState;
  dispatch: Dispatch<reducerAction>;
}

const useArkReducer = (): reducerReturn => {
  const initialReducerState: reducerState = {
    filter: {
      isFiltered: false,
    },
    tab: 'ark',
  }
  
  const reducer = (state: reducerState, { type, data }: reducerAction): reducerState => {
    switch (type) {
      case 'set_init_state': {
        return ({
          ...state,
          data,
          filteredDate: {},
          keys: {
            collection: Object.keys(data),
            tame: Object.keys(data.tames[0]).splice(1),
          },
          filter: {
            isFiltered: false,
            value: Object.keys(data.tames[0]).splice(1)[0]
          },
        });
      }
      case 'set_tab': {
        return ({
          ...state,
          tab: data,
        });
      }
      case 'set_filter': {
        return ({
          ...state,
          filter: {
            isFiltered: true,
            value: data,
          }
        });
      }
      default:
        return ({ ...state });
    }
  }

  const [state, dispatch] = useReducer(reducer, initialReducerState);

  return {state, dispatch}
}

export default useArkReducer;