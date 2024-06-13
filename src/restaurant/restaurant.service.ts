import db from "../drizzle/db";
import { eq } from "drizzle-orm";

import { restaurantTable, TSRestaurant, TIRestaurant } from "../drizzle/schema";

export const getAllRestaurantsService = async ():Promise<TSRestaurant[] | null>=> {
    return await db.select().from(restaurantTable);
}

export const getRestaurantByIdService = async (id:TSRestaurant["id"]):Promise<TSRestaurant[]> => {
    return await db.select().from(restaurantTable).where(eq(restaurantTable.id, id));
}

export const createRestaurantService = async (restaurant:TIRestaurant) => {
    await db.insert(restaurantTable).values(restaurant)
    return "Restaurant created successfully 🎉";
}

export const updateRestaurantService = async (id:number, restaurant:TIRestaurant) => {
    await db.update(restaurantTable).set(restaurant).where(eq(restaurantTable.id, id))
    return "Restaurant updated successfully 🎉";
}

export const deleteRestaurantService = async (id:number) => {
    await db.delete(restaurantTable).where(eq(restaurantTable.id, id))
    return "Restaurant deleted successfully 🎉";
}

export const getMoreRestaurantsInfoService = async () => {
    return await db.query.restaurantTable.findMany({
      columns: {
        name: true,
        state: true,
        street_address: true,
      },
      with: {
       menuItems: {
          columns: {
            description: true,
            price: true
          }
        }
      },
    }); 
  }