import React from "react"

export const successAlert = (msg) => {
   return (
      <div className="alert alert-success" role="alert">
         {msg}
      </div>
   )
}

export const errorAlert = (msg) => {
   return (
      <div className="alert alert-danger" role="alert">
         {msg}
      </div>
   )
}
