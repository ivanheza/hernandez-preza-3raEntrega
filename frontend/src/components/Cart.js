import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {nuevaOrden} from "../api/ordenApi"
import {useCartContext} from "../context/cartContext"
import {useUserContext} from "../context/userContext"
import {errorAlert, successAlert} from "../helpers/alerts"
import "../index.css"
import CartCard from "../stateless/CartCard"

const Cart = () => {
   const navigate = useNavigate()
   const [resError, setResError] = useState(false)
   const [success, setSuccess] = useState(false)
   const {cart, borrarProducto, borarrCarrito} = useCartContext()
   const {user} = useUserContext()
   //console.log(user)
   //console.log(cart)
   let total = cart.productos.reduce((acc, item) => {
      let productos = item.qty * item.precio
      return (acc += productos)
   }, 0)
   //console.log(total)

   const handleCheckout = async () => {
      console.log("Boton Orden")
      alert("¿Quieres continuar con tu compra?")
      let orden = {
         cliente: user._id,
         productos: cart.productos,
         total,
      }
      //console.log(orden)
      try {
         let res = await nuevaOrden(orden)
         //console.log(res)
         setSuccess(res.data.successMessage)
         const deleted = await borarrCarrito(cart._id)
         setTimeout(() => {
            navigate("/")
         }, 1000)
      } catch (error) {
         setResError("Ocurrio un error al comprar.")
      }
   }
   return (
      <section className="h-100 h-custom">
         <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center">
               <div className="col">
                  <div className="card">
                     <div className="card-body p-4">
                        <div className="row">
                           <div className="col-lg-7">
                              <h5>
                                 <Link to={"/"} className="link-secondary text-body">
                                    <i className="bi bi-arrow-left-circle me-2"></i>
                                    Seguir Comprando
                                 </Link>
                              </h5>
                              <hr />

                              <div className="d-flex justify-content-between align-items-center mb-4">
                                 <div>
                                    <h5 className="mb-1">
                                       CART{" "}
                                       <strong>
                                          {user.role === 1 ? "Administrador" : ""}
                                       </strong>
                                    </h5>
                                 </div>
                                 <div className="">
                                    <p>
                                       Tienes{" "}
                                       <span className="badge badge-pill bg-info">
                                          {cart.productos.length}
                                       </span>{" "}
                                       artículos en tu carrito.
                                    </p>
                                 </div>
                              </div>
                              {cart.productos &&
                                 cart.productos.map((p, index) => (
                                    <CartCard
                                       key={index}
                                       p={p}
                                       borrarProducto={borrarProducto}
                                    />
                                 ))}
                           </div>
                           <div className="col-lg-5 ">
                              <div className="card bg-secondary bg-gradient align-text-bottom text-white rounded-3  h-100">
                                 <div className="card-body">
                                    {resError && errorAlert(resError)}
                                    {success && successAlert(success)}
                                    <div>
                                       <h1>Details</h1>
                                       <p>{user.email}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                       <h2 className="mb-0 text-">Total</h2>
                                    </div>
                                    <hr className="my-4" />
                                    <button
                                       type="button"
                                       className="btn btn-info w-100 btn-lg"
                                       onClick={handleCheckout}>
                                       <div className="d-flex justify-content-between">
                                          <span>$ {total}</span>
                                          <span>
                                             Comprar <i className="bi bi-arrow-right"></i>
                                          </span>
                                       </div>
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Cart
