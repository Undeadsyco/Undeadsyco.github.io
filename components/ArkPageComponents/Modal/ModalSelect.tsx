import { ChangeEventHandler, FocusEventHandler } from "react";

type props = {
  handleChange: ChangeEventHandler;
  handleBlur: FocusEventHandler;
  isFor: string;
  placeHolder: string;
  list: string[];
  value: string|number;
  containerStyles?: string;
}

const ModalSelect = ({ placeHolder, list, isFor, handleChange, handleBlur, value, containerStyles }: props) => (
  <div className={`w-full h-full border-2 border-black rounded-full ${containerStyles}`}>
    <label htmlFor={isFor} className="w-full h-full flex flex-wrap">
      <h3 className="text-black w-full text-center">{placeHolder}</h3>
      <select name={isFor} id={isFor} onChange={(e) => {
        console.log(e.target.value);
        handleChange(e);
      }} onFocus={handleBlur} value={value} className="w-full text-center rounded-b-full">
        <option value="">{placeHolder}</option>
        {list.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  </div>
);

export default ModalSelect;