import mongoose from "mongoose"
import ContenedorMongo from "../containers/contenedorMongo.js"
import carritoSchema from "../schema/carritoMongo.js"

const CarritosModel = mongoose.model("Carrito", carritoSchema)
const CarritosDB = new ContenedorMongo(CarritosModel)

export default CarritosDB
