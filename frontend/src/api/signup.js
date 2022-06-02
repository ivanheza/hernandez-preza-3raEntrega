import axios from "axios"

export const signup = async (d) => {
   const response = await axios.post("/api/auth/signup", d)

   return response
}
