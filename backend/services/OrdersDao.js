import DAO from "./_mainDao.js"
import CustomError from "../helpers/errorClass.js"
import OrdenMod from "../schema/ordenSchema.js"

class OrdersDAO extends DAO {
   constructor() {
      super()
      this.collection = OrdenMod
   }

   async readData() {
      try {
         const data = await this.collection.find({})
         console.log(data, "desde DATA")
         return data
      } catch (error) {
         const err = new CustomError(500, "Error leyendo productos", error)
         throw err
      }
   }
   //Metodo para encontrar un elemento por ID
   async readID(id) {
      try {
         const elem = await this.collection.findOne({_id: id})
         return elem
      } catch (error) {
         const err = new CustomError(500, "Error en ReadID", error)
         throw err
      }
   }
   //Metodo para guardar un nuevo dato
   async guardarNuevo(data) {
      try {
         let doc = await this.collection.create(data)
         return doc
      } catch (error) {
         const err = new CustomError(500, "Error en GuardarNuevo", error)
         throw err
      }
   }
   // Metodo para actualizar datos

   //Metodo para borrar por ID

   async borrar(id) {
      try {
         const existe = await this.collection.findOne({_id: id})
         if (!existe) {
            return false
         }
         //console.log("EXISTEE!!", existe)
         await this.collection.deleteOne({_id: id})

         return "El Producto Se Borro !"
      } catch (error) {
         const err = new CustomError(500, "Error en borrar!!", error)
         throw err
      }
   }

   async getUserByEmail(email) {
      return await this.collection.findOne({email})
   }
}

export default OrdersDAO
