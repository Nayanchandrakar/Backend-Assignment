import { Router } from "express"
import {
  createVehicleCategory,
  getVehicleCategory,
} from "../controllers/vehicle-controller.js"
import { createCategory } from "../lib/validation.js"

const router = Router()

// route for fetching category of vehicles
router.get("/vehicle/category", getVehicleCategory)

router.post("/vehicle/category/create", createCategory, createVehicleCategory)

export default router
