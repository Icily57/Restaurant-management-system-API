import { Hono } from "hono";
import { Context } from "hono";

import { createMenuItemsService,getAllMenuItemsService,updateMenuItemsService,deleteMenuItemsService, getMenuItemsByIdService, getMoreMenuInfoService } from "./menu_items.service";

export const getAllMenuItems = async (c:any) => {
    try {
        const menuItems = await getAllMenuItemsService();
        if(menuItems == null) return c.text('No menu items found', 404)
        return c.json(menuItems, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
    }

    export const getMenuItemsById = async (c:any) => {
        try {
            const id = parseInt(c.req.param("id"))
            const menuItems = await getMenuItemsByIdService(id);
            if(menuItems == undefined) return c.text('Menu items not found', 404)
            return c.json(menuItems, 200)
        } catch (error:any) {
            return c.text(error?.message, 500)
        }
    }

    export const createMenuItems = async (c:any) => {
        try {
            let menuItems = await c.req.json();
            let createMenuItems = await createMenuItemsService(menuItems)
            if(!createMenuItems) {
                return c.json({message: 'Menu items not created'})
            }
                return c.json({msg: createMenuItems})
        } catch (error:any) {
            return c.text(error?.message, 500)
        }
     }

        export const updateMenuItems = async (c:any) => {
            try {
                const id = Number(c.req.param("id"))
                const menuItems = await c.req.json();
                if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
                const existingMenuItems = await getMenuItemsByIdService(id);
                if(existingMenuItems == undefined) return c.text('Menu items not found 😒', 404)    
                let updateMenuItems = await updateMenuItemsService(id,menuItems)
                if(!updateMenuItems) {
                    return c.json({message: 'Menu items not updated'})
                }
                    return c.json({msg: updateMenuItems})
            }catch (error:any) {
                return c.text("sdfdfd", 500)
            }
        }

export const deleteMenuItems = async (c:any) => {
    try {
        const id = Number(c.req.param("id"))
        if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
        const menuItems = await getMenuItemsByIdService(id);
        if(menuItems == undefined) return c.text('Menu items not found 😒', 404)
        let deleteMenuItems = await deleteMenuItemsService(id)
        if(!deleteMenuItems) {
            return c.json({message: 'Menu items not deleted'})
        }
            return c.json({msg: deleteMenuItems})
    }catch (error:any) {
        return c.text("sdfdfd", 500)
    }
}

export const getMoreMenuInfo = async(c:Context) => {
    const menuInfo = await getMoreMenuInfoService();
    if (menuInfo == undefined) {
        return c.text("menuInfo not found", 404);
    }
    return c.json(menuInfo, 200);
}