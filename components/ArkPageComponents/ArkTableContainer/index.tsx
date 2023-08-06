import { ReactHTMLElement, useEffect } from 'react';

type props = {
  children: ReactHTMLElement<any> | ReactHTMLElement<any>[];
  dataList: any[];
  filtered: boolean;
  filter: string;
  table: boolean;
}

export default function ArkTableContainer({ children, dataList, filtered, filter,  }: props) {
  const map = new Map();

  useEffect(() => {}, [])

  const sortList = () => {
    dataList.forEach((item: any) => {
      const mapKeys = Array.from(map.keys());
      let key
      switch (filter) {
        case 'age': key = item.age;
        case 'sex': key = item.sex;
        case 'owner': key = item.owner
        case 'wild': key = item.wild
        case 'deseased': key = item.deseased
        case 'nutered': key = item.nutered
        case 'species': key = item.species
        default: {}
      }

      if (mapKeys.includes(key)) map.set(key, [...map.get(key), item]);
      else map.set(key, [item]);
    });
  }

  return (
    <div>{children}</div>
  );
}