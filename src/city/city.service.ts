import db from "../drizzle/db";
import { eq } from "drizzle-orm";

import { cityTable, TSCity, TICity } from "../drizzle/schema";

export const getAllCitiessService = async ():Promise<TSCity[] | null>=> {
    return await db.select().from(cityTable);
}

export const getCityByIdService = async (id:TSCity["id"]):Promise<TSCity[]> => {
    return await db.select().from(cityTable).where(eq(cityTable.id, id));
}

export const createCityService = async (city:TICity) => {
    await db.insert(cityTable).values(city)
    return "City created successfully 🎉";
}

export const updateCityService = async (id:number, city:TICity) => {
    await db.update(cityTable).set(city).where(eq(cityTable.id, id))
    return "City updated successfully 🎉";
}

export const deleteCityService = async (id:number) => {
    await db.delete(cityTable).where(eq(cityTable.id, id))
    return "City deleted successfully 🎉";
}

export const getCityInfoService = async () => {
    return await db.query.cityTable.findMany({
      columns: {
        "state_id": true,
      },
      with: {
        restaurants: {
            columns: {
                name: true,
                state: true,
            },
        },
        addresses: {
            columns: {
              delivery_instructions: true,
            },
        }
    },
    })
    };