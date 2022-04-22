import React from "react"

import {useCartContext} from "../context/cartContext"
import {useUserContext} from "../context/userContext"

const Cart = () => {
   const {cart, borrarProducto} = useCartContext()
   const {user} = useUserContext()
   //console.log(user)
   let total = cart.productos.reduce((acc, item) => {
      return (acc += item.precio)
   }, 0)
   //console.log(total)

   return (
      <div className="row d-flex justify-content-center align-items-center">
         <div className="col-md-10 my-3">
            <h1>
               CART <strong>{user.role === 1 ? "Administrador" : ""}</strong>
            </h1>
            <h2>{user.email}</h2>
            <p>
               Teléfono: <strong>{user.Telefono}</strong>
            </p>
            <ul className="list-group mb-3">
               {cart.productos &&
                  cart.productos.map((p, index) => {
                     return (
                        <li
                           key={index}
                           className="list-group-product d-flex justify-content-between  shadow-sm m-2"
                           style={{fontSize: 12}}>
                           <div className="row align-items-center ">
                              <p className="col-1 my-0 ">#{index + 1}</p>
                              <img
                                 src={p.foto}
                                 className="col-2 p-0 img-fluid"
                                 alt={p.name}
                              />
                              <p className="col-4 my-0 text-center">{p.nombre}</p>
                              <small className="col-3 text-center">$ {p.precio}</small>
                              <span className=" col-1 d-flex justify-content-center">
                                 <button
                                    onClick={() => borrarProducto(p._id)}
                                    className="btn btn-danger btn-sm ">
                                    X
                                 </button>
                              </span>
                           </div>
                        </li>
                     )
                  })}
            </ul>
            <h1 className="float-end">
               Total<small>$ {total}</small>
            </h1>
         </div>
      </div>
   )
}

export default Cart
