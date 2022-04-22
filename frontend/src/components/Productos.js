import React, {useState, useEffect} from "react"
import axios from "axios"
import {useCartContext} from "../context/cartContext"
import ModalEdit from "./ModalEditProduct"

const Productos = ({user, cart}) => {
   const [modal, SetModal] = useState(false)
   const [prodID, SetprodID] = useState(false)
   const [productos, setProductos] = useState([])
   const {handleAdd} = useCartContext()
   //console.log(cart, user, "PRODUCTOS CMP")

   const handleClick = (e, id) => {
      e.preventDefault()
      console.log("handle", id)
      SetModal(true)
      SetprodID(id)
   }
   useEffect(() => {
      const data = axios
         .get("http://localhost:9000/api/productos")
         .then((res) => setProductos(res.data))
   }, [productos])

   return (
      <div className="row ">
         {productos &&
            productos.map((p, i) => {
               return (
                  <div key={i} className="col-md-6 col-lg-4 col-xl-3">
                     <div className="card cardProd rounded-0 mb-2 shadow" key={i}>
                        <img className="card-img-top" src={p.foto} alt={p.nombre} />
                        <div className="card-body">
                           <h1 className="card-title">{p.nombre}</h1>
                           <h4>${p.precio}</h4>
                           <p className="card-text"> {p.descripcion} </p>
                           <div>
                              <button
                                 onClick={() => handleAdd(p)}
                                 className="btn btn-info mx-2 "
                                 data-id={p.id}>
                                 Add To Cart
                              </button>
                              {user && user.role === 1 && (
                                 <>
                                    <button
                                       onClick={(e) => handleClick(e, p)}
                                       className="btn btn-warning btn-sm mx-1 "
                                       data-id={p.id}>
                                       Edit
                                    </button>
                                    <button
                                       onClick={() => console.log("click")}
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
