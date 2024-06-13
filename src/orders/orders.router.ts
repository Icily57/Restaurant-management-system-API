import {Hono} from 'hono'

import {  createOrders, deleteOrders, getOrdersById, getAllOrders, updateOrders, getMoreOrderInfo } from './orders.controller'
import { adminRoleAuth } from '../middleWare/bearAuth'

export const ordersRouter = new Hono()

ordersRouter.get('/orders', getAllOrders)
ordersRouter.get('/orders/:id', getOrdersById)
ordersRouter.post('/orders',adminRoleAuth, createOrders)
ordersRouter.put('/orders/:id',adminRoleAuth, updateOrders)
ordersRouter.delete('/orders/:id',adminRoleAuth, deleteOrders)
ordersRouter.get("/OrderInfo",getMoreOrderInfo)