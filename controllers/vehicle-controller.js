import { validationResult } from "express-validator"

import { db } from "../database/db.js"

// controller for fetching categories
const getVehicleCategory = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const vehicleCategoryExists = await db.category.findMany({
      select: {
        category: true,
      },
    })

    if (!vehicleCategoryExists) {
      return res
        .status(402)
        .json({ message: "Database error occured", success: false })
    }

    return res.status(200).json({ data: vehicleCategoryExists, success: true })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Internal server error !", success: false })
  }
}

// controller fro creating a new category
const createVehicleCategory = async (req, res) => {
  const { category } = req?.body

  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const isCategoryExist = await db?.category?.findFirst({
      where: {
        category: Number(category),
      },
      select: {
        id: true,
      },
    })

    if (isCategoryExist) {
      return res
        .status(401)
        .json(`no. of wheels with this category already exist ${category}`)
    }

    const createCategory = await db.category.create({
      data: {
        category: Number(category),
      },
      select: {
        category: true,
      },
    })

    if (!createCategory) {
      return res
        .status(402)
        .json({ message: "Database error occured", success: false })
    }

    return res
      .status(200)
      .json({ message: "category succefully created!", success: true })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Internal server error !", success: false })
  }
}

export { getVehicleCategory, createVehicleCategory }
