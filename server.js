import express from "express"

const PORT = 3000
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  return res.json("hello user")
})

app.listen(PORT, () => {
  console.log(`server is runing at http://localhost:${PORT}`)
})
