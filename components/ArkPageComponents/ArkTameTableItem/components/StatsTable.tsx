import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { GiHealthNormal, GiMailedFist, GiWeight } from 'react-icons/gi';
import {
  BsLightningFill,
  BsArrowDownCircle,
  BsArrowDownCircleFill,
  BsArrowUpCircle,
  BsArrowUpCircleFill,
} from 'react-icons/bs';
import { tameStats } from '../../../../utils/database/collections/ark/types';

type stats = {
  health: number;
  stamina: number;
  weight: number;
  damage: number;
}

const StatsTable = ({ stats, affinity }: { stats: tameStats, affinity: stats }) => {
  const [modal, setModal] = useState(false);
  const [iconStyle, setIconStyle] = useState<'light' | 'dark'>('light')
  const [icon, setIcon] = useState(<BsArrowDownCircle />);
  const [modalTab, setModalTab] = useState<'Starting' | 'Affinity' | 'Current'>('Starting');
  const [health, setHealth] = useState<number>(stats.starting.health);
  const [stamina, setStamina] = useState<number>(stats.starting.stamina);
  const [damage, setDamage] = useState<number>(stats.starting.melee);
  const [weight, setWeight] = useState<number>(stats.starting.weight);

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
      setHealth(stats.affinity.health);
      setStamina(stats.affinity.stamina);
      setDamage(stats.affinity.melee);
      setWeight(stats.affinity.weight);
    } else if (modalTab === 'Current') { 
      setHealth(stats.current.health);
      setStamina(stats.current.stamina);
      setDamage(stats.current.melee);
      setWeight(stats.current.weight);
    }
    else {
      setHealth(stats.starting.health);
      setStamina(stats.starting.stamina);
      setDamage(stats.starting.melee);
      setWeight(stats.starting.weight);
    }

  }, [modalTab, stats, affinity])

  const HeaderTab = ({ title }: { title: 'Starting' | 'Affinity' | 'Current' }) => (
    <p
      className={`TameStatsModalHeaderTab ${modalTab === title ? 'TameStatsModalHeaderTabActive' : null}`}
      onClick={() => setModalTab(title)}
    >
      {title}
    </p>
  )

  return (
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
      <div className={modal ? 'arkDefaultContainer TameStatsModal' : 'hidden'}>
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
  );
}

export default StatsTable;