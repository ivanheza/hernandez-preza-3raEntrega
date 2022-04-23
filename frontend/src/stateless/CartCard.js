import React from "react"
/// p= producto
const CartCard = ({p, borrarProducto}) => {
   return (
      <div className="card mb-3">
         <div className="card-body">
            <div className="d-flex justify-content-between">
               <div className="d-flex flex-row align-items-center">
                  <div>
                     <img
                        src={p.foto}
                        className="img-fluid rounded-3"
                        alt="Shopping item"
                        style={{width: 65}}
                     />
                  </div>
                  <div className="ms-3">
                     <h5>{p.nombre}</h5>
                     <p className="small mb-0">{p.descripcion}</p>
                  </div>
               </div>
               <div className="d-flex flex-row align-items-center">
                  <div style={{width: 80}}>
                     <h5 className="mb-0">$ {p.precio}</h5>
                  </div>
                  <button
                     onClick={() => borrarProducto(p._id)}
                     className="btn btn-danger btn-sm">
                     <i className="bi bi-trash"></i>
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CartCard
