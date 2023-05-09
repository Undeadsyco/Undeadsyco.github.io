import { ChangeEventHandler, FocusEventHandler } from "react";
import ModalSelect from "../../ModalSelect"

type props = {
  tameType: string;
  platform: string;
  sex: string;
  handleChange: ChangeEventHandler;
  handleBlur: FocusEventHandler;
}

const SelectSection = ({ tameType, platform, sex, handleChange, handleBlur }: props) => (
  <>
    <ModalSelect
      isFor='tameType'
      placeHolder='Tamed?'
      list={['wild', 'born']}
      handleChange={handleChange}
      handleBlur={handleBlur}
      value={tameType}
      containerStyles='col-span-2'
    />
    <ModalSelect
      isFor='platform'
      placeHolder='Platform'
      list={['Xbox', 'Switch']}
      handleChange={handleChange}
      handleBlur={handleBlur}
      value={platform}
      containerStyles='col-span-2'
    />
    <ModalSelect
      isFor='sex'
      placeHolder='Sex'
      list={['M', 'F']}
      handleChange={handleChange}
      handleBlur={handleBlur}
      value={sex}
      containerStyles='col-span-2'
    />
  </>
);

export default SelectSection;