import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import vehicleCategory from "./routes/vehicle-route.js"
import vehicleType from "./routes/vehicle-type-route.js"
import vehicleName from "./routes/vehicle-name-route.js"
import userBookings from "./routes/bookings.js"

const PORT = process.env.SERVER_PORT || 3000
const app = express()
dotenv.config()

app.use(express.json())
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
)

// api route for vehicle category
app.use("/api/v1", vehicleCategory)

// api route for vehicle types
app.use("/api/v2", vehicleType)

// api route for vehicles
app.use("/api/v3", vehicleName)

// api route for user booking
app.use("/api/v4", userBookings)

// test route for testing api
app.get("/", (req, res) => {
  return res.json("server is working fine !")
})

app.listen(PORT, () => {
  console.log(`server is runing at http://localhost:${PORT}`)
})
