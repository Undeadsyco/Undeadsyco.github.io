import type { dataItem } from '../../../utils/database/collections/ark/types';

import { useEffect, useState } from 'react';
import { v4 } from 'uuid';


import { BiRightArrowCircle, BiSolidRightArrowCircle } from 'react-icons/bi';

type statGroup = 'current' | 'affinity';
type stat = 'health' | 'stamina' | 'oxygen' | 'food' | 'water' | 'weight' | 'melee';

type props = {
  item: dataItem;
}

export default function ArkItemTableItem({ item }: props) {

  useEffect(() => {
    console.log(item)
  }, [item]);

  return (
    <div className='arkDefaultContainer'>
      
    </div>
  )
} 