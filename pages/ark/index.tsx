import type { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType } from "next";

import { useRouter } from "next/router";
import { useEffect, useMemo, useState, useReducer } from "react";
import { v4 } from 'uuid';
import axios from "axios";

import { Header, ArkTameTableItem, ArkMemberTableItem, NewTameForm, ArkTableContainer, ArkItemTableItem, ArkSpeciesTableItem } from "../../components/ArkPageComponents";

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

  const data = await getData('ark');
  console.log(data?.members)

  return ({
    props: {
      members: JSON.stringify(data?.members ?? null),
      tames: JSON.stringify(data?.tames ?? null),
      items: JSON.stringify(data?.items ?? null),
      colors: JSON.stringify(data?.colors ?? null),
      species: JSON.stringify(data?.species ?? null),
    }
  });
}

export default function Ark(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const { state, dispatch } = useArkReducer() as reducerReturn;

  useEffect(() => {
    router.push('/ark')
  }, []);

  useEffect(() => {
    if (props) dispatch({
      type: 'set_init_state', data: {
        members: props.members ? JSON.parse(props.members) as Member[] : [],
        tames: props.tames ?  JSON.parse(props.tames) as Tame[] : [],
        items: props.items ?  JSON.parse(props.items) as Item[] : [],
        colors: props.colors ?  JSON.parse(props.colors) as TameColor[] : [],
        species: props.species ?  JSON.parse(props.species) as Species[] : [],
      }
    });
  }, [props, dispatch]);

  const selectTab = useMemo(() => {
    switch (router.asPath) {
      case '/ark/members':
        return (
          <ArkTableContainer>
            {state.data.members.map((member: Member) => <ArkMemberTableItem key={`${v4()}-${member._id}`} member={member} />)}
          </ArkTableContainer>
        );
      case '/ark/items':
        return (
          <ArkTableContainer>
            {state.data.items.map((item: Item) => <ArkItemTableItem key={`${v4()}-${item._id}`} item={item} />)}
          </ArkTableContainer>
        );
      case '/ark/tames':
        return (
          <ArkTableContainer>
            {state.data.tames.map((tame: Tame) => <ArkTameTableItem key={`${v4()}-${tame._id}`} tame={tame} />)}
          </ArkTableContainer>
        );
      case '/ark/tames/new':
        return (<NewTameForm state={state} />);
      case '/ark/species':
        return (
          <ArkTableContainer>
            {state.data.species.map((species: Species) => <ArkSpeciesTableItem key={`${v4()}-${species._id}`} species={species} />)}
          </ArkTableContainer>
        );
      case '/ark/colors':
        return (<div>colors</div>);
      default:
        return (<div>Welcome to my Ark DataBase page</div>)
    }
  }, [router, state]);

  if (!state.data) {
    return (<div className="text-white">Loading...</div>)
  }

  return (
    <div className="ArkPage relative z-0">

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