import express from "express"
import passport from "passport"

import isAuthenticated from "../helpers/isAuth.js"
import {upload} from "../helpers/multer.js"
import {getUser, login, logOut, signup} from "../controllers/controller-users.js"

const router = express.Router()

router.post("/signup", upload.single("file"), signup)

router.post("/login", login)

///

router.get("/user", isAuthenticated, (req, res) => {
   console.log(req.isAuthenticated())
   if (req.user) {
      res.json(req.user)
   } else {
      res.status(400).json({errorMessage: "Not Logged"})
   }
})

router.get("/logout", logOut)

export default router
