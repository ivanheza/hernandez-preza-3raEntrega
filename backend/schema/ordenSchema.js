import mongoose from "mongoose"

const ordenSchema = mongoose.Schema(
   {
      nombre: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      telefono: {
         type: Number,
         required: true,
      },
      productos: {
         type: Array,
         default: [],
      },
      total: {
         type: Number,
         default: 0,
      },
   },
   {timestamps: true}
)

export default ordenSchema
