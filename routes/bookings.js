import { Router } from "express"

import { bookingCreationValidation } from "../lib/validation.js"
import { createBookings } from "../controllers/bookings-controller.js"

const router = Router()

// api route for creation of booking
router.post("/booking/create", bookingCreationValidation, createBookings)

// test data
// {
//     "firstName": "John",
//     "lastName": "Doe",
//     "vehicleCategory": 2,
//     "vehicleType": "cruiser",
//     "vehicleName": "Renegade",
//     "startDate": "2023-01-01T08:00:00Z",
//     "endDate": "2023-01-07T18:00:00Z"
// }

export default router
