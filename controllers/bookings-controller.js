import { validationResult } from "express-validator"

import { db } from "../database/db.js"

const createBookings = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      firstName,
      lastName,
      vehicleCategory,
      vehicleType,
      vehicleName,
      startDate,
      endDate,
    } = req?.body

    const checkCategory = await db?.category?.findFirst({
      where: {
        category: Number(vehicleCategory),
      },
      select: {
        id: true,
      },
    })

    if (!checkCategory) {
      return res
        .status(401)
        .json({ message: "vehicle category not found !", success: false })
    }

    const checkType = await db?.type?.findFirst({
      where: {
        name: vehicleType,
      },
      select: {
        id: true,
      },
    })

    if (!checkType) {
      return res
        .status(401)
        .json({ message: "vehicle type not found !", success: false })
    }

    const checkVehicle = await db?.vehicles?.findFirst({
      where: {
        vehicleName: vehicleName,
      },
      select: {
        id: true,
      },
    })

    if (!checkVehicle) {
      return res
        .status(401)
        .json({ message: "vehicle name not found !", success: false })
    }

    const createBooking = await db?.bookings?.create({
      data: {
        firstName,
        lastName,
        vehicleCategory: Number(vehicleCategory),
        vehicleType,
        vehicleName,
        startDate,
        endDate,
      },
    })

    if (!createBooking) {
      return res
        .status(502)
        .json({ message: "database error occurred", success: false })
    }

    return res.status(200).json({ data: createBooking, success: true })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Internal Server Error !", success: false })
  }
}

export { createBookings }
