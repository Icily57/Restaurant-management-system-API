import { Context } from 'hono';

import { createRestaurantOwnerService, deleteRestaurantOwnerService,updateRestaurantOwnerService,getRestaurantOwnerByIdService,getAllRestaurantOwnersService, getMoreRestaurantOwnerInfoService } from './restaurant_owner.service';

export const getAllRestaurantOwners = async (c:Context) => {
    try {
        const restaurantOwners = await getAllRestaurantOwnersService();
        if(restaurantOwners == null) return c.text('No restaurant owners found', 404)
        return c.json(restaurantOwners, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}

export const getRestaurantOwnerById = async (c:Context) => {
    try {
        const id = parseInt(c.req.param("id"))
        const restaurantOwner = await getRestaurantOwnerByIdService(id);
        if(restaurantOwner == undefined) return c.text('Restaurant Owner not found', 404)
        return c.json(restaurantOwner, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}

export const createRestaurantOwner = async (c:Context) => {
    try {
        let restaurantOwner = await c.req.json();
        let createRestaurantOwner = await createRestaurantOwnerService(restaurantOwner)
        if(!createRestaurantOwner) {
            return c.json({message: 'Restaurant Owner not created'})
        }
            return c.json({msg: createRestaurantOwner})
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
 }

    export const updateRestaurantOwner = async (c:Context) => {
        try {
            const id = Number(c.req.param("id"))
            const restaurantOwner = await c.req.json();
            if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
            const existingRestaurantOwner = await getRestaurantOwnerByIdService(id);
            if(existingRestaurantOwner == undefined) return c.text('Restaurant Owner not found 😒', 404)    
            let updateRestaurantOwner = await updateRestaurantOwnerService(id,restaurantOwner)
            if(!updateRestaurantOwner) {
                return c.json({message: 'Restaurant Owner not updated'})
            }
                return c.json({msg: updateRestaurantOwner})
        }catch (error:any) {
            return c.text("sdfdfd", 500)
        }
    }

    export const deleteRestaurantOwner = async (c:Context) => {
        try {
            const id = Number(c.req.param("id"))
            if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
            const existingRestaurantOwner = await getRestaurantOwnerByIdService(id);
            if(existingRestaurantOwner == undefined) return c.text('Restaurant Owner not found 😒', 404)    
            let deleteRestaurantOwner = await deleteRestaurantOwnerService(id)
            if(!deleteRestaurantOwner) {
                return c.json({message: 'Restaurant Owner not deleted'})
            }
                return c.json({msg: deleteRestaurantOwner})
        }catch (error:any) {
            return c.text("sdfdfd", 500)
        }
    }

    export const getMoreRestaurantOwnerInfo = async(c:Context) => {

        const restaurantOwnerInfo = await getMoreRestaurantOwnerInfoService();
        if (restaurantOwnerInfo == undefined) {
            return c.text("restaurantOwnerInfo not found", 404);
        }
        return c.json(restaurantOwnerInfo, 200);
    }