import { ChangeEventHandler, FocusEventHandler } from "react";

import Input from "../../ModalInput";

type props = {
  title: string;
  type: string;
  values: {
    health: number;
    stamina: number;
    weight: number;
    damage: number;
  };
  handleChange: ChangeEventHandler;
  handleBlur: FocusEventHandler
}

const StatsLayout = ({ title, type, values: { health, stamina, weight, damage }, handleChange, handleBlur }: props) => (
  <div className="grid-start-1 grid-spa">
    <label htmlFor={type} className="grid grid-rows-5">
      <p className='text-black text-center text-xl'>{title}</p>
      <Input
        name={`stats.${type}.health`}
        title="Health"
        type='number'
        value={health}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <Input
        name={`stats.${type}.stamina`}
        title="Stamina"
        type='number'
        value={stamina}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <Input
        name={`stats.${type}.weight`}
        title="Weight"
        type='number'
        value={weight}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <Input
        name={`stats.${type}.damage`}
        title="Damage"
        type='number'
        value={damage}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </label>
  </div>
);

export default StatsLayout