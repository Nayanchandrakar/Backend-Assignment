import { validationResult } from "express-validator"
import { db } from "../database/db.js"

const getVehicleType = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const no_of_wheels = Number(req?.params?.wheels)

    const vehicleType = await db.category?.findMany({
      where: {
        category: no_of_wheels,
      },
      select: {
        types: true,
      },
    })

    if (!vehicleType) {
      return res
        .status(402)
        .json({ message: "no types found with this category", success: false })
    }

    return res.status(200).json({ data: vehicleType[0]?.types, success: true })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Internal server error !", success: false })
  }
}

const createVehicleType = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, category } = req?.body

    const checkCategory = await db?.category?.findFirst({
      where: {
        category,
      },
      select: {
        id: true,
      },
    })

    if (!checkCategory) {
      return res.status(401).json({
        message: "their is no category exists with this no of wheels ? ",
        success: false,
      })
    }

    const isAlreadyType = await db?.type?.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
      },
    })

    if (isAlreadyType) {
      return res.status(401).json({
        message: "A type is already exist with this name !",
        success: false,
      })
    }

    const createType = await db.category?.update({
      where: {
        category,
      },
      data: {
        types: {
          create: {
            name,
          },
        },
      },
    })

    if (!createType) {
      return res
        .status(402)
        .json({ message: "no category found to update", success: false })
    }

    return res.status(200).json({ data: createType, success: true })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Internal server error !", success: false })
  }
}

export { getVehicleType, createVehicleType }
