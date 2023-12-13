import express from "express"
import vehicleCategory from "./routes/vehicle-route.js"
import vehicleType from "./routes/vehicle-type-route.js"
import vehicleName from "./routes/vehicle-name-route.js"

const PORT = 3000
const app = express()

app.use(express.json())

app.use("/api/v1", vehicleCategory)
app.use("/api/v2", vehicleType)
app.use("/api/v3", vehicleName)

app.get("/", (req, res) => {
  return res.json("hello")
})

app.listen(PORT, () => {
  console.log(`server is runing at http://localhost:${PORT}`)
})
