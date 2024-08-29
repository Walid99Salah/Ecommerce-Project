import React, { useContext, useState } from "react";
import style from "./ForgotPassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Home from "../Home/Home";

export default function ForgotPassword() {
  if (localStorage.getItem('userToken')) {
    return <Home/>
  }else{
    const [apiError, setApiError] = useState(null);
    const [sucSend, setSucSend] = useState(null);
    const [resetSend, setResetSend] = useState(null);
  async function SendCode(values) {
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , values);
      setSucSend(data.statusMsg);
    } catch (error) {
      console.log(error.response.data.message);
      setApiError(error.response.data.message);
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("email invalid").required("email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: SendCode,
  });

  async function code(values) {
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , values);
      setResetSend(data.status)
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  let formik2 = useFormik({
    initialValues: {
        resetCode: "",
    },
    onSubmit: code,
  });

  return (
    <>
    {sucSend != 'success' ? <div className="pt-8 w-1/2 mx-auto">
        <h2 className="text-3xl py-6 text-emerald-600 font-semibold">Change Now</h2>
        <form onSubmit={formik.handleSubmit}>
          {apiError && (<div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {apiError}
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=""/>
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter your Email :</label>
          </div>

          {formik.errors.email && formik.touched.email && (<div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div>
          )}


            <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
            SendCode
            </button>
          
        </form>
      </div> : <div className="pt-8 w-1/2 mx-auto">
        <h2 className="text-3xl py-6 text-emerald-600 font-semibold">Send Now</h2>
        <form onSubmit={formik2.handleSubmit}>
          {apiError && (<div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {apiError}
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="resetCode" value={formik2.values.resetCode} onChange={formik2.handleChange} onBlur={formik2.handleBlur} id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=""/>
            <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter Reset Code :</label>
          </div>

          {formik2.errors.resetCode && formik2.touched.resetCode && (<div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik2.errors.resetCode}
            </div>
          )}


            <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
            Reset
            </button>
          
        </form>
      </div>
}
    </>
  );
  }
  
}
