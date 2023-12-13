import { param } from "express-validator"

export const checkWheels = param("wheels", "wheels is a required field!")
  .isNumeric()
  .default(2)
