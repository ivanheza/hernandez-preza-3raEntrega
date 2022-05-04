import React, {useEffect, useState} from "react"

import {Link, useNavigate} from "react-router-dom"
import {showLoading} from "../helpers/loading"
import {loginUser} from "../api/login"
import {errorAlert, successAlert} from "../helpers/alerts"
import {useUserContext} from "../context/userContext"
import {useCartContext} from "../context/cartContext"

const Login = ({user}) => {
   const navigate = useNavigate()
   //console.log(user)
   useEffect(() => {
      if (user && user) {
         if (user.role === 1) {
            navigate("/admin/dashboard")
         } else if (user.role === 0) {
            navigate("/user/dashboard")
         }
      } else {
         //console.log("Ingresa datos")
      }
   })
   const {saveUser} = useUserContext()
   const {getCart} = useCartContext()

   const [formData, setFormData] = useState({
      email: "musik.imix@gmail.com",
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

      loginUser(data)
         .then((res) => {
            if (res.data.auth) {
               const user = res.data.user
               const id = user._id
               //console.log(id)
               getCart(id)
               saveUser({user})

               if (user.role === 1) {
                  navigate("/admin/dashboard")
               } else if (user.role === 0) {
                  navigate("/user/dashboard")
               }
            }
         })
         .catch((err) => {
            if (err.response.data.errorMesage) {
               console.log("Axios Login Error", err.response.data.errorMesage)
               setFormData({
                  ...formData,
                  errorMessage: err.response.data.errorMessage,
               })
            } else {
               console.log(err)
               setFormData({
                  ...formData,
                  errorMessage: "Oops... Hubo un problema con el servidor.",
               })
            }
         })
   }

   //////-----View Render

   return (
      <div className="px-4 py-2 my-5 text-center">
         <h1 className="display-5 fw-bold">Login</h1>
         <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">Introduce tus datos para iniciar sesión.</p>
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
                     Login
                  </button>
               </form>
            </div>

            <div>
               <hr />
               <h4>Si no estas registrado.</h4>

               <Link to={"/signup"} className="lead fw-bold mx-3 link-info">
                  Regístrate Ahora
               </Link>
            </div>
         </div>
      </div>
   )
}

export default Login
