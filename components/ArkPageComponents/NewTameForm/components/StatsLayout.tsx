import type { ChangeEventHandler, FocusEventHandler, ReactElement, useId } from 'react';
import type { FormikProps } from 'formik';
import type { statsForm } from '../../../../hooks/ark/useTameForm';
import type { addedLevels, dataTame, stats, tameStats } from '../../../../utils/database/collections/ark/types';

import FormInput from '../../../globalComponents/FormInput';

import { GiHealthNormal, GiMailedFist, GiWeight, GiMeat, GiWaterDrop } from 'react-icons/gi';
import { BsLightningFill } from 'react-icons/bs';
import { SiOxygen } from 'react-icons/si';
import { capitalize } from '../../../../utils/utilities';

type props = {
  forGroup: string;
  label?: string;
  stats: stats | addedLevels;
  errors?: any;
  touched?: any;
  minimize?: boolean;
  handleChange: ChangeEventHandler;
  handleBlur: FocusEventHandler;
  className?: string;
}

const StatsLayout = ({ forGroup, label, stats, errors, touched, minimize = false, handleChange, handleBlur, className }: props) => (
  <label role='group' htmlFor={forGroup} className={`grid grid-cols-4 grid-rows-3 ${className}`}>
    <p className='col-span-full text-center'>{label ? capitalize(label) : forGroup.split('.').reverse().map((word) => (<span key={word}>{capitalize(word)} </span> ))}</p>
    {Object.keys((stats)).map((stat) => {
      let value = 0, isTouched, error, Icon;
      switch (stat) {
        case 'health':
          value = stats!.health;
          isTouched = touched?.stats?.health;
          error = errors?.stats?.health;
          Icon = <GiHealthNormal />;
          break;
        case 'stamina':
          value = stats!.stamina;
          isTouched = touched?.stats?.stamina;
          error = errors?.stats?.stamina;
          Icon = <BsLightningFill />;
          break;
        case 'oxygen':
          value = stats!.oxygen;
          isTouched = touched?.stats?.oxygen;
          error = errors?.stats?.oxygen;
          Icon = <SiOxygen />;
          break;
        case 'food':
          value = stats!.food;
          isTouched = touched?.stats?.food;
          error = errors?.stats?.food;
          Icon = <GiMeat />;
          break;
        case 'water':
          value = stats!.water;
          isTouched = touched?.stats?.water;
          error = errors?.stats?.water;
          Icon = <GiWaterDrop />;
          break;
        case 'weight':
          value = stats!.weight;
          isTouched = touched?.stats?.weight;
          error = errors?.stats?.weight;
          Icon = <GiWeight />;
          break;
        case 'melee':
          value = stats!.melee;
          isTouched = touched?.stats?.melee;
          error = errors?.stats?.melee;
          Icon = <GiMailedFist />;
          break;
        default: 
          value = (stats as addedLevels)!.total;
          isTouched = touched?.stats?.total;
          error = errors?.stats?.total;
      }

      return (
        <FormInput
          key={stat}
          Icon={Icon as ReactElement}
          inputConfig={{
            type: "number",
            id: `${forGroup}.${stat}`,
            label: stat,
            value: value,
            onChange: handleChange,
            onBlur: handleBlur,
            status: {
              touched: touched,
              errors: error,
              minimize: true
            }
          }}
        />
      )
    })}
  </label>
);

export default StatsLayout;