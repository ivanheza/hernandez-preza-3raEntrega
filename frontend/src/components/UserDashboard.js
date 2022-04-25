import React from "react"
import {Link} from "react-router-dom"
import {useCartContext} from "../context/cartContext"
import Productos from "./Productos"

const UserDashboard = ({user}) => {
   const {cart} = useCartContext()
   //console.log(user)
   //console.log(cart.productos, "Cart")

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
                  <button className="btn btn-sm btn-outline-info w-100 ">Ordenes</button>
               </div>
            </div>
         </div>
      </div>
   )
   return (
      <section className="h-100" style={{backgroundColor: "#eee"}}>
         <div className="container py-5 h-100">
            <div className="bg-dark bg-gradient text-light py-3">
               <div className="row">
                  <div className="col-md-6">
                     <h5>
                        <i className="bi bi-house ms-2"></i> User Dashboard
                     </h5>
                     <div className="ms-2">
                        <p>Bienvenido {user.nombre}</p>
                        <img
                           height={120}
                           src={`http://localhost:9000/${user.foto}`}
                           alt=""
                        />
                     </div>
                  </div>
               </div>
            </div>
            {showButtons()}
            <Productos cart={cart} user={user} />
         </div>
      </section>
   )
}

export default UserDashboard
