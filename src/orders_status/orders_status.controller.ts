import { Context } from 'hono';

import { createOrdersStatusService, deleteOrdersStatusService, getAllOrdersStatusService, getMoreOrderStatusInfoService, getOrdersStatusByIdService, updateOrdersStatusService } from './orders_status.service';

export const getAllOrdersStatus = async (c:Context) => {
    try {
        const ordersStatus = await getAllOrdersStatusService();
        if(ordersStatus == null) return c.text('No orders status found', 404)
        return c.json(ordersStatus, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
    }

    export const getOrdersStatusById = async (c:Context) => {
        try {
            const id = parseInt(c.req.param("id"))
            const ordersStatus = await getOrdersStatusByIdService(id);
            if(ordersStatus == undefined) return c.text('Orders Status not found', 404)
            return c.json(ordersStatus, 200)
        } catch (error:any) {
            return c.text(error?.message, 500)
        }
    }

    export const createOrdersStatus = async (c:Context) => {
        try {
            let ordersStatus = await c.req.json();
            let createOrdersStatus = await createOrdersStatusService(ordersStatus)
            if(!createOrdersStatus) {
                return c.json({message: 'Orders Status not created'})
            }
                return c.json({msg: createOrdersStatus})
        } catch (error:any) {
            return c.text(error?.message, 500)
        }
     }

        export const updateOrdersStatus = async (c:Context) => {
            try {
                const id = Number(c.req.param("id"))
                const ordersStatus = await c.req.json();
                if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
                const existingOrdersStatus = await getOrdersStatusByIdService(id);
                if(existingOrdersStatus == undefined) return c.text('Orders Status not found 😒', 404)    
                let updateOrdersStatus = await updateOrdersStatusService(id,ordersStatus)
                if(!updateOrdersStatus) {
                    return c.json({message: 'Orders Status not updated'})
                }
                    return c.json({msg: updateOrdersStatus})
            }catch (error:any) {
                return c.text("sdfdfd", 500)
            }
        }

export const deleteOrdersStatus = async (c:Context) => {
    try {
        const id = Number(c.req.param("id"))
        if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
        const ordersStatus = await getOrdersStatusByIdService(id);
        if(ordersStatus == undefined) return c.text('Orders Status not found 😒', 404)
        let deleteOrdersStatus = await deleteOrdersStatusService(id)
        if(!deleteOrdersStatus) {
            return c.json({message: 'Orders Status not deleted'})
        }
            return c.json({msg: deleteOrdersStatus})
    }catch (error:any) {
        return c.text("sdfdfd", 500)
    }
}

export const getMoreOrderStatusInfo = async(c:Context) => {

    const orderStatusInfo = await getMoreOrderStatusInfoService();
    if (orderStatusInfo == undefined) {
        return c.text("orderStatusInfo not found", 404);
    }
    return c.json(orderStatusInfo, 200);
}