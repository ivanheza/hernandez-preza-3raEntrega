import multer from "multer"
import mime from "mime-types"

export const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "uploads")
   },
   filename: (req, file, cb) => {
      let nombre = req.body.nombre
      cb(null, nombre.trim() + "." + mime.extension(file.mimetype))
   },
})

export const upload = multer({storage: storage})
