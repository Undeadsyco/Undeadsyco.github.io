import type { Tame } from "../../../utils/database/collections/ark/TamesModel";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';

import { GiHealthNormal, GiMailedFist, GiWeight } from 'react-icons/gi';
import {
  BsLightningFill,
  BsArrowDownCircle,
  BsArrowDownCircleFill,
  BsArrowUpCircle,
  BsArrowUpCircleFill,
  BsGenderFemale,
  BsGenderMale
} from 'react-icons/bs';

type parents = {
  mother: string;
  father: string;
}

const deceasedComp = (<p className="Deceased">Deceased</p>);
const Timer = (<p className="TameAgeTimer">2D 11H 3M</p>);
const LvlContent = ({ title, content }: { title: string, content: number }) => (
  <p className="LevelContent"><span>{title}:</span> {content}</p>
)

const ArkTameItem = ({ tame }: { tame: Tame }) => {
  const [modal, setModal] = useState(false);
  const [iconStyle, setIconStyle] = useState<'light' | 'dark'>('light')
  const [icon, setIcon] = useState(<BsArrowDownCircle />);
  const [modalTab, setModalTab] = useState<'Starting' | 'Affinity' | 'Current'>('Starting');
  const [health, setHealth] = useState<number>(tame.stats.starting.health);
  const [stamina, setStamina] = useState<number>(tame.stats.starting.stamina);
  const [damage, setDamage] = useState<number>(tame.stats.starting.melee);
  const [weight, setWeight] = useState<number>(tame.stats.starting.weight);

  useEffect(() => {
    if (modal) {
      if (iconStyle === 'light') setIcon(<BsArrowUpCircle />)
      else setIcon(<BsArrowUpCircleFill />)
    } else {
      if (iconStyle === 'light') setIcon(<BsArrowDownCircle />)
      else setIcon(<BsArrowDownCircleFill />)
    }
  }, [modal, iconStyle]);

  useEffect(() => {
    if (modalTab === 'Affinity') {
      setHealth(tame.stats.affinity.health);
      setStamina(tame.stats.affinity.stamina);
      setDamage(tame.stats.affinity.melee);
      setWeight(tame.stats.affinity.weight);
    } else if (modalTab === 'Current') {
      setHealth(tame.stats.current.health);
      setStamina(tame.stats.current.stamina);
      setDamage(tame.stats.current.melee);
      setWeight(tame.stats.current.weight);
    } else {
      setHealth(tame.stats.starting.health);
      setStamina(tame.stats.starting.stamina);
      setDamage(tame.stats.starting.melee);
      setWeight(tame.stats.starting.weight);
    }
  }, [modalTab, tame])

  const HeaderTab = ({ title }: { title: 'Starting' | 'Affinity' | 'Current' }) => (
    <p
      className={`TameStatsModalHeaderTab ${modalTab === title ? 'TameStatsModalHeaderTabActive' : null}`}
      onClick={() => setModalTab(title)}
    >
      {title}
    </p>
  )
  return (
    <div className="arkDefaultContainer tameItem">
      <div className="tameImg"> {/* <Image  /> */} </div>
      <Link href={{
        pathname: `/ark/${tame._id}`,
        query: JSON.stringify(tame)
      }} className="tameNameContainer">
        <span className={`TameName ${tame.deseased ? 'DeceasedNameDecor' : null}`}>{tame.name}</span>
        <span>{tame.deseased && deceasedComp}</span>
      </Link>
      <div className="TameSexContainer">
        <span>Sex:</span>
        <span>{tame.sex === 'M' ? <BsGenderMale /> : <BsGenderFemale />}</span>
      </div>
      <div className="AgeContainer">
        <p className="AgeContent">
          <span>Age:</span>
          <span>{tame.age}</span>
        </p>
        {tame.age !== 'Adult' ? Timer : null}
      </div>
      <div className="LvlContainer">
        <h3 className="LevelTitle">levels</h3>
        {tame.tamed ? (<LvlContent title="Wild" content={tame.lvl.wild!} />) : null}
        <LvlContent title={tame.tamed ? "tamed" : 'born'} content={tame.lvl.tamed} />
        <LvlContent title="Max" content={tame.lvl.max} />
      </div>
      <div className="StatsContainer">
        <div
          className="StatsTitleContainer"
          onMouseOver={() => setIconStyle('dark')}
          onMouseOut={() => setIconStyle('light')}
          onClick={() => {
            setModal(!modal);
            setIconStyle('dark');
          }}
        >
          <h3>Tame Stats</h3>
          <span>{icon}</span>
        </div>
        <div className={modal ? 'arkDefaultContainer TameStatsModal z-10' : 'hidden'}>
          <div className='TameStatsModalHeader'>
            <HeaderTab title='Starting' />
            <HeaderTab title='Current' />
            <HeaderTab title='Affinity' />
          </div>
          <div className='p-1 flex flex-col justify-between items-center h-[80%]'>
            <div className='w-[85%] flex justify-between items-center'>
              <span>Health</span>
              <span><GiHealthNormal /></span>
              <span>{modalTab === 'Affinity' ? '+' : null}{health}{modalTab === 'Affinity' ? '/lvl' : null}</span>
            </div>
            <div className='w-[85%] flex justify-between items-center'>
              <span>Stamina</span>
              <span><BsLightningFill /></span>
              <span>{modalTab === 'Affinity' ? '+' : null}{stamina}{modalTab === 'Affinity' ? '/lvl' : null}</span>
            </div>
            <div className='w-[85%] flex justify-between items-center'>
              <span>Damage</span>
              <span><GiMailedFist /></span>
              <span>{modalTab === 'Affinity' ? '+' : null}{damage}{modalTab === 'Affinity' ? '/lvl' : null}</span>
            </div>
            <div className='w-[85%] flex justify-between items-center'>
              <span>Weight</span>
              <span><GiWeight /></span>
              <span>{modalTab === 'Affinity' ? '+' : null}{weight}{modalTab === 'Affinity' ? '/lvl' : null}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArkTameItem;