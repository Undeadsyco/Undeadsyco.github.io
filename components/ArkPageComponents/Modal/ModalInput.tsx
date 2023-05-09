import { ChangeEventHandler, FocusEventHandler } from 'react';


type props = {
  name: string;
  title?: string;
  type: ('text' | 'number');
  value: (string | number);
  placeHolder?: string;
  handleChange?: ChangeEventHandler;
  handleBlur?: FocusEventHandler;
  readonly?: boolean;
  inputStyles?: string;
  containerStyles?: string;
}

const Input = ({
  name, title, type, value, placeHolder, handleChange, handleBlur, readonly, inputStyles, containerStyles,
}: props) => (
  <div className={`border-2 border-black rounded-full ${containerStyles}`}>
    <label htmlFor={name} className='w-full h-full flex flex-wrap justify-center'>
      <p className='text-black text-center'>{title ?? name}</p>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeHolder ?? name}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`text-white rounded-b-full text-center w-full ${inputStyles}`}
        readOnly={readonly}
      />
    </label>
  </div>
);

export default Input;