import multer from "multer"
import mime from "mime-types"

export const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "./backend/public")
   },
   filename: (req, file, cb) => {
      let nombre = req.body.nombre
      nombre = nombre.split(" ").join("")
      cb(null, nombre + "_img" + Date.now() + "." + mime.extension(file.mimetype))
   },
})

export const upload = multer({storage: storage})
