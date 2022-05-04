import express from "express"
import {getOrden, nuevaOrden} from "../controllers/controller-orden.js"

const router = express.Router()

router.get("/", getOrden)
router.post("/", nuevaOrden)
export default router
