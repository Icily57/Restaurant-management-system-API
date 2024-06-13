import db from "../drizzle/db";
import { eq } from "drizzle-orm";

import { ordersTable, TSOrders, TIOrders } from "../drizzle/schema";

export const getAllOrdersService = async ():Promise<TSOrders[] | null>=> {
    return await db.select().from(ordersTable);
}

export const getOrdersByIdService = async (id:TSOrders["id"]):Promise<TSOrders[]> => {
    return await db.select().from(ordersTable).where(eq(ordersTable.id, id));
}

export const createOrdersService = async (orders:TIOrders) => {
    await db.insert(ordersTable).values(orders)
    return "Orders created successfully 🎉";
}

export const updateOrdersService = async (id:number, orders:TIOrders) => {
    await db.update(ordersTable).set(orders).where(eq(ordersTable.id, id))
    return "Orders updated successfully 🎉";
}

export const deleteOrdersService = async (id:number) => {
    await db.delete(ordersTable).where(eq(ordersTable.id, id))
    return "Orders deleted successfully 🎉";
}

export const getMoreOrdersInfoService = async () => {
    return await db.query.ordersTable.findMany({
      columns: {
        created_at: true
      },
      with: {
        user: {
          columns: {
            contact_phone: true,
            confirmation_code: true
          },
          with: {
            orders: {
              columns: {
               price: true,
              }
            }
          }
        }
      },
    })
};