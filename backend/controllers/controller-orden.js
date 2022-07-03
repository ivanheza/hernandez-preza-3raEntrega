import logger from "../helpers/logger-winston.js"
import {nodeMailerOptions, transporter} from "../helpers/nodeMailer.js"
import {twilioSMS, twilioWapp} from "../helpers/twilio.js"
import OrdersDAO from "../services/OrdersDao.js"
import UsersDao from "../services/UsersDao.js"

const ordenDB = new OrdersDAO()
const Users = new UsersDao()

const getOrden = async (req, res) => {
   const {nombre} = req.query
   console.log(req.query)
   try {
      console.log("desde Orden")
      const orders = await ordenDB.collection.find({nombre: nombre})
      console.log(orders, "ORDERS")

      res.status(200).json({success: true, orders})
   } catch (error) {
      logger.error(error)
      console.log("error en orden")
      const msg = "Ocurrió un error"
      res.send({success: false, errorMessage: msg})
   }
}
const nuevaOrden = async (req, res) => {
   try {
      const {cliente, productos, total} = req.body

      const user = await Users.readID(cliente)

      console.log(user)
      if (user) {
         const nuevaOrden = await ordenDB.collection({
            nombre: user.nombre,
            email: user.email,
            telefono: user.telefono,
            productos,
            total,
         })
         await nuevaOrden.save()
         let subject = `Nuevo pedido de ${user.nombre}`
         let html = `
         <h3>${user.nombre}</h3>
         <h3>${user.email}</h3>
         <h3>${user.telefono}</h3>
         <hr />
         <ul>
         ${productos.map((p) => {
            return `
            <li>${p.nombre}</li>
            <li>$ ${p.precio}</li>
            `
         })}
         <br /><hr />   
         <li>Total: $ ${total}</li>
         </ul>
         `

         ////----- nodeMailer
         const mailOptions = nodeMailerOptions(subject, html)
         const send = await transporter.sendMail(mailOptions)
         console.log(send)

         ////----- twilio Whatsapp
         const whatsapp = await twilioWapp(subject)
         console.log(whatsapp)
         ////----- twilio SMS
         const smsBody =
            "Tu pedido ha sido recibído y se encuentra en proceso. ¡Gracias por tu compra!"
         const sms = await twilioSMS(smsBody, user.telefono)
         //console.log(sms)

         res.status(200).send({
            success: true,
            successMessage: "El pedido se generó con éxito",
         })
      }
   } catch (error) {
      logger.error(error)
      const msg = "Ocurrió un error al procesar tu orden."
      res.send({success: false, errorMessage: msg})
   }
}

export {getOrden, nuevaOrden}
