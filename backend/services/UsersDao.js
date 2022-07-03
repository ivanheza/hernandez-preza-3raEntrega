import UsersModel from "../schema/userSchema.js"
import DAO from "./_mainDao.js"
import CustomError from "../helpers/errorClass.js"

class UsersDao extends DAO {
   constructor() {
      super()
      this.collection = UsersModel
   }

   async readData() {
      try {
         const data = await this.collection.find({})
         //console.log(data)
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
   ///NEW USER
   async newUser(data) {
      const newUser = new this.collection(data)
      console.log(data)
      newUser.password = await newUser.encryptPass(data.password)
      await newUser.save()

      console.log("Creando Usuario")
      return newUser
   }
   ////
   async getUserByEmail(email) {
      return await this.collection.findOne({email})
   }
}

export default UsersDao
