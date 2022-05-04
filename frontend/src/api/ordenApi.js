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

export const getOrders = async () => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   }

   const response = await axios.get("/api/orden", config)

   return response
}
