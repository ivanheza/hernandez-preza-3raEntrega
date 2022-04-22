import React from "react"
import {Navigate, Outlet} from "react-router-dom"

const ProtectedRoute = ({user, chilren}) => {
   if (!user) {
      // console.log(user, "desdeProtected fallo")
      return <Navigate to="/" replace />
   }
   //console.log(user, "desdeProtected ")

   return <Outlet />
}

export default ProtectedRoute
