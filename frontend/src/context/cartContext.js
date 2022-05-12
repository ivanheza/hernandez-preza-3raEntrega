import {createContext, useContext, useEffect, useState} from "react"
import {addToCart, deleteCart, deleteProdByID, newCart} from "../api/cartApi"

import {
   deleteLocalStorage,
   getLocalStorage,
   setLocalStorage,
} from "../helpers/localStorage"

const CartContext = createContext([])

export const useCartContext = () => useContext(CartContext)

function CartProvider({children}) {
   const def = {
      productos: [],
   }
   const [cart, setCart] = useState(
      getLocalStorage("cart") ? getLocalStorage("cart") : def
   )
   //console.log(cart)
   console.log()

   ///
   const getCart = (id) => {
      //console.log(id)
      newCart(id).then((res) => {
         //console.log(res)
         const carrrito = res.data.carrito
         //console.log(carrrito)
         setCart(carrrito)
         setLocalStorage("cart", carrrito)
      })
   }

   const handleAdd = (producto) => {
      //console.log("desde handle", producto, cart._id)
      addToCart(cart._id, producto).then((res) => {
         //console.log(res)
         const carrrito = res.data.carrito
         setCart(carrrito)
         setLocalStorage("cart", carrrito)
      })
   }
   const borrarProducto = (id_prod) => {
      //console.log(cart._id)

      deleteProdByID(cart._id, id_prod).then((res) => {
         const carrrito = res.data.carrito
         setCart(carrrito)
         setLocalStorage("cart", carrrito)
      })
   }
   const borarrCarrito = async (id) => {
      try {
         const deleted = await deleteCart(id)
         deleteLocalStorage("cart")
         setCart(def)

         newCart(id).then((res) => {
            //console.log(res)
            const carrrito = res.data.carrito
            console.log(carrrito)
            setCart(carrrito)
            setLocalStorage("cart", carrrito)
            console.log("Se Creo un nuevo carrito")
         })
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getLocalStorage("cart")
   }, [cart])

   return (
      <CartContext.Provider
         value={{getCart, borrarProducto, handleAdd, borarrCarrito, cart}}>
         {children}
      </CartContext.Provider>
   )
}

export default CartProvider
