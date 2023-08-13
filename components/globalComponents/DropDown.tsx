import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';

type props = {
  className: string;
  title: string;
  selectedOption: string;
  dropOptions: string[];
  dropAction: Function;
}

export default function DropDown({ className, title, dropOptions, dropAction, selectedOption }: props) {
  return (
    <div className={className}>
    <h3 className="arkHeaderCollectionsDropdown-title">
      <span>{title}</span>
      <span><BsArrowDownCircle /></span>
    </h3>
    <ul className="arkHeaderCollectionsDropdown-list">
      {dropOptions?.map((key) => (
        <li key={key} className={`${selectedOption === key ? 'text-yellow-500' : null} arkHeaderCollectionsDropdownItem`}>
          <button onClick={() => dropAction(key)} className="arkHeaderCollectionsDropdown-btn">{key}</button>
        </li>
      ))}
    </ul>
  </div>
  )
}