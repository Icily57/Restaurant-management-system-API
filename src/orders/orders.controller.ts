import { Context } from 'hono';

import { createOrdersService, deleteOrdersService, getOrdersByIdService, getAllOrdersService, updateOrdersService, getMoreOrdersInfoService } from './orders.service';

export const getAllOrders = async (c:Context) => {
    try {
        const orders = await getAllOrdersService();
        if(orders == null) return c.text('No orders found', 404)
        return c.json(orders, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}

export const getOrdersById = async (c:Context) => {
    try {
        const id = parseInt(c.req.param("id"))
        const orders = await getOrdersByIdService(id);
        if(orders == undefined) return c.text('Orders not found', 404)
        return c.json(orders, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}

export const createOrders = async (c:Context) => {
    try {
        let orders = await c.req.json();
        let createOrders = await createOrdersService(orders)
        if(!createOrders) {
            return c.json({message: 'Orders not created'})
        }
            return c.json({msg: createOrders})
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
 }

    export const updateOrders = async (c:Context) => {
        try {
            const id = Number(c.req.param("id"))
            const orders = await c.req.json();
            if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
            const existingOrders = await getOrdersByIdService(id);
            if(existingOrders == undefined) return c.text('Orders not found 😒', 404)    
            let updateOrders = await updateOrdersService(id,orders)
            if(!updateOrders) {
                return c.json({message: 'Orders not updated'})
            }
                return c.json({msg: updateOrders})
        }catch (error:any) {
            return c.text("sdfdfd", 500)
        }
    }

    export const deleteOrders = async (c:Context) => {
        try {
            const id = Number(c.req.param("id"))
            if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
            const existingOrders = await getOrdersByIdService(id);
            if(existingOrders == undefined) return c.text('Orders not found 😒', 404)    
            let deleteOrders = await deleteOrdersService(id)
            if(!deleteOrders) {
                return c.json({message: 'Orders not deleted'})
            }
                return c.json({msg: deleteOrders})
        }catch (error:any) {
            return c.text("sdfdfd", 500)
        }
    }

    export const getMoreOrderInfo = async(c:Context) => {

        const ordersInfo = await getMoreOrdersInfoService();
        if (ordersInfo == undefined) {
            return c.text("ordersInfo not found", 404);
        }
        return c.json(ordersInfo, 200);
    }