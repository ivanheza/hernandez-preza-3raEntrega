import {Routes, Route, Navigate} from "react-router-dom"

import NavBar from "./components/NavBar"
import Signup from "./components/Signup"
import Login from "./components/Login"

import UserDashboard from "./components/UserDashboard"
import AdminDashboard from "./components/AdminDashboard"
import ProtectedRoute from "./routes/protectedRoute"
import {useUserContext} from "./context/userContext"
import Cart from "./components/Cart"
import {useEffect} from "react"

function App() {
   const {user} = useUserContext()

   useEffect(() => {}, [user])

   //console.log(user)
   return (
      <div className="container-xl">
         <NavBar />

         <Routes>
            <Route path="/" element={<Navigate to={"/login"} replace />} />
            <Route path="/signup" element={<Signup user={user} />} />
            <Route path="/login" element={<Login user={user} />} />
            <Route element={<ProtectedRoute user={user} />}>
               <Route path="/cart" element={<Cart user={user} />} />
               <Route path="/user/dashboard" element={<UserDashboard user={user} />} />
               <Route path="/admin/dashboard" element={<AdminDashboard user={user} />} />
            </Route>
         </Routes>
      </div>
   )
}

export default App
