import type { Item } from '../../../utils/database/collections/ark/ItemsModel';

import { useEffect, useState } from 'react';
import { v4 } from 'uuid';


import { BiRightArrowCircle, BiSolidRightArrowCircle } from 'react-icons/bi';
import { capitalize } from '../../../utils/utilities';

type props = {
  item: Item;
}

export default function ArkItemTableItem({ item }: props) {

  useEffect(() => {
    console.log(item)
  }, [item]);

  return (
    <div className='arkDefaultContainer arkItemTableItemContainer'>
      <h3>Item: {capitalize(item.name)}</h3>
      <h5>Level: {capitalize(item.level)}</h5>
      <p>Item Type: {capitalize(item.type)}</p>
      <p>Durability: {item.durability}</p>
      <p>Damage: {item.damage}</p>
    </div>
  )
} 