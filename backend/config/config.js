import dotenv from "dotenv"

dotenv.config()

///---- ///---- Se configurará desde aqui el acceso a base de datos
export default {
   mongoDB: {
      client: "mongodb",
      cnxStr: process.env.MONGO_URI,
   },

   fileSystem: {
      path: "./db",
   },
   facebook: {
      appID: process.env.FACEBOOK_APP_ID,
      appSecret: process.env.FACEBOOK_APP_SECRET,
   },
   jwtKeys: {
      jwtSecret: process.env.JWT_SECRET,
      jwtExpire: process.env.JWT_EXPIRES,
   },
}
