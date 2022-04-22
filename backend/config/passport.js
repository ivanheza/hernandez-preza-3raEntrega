import {Strategy} from "passport-local"
import passport from "passport"
import Users from "../model/userMongo.js"

passport.use(
   new Strategy(
      {
         usernameField: "email",
         passwordField: "password",
      },
      async (email, password, done) => {
         //////------------------------Verificacion Email
         const user = await Users.getUserByEmail(email)
         //console.log("encontrado", user)
         if (!user) {
            //console.log("usuario no encontrado")
            done(null, false, {message: "Usuario no encontrado"})
         } else {
            //////------------------------Verificacion Password
            const matched = await user.comparePass(password)
            if (matched) {
               return done(null, user, {message: "Usuario Encontrado"})
            } else {
               return done(null, false, {message: "Password incorrecto!!"})
            }
         }
      }
   )
)

passport.serializeUser((user, done) => {
   //console.log(user, "serialize")
   done(null, user.id)
})

passport.deserializeUser((id, done) => {
   Users.model.findById(id, (err, user) => {
      done(err, user)
   })
})
