import axios from "axios"

export const newCart = async (id) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   }

   const response = await axios.post("/api/carrito", JSON.stringify({id}), config)

   return response
}
export const addToCart = async (id, data) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   }
   //console.log(id, data)
   const response = await axios.post(`/api/carrito/${id}/productos`, data, config)

   return response
}
export const deleteProdByID = async (id_cart, id_prod) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   }
   //console.log(typeof id_cart, typeof id_prod)
   const response = await axios.delete(
      `/api/carrito/${id_cart}/productos/${id_prod}`,
      config
   )

   return response
}

export const deleteCart = async (id) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   }
   //console.log(typeof id_cart, typeof id_prod)
   const response = await axios.delete(`/api/carrito/${id}`, config)

   return response
}
