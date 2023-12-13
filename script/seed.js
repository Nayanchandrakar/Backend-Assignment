import { PrismaClient } from "@prisma/client"

const database = new PrismaClient()

async function main() {
  try {
    // cleanging all the previous data
    await database?.category?.deleteMany()
    await database?.type?.deleteMany()
    await database?.vehicles?.deleteMany()

    console.log("deleted data")

    const categories = await database?.category?.createMany({
      data: [{ category: 2 }, { category: 4 }],
    })

    const updateCateogoriesType2 = await database?.category?.update({
      where: {
        category: 2,
      },

      data: {
        types: {
          createMany: {
            data: [{ name: "cruiser" }, { name: "sports" }],
          },
        },
      },
    })

    const updateCateogoriesType4 = await database?.category?.update({
      where: {
        category: 4,
      },
      data: {
        types: {
          createMany: {
            data: [{ name: "hatchback" }, { name: "suv" }, { name: "sedan" }],
          },
        },
      },
    })

    const hatchbackUpdate = await database?.type?.update({
      where: {
        name: "hatchback",
      },
      data: {
        vehicles: {
          createMany: {
            data: [
              { vehicleName: "Civic" },
              { vehicleName: "Corolla" },
              { vehicleName: "Mazda3" },
            ],
          },
        },
      },
    })

    const suvUpdate = await database?.type?.update({
      where: {
        name: "suv",
      },
      data: {
        vehicles: {
          createMany: {
            data: [{ vehicleName: "Fortuner" }, { vehicleName: "Xuv" }],
          },
        },
      },
    })

    const sedanUpdate = await database?.type?.update({
      where: {
        name: "sedan",
      },
      data: {
        vehicles: {
          createMany: {
            data: [{ vehicleName: "Elantra" }, { vehicleName: "Jetta" }],
          },
        },
      },
    })

    const cruiserUpdate = await database?.type?.update({
      where: {
        name: "cruiser",
      },
      data: {
        vehicles: {
          createMany: {
            data: [{ vehicleName: "Highwayman" }, { vehicleName: "Renegade" }],
          },
        },
      },
    })

    const sportsUpdate = await database?.type?.update({
      where: {
        name: "sports",
      },
      data: {
        vehicles: {
          createMany: {
            data: [{ vehicleName: "R15" }, { vehicleName: "Apache" }],
          },
        },
      },
    })

    if (
      categories &&
      updateCateogoriesType2 &&
      updateCateogoriesType4 &&
      hatchbackUpdate &&
      suvUpdate &&
      sedanUpdate &&
      cruiserUpdate &&
      sportsUpdate
    ) {
      console.log("Seeding Successful")
    } else {
      console.log("Seeding fail please try again")
    }
  } catch (error) {
    console.log("Error seeding the database categories", error)
  } finally {
    await database.$disconnect()
  }
}

main()
