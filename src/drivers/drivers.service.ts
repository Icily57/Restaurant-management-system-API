import db from "../drizzle/db";
import { eq } from "drizzle-orm";

import { driversTable, TSDrivers, TIDrivers } from "../drizzle/schema";

export const getAllDriverssService = async ():Promise<TSDrivers[] | null>=> {
    return await db.select().from(driversTable);
}

export const getDriversByIdService = async (id:TSDrivers["id"]):Promise<TSDrivers[]> => {
    return await db.select().from(driversTable).where(eq(driversTable.id, id));
}

export const createDriversService = async (drivers:TIDrivers) => {
    await db.insert(driversTable).values(drivers)
    return "Drivers created successfully 🎉";
}

export const updateDriversService = async (id:number, drivers:TIDrivers) => {
    await db.update(driversTable).set(drivers).where(eq(driversTable.id, id))
    return "Drivers updated successfully 🎉";
}

export const deleteDriversService = async (id:number) => {
    await db.delete(driversTable).where(eq(driversTable.id, id))
    return "Drivers deleted successfully 🎉";
}

export const getMoreDriverInfoService = async () => {
    return await db.query.driversTable.findMany({
      columns: {
        delivering: true
      },
      with: {
       user : {
          columns: {
            name: true
          },
          with: {
            orders: {
              columns: {
                restaurant_id: true,
                driver_id: true
              }
            },
            drivers: {
              columns: {
                delivering: true,
                car_model: true,
                car_make: true,
                online: true
              }
            }
          }
        }
      },
    });
  
  
  }
  