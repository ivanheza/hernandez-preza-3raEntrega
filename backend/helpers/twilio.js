import twilio from "twilio"

//console.log(process.env.ACCOUNT_SID)
const accountSid = process.env.ACCOUNT_SID
//console.log(process.env.TWILIO_TOKEN)
const authToken = process.env.TWILIO_TOKEN

const client = twilio(accountSid, authToken)

////------- twilio WHATSAPPP

export const twilioWapp = async (body) => {
   const message = await client.messages.create({
      body: body,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5215525646086",
      mediaUrl: "https://browntape.com/wp-content/uploads/2017/09/bb.png",
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
