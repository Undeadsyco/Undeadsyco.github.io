import { Dispatch, SetStateAction } from 'react';
import type { formik, sections } from '../..';
import StatsLayout from './StatLayout';

type props = {
  formik: formik;
  setSection: Dispatch<SetStateAction<sections>>;
}

const ModalSection2 = ({
  formik: { values: { stats: { starting, affinity, current } }, handleBlur, handleChange }, setSection
}: props) => (
  <div className="grid grid-cols-2 grid-rows-5 p-2 h-5/6 border-2 border-black">
    <StatsLayout
      title='Stats'
      type='starting'
      values={starting}
      handleChange={handleChange}
      handleBlur={handleBlur}
    />
    <StatsLayout
      title='Affinity'
      type='affinity'
      values={affinity}
      handleChange={handleChange}
      handleBlur={handleBlur}
    />
    <div className='flex justify-around row-start-5'>
      <button onClick={() => setSection(0)} className='text-black'>Prev</button>
      <button onClick={() => setSection(2)} className='text-black'>Next</button>
    </div>
  </div>
);

export default ModalSection2;