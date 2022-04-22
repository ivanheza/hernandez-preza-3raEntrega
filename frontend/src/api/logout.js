import axios from "axios"

export const logout = async (data) => {
   const response = await axios.get("/api/auth/logout", {withCredentials: true})

   return response
}
