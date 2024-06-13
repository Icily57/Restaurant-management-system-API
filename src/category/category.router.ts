import {Hono} from 'hono'

import {  createCategory, deleteCategory, filterCategoryInfo, getAllCategories, getCategoryById, updateCategory } from './category.controller'
import { adminRoleAuth } from '../middleWare/bearAuth'

export const categoryRouter = new Hono()

categoryRouter.get('/category', getAllCategories)
categoryRouter.get('/category/:id', getCategoryById)
categoryRouter.post('/category',adminRoleAuth, createCategory)
categoryRouter.put('/category/:id',adminRoleAuth, updateCategory)
categoryRouter.delete('/category/:id',adminRoleAuth, deleteCategory)
categoryRouter.get("/categoryInfo/:id", filterCategoryInfo)