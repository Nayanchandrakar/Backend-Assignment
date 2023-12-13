import {
  createVehicleType,
  getVehicleType,
} from "../controllers/vehicle-type-controller.js"
import { checkWheels, typeValidation } from "../lib/validation.js"

import { Router } from "express"

const router = Router()

// route for fetching types by no. of wheels
router.get("/vehicle/type/:wheels", checkWheels, getVehicleType)

// route for creating types for vehicle name listings
router.post("/vehicle/type/create", typeValidation, createVehicleType)

export default router
