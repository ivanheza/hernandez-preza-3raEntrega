import React, {useEffect, useState} from "react"
import {getOrders} from "../api/ordenApi"

import {useUserContext} from "../context/userContext"

const ModalOrders = ({hide}) => {
   const {user} = useUserContext()
   const [orders, setOrders] = useState(false)

   const api = async () => {
      try {
         const nombre = user.nombre
         const res = await getOrders(nombre)
         console.log(res.data)
         setOrders(res.data.orders)
      } catch (error) {
         console.log(error)
      }
   }
   useEffect(() => {
      api()
      console.log(orders, "ORDERS")
   }, [orders])

   ////----MODAL STYLE
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
               <div className="modal-body">
                  {!orders ? (
                     <h1>No tienes pedidos en tu historial</h1>
                  ) : (
                     <div>
                        {orders.map((o, index) => {
                           return (
                              <div key={index}>
                                 <h5>
                                    <span className="fs-1">#{index + 1} </span>
                                    {o.nombre}
                                 </h5>
                                 <p>ID de la orden: {o._id}</p>
                                 <ul>
                                    {o.productos.map((p, index) => {
                                       console.log(p)
                                       return (
                                          <div key={index}>
                                             <li>{p.nombre}</li>
                                             <li>{p.precio}</li>
                                          </div>
                                       )
                                    })}
                                 </ul>
                                 <h5>total: $ {o.total}</h5>
                              </div>
                           )
                        })}
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default ModalOrders
