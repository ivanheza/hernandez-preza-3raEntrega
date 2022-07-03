import CustomError from "../helpers/errorClass.js"
import CarritosModel from "../schema/carritoMongo.js"

import DAO from "./_mainDao.js"

class CarritoDAO extends DAO {
   constructor() {
      super()
      this.collection = CarritosModel
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
         const cart = await this.collection.findOne(data)
         if (!cart) {
            let newCart = await new this.collection(data)
            newCart.save()
            //console.log("Posting NewCart", newCart)
            return {msg: "Carrito Creado Con Exitdo", carrito: newCart}
         } else {
            console.log("Ya Hay")
            return {msg: "Ya tienes un carrito", carrito: cart}
         }
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

         return {success: true, successMessage: "El carrito se borró con éxito"}
      } catch (error) {
         const err = new CustomError(500, "No Existe ID!!", error)
         throw err
      }
   }

   ////
   async getUserByEmail(email) {
      return await this.collection.findOne({email})
   }
}

export default CarritoDAO
