import {createTransport} from "nodemailer"
import fs from "fs"
export const transporter = createTransport({
   host: "smtp.gmail.com",
   port: 587,
   //secure: true, // use SSL   port: 587,
   auth: {
      user: process.env.MAIL,
      pass: process.env.MAILPASS,
   },
})

export const nodeMailerOptions = (subject, html) => {
   try {
      const mailOptions = {
         from: "Server eCommerce Node.js",
         to: process.env.MAIL,
         subject: subject,
         html: html,
         ///ruta relativa
         /* attachments: [
            {
               // stream as an attachment
               filename: "image.jpg",
               content: fs.createReadStream("/public/Pepe Perez.jpeg"),
            },
         ], */
      }
      return mailOptions
   } catch (error) {
      console.log(error)
   }
}
