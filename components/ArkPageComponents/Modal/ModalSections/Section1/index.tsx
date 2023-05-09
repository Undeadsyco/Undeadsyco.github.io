import type { formik } from '../..';

import Input from '../../ModalInput';
import ModalSelect from '../../ModalSelect';
import LevelSelect from './LevelSection';
import SelectSection from './SelectSection';

type props = {
  formik: formik;
  handleClick: Function;
}

const ModalSection1 = ({
  handleClick, formik: { values: { name, species, platform, sex, tameType, lvls }, handleChange, handleBlur } }: props) => (
  <div className="bg-white w-full h-5/6 grid grid-cols-6 grid-rows-4 gap-2 border-2 border-black rounded-3xl p-2">
    <Input
      name='name'
      type='text'
      value={name}
      handleChange={handleChange}
      handleBlur={handleBlur}
      containerStyles='col-span-3'
    />
    <Input
      name='species'
      type='text'
      value={species}
      handleChange={handleChange}
      handleBlur={handleBlur}
      containerStyles='col-span-3'
    />
    <SelectSection tameType={tameType} platform={platform} sex={sex} handleChange={handleChange} handleBlur={handleBlur} />
    <LevelSelect tameType={tameType} lvls={lvls} handleChange={handleChange} handleBlur={handleBlur} />
    <div className='flex justify-center items-center col-span-6'>
      <button
        className='bg-gray-500 w-[150px] h-[40px] rounded-full border-black border-2'
        onClick={() => handleClick()
      }>
        Next
      </button>
    </div>
  </div>
);

export default ModalSection1;