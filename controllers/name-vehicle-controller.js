import { validationResult } from "express-validator"

import { db } from "../database/db.js"

// controller for fetching vehicle names
const getVehicleName = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const name = req?.params?.type

    const vehicles = await db.type?.findMany({
      where: {
        name,
      },
      select: {
        vehicles: true,
      },
    })

    if (!vehicles) {
      return res
        .status(402)
        .json({ message: "no vehicles found with this type", success: false })
    }

    return res.status(200).json({ data: vehicles[0]?.vehicles, success: true })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Internal server error !", success: false })
  }
}

// controller for creating and listing a newVehicle name
const createVehicleName = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { type, vehicleName } = req?.body

    const checkType = await db?.type?.findFirst({
      where: {
        name: type,
      },
      select: {
        id: true,
      },
    })

    if (!checkType) {
      return res.status(401).json({
        message: "Theirs is no type exists with this type ? ",
        success: false,
      })
    }

    const isAlreadVehicle = await db?.vehicles?.findFirst({
      where: {
        vehicleName,
      },
      select: {
        id: true,
      },
    })

    if (isAlreadVehicle) {
      return res.status(401).json({
        message: "A vehicle is already exist with this name !",
        success: false,
      })
    }

    const updateType = await db.type?.update({
      where: {
        name: type,
      },
      data: {
        vehicles: {
          create: {
            vehicleName,
          },
        },
      },
    })

    if (!updateType) {
      return res
        .status(402)
        .json({ message: "no type found to update", success: false })
    }

    return res.status(200).json({ data: updateType, success: true })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Internal server error !", success: false })
  }
}

export { getVehicleName, createVehicleName }
