import { body, param } from "express-validator"

export const checkWheels = param("wheels", "wheels is a required field!")
  .isNumeric()
  .default(2)

export const type = param("type", "type is a required field!")
  .isString()
  .isLength({ min: 2, max: 20 })

export const createCategory = body("category", "category is a required field")
  .isNumeric()
  .isLength({ min: 1, max: 12 })

export const typeValidation = [
  body("name", "name is a required field")
    .isString()
    .isLength({ min: 3, max: 10 }),
  body("category", "category is a required field!")
    .isNumeric()
    .isLength({ min: 1, max: 12 }),
]

export const getType = body("type", "type is a required field")
  .isString()
  .isLength({ min: 3, max: 10 })

export const typeVehicleNameValidation = [
  getType,
  body("vehicleName", "vehicleName is a required field!")
    .isString()
    .isLength({ min: 1, max: 12 }),
]

export const bookingCreationValidation = [
  body("firstName").isString().isLength({ min: 3, max: 13 }),
  body("lastName").isString().isLength({ min: 3, max: 20 }),
  body("vehicleCategory").isNumeric().notEmpty(),
  body("vehicleType").isString().isLength({ min: 3, max: 10 }),
  body("vehicleName").isString().isLength({ min: 3, max: 10 }),
  body("startDate").isString().notEmpty().isLength({ min: 4 }),
  body("endDate").isString().notEmpty().isLength({ min: 4 }),
]
