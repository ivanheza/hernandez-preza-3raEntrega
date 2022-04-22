import React from "react"
import * as ReactDOMClient from "react-dom/client"
import "./index.css"
import App from "./App"
import * as bootstrap from "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router} from "react-router-dom"
import UserProvider from "./context/userContext"
import CartProvider from "./context/cartContext"
//
const container = document.getElementById("root")

const root = ReactDOMClient.createRoot(container)

root.render(
   <UserProvider>
      <CartProvider>
         <Router>
            <App />
         </Router>
      </CartProvider>
   </UserProvider>
)
