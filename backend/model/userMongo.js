import mongoose from "mongoose"
import ContenedorMongo from "../containers/contenedorMongo.js"
import userSchema from "../schema/user.js"

const UsersModel = mongoose.model("Users", userSchema)

const Users = new ContenedorMongo(UsersModel)

export default Users
