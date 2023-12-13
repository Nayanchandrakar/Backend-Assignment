import {
  getVehicleName,
  createVehicleName,
} from "../controllers/name-vehicle-controller.js"
import { type, typeVehicleNameValidation } from "../lib/validation.js"

import { Router } from "express"

const router = Router()

// route for fetching type of vehicles by their types
router.get("/vehicle/:type", type, getVehicleName)

// route for creating new vehicle name
router.post(
  "/vehicle/type/create",
  typeVehicleNameValidation,
  createVehicleName
)

export default router
