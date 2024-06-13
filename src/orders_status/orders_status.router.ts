import {Hono} from 'hono'

import { createOrdersStatus, deleteOrdersStatus, getAllOrdersStatus, getMoreOrderStatusInfo, getOrdersStatusById, updateOrdersStatus } from './orders_status.controller'
import { adminRoleAuth } from '../middleWare/bearAuth'

export const ordersStatusRouter = new Hono()

ordersStatusRouter.get('/orders_status', getAllOrdersStatus)
ordersStatusRouter.get('/orders_status/:id', getOrdersStatusById)
ordersStatusRouter.post('/orders_status',adminRoleAuth, createOrdersStatus)
ordersStatusRouter.put('/orders_status/:id',adminRoleAuth, updateOrdersStatus)
ordersStatusRouter.delete('/orders_status/:id',adminRoleAuth, deleteOrdersStatus)
ordersStatusRouter.get("/orderStatusInfo",getMoreOrderStatusInfo)