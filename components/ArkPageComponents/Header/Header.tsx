import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import DropDown from '../../globalComponents/DropDown';

type arkHeaderProps = {
  currentView: string;
  switchView: Function;
  viewOptions: string[];
  filterOptions: string[];
  btnAction: Function;
  changeFilter: Function;
}
const ArkHeader = ({ currentView, switchView, viewOptions, filterOptions, btnAction, changeFilter }: arkHeaderProps) => (
  <header className="arkHeaderContainer">
    <h1 className="arkHeaderTitle">Ark Collection Database</h1>
    <DropDown className="arkDefaultContainer arkHeaderCollectionsDropdown" dropOptions={viewOptions} title='Collections' selectedOption={currentView} dropAction={switchView} />
    <div className={filterOptions ? 'arkDefaultContainer  arkHeaderFilter' : 'hidden' }>
      <select onChange={(e) => changeFilter(e.target.value)} value={currentView} className='bg-transparent'>
        <option value="">Filter</option>
        {filterOptions?.map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
    </div>
    <div className="arkDefaultContainer  arkHeaderBtn">
      <button onClick={() => btnAction()}>Add New</button>
    </div>
  </header>
);

export default ArkHeader;