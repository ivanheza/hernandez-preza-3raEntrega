import {createTransport} from "nodemailer"

export const transporter = createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true, // use SSL   port: 587,
   auth: {
      user: process.env.MAIL,
      pass: process.env.MAILPASS,
   },
})

export const nodeMailerOptions = (subject, html) => {
   const mailOptions = {
      from: "Server eCommerce Node.js",
      to: process.env.MAIL,
      subject: subject,
      html: html,
   }
   return mailOptions
}
