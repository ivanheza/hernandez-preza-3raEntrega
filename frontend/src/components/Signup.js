import React, {useEffect, useState} from "react"

import {Link, useNavigate} from "react-router-dom"
import {showLoading} from "../helpers/loading"
import {signup} from "../api/signup"
import {errorAlert, successAlert} from "../helpers/alerts"

const Signup = ({user}) => {
   const navigate = useNavigate()

   useEffect(() => {
      if (user) {
         navigate("/login")
      } else {
      }
   }, [])

   /////------
   const [file, setFile] = useState("")
   const [formData, setFormData] = useState({
      email: "musik.imix@gmail.com",
      password: "123456",
      nombre: "",
      direccion: "",
      edad: "",
      telefono: "",

      loading: false,
      successMessage: false,
      errorMessage: false,
   })
   const {
      email,
      password,
      nombre,
      direccion,
      edad,
      telefono,
      loading,
      errorMessage,
      successMessage,
   } = formData

   //handleChange
   const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
      //console.log(formData)
   }
   const handleFile = (e) => {
      setFile(e.target.files[0])
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      const {email, password, nombre, direccion, edad, telefono} = formData
      const data = new FormData()
      data.append("email", email)
      data.append("password", password)
      data.append("nombre", nombre)
      data.append("direccion", direccion)
      data.append("edad", edad)
      data.append("telefono", telefono)

      data.append("file", file)

      setFormData({...formData, loading: true})

      signup(data)
         .then((res) => {
            console.log(res)
            //console.log(res.data.successMessage)
            setFormData({
               email: "",
               password: "",
               nombre: "",
               direccion: "",
               edad: "",
               telefono: "",
               loading: false,
               successMessage: res.data.successMessage,
               errorMessage: false,
            })
         })
         .catch((err) => {
            console.log("Axios Signup Error", err.response.data.errorMessage)
            setFormData({
               ...formData,
               loading: false,
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
            {loading && showLoading()}
            {errorMessage && errorAlert(errorMessage)}
            {successMessage && successAlert(successMessage)}
            <div className="d-grid justify-content-sm-center mb-2 mt-2">
               <form action="#">
                  <div className="form-group mb-2">
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
                  <div className="form-group mb-2">
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
                  <div className="form-group mb-2">
                     <input
                        className="form-control"
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={nombre}
                        placeholder="Introduce tu nombre"
                        onChange={handleChange}
                     />
                  </div>
                  <div className="form-group mb-2">
                     <input
                        className="form-control"
                        id="direccion"
                        type="text"
                        name="direccion"
                        value={direccion}
                        placeholder="Introduce tu direccion"
                        onChange={handleChange}
                     />
                  </div>
                  <div className="form-group mb-2">
                     <input
                        className="form-control"
                        id="edad"
                        type="number"
                        name="edad"
                        value={edad}
                        placeholder="Introduce tu edad"
                        onChange={handleChange}
                     />
                  </div>
                  <div className="form-group mb-2">
                     <input
                        className="form-control"
                        id="telefono"
                        type="phone"
                        name="telefono"
                        value={telefono}
                        placeholder="Introduce tu telefono"
                        onChange={handleChange}
                     />
                  </div>
                  <div className="form-group mb-2">
                     <input
                        className="form-control"
                        id="file"
                        type="file"
                        name="file"
                        placeholder="Introduce tu telefono"
                        onChange={handleFile}
                     />
                  </div>
               </form>
               <div>
                  <button
                     type="submit"
                     onClick={handleSubmit}
                     className="btn btn-success mt-3">
                     Signup
                  </button>
               </div>
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
