import { Context } from 'hono';

import { createOrderMenuItemService, deleteOrderMenuItemService, getAllOrderMenuItemsService, getMoreMenuOrdersInfoService, getOrderMenuItemByIdService, updateOrderMenuItemService } from './order_menu_item.service';

export const getAllOrderMenuItems = async (c:Context) => {
    try {
        const order_menu_items = await getAllOrderMenuItemsService();
        if(order_menu_items == null) return c.text('No order_menu_items found', 404)
        return c.json(order_menu_items, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
    }

    export const getOrderMenuItemById = async (c:Context) => {
        try {
            const id = parseInt(c.req.param("id"))
            const order_menu_item = await getOrderMenuItemByIdService(id);
            if(order_menu_item == undefined) return c.text('OrderMenuItem not found', 404)
            return c.json(order_menu_item, 200)
        } catch (error:any) {
            return c.text(error?.message, 500)
        }
    }

    export const createOrderMenuItem = async (c:Context) => {
        try {
            let order_menu_item = await c.req.json();
            let createOrderMenuItem = await createOrderMenuItemService(order_menu_item)
            if(!createOrderMenuItem) {
                return c.json({message: 'OrderMenuItem not created'})
            }
                return c.json({msg: createOrderMenuItem})
        } catch (error:any) {
            return c.text(error?.message, 500)
        }
     }

        export const updateOrderMenuItem = async (c:Context) => {
            try {
                const id = Number(c.req.param("id"))
                const order_menu_item = await c.req.json();
                if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
                const existingOrderMenuItem = await getOrderMenuItemByIdService(id);
                if(existingOrderMenuItem == undefined) return c.text('OrderMenuItem not found 😒', 404)    
                let updateOrderMenuItem = await updateOrderMenuItemService(id,order_menu_item)
                if(!updateOrderMenuItem) {
                    return c.json({message: 'OrderMenuItem not updated'})
                }
                    return c.json({msg: updateOrderMenuItem})
            }catch (error:any) {
                return c.text("sdfdfd", 500)
            }
        }

export const deleteOrderMenuItem = async (c:Context) => {
    try {
        const id = Number(c.req.param("id"))
        if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
        const order_menu_item = await getOrderMenuItemByIdService(id);
        if(order_menu_item == undefined) return c.text('OrderMenuItem not found 😒', 404)
        let deleteOrderMenuItem = await deleteOrderMenuItemService(id)
        if(!deleteOrderMenuItem) {
            return c.json({message: 'OrderMenuItem not deleted'})
        }
            return c.json({msg: deleteOrderMenuItem})
    }catch (error:any) {
        return c.text("sdfdfd", 500)
    }
}

export const getMenuOrdersInfo = async(c:Context) => {

    const menuOrdersInfo = await getMoreMenuOrdersInfoService();
    if (menuOrdersInfo == undefined) {
        return c.text("driversInfo not found", 404);
    }
    return c.json(menuOrdersInfo, 200);
}
