import twilio from "twilio"
const accountSid = "AC999beca9e708c9108ab2b2d1b9a6075b"
const authToken = "6f99566716a0670f394ee1616c9d5b46"
const client = twilio(accountSid, authToken)

////------- twilio WHATSAPP

export const twilioWapp = async (body) => {
   const message = await client.messages.create({
      body: body,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5215525646086",
      mediaUrl:
         "https://www.aticascipione.com.br/wp-content/uploads/2019/05/logo-hello.png",
   })
   return message
}

////------- twilio SMS

export const twilioSMS = async (mensaje, telefono) => {
   const message = await client.messages.create({
      body: mensaje,
      from: "+19793644599",
      to: `+52${telefono}`,
   })
   return message
}
