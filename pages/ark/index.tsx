import type { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";

import { useEffect, useMemo, useState } from "react";
import { v4 } from 'uuid';

import { Header, ArkTameItem, ArkModal } from "../../components/ArkPageComponents";
import { getData } from "../../utils";

type pageProps = {

}

type tabs = ('tames' | 'members' | 'items');

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> => {
  const db = process.env.DATABASE;
  const memberCollection = process.env.MEMBERS_COLLECTION;
  const tamesCollection = process.env.TAMES_COLLECTION;
  const itemsCollection = process.env.ITEMS_COLLECTION;

  if (!db) throw new Error('Database missing! Please provide missing info to establish connection');

  // const members = await getData(db as string, memberCollection as string);
  const tames = await getData(db as string, tamesCollection as string);
  // const items = await getData(db as string, itemsCollection as string);
  // console.log('tames list', tames)

  return ({
    props: {
      // members: members || null,
      tames: tames || null,
      // items: items || null,
    }
  });
}

export default function Ark({ tames }: { tames: Array<any> }) {
  const [activeTab, setActiveTab] = useState<tabs>('tames');

  useEffect(() => {
    console.log('tames', tames);
  }, [tames]);

  const selectTab = useMemo(() => {
    switch (activeTab) {
      case 'members':
        return (<div>Members</div>);
      case 'tames':
        return (tames?.map((tame) => <ArkTameItem key={`${v4()}-${tame._id}`} tame={tame} />));
      case 'items':
        return (<div>Items</div>);
      default:
        return ((tames?.map((tame) => <ArkTameItem key={`${v4()}-${tame._id}`} tame={tame} />)));
    }
  }, [activeTab, tames]);

  return (
    <div className="bg-black p-2 w-[95%] mx-auto">

      <ArkModal visible={true} />

      <Header active={activeTab} setActive={setActiveTab} />

      <div className="h-4/5  grid grid-cols-3 gap-2 W-[90%]">
        {selectTab}
      </div>
    </div>
  )
}