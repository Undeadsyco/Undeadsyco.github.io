import type { ChangeEventHandler, FocusEventHandler } from "react";

import { FormSelect } from "../../../globalComponents";

import { reducerState } from "../../../../hooks/ark/useArkReducer";

type props = {
  state: reducerState;
  parents: {
    mother?: string;
    father?: string;
  }
  handleChange: ChangeEventHandler;
  handleBlur: FocusEventHandler;
  errors?: any;
  touched?: any;
}

const ParentsLayout = ({ parents, state, errors, touched, handleChange, handleBlur }: props) => (
  <label role="group" htmlFor="parents" className='arkDefaultContainer newArkTameParentsFormContainer' >
    <p className="text-center">Parents</p>
    <FormSelect<string> className='newArkTameParentsFormInput' inputConfig={{
      id: 'parents.mother',
      label: 'Mother',
      value: parents.mother!,
      options: state.data?.tames?.filter((tame) => tame.sex! === 'F' ? tame.name : null)!,
      defaultVal: 'Select Mother',
      onChange: handleChange,
      onBlur: handleBlur,
      status: {
        errors: errors?.parents?.mother,
        touched: touched?.parents?.mother,
        readOnly: false,
      }
    }} />
    <FormSelect<string> className='newArkTameParentsFormInput' inputConfig={{
      id: 'parents.father',
      label: 'Father',
      value: parents.father!,
      options: state.data?.tames?.filter((tame) => tame.sex! === 'M' ? tame.name : null)!,
      defaultVal: 'Select Father',
      onChange: handleChange,
      onBlur: handleBlur,
      status: {
        errors: errors?.parents?.father,
        touched: touched?.parents?.father,
        readOnly: false,
      }
    }} />
  </label>
);

export default ParentsLayout;