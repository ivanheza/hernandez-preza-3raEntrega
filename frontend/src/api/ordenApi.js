import axios from "axios"

export const nuevaOrden = async (orden) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   }

   const response = await axios.post("/api/orden", orden, config)

   return response
}

export const getOrders = async (nombre) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   }

   const response = await axios.get("/api/orden/", {params: {nombre: nombre}})

   return response
}
