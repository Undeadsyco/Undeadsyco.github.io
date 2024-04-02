import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import { capitalize } from '../../utils/utilities';

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
      <h3 className="arkHeaderCollectionsDropdownTitle">
        <span>{title}</span>
        <span><BsArrowDownCircle /></span>
      </h3>
      <ul className="arkHeaderCollectionsDropdownList">
        <li className={`${selectedOption === '' ? 'text-yellow-500' : null} arkHeaderCollectionsDropdownItem`}>
          <button onClick={() => dropAction('')} className="arkHeaderCollectionsDropdownBtn">Main</button>
        </li>
        {dropOptions?.map((key) => (
          <li key={key} className={`${selectedOption === key ? 'text-yellow-500' : null} arkHeaderCollectionsDropdownItem`}>
            <button onClick={() => dropAction(key)} className="arkHeaderCollectionsDropdownBtn">{capitalize(key)}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}