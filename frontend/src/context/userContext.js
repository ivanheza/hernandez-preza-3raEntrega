import {createContext, useContext, useEffect, useState} from "react"
import {authUser} from "../api/auth"
import {deleteCookie, getCookie} from "../helpers/cookies"
import {
   deleteLocalStorage,
   getLocalStorage,
   setLocalStorage,
} from "../helpers/localStorage"
import axios from "axios"

const UserContext = createContext([])

export const useUserContext = () => useContext(UserContext)

function UserProvider({children}) {
   const [user, setUser] = useState(getLocalStorage("user"))
   // console.log(user)
   const [productos, setProductos] = useState([])

   const getProducts = async () => {
      try {
         //Firestore
         const res = await axios.get("http://localhost:9000/api/productos")
         console.log(res)
         const data = res.data
         setProductos(data)
         console.log(productos)
         //traemos toda la coleccion
      } catch (error) {
         console.log(error)
      }
   }
   const saveUser = ({user}) => {
      getCookie("connect.sid")
      setUser(user)
      authUser()
         .then((res) => {
            //console.log(res.data)
            setLocalStorage("user", res.data)
         })
         .catch((err) => {
            //console.log(err.response)
            setUser(err.response.errorMessage)
         })
   }
   const exitUser = () => {
      setUser("")
      deleteCookie("connect.sid")
      deleteLocalStorage("user")
      deleteLocalStorage("cart")
   }

   useEffect(() => {
      getLocalStorage("user")
   }, [user])
   return (
      <UserContext.Provider value={{getProducts, productos, saveUser, exitUser, user}}>
         {children}
      </UserContext.Provider>
   )
}

export default UserProvider
