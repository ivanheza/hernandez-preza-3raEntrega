import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      nombre: {
         type: String,
         required: true,
      },
      direccion: {
         type: String,
         required: true,
      },
      edad: {
         type: Number,
         default: 0,
      },
      telefono: {
         type: Number,
         default: 0,
      },
      foto: {
         type: String,
         required: true,
      },
      role: {
         type: Number,
         default: 0,
      },
      /// 1 = Administrador ///Default 0 = Usuario Normal
   },
   {timestamps: true}
)
userSchema.methods.encryptPass = async (password) => {
   //Encriptado de contraseña
   const salt = await bcrypt.genSalt(5)

   return await bcrypt.hash(password, salt)
}
userSchema.methods.comparePass = async function (password) {
   ///Devuelve un true si esta bien el password
   return await bcrypt.compare(password, this.password)
}

export default userSchema
