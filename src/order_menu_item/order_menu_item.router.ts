import { Hono} from 'hono';

import {  createOrderMenuItem, deleteOrderMenuItem, getAllOrderMenuItems, getMenuOrdersInfo, getOrderMenuItemById, updateOrderMenuItem } from './order_menu_item.controller';
import { adminRoleAuth } from '../middleWare/bearAuth';

export const orderMenuItemRouter = new Hono()

orderMenuItemRouter.get('/order_menu_item', getAllOrderMenuItems)
orderMenuItemRouter.get('/order_menu_item/:id', getOrderMenuItemById)
orderMenuItemRouter.post('/order_menu_item',adminRoleAuth, createOrderMenuItem)
orderMenuItemRouter.put('/order_menu_item/:id',adminRoleAuth, updateOrderMenuItem)
orderMenuItemRouter.delete('/order_menu_item/:id',adminRoleAuth, deleteOrderMenuItem)
orderMenuItemRouter.get("/menuOrdersInfo",getMenuOrdersInfo)