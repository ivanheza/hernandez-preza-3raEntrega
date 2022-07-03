import express from "express"
const router = express.Router()

import {getOrden, nuevaOrden} from "../controllers/controller-orden.js"

router.get("/", getOrden)
router.post("/", nuevaOrden)

export default router
