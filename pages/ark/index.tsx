import type { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType } from "next";

import { useRouter } from "next/router";
import { useEffect, useMemo, useState, useReducer } from "react";
import { v4 } from 'uuid';
import axios from "axios";

import { Header, ArkTameTableItem, ArkMemberTableItem, NewTameForm, ArkTableContainer } from "../../components/ArkPageComponents";

import useArkReducer, { reducerReturn } from "../../hooks/ark/useArkReducer";

import { getData } from "../../utils";

import { Member } from "../../utils/database/collections/ark/MembersModel";
import { Tame } from "../../utils/database/collections/ark/TamesModel";
import { Item } from "../../utils/database/collections/ark/ItemsModel";
import { TameColor } from "../../utils/database/collections/ark/TamesColorsModel";
import { Species } from "../../utils/database/collections/ark/SpeciesModel";
import { mapArkTameData } from "../../utils/utilities";

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> => {
  const db = process.env.DATABASE;

  if (!db) throw new Error('Database missing! Please provide missing info to establish connection');

  const dataString = await getData(db as string);
  const { tames, members, items, colors, species } = JSON.parse(dataString as string);

  return ({
    props: {
      members: members as Member[],
      tames: tames as Tame[],
      items: items as Item[],
      colors: colors as TameColor[],
      species: species as Species[],
    },
    revalidate: 300,
  });
}

export default function Ark(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const { state, dispatch } = useArkReducer() as reducerReturn;

  useEffect(() => {
    if (props) dispatch({ type: 'set_init_state', data: props });
  }, [props, dispatch]);

  const selectTab = useMemo(() => {
    switch (router.asPath) {
      case '/ark/members':
        return (
          <ArkTableContainer>
            {state.data.members.map((member: any) => <ArkMemberTableItem key={`${v4()}-${member._id}`} member={member} />)}
          </ArkTableContainer>
        );
      case '/ark/tames':
        return (
          <ArkTableContainer>
            {state.data.tames.map((tame: any) => <ArkTameTableItem key={`${v4()}-${tame._id}`} tame={tame} />)}
          </ArkTableContainer>
        );
      case '/ark/tames/new':
        return (<NewTameForm state={state} />);
      case '/ark/items':
        return (<div>Items</div>);
      default:
        return (<div>Welcome to my Ark DataBase page</div>)
    }
  }, [router, state]);

  if (!state.data) {
    return (<div className="text-white">Loading...</div>)
  }

  return (
    <div className="ArkPage">

      <Header
        currentView={router.asPath.split('/')[router.asPath.split('/').length - 1]}
        switchView={(tab: string) => router.push('/ark', `ark/${tab}`, { shallow: true })}
        viewOptions={state.keys?.collection as string[]}
        filterOptions={state.keys?.tame as string[]}
        btnAction={async (): Promise<void> => {
          const req = await axios.get(`http://localhost:3000/api/ark`);
          const res = await req.data;
          if (res.status === 'success') router.push('/ark', `${router.asPath}/new`);
          else alert('you must be online to add new tames to tha database');
        }}
        changeFilter={(filter: string) => {
          dispatch({ type: 'set_filter', data: filter });
        }}
      />

      <div className="ArkContentContainer">
        {selectTab}
      </div>
    </div>
  )
}