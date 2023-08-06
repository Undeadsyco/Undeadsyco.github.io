import { ChangeEventHandler, FocusEventHandler } from "react";
import type { tameLevels } from "../../../../utils/database/collections/ark/types"

import { FormInput } from "../../../globalComponents"
import StatsLayout from "./StatsLayout";

type props = {
  lvls: tameLevels;
  handleChange: ChangeEventHandler;
  handleBlur: FocusEventHandler;
  touched?: any;
  errors?: any;
}

const LvlsLayout = ({ lvls, errors, touched, handleChange, handleBlur }: props) => (
  <label role="group" htmlFor="lvl" className="newArkTameFormContainerDefault newArkTameLevelsFormContainer">
    <p className="text-center w-full">Tame Levels</p>
    <FormInput inputConfig={{
      id: 'lvl.wild',
      label: 'wild',
      type: 'number',
      value: lvls.wild!,
      onChange: handleChange,
      onBlur: handleBlur,
      status: {
        errors: errors?.lvl?.wild,
        touched: touched?.lvl?.wild,
        readOnly: false,
      }
    }} />
    <FormInput inputConfig={{
      id: 'lvl.tamed',
      label: 'tamed',
      type: 'number',
      value: lvls.tamed!,
      onChange: handleChange,
      onBlur: handleBlur,
      status: {
        errors: errors?.lvl?.tamed,
        touched: touched?.lvl?.tamed,
        readOnly: false,
      }
    }} />
    <FormInput inputConfig={{
      id: 'lvl.max',
      label: 'max',
      type: 'number',
      value: lvls.max!,
      onChange: handleChange,
      onBlur: handleBlur,
      status: {
        errors: errors?.lvl?.max,
        touched: touched?.lvl?.max,
        readOnly: false,
      }
    }} />
    <label role="group" htmlFor="lvl.added">
      <StatsLayout
        forGroup="lvl.added"
        stats={lvls.added}
        errors={errors?.lvl?.added}
        touched={touched?.lvl?.added}
        handleChange={handleChange}
        handleBlur={handleBlur}
        minimize={true}
      />
    </label>
  </label>
);

export default LvlsLayout;