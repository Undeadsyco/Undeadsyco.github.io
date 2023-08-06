import type { HTMLInputTypeAttribute, ChangeEventHandler, FocusEventHandler, ReactElement } from 'react';
import { capitalize } from '../../utils/utilities';

type inputType = (string | number);
type props = {
  inputConfig: {
    type: HTMLInputTypeAttribute;
    label?: string;
    name?: string;
    id: string;
    value: inputType,
    onChange?: ChangeEventHandler;
    onBlur?: FocusEventHandler;
    status?: {
      touched?: boolean;
      errors?: string;
      readOnly?: boolean;
      minimize?: boolean;
    }
  }
  className?: string;
  Icon?: ReactElement
}

const FormInput = ({ inputConfig: { type = 'text', id, name, value = '', onChange, onBlur, label, status, }, className, Icon }: props) => (
  <div className={className ? className : (status?.errors && status.touched) ? 'defaultFormInputWithError' : status?.minimize ? 'miniDefaultFormInput' : 'defaultFormInput'}>
    <label htmlFor={name ?? id}>
      <span className={status?.minimize ? 'hidden' : 'flex'}>{capitalize(label) ?? capitalize(name) ?? capitalize(id)}</span>
      {Icon && <span className='flex'>{Icon}</span>}
    </label>
    <input
      type={type}
      name={name ?? id}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      readOnly={status?.readOnly}
    />
    {(status?.touched && status?.errors && !status?.readOnly) ? (<p className='formInputErrorMessageDefault'>{status?.errors}</p>) : null}
  </div>
);

export default FormInput;