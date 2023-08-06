import { useState } from 'react'; 
import { BsArrowRightCircle, BsArrowRightCircleFill } from 'react-icons/bs';
type props = {
  status: 'wild'|'breed';
}

const HeratigeContainer = ({ status }: props) => {
  const [icon, setIcon] = useState(<BsArrowRightCircle />)
  const switchIcon = (type: 'light'|'dark') => {
    if (type==='light')setIcon(<BsArrowRightCircle />)
    if (type==='dark')setIcon(<BsArrowRightCircleFill />)
  }

  const content = (<p className='flex justify-around items-center'>View Heratige {icon}</p>)
  
  return (
    <div className="HeratigeContainer" onMouseOver={() => switchIcon('dark')} onMouseOut={() => switchIcon('light')}>
      {status === 'breed' ?  content : <p>No Heratige</p>}
    </div>
  );
}

export default HeratigeContainer;