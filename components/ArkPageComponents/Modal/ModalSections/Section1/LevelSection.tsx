import type { lvls } from "../../../../../types";

import { ChangeEventHandler, FocusEventHandler } from "react";

import Input from "../../ModalInput";

type props = {
  tameType: string;
  lvls: lvls
  handleChange: ChangeEventHandler;
  handleBlur: FocusEventHandler;
}

const LevelSelect = ({ tameType, lvls: { wild, tamed, current }, handleChange, handleBlur }: props) => (
  <section  className='flex col-span-6'>
    {tameType === 'wild' ? (
        <Input
          name="lvls.wild"
          title="Wild"
          type="number"
          value={wild}
          placeHolder="0"
          readonly
          containerStyles='w-1/3'
        />
      ) : null}
      <Input
        name="lvls.tamed"
        title="Tamed"
        type="number"
        value={tamed}
        placeHolder="0"
        handleChange={handleChange}
        handleBlur={handleBlur}
        containerStyles={tameType === 'wild' ? 'w-1/3' : 'w-1/2'}
      />
      <Input
        name="lvls.current"
        title="Current"
        type="number"
        value={current}
        placeHolder="0"
        handleChange={handleChange}
        handleBlur={handleBlur}
        containerStyles={tameType === 'wild' ? 'w-1/3' : 'w-1/2'}
      />
      <Input
        name="lvls.max"
        title="Max"
        type="number"
        value={tamed > 0 ? (tamed + 88) : 0}
        placeHolder="0"
        handleChange={handleChange}
        handleBlur={handleBlur}
        containerStyles={tameType === 'wild' ? 'w-1/3' : 'w-1/2'}
      />
  </section>
);

export default LevelSelect;
