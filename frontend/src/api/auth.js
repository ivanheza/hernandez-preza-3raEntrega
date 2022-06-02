import axios from "axios"

export const authUser = async () => {
   const response = await axios.get("/api/auth/user", {withCredentials: true})

   return response
}
