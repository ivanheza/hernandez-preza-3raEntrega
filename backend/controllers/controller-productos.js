import dotenv from "dotenv"
dotenv.config()
import productsDB from "../model/productosMongo.js"

///FOR USERS
const getProducts = async (req, res) => {
   const data = await productsDB.readAll()
   if (data == false) {
      const error = new Error("no hay datos")
      return res.status(400).json({msg: error.message})
   }
   res.json(data)
}

const getByID = async (req, res) => {
   const {id} = req.params
   //console.log(id)
   //const result = await db.readID(id)
   const result = await productsDB.findByID(id)

   if (!result) {
      const error = new Error("El Producto No Existe")
      return res.status(400).json({msg: error.message})
   }
   res.status(200).json(result)
}

//ADMIN

const addProduct = async (req, res) => {
   const {nombre} = req.body
   const existe = await productsDB.model.findOne({nombre: nombre})
   //console.log(req.body, "ReqBody")
   //console.log(existe)
   if (existe) {
      res.status(400).json({errorMessage: "Ya existe un producto con ese nombre."})
   } else {
      console.log("vamos a guardar")
      const producto = await productsDB.newProduct(req.body)
      res.json({msg: "Se añadió un nuevo producto", producto})
   }
}

const editByID = async (req, res) => {
   const id = req.params.id
   console.log(id)

   const editado = await productsDB.editByID(id, req.body)

   res.status(200).json({
      successMessage: "El producto se editó con éxito",
      producto: editado,
   })
}

const deleteById = async (req, res) => {
   const {id} = req.params

   console.log(id, "BORRAR")
   const result = await productsDB.deleteByID(id)

   if (result == false) {
      return res.status(400).json({errorMessage: "No se encontro el producto..."})
   }

   res.status(200).json({successMessage: result})
   //console.log(id)
}

export {getProducts, getByID, addProduct, editByID, deleteById}
