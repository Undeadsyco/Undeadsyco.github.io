import type { Item } from '../../../utils/database/collections/ark/ItemsModel';

import { useEffect, useState } from 'react';
import { v4 } from 'uuid';


import { BiRightArrowCircle, BiSolidRightArrowCircle } from 'react-icons/bi';
import { capitalize } from '../../../utils/utilities';
import { Member } from '../../../utils/database/collections/ark/MembersModel';

type props = {
  item: Item;
}

export default function ArkItemTableItem({ item }: props) {

  return (
    <div className='arkDefaultContainer arkItemTableItemContainer'>
      <h3 className='arkItemName'>Item: {capitalize(item.name)}</h3>
      <h5 className='arkItemLevel'>Level: {capitalize(item.level)}</h5>
      <p className='arkItemOwnerName'>Owner: {capitalize((item.owner as Member).name)}</p>
      <p className='arkItemOwnerWorld'>World Local: {capitalize((item.owner as Member).world)}</p>
      <p className='arkItemItemType'>Item Type: {capitalize(item.type)}</p>
      <p className='arkItemDurability'>Durability: {item.durability}</p>
      <p className='arkItemDamage'>Damage: {item.damage}</p>
    </div>
  )
} 