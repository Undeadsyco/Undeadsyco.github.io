import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';

type props = {
  title: string;
  keyList: string[];
  activeTab: string;
  handleClick: Function;
}

export default function DropDown({ title, keyList, handleClick, activeTab }: props) {
  return (
    <div className="ark-header-collections-dropdown">
    <h3 className="ark-header-collections-dropdown-title">
      <span>{title}</span>
      <span><BsArrowDownCircle /></span>
    </h3>
    <ul className="ark-header-collections-dropdown-list">
      {keyList?.map((key) => (
        <li key={key} className={`${activeTab === key ? 'text-yellow-500' : null} ark-header-collections-dropdown-item`}>
          <button onClick={() => handleClick(key)} className="ark-header-collections-dropdown-btn">{key}</button>
        </li>
      ))}
    </ul>
  </div>
  )
}