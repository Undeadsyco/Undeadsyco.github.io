import type { formik } from '../..';

type props = {
  formik: formik;
};

const ModalSection3 = ({ formik: { values: {
  healthStat, staminaStat, weightStat, damageStat, healthAffinity, staminaAffinity, weightAffinity, damageAffinity, tameType,
}, handleChange, handleBlur } }: props) => (
  <div className='flex flex-wrap'>
    Parents
    <div>
      <button className='bg-gray-600 text-white'>Prev</button>
      <button className='bg-gray-600 text-white'>Submit</button>
    </div>
  </div>
);

export default ModalSection3;