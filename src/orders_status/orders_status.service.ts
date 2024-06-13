import db from "../drizzle/db";
import { eq } from "drizzle-orm";

import { ordersStatusTable, TSOrdersStatus, TIOrdersStatus } from "../drizzle/schema";

export const getAllOrdersStatusService = async ():Promise<TSOrdersStatus[] | null>=> {
    return await db.select().from(ordersStatusTable);
}

export const getOrdersStatusByIdService = async (id:TSOrdersStatus["id"]):Promise<TSOrdersStatus[]> => {
    return await db.select().from(ordersStatusTable).where(eq(ordersStatusTable.id, id));
}

export const createOrdersStatusService = async (ordersStatus:TIOrdersStatus) => {
    await db.insert(ordersStatusTable).values(ordersStatus)
    return "Orders Status created successfully 🎉";
}

export const updateOrdersStatusService = async (id:number, ordersStatus:TIOrdersStatus) => {
    await db.update(ordersStatusTable).set(ordersStatus).where(eq(ordersStatusTable.id, id))
    return "Orders Status updated successfully 🎉";
}

export const deleteOrdersStatusService = async (id:number) => {
    await db.delete(ordersStatusTable).where(eq(ordersStatusTable.id, id))
    return "Orders Status deleted successfully 🎉";
}

export const getMoreOrderStatusInfoService = async () => {
    return await db.query.ordersStatusTable.findMany({
        columns: {
            order_id: true,
            status_id: true
        },
        with: {
            order: {
                columns: {
                    price: true,
                    discount: true
            }
        },
    }
    })
};
