import { ChangeEventHandler, FocusEventHandler } from "react";
import { FormInput } from "../../../globalComponents";

type props = {
  handleChange: ChangeEventHandler;
  handleBlur: FocusEventHandler;
  error?: string;
  touched?: boolean;
}

const SexLayout = ({ handleChange, handleBlur, error, touched }: props) => (
  <label role="group" htmlFor="sex" className="newArkTameFormContainerDefault newArkTameSexFormContainerDefault">
    <p className="col-span-2 text-center">Sex</p>
    <FormInput className="newArkTameSexFormInput" inputConfig={{
      id: 'F',
      name: 'sex',
      label: 'Female',
      type: 'radio',
      value: 'F',
      onChange: handleChange,
      onBlur: handleBlur,
      status: {
        errors: error,
        touched: touched,
        readOnly: false,
      }
    }} />
    <FormInput className="newArkTameSexFormInput" inputConfig={{
      id: 'M',
      name: 'sex',
      label: 'Male',
      type: 'radio',
      value: 'M',
      onChange: handleChange,
      onBlur: handleBlur,
      status: {
        errors: error,
        touched: touched,
        readOnly: false,
      }
    }} />
  </label>
);

export default SexLayout;