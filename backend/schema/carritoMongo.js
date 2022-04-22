import idGenerate from "../helpers/idGenerate.js"
import mongoose from "mongoose"

const carritoSchema = mongoose.Schema(
   {
      user: {
         type: String,
         required: true,
      },
      productos: {
         type: Array,
         default: [],
      },
   },
   {timestamps: true}
)

//const Productos = mongoose.model("Productos", productoSchema)

export default carritoSchema
