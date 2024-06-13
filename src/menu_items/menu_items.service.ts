import db from "../drizzle/db";
import { eq } from "drizzle-orm";

import { menuItemsTable, TIMenuItems, TSMenuItems } from "../drizzle/schema";

export const getAllMenuItemsService = async ():Promise<TSMenuItems[] | null>=> {
    return await db.select().from(menuItemsTable);
}

export const getMenuItemsByIdService = async (id:TSMenuItems["id"]):Promise<TSMenuItems[]> => {
    return await db.select().from(menuItemsTable).where(eq(menuItemsTable.id, id));
}

export const createMenuItemsService = async (menuItems:TIMenuItems) => {
    await db.insert(menuItemsTable).values(menuItems)
    return "Menu Items created successfully 🎉";
}

export const updateMenuItemsService = async (id:number, menuItems:TIMenuItems) => {
    await db.update(menuItemsTable).set(menuItems).where(eq(menuItemsTable.id, id))
    return "Menu Items updated successfully 🎉";
}

export const deleteMenuItemsService = async (id:number) => {
    await db.delete(menuItemsTable).where(eq(menuItemsTable.id, id))
    return "Menu Items deleted successfully 🎉";
}

export const getMoreMenuInfoService = async () => {
    return await db.query.menuItemsTable.findMany({
      columns: {
        description: true
      },
      with: {
        restaurant: {
          columns: {
            name: true
          },
          with: {
            menuItems:{
                columns:{
                   category:true
                }
            },
            orders: {
              columns: {final_price:true
              }
            }
          }
        }
      },
    });
  
  
  }
  


