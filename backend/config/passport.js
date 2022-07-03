import {Strategy} from "passport-local"
import passport from "passport"

import UsersDao from "../services/UsersDao.js"

const DAO = new UsersDao()

passport.use(
   new Strategy(
      {
         usernameField: "email",
         passwordField: "password",
      },
      async (email, password, done) => {
         //////------------------------Verificacion Email
         const user = await DAO.getUserByEmail(email)
         console.log("encontrado", user)
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
   DAO.collection.findById(id, (err, user) => {
      // console.log("deserialize", user)

      done(err, user)
   })
   /*  DAO.readID(id, (err, user) => {
      done(err, user)
   }) */
})
