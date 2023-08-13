import type { ChangeEventHandler, FocusEventHandler } from "react";

import { FormInput } from "../../../globalComponents";

type props = {
  handleChange: ChangeEventHandler;
  handleBlur: FocusEventHandler;
  error?: string;
  touched?: boolean;
}

const AgeLayout = ({ error, touched, handleChange, handleBlur }: props) => (
  <label role="group" htmlFor="age" className={`arkDefaultContainer newArkTameAgeFormContainerDefault ${touched && error ? 'newArkTameAgeFormContainerWithError' : 'newArkTameAgeFormContainerWithoutError'}`}>
    <p className="col-span-full text-center">Age</p>
    {['Baby', 'Juvenile', 'Adolescence', 'Adult'].map((age) => (
      <FormInput className="newArkTameAgeFormInput" key={age} inputConfig={{
        id: age,
        name: 'age',
        label: age,
        type: 'radio',
        value: age,
        onChange: handleChange,
        onBlur: handleBlur,
        status: {
          readOnly: false,
        }
      }} />
    ))}
    {(touched && error) ? (<p>{error}</p>) : null}
  </label>
);

export default AgeLayout;