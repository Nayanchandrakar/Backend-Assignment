import {
  createVehicleType,
  getVehicleType,
} from "../controllers/vehicle-type-controller.js"
import { checkWheels, typeValidation } from "../lib/validation.js"

import { Router } from "express"

const router = Router()

// route for fetching type of vehicles by no. of wheels
router.get("/vehicle/type/:wheels", checkWheels, getVehicleType)

router.post("/vehicle/type/create", typeValidation, createVehicleType)

export default router
