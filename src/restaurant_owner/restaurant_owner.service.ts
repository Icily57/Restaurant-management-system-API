import db from "../drizzle/db";
import { eq } from "drizzle-orm";

import { restaurantOwnerTable,TSRestaurantOwner, TIRestaurantOwner } from "../drizzle/schema";

export const getAllRestaurantOwnersService = async ():Promise<TSRestaurantOwner[] | null>=> {
    return await db.select().from(restaurantOwnerTable);
}

export const getRestaurantOwnerByIdService = async (id:TSRestaurantOwner["id"]):Promise<TSRestaurantOwner[]> => {
    return await db.select().from(restaurantOwnerTable).where(eq(restaurantOwnerTable.id, id));
}

export const createRestaurantOwnerService = async (restaurantOwner:TIRestaurantOwner) => {
    await db.insert(restaurantOwnerTable).values(restaurantOwner)
    return "Restaurant Owner created successfully 🎉";
}

export const updateRestaurantOwnerService = async (id:number, restaurantOwner:TIRestaurantOwner) => {
    await db.update(restaurantOwnerTable).set(restaurantOwner).where(eq(restaurantOwnerTable.id, id))
    return "Restaurant Owner updated successfully 🎉";
}

export const deleteRestaurantOwnerService = async (id:number) => {
    await db.delete(restaurantOwnerTable).where(eq(restaurantOwnerTable.id, id))
    return "Restaurant Owner deleted successfully 🎉";
}

export const getMoreRestaurantOwnerInfoService = async () => {
    return await db.query.restaurantOwnerTable.findMany({
      columns: {
       restaurant_id: true,
      },
      with: {
        restaurant: {
          columns: {
           state: true,
           name: true
          }
        }
      },
    })
};