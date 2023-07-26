import type { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType } from "next";

import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { v4 } from 'uuid';
import axios from "axios";

import { Header, ArkTameItem, ArkModal } from "../../components/ArkPageComponents";
import { getData } from "../../utils";

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> => {
  const db = process.env.DATABASE;

  if (!db) throw new Error('Database missing! Please provide missing info to establish connection');

  const { tames, members, items, colors, species } = JSON.parse(await getData(db as string) as string);

  return ({
    props: {
      members: members ?? null,
      tames: tames ?? null,
      items: items ?? null,
      colors: colors ?? null,
      species: species ?? null,
    }
  });
}

export default function Ark(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const [keys] = useState(Object.keys(props));
  const [activeTab, setActiveTab] = useState(keys[0]);

  const { tames } = props;

  const selectTab = useMemo(() => {
    switch (activeTab) {
      case 'members':
        return (<div>Members</div>);
      case 'tames':
        return (tames?.map((tame: any) => <ArkTameItem key={`${v4()}-${tame._id}`} tame={tame} />));
      case 'items':
        return (<div>Items</div>);
      default:
        return ((tames?.map((tame: any) => <ArkTameItem key={`${v4()}-${tame._id}`} tame={tame} />)));
    }
  }, [activeTab, tames]);

  const checkConnection = async () => {
    console.log('click');
    const req = await axios.get('http://localhost:3000/api/ark/tames/new');
    const res = await req.data;
    console.log('status', res.status);
    if (res.status === 'success') router.push('/ark/new'); 
  }

  if (router.isFallback) {
    return (<div className="text-white">Loading...</div>)
  }

  return (
    <div className="ArkPage">

      <ArkModal visible={false} />

      <Header active={activeTab} setActive={setActiveTab} keys={keys} handleClick={checkConnection} />

      <div className="ArkContentContainer">
        {selectTab}
      </div>
    </div>
  )
}