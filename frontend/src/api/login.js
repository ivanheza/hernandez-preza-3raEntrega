import axios from "axios"

export const loginUser = async (data) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   }

   const response = await axios.post("/api/auth/login", data, config)

   return response
}
