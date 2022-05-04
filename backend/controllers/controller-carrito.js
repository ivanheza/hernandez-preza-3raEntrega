import dotenv from "dotenv"
dotenv.config()
import CarritosDB from "../model/carritoMongo.js"

let mode = process.env.DATABASE
console.log("variable de entorno", mode)

const getAll = async (req, res) => {
   const carts = await CarritosDB.readAll()

   res.send(carts)
}

const addCart = async (req, res) => {
   console.log(req.body.id)
   const user = {user: req.body.id}

   console.log(user)
   const cart = await CarritosDB.model.findOne(user)
   if (!cart) {
      let newCart = await new CarritosDB.model(user)
      newCart.save()
      console.log("Posting NewCart", newCart)
      res.json({msg: "Carrito Creado Con Exitdo", carrito: newCart})
   } else {
      console.log("Ya Hay")
      res.json({msg: "Ya tienes un carrito", carrito: cart})
   }
}
//GET BY ID
const getCarrito = async (req, res) => {
   const id = req.params.id
   //console.log("IDCART", id)
   let cart = await dbCarrito.readID(id)
   if (!cart) {
      const error = new Error("El Carrito que buscas no existe...")
      return res.status(400).json({msg: error.message})
   }
   res.json(cart)
}

const addToCart = async (req, res) => {
   const {id} = req.params
   const product = req.body
   // console.log(id, "ID CART")
   const actualCart = await CarritosDB.findByID(id)
   // console.log(actualCart)
   if (!actualCart) {
      let newCart = await new CarritosDB.model(user)
      newCart.save()
      console.log("Posting NewCart", newCart)
      res.json({msg: "Carrito Creado Con Exitdo", carrito: newCart})
   } else {
      console.log(actualCart.productos)
      const existe = actualCart.productos.findIndex((p) => p.nombre == product.nombre)

      console.log(existe, "existe")
      if (existe < 0) {
         product.qty = 1

         actualCart.productos.push(product)
         const editado = await actualCart.save()
      } else {
         const prodCarrito = await actualCart.productos.find((p) => p._id == product._id)
         console.log("ya esta en el carrito", prodCarrito)

         prodCarrito.qty = prodCarrito.qty + 1
         console.log(actualCart)
         const editado = await CarritosDB.model.findByIdAndUpdate(id, actualCart, {
            new: true,
            runValidators: true,
            useUnified: true,
         })
         //console.log(actualCart) findByIdAndUpdate
         console.log(editado)
         //console.log(editado, "EDITADO")
      }

      res.json({msg: "Se Agregó Producto", carrito: actualCart})
   }
}

const deleteCart = async (req, res) => {
   try {
      const {id} = req.params
      const buscarCarrito = await CarritosDB.findByID(id)
      if (!buscarCarrito) {
         const error = new Error("El Carrito que buscas no existe...")
         return res.status(400).json({msg: error.message})
      }
      await CarritosDB.deleteByID(id)
      console.log("SE BORRO EL CARRITO")
      res.json({success: true, successMessage: "El carrito se borró con éxito"})
   } catch (error) {
      const msg = "No se pudo borrar el carrito."

      console.log(error)
      res.send({success: false, errorMessage: msg})
   }
}

const deleteProdByID = async (req, res) => {
   const {id} = req.params
   const {id_prod} = req.params
   console.log("Desde delete")
   try {
      const buscarCarrito = await CarritosDB.findByID(id)
      //console.log(buscarCarrito)
      if (!buscarCarrito) {
         const error = new Error("El Carrito que buscas no existe...")
         return res.status(400).json({msg: error.message})
      } else {
         const borrados = buscarCarrito.productos.filter((p) => p._id !== id_prod)
         console.log(borrados, "BORRADOS")
         buscarCarrito.productos = borrados
         await buscarCarrito.save()
         res.status(200).json({msg: "Se Borro un Producto", carrito: buscarCarrito})
      }
   } catch (error) {
      console.log(error)
      res.status(400).json({errorMessage: "Ocurrio un error"})
   }
   //console.log(id, id_prod)
}

export {getAll, addCart, getCarrito, addToCart, deleteCart, deleteProdByID}
