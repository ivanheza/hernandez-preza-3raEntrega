import passport from "passport"
import logger from "../helpers/logger-winston.js "
import UsersDao from "../services/UsersDao.js"
import {nodeMailerOptions, transporter} from "../helpers/nodeMailer.js"
const DAO = new UsersDao()

///Login Controller
export const signup = async (req, res) => {
   try {
      const {email, password, nombre, direccion, edad, telefono} = req.body
      const buscado = await DAO.getUserByEmail(email)
      if (buscado) {
         console.log("usuario existe")
         res.status(400).json({errorMessage: "Ya existe un usuario con ese correo"})
      } else {
         const foto = req.file.path
         console.log(foto)
         let User = {
            email,
            password,
            nombre,
            direccion,
            edad,
            telefono,
            foto,
         }
         if (!foto) {
            res.status(400).json({errorMessage: "Debes agregar un archivo"})
         }
         const signup = await DAO.newUser(User)
         let html = `<h1>Se registro un nuevo usuario</h1> <hr/>
                     <ul>
                     <li>Nombre: ${nombre}</li>
                     <li>Email: ${email}</li>
                     <li>Edad: ${edad}</li>
                     <li>Teléfono: ${telefono}</li>
                     </ul>`
         const mailOption = nodeMailerOptions("¡Nuevo Usuario Registrado!", html)
         const info = await transporter.sendMail(mailOption)
         console.log(info)

         res.json({successMessage: "Registration Succes. Please Login"})
      }
   } catch (error) {
      res.status(400).json({
         errorMessage: "Algo Salió Mal... Revisa los datos y completa el formulario.",
      })
      logger.error("Error en el signup")
      console.log(error)
   }
}
//// LOGIN
export const login = (req, res, next) => {
   console.log("desde post LOGIN")
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
}

////GET USER loggeado

export const getUser = (req, res) => {
   console.log(req, "GetUser")

   if (req.user) {
      res.json(req.user)
   } else {
      res.status(400).json({errorMessage: "Not Logged"})
   }
}
///Logout

export const logOut = (req, res) => {
   try {
      console.log("desde get Logout")

      // res.json({user: req.session.user, msg: "Adios"})

      console.log(req.session)
      req.session.destroy((err) => {
         if (err) {
            console.log(err)
         }
         req.logOut()
         res.clearCookie("connect.sid")

         return res.json({msg: "Adios"})
      })
   } catch (error) {
      logger.error(error)
   }
}
