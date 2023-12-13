import { Router } from "express"
import { getVehicle } from "../controllers/vehicle-controller.js"
import { checkWheels } from "../lib/validation.js"

const router = Router()

// route for fetching type of vehicles by no. of wheels
router.get("/vehicle/:wheels", checkWheels, getVehicle)

export default router
