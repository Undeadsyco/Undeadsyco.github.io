import type { sex, platfrom, tameType, lvls, tameStats } from "../../../types";

import { useMemo, useState, useCallback, ChangeEventHandler, FocusEventHandler } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';

import { Section1, Section2, Section3 } from "./ModalSections";

type props = {
  visible: boolean;
}

export type formik = {
  values: {
    name: string;
    species: string;
    sex: string;
    platform: string;
    tameType: string;
    lvls: lvls;
    stats: tameStats
    mother: string;
    father: string;
  },
  handleChange: ChangeEventHandler;
  handleBlur: FocusEventHandler;
}

export type modalSection = {
  formik: formik;
}

export type sections = (0 | 1 | 2);

const validation = yup.object({});

function Modal({ visible }: props) {
  const [modalSection, setSection] = useState<sections>(0);

  const formik = useFormik({
    validationSchema: validation,
    initialValues: {
      name: '',
      species: '',
      sex: '',
      platform: '',
      tameType: '',
      lvls: {
        wild: 0,
        tamed: 0,
        current: 0,
        max: 0,
      },
      stats: {
        starting: {
          health: 0,
          stamina: 0,
          weight: 0,
          damage: 0,
        },
        affinity: {
          health: 0,
          stamina: 0,
          weight: 0,
          damage: 0,
        },
        current: {
          health: 0,
          stamina: 0,
          weight: 0,
          damage: 0,
        },
      },
      mother: '',
      father: '',
    },
    onSubmit: (values, actions) => {
      console.log(values);
    },
  });

  const handleSection1Btn = useCallback((tameType: string) => {
    formik.setFieldValue('tameType', tameType);
    setSection(1);
  }, [formik]);

  const selectSection = useMemo(() => {
    switch (modalSection) {
      case 1:
        return <Section2 formik={formik} setSection={setSection} />;
      case 2:
        return <Section3 formik={formik} />
      default:
        return <Section1 formik={formik} handleClick={handleSection1Btn} />;
    }
  }, [modalSection, formik, handleSection1Btn]);

  return (
    <div className={`${visible ? 'block' : 'hidden'} absolute w-full h-full top-0 left-0`}>
      <div className="bg-slate-900 opacity-70 w-full h-full"></div>
      <div className={`bg-white absolute w-2/5 h-3/5 left-0 top-0 translate-x-3/4 translate-y-1/3`}>
        <form className="flex flex-wrap w-full h-full justify-center" onSubmit={formik.handleSubmit}>
          <h2 className="text-black w-full p-1 text-2xl text-center">Add New Creature</h2>
          {selectSection}
        </form>
      </div>
    </div>

  );
}

export default Modal