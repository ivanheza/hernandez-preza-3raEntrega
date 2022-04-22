import axios from "axios"

export const authUser = async () => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   }

   const response = await axios.get("/api/auth/user", {withCredentials: true})

   return response
}
