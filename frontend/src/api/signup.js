import axios from "axios"

export const signup = async (d) => {
   const config = {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   }
   let postprueba = "http://httpbin.org/anything"

   const response = await axios.post("/api/auth/signup", d)

   return response
}
