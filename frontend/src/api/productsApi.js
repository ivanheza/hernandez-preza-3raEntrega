import axios from "axios"

export const addNewProduct = async (data) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   }
   //console.log(id, data)
   const response = await axios.post(`/api/productos/`, data, config)

   return response
}
export const editProduct = async (id, data) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   }
   //console.log(id, data)
   const response = await axios.put(`/api/productos/${id}`, data, config)

   return response
}
export const deleteByID = async (id) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   }
   //console.log(id, data)
   const response = await axios.delete(`/api/productos/${id}`, config)

   return response
}
