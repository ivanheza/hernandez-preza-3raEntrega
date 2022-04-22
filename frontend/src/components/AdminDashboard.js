import React, {useState} from "react"
import {Link} from "react-router-dom"
import {useCartContext} from "../context/cartContext"
import ModalAdd from "./ModalAddProduct"

import Productos from "./Productos"

const AdminDashboard = ({user}) => {
   const {cart} = useCartContext()
   const [modal, SetModal] = useState(false)
   //console.log(modal)
   //console.log(cart.productos, "Cart")
   const handleClick = () => {
      //console.log("handle")
      SetModal(true)
   }
   const showButtons = () => (
      <div className="bg-light my-2">
         <div className="container">
            <div className="row">
               <div className="col-md-4 my-1 py-3">
                  <Link to={"/cart"} className="btn btn-sm btn-outline-info w-100">
                     <i className="bi bi-cart"></i> Carrito{" "}
                     <div className="badge bg-primary">{cart.productos.length}</div>
                  </Link>
               </div>
               <div className="col-md-4 my-1 py-3">
                  <button
                     onClick={handleClick}
                     className="btn btn-sm btn-outline-info w-100 ">
                     Agregar Producto Nuevo
                  </button>
               </div>
               <div className="col-md-4 my-1 py-3">
                  <button className="btn btn-sm btn-outline-info w-100 ">Ordenes</button>
               </div>
            </div>
         </div>
      </div>
   )
   return (
      <section>
         <div className="bg-dark bg-gradient text-light py-5">
            <div className="row">
               <div className="col-md-6">
                  <h1>
                     <i className="bi bi-house"></i> Admin Dashboard
                  </h1>
               </div>
            </div>
         </div>
         {showButtons()}
         {modal === true ? <ModalAdd hide={SetModal} /> : ""}
         <Productos cart={cart} user={user} />
      </section>
   )
}

export default AdminDashboard
