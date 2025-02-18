import React, {useState} from "react"
import {addNewProduct} from "../api/productsApi"
import {errorAlert, successAlert} from "../helpers/alerts"

const ModalAdd = ({hide}) => {
   const [formData, setFormData] = useState({
      nombre: "New Balance",
      precio: 12500,
      foto: "https://cdn-images.farfetch-contents.com/18/42/08/18/18420818_39654851_1000.jpg",
      descripcion: "New Season XC-72",
      codigo: "NB-2302",
      stock: 20,
      successMessage: false,
      errorMessage: false,
   })

   const {
      nombre,
      precio,
      foto,
      descripcion,
      codigo,
      stock,
      successMessage,
      errorMessage,
   } = formData

   const onChange = (e) => {
      //console.log(e.target)
      setFormData({...formData, [e.target.name]: e.target.value})
   }
   const onSubmit = (e) => {
      e.preventDefault()
      //console.log(e)
      const {nombre, precio, foto, descripcion, codigo, stock} = formData
      const datosProducto = {nombre, precio, foto, descripcion, codigo, stock}
      //console.log(datosProducto)

      addNewProduct(datosProducto)
         .then((res) => {
            console.log(res.data)
            setFormData({
               ...formData,
               nombre: "",
               precio: "",
               foto: "",
               descripcion: "",
               codigo: "",
               stock: "",
               errorMessage: false,
               successMessage: res.data.msg,
            })
            setTimeout(() => {
               window.location.reload(false)

               hide()
            }, 1000)
         })
         .catch((err) => {
            console.log(err.response)
            setFormData({
               ...formData,
               errorMessage: err.response.data.errorMessage,
            })
         })
   }
   let modalStyle = {
      display: "block",
      backgroundColor: "rgba(0,0,0,0.8)",
   }

   return (
      <div className="modal show fade" style={modalStyle}>
         <div className="modal-dialog">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                     Agrega Nuevo Producto
                  </h5>
                  <button onClick={hide} className="btn-close"></button>
               </div>
               <div className="modal-body">
                  {errorMessage && errorAlert(errorMessage)}
                  {successMessage && successAlert(successMessage)}

                  <form action="" onSubmit={onSubmit}>
                     <div className="mb-2">
                        <label>Nombre:</label>
                        <input
                           type={"text"}
                           name="nombre"
                           id="nombre"
                           value={nombre}
                           className="form-control"
                           onChange={onChange}
                        />
                     </div>
                     <div className="mb-2">
                        <label>Precio:</label>
                        <input
                           type={"price"}
                           name="precio"
                           id="precio"
                           value={precio}
                           className="form-control"
                           onChange={onChange}
                        />
                     </div>
                     <div className="mb-2">
                        <label>Foto:</label>
                        <input
                           type={"url"}
                           placeholder="Introduce una url válida"
                           name="foto"
                           id="foto"
                           value={foto}
                           className="form-control"
                           onChange={onChange}
                        />
                     </div>
                     <div className="mb-2">
                        <label>Descripción:</label>
                        <input
                           type={"text"}
                           placeholder="Introduce una descripción breve"
                           name="descripcion"
                           id="descripcion"
                           value={descripcion}
                           className="form-control"
                           onChange={onChange}
                        />
                     </div>
                     <div className="mb-2">
                        <label>Codigo:</label>
                        <input
                           type={"text"}
                           placeholder="Código Producto"
                           name="codigo"
                           id="codigo"
                           value={codigo}
                           className="form-control"
                           onChange={onChange}
                        />
                     </div>
                     <div className="mb-2">
                        <label>Stock:</label>
                        <input
                           type={"number"}
                           placeholder="Stock"
                           name="stock"
                           id="stock"
                           value={stock}
                           className="form-control"
                           onChange={onChange}
                        />
                     </div>

                     <div className="modal-footer">
                        <button type="submit" className="btn btn-success">
                           Añadir Nuevo Producto
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ModalAdd
