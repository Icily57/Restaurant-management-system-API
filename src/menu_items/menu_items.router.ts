import { Hono } from "hono";

import { createMenuItems,getAllMenuItems, getMenuItemsById, updateMenuItems, deleteMenuItems, getMoreMenuInfo } from "./menu_items.controller";
import { adminRoleAuth } from "../middleWare/bearAuth";

export const menuItemsRouter = new Hono()

menuItemsRouter.get('/menu_items', getAllMenuItems)
menuItemsRouter.get('/menu_items/:id', getMenuItemsById)
menuItemsRouter.post('/menu_items',adminRoleAuth, createMenuItems)
menuItemsRouter.put('/menu_items/:id',adminRoleAuth, updateMenuItems)
menuItemsRouter.delete('/menu_items/:id',adminRoleAuth, deleteMenuItems)
menuItemsRouter.get("/menuInfo",getMoreMenuInfo)