import mongoose from "mongoose"
import ContenedorMongo from "../containers/contenedorMongo.js"
import ordenSchema from "../schema/ordenSchema.js"

const Orden = mongoose.model("Pedidos", ordenSchema)
const ordenDB = new ContenedorMongo(Orden)

export default ordenDB
