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
const router = express.Router()
///-- Passport
import "./config/passport.js"
///-- Logger
import logger from "./helpers/logger-winston.js"
///CLUSTER
import cluster from "cluster"
import {cpus} from "os"
import process from "process"

const MODO_CLUSTER = process.argv[2] == "CLUSTER"

if (MODO_CLUSTER && cluster.isPrimary) {
   const numCPUs = cpus().length

   console.log(`Número de procesadores: ${numCPUs}`)

   console.log(`PID MASTER ${process.pid}`)

   for (let i = 0; i < numCPUs; i++) {
      cluster.fork()
   }

   cluster.on("exit", (worker) => {
      console.log("Worker", worker.process.pid, "died", new Date().toLocaleString())
      cluster.fork()
   })
} else {
   /////////////////////////////////////////-----
   // servidor api
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
   app.use("/server", (req, res) => {
      res.send("Server Running")
   })

   app.use("*", (req, res) => {
      const {url, method} = req

      //      console.log(method, url, "metodos")
      logger.error(`Ruta ${method} ${url} no implementada`)
      res.status(404).json({error: 0, descripcion: "La ruta que buscas no existe"})
   })

   const PORT = process.env.PORT || 8080

   app.listen(PORT, (err) => {
      if (err) {
         logger.error("Error en el servidor")
         throw new Error(`Error en el Servidor ${err}`)
      }

      console.log(`Servidor Funcionando en el Puerto ${PORT}`)
   })
}
