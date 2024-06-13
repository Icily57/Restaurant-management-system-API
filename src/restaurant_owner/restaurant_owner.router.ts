import {Hono} from 'hono'

import {  createRestaurantOwner, deleteRestaurantOwner, getRestaurantOwnerById, getAllRestaurantOwners, updateRestaurantOwner, getMoreRestaurantOwnerInfo } from './restaurant_owner.controller'
import { adminRoleAuth } from '../middleWare/bearAuth'

export const restaurantOwnerRouter = new Hono()

restaurantOwnerRouter.get('/restaurant_owner', getAllRestaurantOwners)
restaurantOwnerRouter.get('/restaurant_owner/:id', getRestaurantOwnerById)
restaurantOwnerRouter.post('/restaurant_owner',adminRoleAuth, createRestaurantOwner)
restaurantOwnerRouter.put('/restaurant_owner/:id',adminRoleAuth, updateRestaurantOwner)
restaurantOwnerRouter.delete('/restaurant_owner/:id',adminRoleAuth, deleteRestaurantOwner)
restaurantOwnerRouter.get("/restuarantOwnerInfo",getMoreRestaurantOwnerInfo)