import React, {useEffect, useState} from "react"
import {getOrders} from "../api/ordenApi"
import {editProduct} from "../api/productsApi"
import {useCartContext} from "../context/cartContext"
import {errorAlert, successAlert} from "../helpers/alerts"

const ModalOrders = ({hide}) => {
   let modalStyle = {
      display: "block",
      backgroundColor: "rgba(0,0,0,0.8)",
   }

   return (
      <div className="modal show fade" style={modalStyle}>
         <div className="modal-dialog">
            <div className="modal-content">
               <div className="modal-header bg-warning bg-gradient">
                  <h5 className="modal-title" id="exampleModalLabel">
                     Historial de Pedidos
                  </h5>
                  <button onClick={hide} className="btn-close"></button>
               </div>
               <div className="modal-body">pedidos</div>
            </div>
         </div>
      </div>
   )
}

export default ModalOrders
