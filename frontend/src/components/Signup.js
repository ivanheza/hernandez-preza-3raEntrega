import React, {useEffect, useState} from "react"

import {Link, useNavigate} from "react-router-dom"
import {showLoading} from "../helpers/loading"
import {signup} from "../api/signup"
import {errorAlert, successAlert} from "../helpers/alerts"

const Signup = ({user}) => {
   const navigate = useNavigate()
   console.log(user)
   useEffect(() => {
      if (user) {
         navigate("/login")
      } else {
      }
   }, [])

   /////------
   const [formData, setFormData] = useState({
      email: "ivan@gmail.com",
      password: "123456",
      laoding: false,
      successMessage: false,
      errorMessage: false,
   })
   const {email, password, laoding, errorMessage, successMessage} = formData

   //handleChange
   const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
      //console.log(formData)
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      const {email, password} = formData
      const data = {email, password}
      setFormData({...formData, laoding: true})

      signup(data)
         .then((res) => {
            //console.log(res.data.successMessage)
            setFormData({
               email: "",
               password: "",
               laoding: false,
               successMessage: res.data.successMessage,
               errorMessage: false,
            })
         })
         .catch((err) => {
            console.log("Axios Signup Error", err.response.data.errorMessage)
            setFormData({
               ...formData,
               laoding: false,
               errorMessage: err.response.data.errorMessage,
            })
         })
   }

   //////-----View Render

   return (
      <div id="login-component" className="px-4 py-2 my-5 text-center">
         <h1 className="display-5 fw-bold">Registro</h1>
         <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">Introduce tus datos para Registrtarte</p>
            {laoding && showLoading()}
            {errorMessage && errorAlert(errorMessage)}
            {successMessage && successAlert(successMessage)}
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-2 mt-2">
               <form onSubmit={handleSubmit}>
                  <div className="form-group">
                     <input
                        className="form-control"
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Introduce tu email"
                        onChange={handleChange}
                     />
                  </div>
                  <div className="form-group mt-2">
                     <input
                        className="form-control"
                        id="password"
                        type="password"
                        value={password}
                        name="password"
                        placeholder="Introduce tu contraseña"
                        onChange={handleChange}
                     />
                  </div>
                  <button type="submit" className="btn btn-success mt-3">
                     Signup
                  </button>
               </form>
            </div>

            <div>
               <hr />
               <h4>Si ya estas registrado</h4>
               <p className="lead">Entra ahora.</p>
               <Link to={"/login"} className="mx-3 btn btn-primary mt-3">
                  Login Now
               </Link>
            </div>
         </div>
      </div>
   )
}

export default Signup
