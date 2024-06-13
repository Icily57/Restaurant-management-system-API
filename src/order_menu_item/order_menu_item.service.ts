import db from "../drizzle/db";
import { eq } from "drizzle-orm";

import { orderMenuItemTable, TSOrderMenuItem, TIOrderMenuItem } from "../drizzle/schema";

export const getAllOrderMenuItemsService = async ():Promise<TSOrderMenuItem[] | null>=> {
    return await db.select().from(orderMenuItemTable);
}

export const getOrderMenuItemByIdService = async (id:TSOrderMenuItem["id"]):Promise<TSOrderMenuItem[]> => {
    return await db.select().from(orderMenuItemTable).where(eq(orderMenuItemTable.id, id));
}

export const createOrderMenuItemService = async (orderMenuItem:TIOrderMenuItem) => {
    await db.insert(orderMenuItemTable).values(orderMenuItem)
    return "Order menu item created successfully 🎉";
}

export const updateOrderMenuItemService = async (id:number, orderMenuItem:TIOrderMenuItem) => {
    await db.update(orderMenuItemTable).set(orderMenuItem).where(eq(orderMenuItemTable.id, id))
    return "Order menu item updated successfully 🎉";
}

export const deleteOrderMenuItemService = async (id:number) => {
    await db.delete(orderMenuItemTable).where(eq(orderMenuItemTable.id, id))
    return "Order menu item deleted successfully 🎉";
}

export const getMoreMenuOrdersInfoService = async () => {
    return await db.query.orderMenuItemTable.findMany({
      columns: {
        menu_item_id: true,
       order_id:true
      },
      with: {
       order: {
          columns: {
          discount: true
          },
          with: {
            comments : {
              columns: {
              user_id: true
              }
            }
          }
        }
      },
    });
  
  
  }
