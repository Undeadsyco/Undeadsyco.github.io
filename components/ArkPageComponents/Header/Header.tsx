import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import DropDown from '../../globalComponents/DropDown';

type arkHeaderProps = {
  active: string;
  setActive: Function;
  collectionKeys: string[];
  filterKeys: string[];
  handleClick: Function;
  handleHover?: Function;
  changeFilter: Function;
}
const ArkHeader = ({ active, setActive, collectionKeys, filterKeys, handleClick, changeFilter }: arkHeaderProps) => (
  <header className="ark-header-container">
    <h1 className="ark-header-title">Ark Collection Database</h1>
    <DropDown keyList={collectionKeys} title='Collections' activeTab={active} handleClick={setActive} />
    <div className="ark-header-filter">
      <select onChange={(e) => changeFilter(e.target.value)} value={filterKeys[0]}>
        <option value="">Filter</option>
        {filterKeys?.map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
    </div>
    <div className="ark-header-btn">
      <button onClick={() => handleClick()} >Add New</button>
    </div>
  </header>
);

export default ArkHeader;