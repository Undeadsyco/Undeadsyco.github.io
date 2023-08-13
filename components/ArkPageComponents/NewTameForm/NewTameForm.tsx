import type { reducerState } from "../../../hooks/ark/useArkReducer";

import { useTameForm, useArkReducer } from "../../../hooks/ark";
import { useEffect } from 'react';

import { ParentsLayout, SexLayout, AgeLayout, LvlsLayout, TameStatsLayout } from "./components";
import { FormInput, FormSelect } from '../../globalComponents';

type props = {
  state: reducerState;
}

export default function NewTameForm({ state }: props) {
  const { tameFormik } = useTameForm();

  useEffect(() => {
    console.log('state', state);
  }, [state]);

  return (
    <form className="tameFormContainer" onSubmit={tameFormik.handleSubmit} onReset={tameFormik.handleReset}>
      <FormInput className="arkDefaultContainer newArkTameNameFormInput" inputConfig={{
        id: 'name',
        type: 'text',
        value: tameFormik.values.name,
        onChange: tameFormik.handleChange,
        onBlur: tameFormik.handleBlur,
        status: {
          errors: tameFormik.errors.name,
          touched: tameFormik.touched.name,
          readOnly: false,
        }
      }} />
      <AgeLayout error={tameFormik.errors.age} touched={tameFormik.touched.age} handleChange={tameFormik.handleChange} handleBlur={tameFormik.handleBlur} />
      <SexLayout error={tameFormik.errors.sex} touched={tameFormik.touched.sex} handleChange={tameFormik.handleChange} handleBlur={tameFormik.handleBlur} />
      <FormInput className="arkDefaultContainer halfSizeDefaultFormInput newArkTameObtainedFormInput" inputConfig={{
        id: 'tamed',
        name: 'obtained',
        label: 'tamed',
        type: 'radio',
        value: 'tamed',
        onChange: () => {
          tameFormik.setFieldValue('tamed', true);
          tameFormik.setFieldValue('breed', false);
        },
        onBlur: tameFormik.handleBlur,
        status: {
          errors: tameFormik.errors.age,
          touched: tameFormik.touched.age,
          readOnly: false,
        }
      }} />
      <FormInput className="arkDefaultContainer halfSizeDefaultFormInput newArkTameObtainedFormInput newArkTameBreedFormInput" inputConfig={{
        id: 'breed',
        name: 'obtained',
        label: 'breed',
        type: 'radio',
        value: 'breed',
        onChange: () => {
          tameFormik.setFieldValue('tamed', false);
          tameFormik.setFieldValue('breed', true);
        },
        onBlur: tameFormik.handleBlur,
        status: {
          errors: tameFormik.errors.breed,
          touched: tameFormik.touched.breed,
          readOnly: false,
        }
      }} />
      <FormInput className="arkDefaultContainer halfSizeDefaultFormInput newArkTameStatusFormInput" inputConfig={{
        id: 'nutered',
        type: 'checkbox',
        value: 'nutered',
        onChange: tameFormik.handleChange,
        onBlur: tameFormik.handleBlur,
        status: {
          errors: tameFormik.errors.nutered,
          touched: tameFormik.touched.nutered,
          readOnly: false,
        }
      }} />
      <FormInput className="arkDefaultContainer halfSizeDefaultFormInput newArkTameStatusFormInput newArkTameNuteredFormInput" inputConfig={{
        id: 'deseased',
        type: 'checkbox',
        value: 'deseased',
        onChange: tameFormik.handleChange,
        onBlur: tameFormik.handleBlur,
        status: {
          errors: tameFormik.errors.deseased,
          touched: tameFormik.touched.deseased,
          readOnly: false,
        }
      }} />
      <FormSelect<string> className="arkDefaultContainer col-start-2" inputConfig={{
        id: 'owner',
        value: tameFormik.values.owner,
        options: state.data?.members!,
        defaultVal: 'select owner',
        onChange: tameFormik.handleChange,
        onBlur: tameFormik.handleBlur,
        status: {
          errors: tameFormik.errors.owner,
          touched: tameFormik.touched.owner,
          readOnly: false,
        }
      }} />
      <FormSelect<string> className="arkDefaultContainer col-start-2" inputConfig={{
        id: 'species',
        value: tameFormik.values.species,
        options: state.data?.species!,
        defaultVal: 'select species',
        onChange: tameFormik.handleChange,
        onBlur: tameFormik.handleBlur,
        status: {
          errors: tameFormik.errors.species,
          touched: tameFormik.touched.species,
          readOnly: false,
        }
      }} />
      <ParentsLayout
        state={state}
        parents={tameFormik.values.parents}
        errors={tameFormik.errors.parents}
        touched={tameFormik.touched.parents}
        handleChange={tameFormik.handleChange}
        handleBlur={tameFormik.handleBlur}
      />
      {/* <FormSelect<readonly string[]> className="arkDefaultContainer" inputConfig={{
        id: 'colors',
        value: tameFormik.values.colors,
        options: state.data?.colors?.map((color) => color.color!)!,
        defaultVal: 'select colors',
        onChange: tameFormik.handleChange,
        onBlur: tameFormik.handleBlur,
        status: {
          errors: tameFormik.errors.colors,
          touched: tameFormik.touched.colors,
          readOnly: false,
        }
      }} /> */}
      <LvlsLayout
        lvls={tameFormik.values.lvl}
        errors={tameFormik.errors.lvl}
        touched={tameFormik.touched.lvl}
        handleChange={tameFormik.handleChange}
        handleBlur={tameFormik.handleBlur}
      />
      <TameStatsLayout
        stats={tameFormik.values.stats}
        errors={tameFormik.errors.lvl}
        touched={tameFormik.touched.lvl}
        handleChange={tameFormik.handleChange}
        handleBlur={tameFormik.handleBlur}
      />
      <div className="arkDefaultContainer flex justify-evenly items-center">
        <input type="reset" value="Reset" className="bg-black border-white border-solid border-2 px-2 py-1 rounded-full" />
        <input type="submit" value="Submit" className="bg-black border-white border-solid border-2 px-2 py-1 rounded-full" />
      </div>
    </form>
  )
}