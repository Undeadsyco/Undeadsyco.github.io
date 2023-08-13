import type { addedLevels, dataMember, memberStats, stats } from '../../../utils/database/collections/ark/types';

import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { GiHealthNormal, GiMailedFist, GiWeight, GiMeat, GiWaterDrop } from 'react-icons/gi';
import { BsLightningFill } from 'react-icons/bs';
import { SiOxygen } from 'react-icons/si';
import { BiRightArrowCircle, BiSolidRightArrowCircle } from 'react-icons/bi';

type statGroup = 'current' | 'affinity';
type stat = 'health' | 'stamina' | 'oxygen' | 'food' | 'water' | 'weight' | 'melee';

type props = {
  member: dataMember;
}

const mapStats = (stats: stats | addedLevels) => Object.keys(stats).map((stat: string) => {
  let Icon;
  switch (stat) {
    case 'health': Icon = <GiHealthNormal />; break;
    case 'stamina': Icon = <BsLightningFill />; break;
    case 'oxygen': Icon = <SiOxygen />; break;
    case 'food': Icon = <GiMeat />; break;
    case 'water': Icon = <GiWaterDrop />; break;
    case 'weight': Icon = <GiWeight />; break;
    case 'melee': Icon = <GiMailedFist />; break;
    default: Icon = 'Total'
  }
  return (
    <p className='flex justify-center items-center text-xs' key={`${v4()}-${stat}`}>{Icon}: {stats[stat as stat]}</p>
  )
});

const mapMemberStats = (stats: memberStats) => Object.keys(stats).map((group: string) => (
  <div key={group}>
    <p className='text-center text-sm'>{group}</p>
    {mapStats(stats[group as statGroup])}
  </div>
));

export default function ArkMemberTableItem({ member }: props) {
  const [icon, setIcon] = useState(<BiRightArrowCircle />)

  useEffect(() => {
    console.log(member)
  }, [member]);

  const handleClick = () => { }

  return (
    <div className='arkDefaultContainer arkMemberTableItemContainer'>
      <div className='flex flex-col justify-evenly'>
        <h3>Name: {member.name}</h3>
        <h5>World: {member.world}</h5>
        <p className='text-sm'>Num. of Tames: {member.tames.length}</p>
        <p className='text-sm'>Num. of Items: {member.items.length}</p>
      </div>
      <div className='grid grid-cols-1 grid-rows-3 text-sm'>
        <p className='text-center text-base'>Levels</p>
        <p className='text-center flex justify-evenly'>Current: {member.lvl.current}</p>
        <p className='text-center flex justify-evenly'>Max:
          {member.lvl.max}</p>
        <div className='grid grid-cols-2'>{mapStats(member.lvl.added)}</div>
      </div>
      <div className='col-start-3 grid grid-cols-2'>
        <p className='col-span-2 text-center'>Stats</p>
        {mapMemberStats(member.stats)}
      </div>
      <div className='col-span-1 col-start-2 row-start-2 text-center flex justify-center'>
        <button
          onMouseEnter={() => setIcon(<BiSolidRightArrowCircle />)}
          onMouseLeave={() => setIcon(<BiRightArrowCircle />)}
          className='border-2 border-black text-sm rounded-full px-2 flex justify-evenly items-center w-full'
          type="button"
        >
          <span>View Details</span>
          <span className='text-base'>{icon}</span>
        </button>
      </div>
    </div>
  )
} 