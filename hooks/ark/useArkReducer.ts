import type { ReducerAction, ReducerState, Dispatch } from 'react';

import { useEffect, useReducer } from "react";

import { Item } from "../../utils/database/collections/ark/ItemsModel";
import { Member } from "../../utils/database/collections/ark/MembersModel";
import { Species } from "../../utils/database/collections/ark/SpeciesModel";
import { TameColor } from "../../utils/database/collections/ark/TamesColorsModel";
import { Tame } from "../../utils/database/collections/ark/TamesModel";

type mapType<cType> = Map<string, cType>;

type props = {
  members: Member[];
  tames: Tame[];
  items: Item[];
  colors: TameColor[];
  species: Species[];
}

type filteredData<data> = {
  [key in keyof data]?: mapType<data[key]>
}

export type reducerState = {
  data: props;
  filteredDate?: filteredData<props>;
  keys: {
    collection: string[];
    tame: string[];
    member: string[];
    item: string[];
    color: string[];
    species: string[];
  }
  filter: {
    isFiltered: boolean;
    value: string;
  }
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
    data: {
      members: [],
      items: [],
      tames: [],
      species: [],
      colors: [],
    },
    keys: {
      collection: [],
      tame: [],
      member: [],
      item: [],
      color: [],
      species: [],
    },
    filter: {
      isFiltered: false,
      value: '',
    }
  }

  const reducer = (state: reducerState, { type, data }: reducerAction): reducerState => {
    switch (type) {
      case 'set_init_state': {
        const arkData = data as props;
        return ({
          ...state,
          data: {
            ...arkData,
            items: arkData.items.map((item: Item) => ({
              ...item,
              owner: arkData.members.filter((member: Member) => member._id === item.owner)[0],
            }))
          },
          keys: {
            collection: Object.keys(arkData),
            tame: Object.keys(arkData.tames[0]).splice(1),
            member: Object.keys(arkData.members[0]).splice(1),
            item: Object.keys(arkData.items[0]).splice(1),
            species: Object.keys(arkData.species[0]).splice(1),
            color: Object.keys(arkData.colors[0]).splice(1),
          },
          filter: {
            isFiltered: false,
            value: arkData.tames.length > 0 ? Object.keys(arkData.tames[0]).splice(1)[0] : '',
          },
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

  return { state, dispatch }
}

export default useArkReducer;