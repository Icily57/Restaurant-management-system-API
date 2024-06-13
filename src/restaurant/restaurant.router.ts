import {Hono} from 'hono'

import {  createRestaurant, deleteRestaurant, getRestaurantById, getAllRestaurants, updateRestaurant, getMoreRestaurantsInfo } from './restaurant.controller'
import { adminRoleAuth } from '../middleWare/bearAuth'

export const restaurantRouter = new Hono()

restaurantRouter.get('/restaurant', getAllRestaurants)
restaurantRouter.get('/restaurant/:id', getRestaurantById)
restaurantRouter.post('/restaurant',adminRoleAuth, createRestaurant)
restaurantRouter.put('/restaurant/:id',adminRoleAuth, updateRestaurant)
restaurantRouter.delete('/restaurant/:id',adminRoleAuth, deleteRestaurant)
restaurantRouter.get("/restaurantInfo", getMoreRestaurantsInfo)