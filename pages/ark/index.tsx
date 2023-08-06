import type { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType } from "next";
import type { ReducerAction, ReducerState, Reducer } from 'react';

import { useRouter } from "next/router";
import { useEffect, useMemo, useState, useReducer } from "react";
import { v4 } from 'uuid';
import axios from "axios";

import { Header, ArkTameItem, NewTameForm } from "../../components/ArkPageComponents";

import useArkReducer, { reducerReturn } from "../../hooks/ark/useArkReducer";

import { getData } from "../../utils";

import { Member } from "../../utils/database/collections/ark/MembersModel";
import { Tame } from "../../utils/database/collections/ark/TamesModel";
import { Item } from "../../utils/database/collections/ark/ItemsModel";
import { TameColor } from "../../utils/database/collections/ark/TamesColorsModel";
import { Species } from "../../utils/database/collections/ark/SpeciesModel";

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> => {
  const db = process.env.DATABASE;

  if (!db) throw new Error('Database missing! Please provide missing info to establish connection');

  const dataString = await getData(db as string);
  const { tames, members, items, colors, species } = JSON.parse(dataString as string);

  return ({
    props: {
      members: members as Member[] ?? null,
      tames: tames as Tame[] ?? null,
      items: items as Item[] ?? null,
      colors: colors as TameColor[] ?? null,
      species: species as Species[] ?? null,
    },
    revalidate: 300,
  });
}

export default function Ark(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const {state, dispatch} = useArkReducer() as reducerReturn;

  useEffect(() => {
    if(props) dispatch({ type: 'set_init_state', data: props })
  }, [props, dispatch]);

  const selectTab = useMemo(() => {
    switch (state.tab) {
      case 'members':
        return (<div>Members</div>);
      case 'tames':
        return (state.data?.tames?.map((tame: any) => <ArkTameItem key={`${v4()}-${tame._id}`} tame={tame} />));
      case 'items':
        return (<div>Items</div>);
      default:
        return <NewTameForm state={state} />
        // return (<div>Welcome to my Ark DataBase page</div>)
    }
  }, [state]);

  const checkConnection = async () => {
    const req = await axios.get(`http://localhost:3000/api/ark/${state.tab}/new`);
    const res = await req.data;
    if (res.status === 'success') router.push(`/ark/new?form=${state.tab}`, '/ark/tame/new');
  }

  if (!state.data) {
    return (<div className="text-white">Loading...</div>)
  }

  return (
    <div className="ArkPage">

      <Header
        active={state.tab}
        setActive={(tab: string) => dispatch({ type: 'set_tab', data: tab })}
        collectionKeys={state.keys?.collection as string[]}
        filterKeys={state.keys?.tame as string[]}
        handleClick={checkConnection}
        changeFilter={(filter: string) => dispatch({ type: 'set_filter', data: filter })}
      />

      <div className="ArkContentContainer">
        {selectTab}
      </div>
    </div>
  )
}