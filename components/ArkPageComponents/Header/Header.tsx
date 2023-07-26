import { BsArrowDownCircle, BsArrowDownCircleFill } from 'react-icons/bs';

type arkHeaderProps = {
  active: string;
  setActive: Function;
}
const ArkHeader = ({ active, setActive }: arkHeaderProps) => (
  <header className="ark-header-container">
    <h1 className="ark-header-title">Ark Collection Database</h1>
    <div className="ark-header-collections-dropdown">
      <h3 className="ark-header-collections-dropdown-title">Collections</h3>
      <ul className="ark-header-collections-dropdown-list">
        <li className={`${active === 'members' ? 'text-yellow-500' : null} ark-header-collections-dropdown-item`}>
          <button onClick={() => setActive('members')} className="ark-header-collections-dropdown-btn">Members</button>
        </li>
        <li className={`${active === 'tames' ? 'text-yellow-500' : null} ark-header-collections-dropdown-item`}>
          <button onClick={() => setActive('tames')} className="ark-header-collections-dropdown-btn">Tames</button>
        </li>
        <li className={`${active === 'items' ? 'text-yellow-500' : null} ark-header-collections-dropdown-item`}>
          <button onClick={() => setActive('items')} className="ark-header-collections-dropdown-btn">Items</button>
        </li>
      </ul>
    </div>
    <div>
      <span>Filter</span>
      <span></span>
    </div>
    <div className="ark-header-btn">
      <button>Add New</button>
    </div>
  </header>
);

export default ArkHeader;