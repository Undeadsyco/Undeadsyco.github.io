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

type stats = {
  health: number;
  stamina: number;
  weight: number;
  damage: number;
}

const StatsTable = ({ stats, affinity }: { stats: stats, affinity: stats }) => {
  const [modal, setModal] = useState(false);
  const [iconStyle, setIconStyle] = useState<'light' | 'dark'>('light')
  const [icon, setIcon] = useState(<BsArrowDownCircle />);
  const [modalTab, setModalTab] = useState<'Tamed' | 'Affinity' | 'Current'>('Tamed');
  const [health, setHealth] = useState<number>(stats.health);
  const [stamina, setStamina] = useState<number>(stats.health);
  const [damage, setDamage] = useState<number>(stats.health);
  const [weight, setWeight] = useState<number>(stats.health);

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
      setHealth(affinity.health);
      setStamina(affinity.stamina);
      setDamage(affinity.damage);
      setWeight(affinity.weight);
    } else if (modalTab === 'Current') { }
    else {
      setHealth(stats.health);
      setStamina(stats.stamina);
      setDamage(stats.damage);
      setWeight(stats.weight);
    }

  }, [modalTab, stats, affinity])

  const HeaderTab = ({ title }: { title: 'Tamed' | 'Affinity' | 'Current' }) => (
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
      <div className={modal ? 'TameStatsModal' : 'hidden'}>
        <div className='TameStatsModalHeader'>
          <HeaderTab title='Tamed' />
          <HeaderTab title='Affinity' />
          <HeaderTab title='Current' />
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