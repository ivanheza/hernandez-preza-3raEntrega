import express from "express"
import Users from "../model/userMongo.js"
import passport from "passport"
import isAuthenticated from "../helpers/isAuth.js"
import {upload} from "../helpers/multer.js"
import {nodeMailerOptions, transporter} from "../helpers/nodeMailer.js"

const router = express.Router()

router.post("/signup", upload.single("file"), async (req, res) => {
   try {
      const {email, password, nombre, direccion, edad, telefono} = req.body
      const buscado = await Users.getUserByEmail(email)
      if (buscado) {
         console.log("usuario existe")
         res.status(400).json({errorMessage: "Ya existe un usuario con ese correo"})
      } else {
         const foto = req.file.path
         if (!foto) {
            res.status(400).json({errorMessage: "Debes agregar un archivo"})
         }
         console.log("Creando Usuario")

         const newUser = new Users.model({
            email,
            password,
            nombre,
            direccion,
            edad,
            telefono,
            foto,
         })
         newUser.password = await newUser.encryptPass(password)
         //console.log("user con pass hasheado", newUser)
         await newUser.save()
         let html = `<h1>Se registro un nuevo usuario</h1> <hr/>
                     <ul>
                     <li>${nombre}</li>
                     <li>${email}</li>
                     <li>${edad}</li>
                     <li>${telefono}</li>
                     </ul>`
         const mailOption = nodeMailerOptions(html)
         await transporter.sendMail(mailOption)

         res.json({successMessage: "Registration Succes. Please Login"})
      }
   } catch (error) {
      res.status(400).json({
         errorMessage: "Algo Salió Mal... Revisa los datos y completa el formulario.",
      })
   }
})

router.post("/login", (req, res, next) => {
   console.log("desde post")
   passport.authenticate("local", (err, user, info) => {
      if (user) {
         req.logIn(user, (err) => {
            if (err) throw err
            let user = req.user
            console.log(user, "USUARIO")
            res.json({auth: true, user: req.user, msg: "Exitosó"}).send()
         })
      } else {
         console.log(info)

         res.status(400).json({errorMessage: info.message})
      }
      //console.log("user", user)
   })(req, res, next)
})

///

router.get("/user", isAuthenticated, (req, res) => {
   console.log(req.isAuthenticated())
   if (req.user) {
      res.json(req.user)
   } else {
      res.status(400).json({errorMessage: "Not Logged"})
   }
})

router.get("/logout", (req, res) => {
   // res.json({user: req.session.user, msg: "Adios"})
   req.session.destroy((err) => {
      if (err) {
         console.log(err)
      }
      req.logOut()
      res.clearCookie("connect.sid")

      return res.json({msg: "Adios"})
   })
})

export default router
