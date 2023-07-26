import type { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType } from "next";

import { Router, useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { v4 } from 'uuid';

import { Header, ArkTameItem, ArkModal } from "../../components/ArkPageComponents";
import { getData } from "../../utils";

type tabs = ('tames' | 'members' | 'items');

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> => {
  const db = process.env.DATABASE;

  if (!db) throw new Error('Database missing! Please provide missing info to establish connection');

  const { tames } = JSON.parse(await getData(db as string) as string);

  return ({
    props: {
      // members: members || null,
      tames: tames ?? null,
      // items: items || null,
    }
  });
}

export default function Ark({ tames }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {}

  const [activeTab, setActiveTab] = useState<tabs>('tames');

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

  return (
    <div className="ArkPage">

      <ArkModal visible={false} />

      <Header active={activeTab} setActive={setActiveTab} />

      <div className="ArkContentContainer">
        {selectTab}
      </div>
    </div>
  )
}