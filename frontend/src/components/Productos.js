import React, {useState, useEffect} from "react"
import {useCartContext} from "../context/cartContext"
import ModalEdit from "./ModalEditProduct"
import {deleteByID} from "../api/productsApi"
import {errorAlert} from "../helpers/alerts"
import {useUserContext} from "../context/userContext"

const Productos = ({user, cart}) => {
   const [modal, SetModal] = useState(false)
   const [prodID, SetprodID] = useState(false)
   const {handleAdd} = useCartContext()
   const {productos} = useUserContext()
   const [resMessage, setResMessage] = useState(false)
   //console.log(cart, user, "PRODUCTOS CMP")

   const handleClick = (e, id) => {
      e.preventDefault()
      console.log("handle", id)
      SetModal(true)
      SetprodID(id)
   }
   const handleDelete = (e, id) => {
      e.preventDefault()

      if (id) {
         alert("Quieres borrar un producto")
         console.log(id)

         deleteByID(id)
            .then((res) => {
               setResMessage(res.data.successMessage)

               setTimeout(() => {
                  setResMessage(false)
               }, 2000)
            })
            .catch((err) => {
               console.log(err.response)
               setResMessage(err.response.data.errorMessage)
               setTimeout(() => {
                  setResMessage(false)
               }, 3000)
            })
      }
   }

   useEffect(() => {
      console.log(productos)
   }, [productos])

   return (
      <div className="row ">
         {resMessage && errorAlert(resMessage)}
         {productos &&
            productos.map((p, i) => {
               return (
                  <div key={i} className="col-lg-4 col-md-12 mb-4">
                     <div className="card shadow" key={i}>
                        <div className="d-flex justify-content-between p-3">
                           <p className="lead mb-0">Stock</p>
                           <div
                              className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                              style={{width: 35, height: 35}}>
                              <p className="text-white mb-0 small">{p.stock}</p>
                           </div>
                        </div>

                        <img
                           className="card-img-top hover-zoom"
                           src={p.foto}
                           alt={p.nombre}
                        />
                        <div className="card-body">
                           <div className="d-flex justify-content-between">
                              <h5>{p.nombre}</h5>
                           </div>
                           <div className="d-flex justify-content-between">
                              <p className="small"> {p.descripcion} </p>
                           </div>
                           <div className="d-flex justify-content-end mb-3">
                              <h3>
                                 <span className="badge bg-light text-dark shadow-sm">
                                    ${p.precio}
                                 </span>
                              </h3>
                           </div>
                           <hr />
                           <div className="d-flex justify-content-evenly mb-2">
                              <button
                                 onClick={() => handleAdd(p, user._id)}
                                 className="btn btn-info"
                                 data-id={p.id}>
                                 Add To Cart
                              </button>
                              {user && user.role === 1 && (
                                 <>
                                    <button
                                       onClick={(e) => handleClick(e, p)}
                                       className="btn btn-warning btn-sm "
                                       data-id={p.id}>
                                       Edit
                                    </button>
                                    <button
                                       onClick={(e) => handleDelete(e, p._id)}
                                       className="btn btn-sm btn-danger "
                                       data-id={p.id}>
                                       Delete
                                    </button>
                                 </>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               )
            })}
         {modal === true ? <ModalEdit hide={SetModal} product={prodID} /> : ""}
      </div>
   )
}

export default Productos
