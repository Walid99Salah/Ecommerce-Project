import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import Home from "../Home/Home";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import Notfound from "../Notfound/Notfound";
import { useNavigate } from "react-router-dom";


export default function UpdatePassword() {
  let {successResetCode , setSuccessResetCode} = useContext(UserContext)
  let navigate = useNavigate()
  if (localStorage.getItem("userToken")) {
    return <Home />;
  }else if(successResetCode == 'Success') {

    const [apiError, setApiError] = useState(null);

    async function reset(values) {
        try {
          let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , values);
          navigate('/login')
        } catch (error) {
          console.log(error.response.data.message);
          setApiError(error.response.data.message);
        }
      }
    
      let validationSchema = Yup.object().shape({
        email: Yup.string().email("email invalid").required("email is required"),
        newPassword: Yup.string().matches(/^[A-Z]\w{5,10}$/, "password invalid ex(Ahmed123)").required("password is required"),
        });
    
      let formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: reset,
      });
    

    return <>
    
    <div className="pt-8 w-1/2 mx-auto">
        <h2 className="text-3xl py-6 text-emerald-600 font-semibold">Reset</h2>
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
          <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=""/>
            <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter New Password :</label>
          </div>

          {formik.errors.newPassword && formik.touched.newPassword && (<div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.newPassword}
            </div>
          )}


            <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
            Reset
            </button>
          
        </form>
      </div>

    
    </>;
  }else{
    return <Notfound/>
  }
}
