import logger from "../helpers/logger-winston.js"
import {nodeMailerOptions, transporter} from "../helpers/nodeMailer.js"
import {twilioSMS, twilioWapp} from "../helpers/twilio.js"
import ordenDB from "../model/ordenMongo.js"
import Users from "../model/userMongo.js"

export const getOrden = async (req, res) => {
   const {nombre} = req.query
   //console.log(email)
   try {
      const orders = await ordenDB.model.findOne({nombre: nombre})
      console.log(orders)

      res.send({success: true, orders})
   } catch (error) {
      logger.error(error)
      const msg = "Ocurrió un error"
      res.send({success: false, errorMessage: msg})
   }
}
export const nuevaOrden = async (req, res) => {
   try {
      const {cliente, productos, total} = req.body

      const user = await Users.findByID(cliente)

      console.log(user)
      if (user) {
         const nuevaOrden = await ordenDB.model({
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
         console.log(sms)
         res.status(200).send({
            success: true,
            successMessage: "Tu pedido se generó con éxito ",
         })
      }
   } catch (error) {
      logger.error(error)
      const msg = "Ocurrió un error al procesar tu orden."
      res.send({success: false, errorMessage: msg})
   }
}
