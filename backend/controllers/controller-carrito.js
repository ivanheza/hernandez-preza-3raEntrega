import logger from "../helpers/logger-winston.js"
import CarritoDAO from "../services/CarritoDao.js"

const CarritosDB = new CarritoDAO()

const getAll = async (req, res) => {
   try {
      console.log("desde get all carrito")
      const carts = await CarritosDB.readAll()

      res.send(carts)
   } catch (error) {
      res.status(404).json({errorMessage: error.message})
      logger.error(error.message)
   }
}

const addCart = async (req, res) => {
   try {
      console.log(req.body)
      const user = {user: req.body.id}
      const cart = await CarritosDB.guardarNuevo(user)
      console.log(cart)
      res.json(cart)
   } catch (error) {
      res.status(404).json({errorMessage: error.message})
      logger.error(error.message)
      console.log(error)
   }
}
//GET BY ID
const getCarrito = async (req, res) => {
   try {
      const id = req.params.id
      console.log("IDCART", id)
      let cart = await CarritosDB.readID(id)
      res.json(cart)
   } catch (error) {
      res.status(404).json({errorMessage: error.message})
      logger.error(error.message)
   }
}

const addToCart = async (req, res) => {
   try {
      const {id} = req.params
      const product = req.body
      // console.log(id, "ID CART")
      const actualCart = await CarritosDB.readID(id)
      // console.log(actualCart)
      if (!actualCart) {
         let newCart = await new CarritosDB.collection(user)
         newCart.save()
         console.log("Posting NewCart", newCart)
         res.json({msg: "Carrito Creado Con Exito", carrito: newCart})
      } else {
         console.log(actualCart.productos)
         const existe = actualCart.productos.findIndex((p) => p.nombre == product.nombre)

         console.log(existe, "existe")
         if (existe < 0) {
            product.qty = 1

            actualCart.productos.push(product)
            const editado = await actualCart.save()
         } else {
            const prodCarrito = await actualCart.productos.find(
               (p) => p._id == product._id
            )
            console.log("ya esta en el carrito", prodCarrito)

            prodCarrito.qty = prodCarrito.qty + 1
            console.log(actualCart)
            const editado = await CarritosDB.collection.findByIdAndUpdate(
               id,
               actualCart,
               {
                  new: true,
                  runValidators: true,
                  useUnified: true,
               }
            )
            //console.log(actualCart) findByIdAndUpdate
            console.log(editado)
            //console.log(editado, "EDITADO")
         }

         res.json({msg: "Se Agregó Producto", carrito: actualCart})
      }
   } catch (error) {
      logger.error(error.message)
      res.status(404).json({errorMessage: error.message})
   }
}

const deleteCart = async (req, res) => {
   try {
      const {id} = req.params
      const borrar = await CarritosDB.borrar(id)
      console.log("SE BORRO EL CARRITO")
      res.json(borrar)
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
      const buscarCarrito = await CarritosDB.readID(id)
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
      logger.error(error.message)
      res.status(404).json({errorMessage: "Ocurrio un error"})
   }
   //console.log(id, id_prod)
}

export {getAll, addCart, getCarrito, addToCart, deleteCart, deleteProdByID}
