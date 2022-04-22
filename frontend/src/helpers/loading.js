import React from "react"

export const showLoading = () => {
   return (
      <div className="d-flex align-items-center">
         <div className="spinner-grow mx-auto text-info" role="status"></div>
      </div>
   )
}
