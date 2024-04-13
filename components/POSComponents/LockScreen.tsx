import { Field, Form, Formik } from "formik";
import { Button } from "../globalComponents";
import Link from "next/link";
import { MouseEvent } from "react";
import * as yup from 'yup';

const LockScreen = () => (
  <>
    <div className="col-span-12 row-span-2 flex justify-center flex-wrap flex-col items-center">
      <Link className="w-24" href="/papa_santana"><Button className="exitBtn">Exit</Button></Link>
      <h1>Point of Sales</h1>
    </div>
    <div className="col-span-12 row-span-10 grid grid-cols-12 grid-rows-10 gap-2">
      <Formik
        initialValues={{ password: '' }}
        validationSchema={yup.object({ password: yup.string().required('Required') })}
        onSubmit={(values) => {
          console.log(values);
          fetch('/api/papa_santana', { method: 'POST', body: JSON.stringify({ password: values.password }) })
            .then(res => res.json())
            .then(console.log)
            .catch(console.error);
        }}
      >
        {({ values, setFieldValue }) => {
          const handleChange = (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setFieldValue('password', `${values.password}${(e.target as HTMLButtonElement).innerText}`)
          }
          return (
            <Form className="row-start-2 row-span-6 col-start-5 col-span-4 grid grid-cols-3 grid-rows-5 gap-2">
              <div className="col-span-full flex flex-col items-center">
                <label htmlFor="password" />
                <Field className="w-1/2 text-center" type="text" name="password" id="password" placeholder='password...' />
              </div>
              <div className="col-span-full row-span-4 grid grid-cols-3 grid-rows-4 gap-2">
                <Button onClick={handleChange} className="posBtn">1</Button>
                <Button onClick={handleChange} className="posBtn">2</Button>
                <Button onClick={handleChange} className="posBtn">3</Button>
                <Button onClick={handleChange} className="posBtn">4</Button>
                <Button onClick={handleChange} className="posBtn">5</Button>
                <Button onClick={handleChange} className="posBtn">6</Button>
                <Button onClick={handleChange} className="posBtn">7</Button>
                <Button onClick={handleChange} className="posBtn">8</Button>
                <Button onClick={handleChange} className="posBtn">9</Button>
                <Button className="posBtn" type="reset">Cancel</Button>
                <Button onClick={handleChange} className="posBtn">0</Button>
                <Button className="posBtn" type="submit">Submit</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  </>
);

export default LockScreen;
