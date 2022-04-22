import ContenedorMongo from "../containers/contenedorMongo.js"
import mongoose from "mongoose"
import productoSchema from "../schema/productoMongo.js"

const ProductosModel = mongoose.model("Productos", productoSchema)

const Productos = new ContenedorMongo(ProductosModel)

export default Productos
