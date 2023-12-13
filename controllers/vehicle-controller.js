import { validationResult } from "express-validator"

const getVehicle = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const no_of_wheels = Number(req?.params?.wheels)

    if (no_of_wheels === 2) {
      console.log("")
    } else if (no_of_wheels === 4) {
      console.log("4 wheelers")
    }

    return res.status(402).json("no matches found to your query")
  } catch (error) {
    console.log(error)
    return res.status(500).json("Internal server error !")
  }
}

export { getVehicle }
