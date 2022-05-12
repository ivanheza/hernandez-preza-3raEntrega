import React, {Fragment, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"

import {useUserContext} from "../context/userContext"
import {logout} from "../api/logout"

const NavBar = () => {
   let navigate = useNavigate()
   const {user, exitUser} = useUserContext()
   const handleLogout = (e) => {
      logout()
         .then((res) => {
            console.log(res.data)

            setTimeout(() => {
               exitUser()
               navigate("/login")
            }, 500)
         })
         .catch((err) => {
            console.log("Axios Logout Error", err)
         })
   }

   return (
      <header>
         <nav className="navbar navbar-expand-md ml-auto navbar-light bg-light">
            <div className="container-fluid">
               <Link to={"/"} className="navbar-brand">
                  Store
               </Link>
               <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                     {!user && (
                        <Fragment>
                           <li className="nav-item">
                              <Link to="" className="nav-link active" aria-current="page">
                                 <i className="bi bi-house px-2"></i>
                                 Home
                              </Link>
                           </li>
                           <li className="nav-item">
                              <Link to="/login" className="nav-link">
                                 <i className="bi bi-door-open px-2"></i> Login
                              </Link>
                           </li>
                           <li className="nav-item">
                              <Link to="/signup" className="nav-link">
                                 <i className="bi bi-slash-square px-2 "></i> Registrar
                              </Link>
                           </li>
                        </Fragment>
                     )}
                     {user && user.role === 0 && (
                        <Fragment>
                           <li className="nav-item">
                              <Link
                                 to="/user/dashboard"
                                 className="nav-link active"
                                 aria-current="page">
                                 <i className="bi bi-house px-2"></i>
                                 Dashboard
                              </Link>
                           </li>
                        </Fragment>
                     )}
                     {user && user.role === 1 && (
                        <Fragment>
                           <li className="nav-item">
                              <Link
                                 to="/admin/dashboard"
                                 className="nav-link active"
                                 aria-current="page">
                                 <i className="bi bi-house px-2"></i>
                                 Admin Dashboard
                              </Link>
                           </li>
                        </Fragment>
                     )}
                     {user && (
                        <Fragment>
                           <li className="nav-item">
                              <button
                                 className="nav-link active  btn btn-link"
                                 onClick={handleLogout}
                                 aria-current="page">
                                 <i className="bi bi-box-arrow-right px-2 "></i>
                                 Logout
                              </button>
                           </li>
                        </Fragment>
                     )}
                  </ul>
               </div>
            </div>
         </nav>
      </header>
   )
}

export default NavBar
