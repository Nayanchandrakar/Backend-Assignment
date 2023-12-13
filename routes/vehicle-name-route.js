import {
  getVehicleName,
  createVehicleName,
} from "../controllers/name-vehicle-controller.js"
import { type, typeVehicleNameValidation } from "../lib/validation.js"

import { Router } from "express"

const router = Router()

// route for fetching type of vehicles by no. of wheels
router.get("/vehicle/:type", type, getVehicleName)

router.post(
  "/vehicle/type/create",
  typeVehicleNameValidation,
  createVehicleName
)

export default router
