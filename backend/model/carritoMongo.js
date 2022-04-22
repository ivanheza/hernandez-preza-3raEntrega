import mongoose from "mongoose"
import ContenedorMongo from "../containers/contenedorMongo.js"
import carritoSchema from "../schema/carritoMongo.js"

const CarritosModel = mongoose.model("Carrito", carritoSchema)
const CarritosDB = new ContenedorMongo(CarritosModel)

/* class CarritosDB extends ContenedorMongo {
   constructor() {
      super(Carrito)
   }
   async addCart() {
      try {
         const model = await new Carrito()
         const savedCart = await model.save()
         return savedCart
      } catch (error) {
         console.log(error)
      }
   }
  
   async deleteCart(cartID) {
      try {
         const existe = await pdb.findOne({_id: cartID})
         if (!existe) {
            return false
         }
         const productos = await Productos.deleteOne({cartID})
         //console.log(productos)
         return "El Producto Fue Borrado con éxito"
      } catch (error) {
         console.log(error)
      }
   }

   async deleteProdByID(cartID, productID) {
      try {
         const existe = await this.readID(cartID)
         if (!existe) {
            return false
         }
         const borrados = existe.productos.filter((p) => {
            new String(p._id).trim() !== p._id
         })
         console.log("Se Borro", borrados)
      } catch (error) {
         console.log("ocurrio un error...", error)
      }
   }
} */

export default CarritosDB
