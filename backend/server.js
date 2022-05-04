import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import {dirname} from "path"
import {fileURLToPath} from "url"
import session from "express-session"
import cookieparser from "cookie-parser"
import passport from "passport"
import morgan from "morgan"
///---Rutas
import rutasProductos from "./routes/routes-productos.js"
import rutasCarrito from "./routes/routes-carrito.js"
import rutasAuth from "./routes/routes-auth.js"
import rutasOrden from "./routes/routes-orden.js"
import connectDB from "./config/mongodb.js"
///-- Passport
import "./config/passport.js"

const app = express()
dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
///---- Config Middlewares

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(
   session({
      secret: "secretcode",
      resave: false,
      saveUninitialized: false,
      cookie: {
         ///---espacio por sesión de 10min
         maxAge: 600000,
      },
   })
)
app.use(cookieparser("secretcode"))
app.use(passport.initialize())
app.use(passport.session())
app.use("/uploads", express.static(process.cwd() + "/uploads"))
app.use("/backend/public", express.static(process.cwd() + "/backend/public"))

//-----------------------------------------
connectDB()

app.use("/api/productos", rutasProductos)
app.use("/api/auth", rutasAuth)
app.use("/api/carrito", rutasCarrito)
app.use("/api/orden", rutasOrden)
app.use("/", (req, res) => {
   // Here user can also design an
   // error page and render it
   res.send("Server Running")
})

app.use("*", (req, res) => {
   // Here user can also design an
   // error page and render it
   res.status(400).json({error: 0, descripcion: "La ruta que buscas no existe"})
})

const PORT = process.env.PORT || 8080

app.listen(PORT, (err) => {
   if (err) {
      throw new Error(`Error en el Servidor ${err}`)
   }

   console.log(`Servidor Funcionando en el Puerto ${PORT}`)
})
