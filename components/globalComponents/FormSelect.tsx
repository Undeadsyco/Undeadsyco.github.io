import type { ChangeEventHandler, FocusEventHandler } from 'react';
import { capitalize } from '../../utils';

type inputType = (string | readonly string[]);
type props<valType extends inputType> = {
  inputConfig: {
    label?: string;
    name?: string;
    id: string;
    value: valType,
    options: any[];
    defaultVal: string;
    onChange?: ChangeEventHandler;
    onBlur?: FocusEventHandler;
    status?: {
      touched?: boolean;
      errors?: string | string[];
      readOnly?: boolean;
      multiple?: boolean;
    }
  }
  className?: string;
}

const FormSelect = <valType extends inputType>({ inputConfig: { id, name, value, options, defaultVal, onChange, onBlur, label, status, }, className }: props<valType>) => (
  <div className={`grid grid-rows-2 ${className}`}>
    <label className='text-center' htmlFor={name ?? id}>{capitalize(label) ?? capitalize(name) ?? capitalize(id)}</label>
    <select name={name ?? id} id={id} value={status?.multiple ? value as readonly string[] : value as string} onChange={onChange} onBlur={onBlur} multiple={status?.multiple} className='rounded-2xl text-center w-5/6 justify-self-center'>
      <option value="">{defaultVal ?? 'select'}</option>
      {options?.map((opt: any) => (
        <option key={opt.name} value={opt._id}>{opt.name}</option>
      ))}
    </select>
    {(status?.touched && status?.errors && !status?.readOnly) ? (<p>{(status?.multiple ? (status?.errors) as string[] : (status?.errors) as string)}</p>) : null}
  </div>
)

export default FormSelect;