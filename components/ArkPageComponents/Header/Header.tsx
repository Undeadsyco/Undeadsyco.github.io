import Link from 'next/link';
import { BsArrowDownCircle, BsArrowDownCircleFill } from 'react-icons/bs';

type arkHeaderProps = {
  active: string;
  setActive: Function;
  keys: string[];
  handleClick: Function;
}
const ArkHeader = ({ active, setActive, keys, handleClick }: arkHeaderProps) => (
  <header className="ark-header-container">
    <h1 className="ark-header-title">Ark Collection Database</h1>
    <div className="ark-header-collections-dropdown">
      <h3 className="ark-header-collections-dropdown-title">Collections</h3>
      <ul className="ark-header-collections-dropdown-list">
        {keys.map((key) => (
          <li key={key} className={`${active === key ? 'text-yellow-500' : null} ark-header-collections-dropdown-item`}>
            <button onClick={() => setActive(key)} className="ark-header-collections-dropdown-btn">{key}</button>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <span>Filter</span>
      <span></span>
    </div>
    <div className="ark-header-btn">
      <button onClick={() => handleClick()} >Add New</button>
    </div>
  </header>
);

export default ArkHeader;