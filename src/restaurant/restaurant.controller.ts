import { Context } from 'hono';

import { createRestaurantService, deleteRestaurantService, getRestaurantByIdService, getAllRestaurantsService, updateRestaurantService, getMoreRestaurantsInfoService } from './restaurant.service';

export const getAllRestaurants = async (c:Context) => {
    try {
        const restaurants = await getAllRestaurantsService();
        if(restaurants == null) return c.text('No restaurants found', 404)
        return c.json(restaurants, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}

export const getRestaurantById = async (c:Context) => {
    try {
        const id = parseInt(c.req.param("id"))
        const restaurant = await getRestaurantByIdService(id);
        if(restaurant == undefined) return c.text('Restaurant not found', 404)
        return c.json(restaurant, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}

export const createRestaurant = async (c:Context) => {
    try {
        let restaurant = await c.req.json();
        let createRestaurant = await createRestaurantService(restaurant)
        if(!createRestaurant) {
            return c.json({message: 'Restaurant not created'})
        }
            return c.json({msg: createRestaurant})
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
 }

    export const updateRestaurant = async (c:Context) => {
        try {
            const id = Number(c.req.param("id"))
            const restaurant = await c.req.json();
            if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
            const existingRestaurant = await getRestaurantByIdService(id);
            if(existingRestaurant == undefined) return c.text('Restaurant not found 😒', 404)    
            let updateRestaurant = await updateRestaurantService(id,restaurant)
            if(!updateRestaurant) {
                return c.json({message: 'Restaurant not updated'})
            }
                return c.json({msg: updateRestaurant})
        }catch (error:any) {
            return c.text("sdfdfd", 500)
        }
    }

    export const deleteRestaurant = async (c:Context) => {
        try {
            const id = Number(c.req.param("id"))
            if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
            const existingRestaurant = await getRestaurantByIdService(id);
            if(existingRestaurant == undefined) return c.text('Restaurant not found 😒', 404)
            let deleteRestaurant = await deleteRestaurantService(id)
            if(!deleteRestaurant) {
                return c.json({message: 'Restaurant not deleted'})
            }
                return c.json({msg: deleteRestaurant})
        }catch (error:any) {
            return c.text("sdfdfd", 500)
        }
    }

    export const getMoreRestaurantsInfo = async(c:Context) => {

        const restaurantsInfo = await getMoreRestaurantsInfoService();
        if (restaurantsInfo == undefined) {
            return c.text("restaurantsInfo not found", 404);
        }
        return c.json(restaurantsInfo, 200);
      }