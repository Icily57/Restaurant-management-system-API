import { Context } from 'hono';

import { createCategoryService, deleteCategoryService, filterCategoryService, getAllCategoriesService, getCategoryByIdService, updateCategoryService } from './category.service';

export const getAllCategories = async (c:Context) => {
    try {
        const categories = await getAllCategoriesService();
        if(categories == null) return c.text('No categories found', 404)
        return c.json(categories, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
    }

    export const getCategoryById = async (c:Context) => {
        try {
            const id = parseInt(c.req.param("id"))
            const category = await getCategoryByIdService(id);
            if(category == undefined) return c.text('Category not found', 404)
            return c.json(category, 200)
        } catch (error:any) {
            return c.text(error?.message, 500)
        }
    }

    export const createCategory = async (c:Context) => {
        try {
            let category = await c.req.json();
            let createCategory = await createCategoryService(category)
            if(!createCategory) {
                return c.json({message: 'Category not created'})
            }
                return c.json({msg: createCategory})
        } catch (error:any) {
            return c.text(error?.message, 500)
        }
     }

        export const updateCategory = async (c:Context) => {
            try {
                const id = Number(c.req.param("id"))
                const category = await c.req.json();
                if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
                const existingCategory = await getCategoryByIdService(id);
                if(existingCategory == undefined) return c.text('Category not found 😒', 404)    
                let updateCategory = await updateCategoryService(id,category)
                if(!updateCategory) {
                    return c.json({message: 'Category not updated'})
                }
                    return c.json({msg: updateCategory})
            }catch (error:any) {
                return c.text("sdfdfd", 500)
            }
        }

export const deleteCategory = async (c:Context) => {
    try {
        const id = Number(c.req.param("id"))
        if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
        const category = await getCategoryByIdService(id);
        if(category == undefined) return c.text('Category not found 😒', 404)
        let deleteCategory = await deleteCategoryService(id)
        if(!deleteCategory) {
            return c.json({message: 'Category not deleted'})
        }
            return c.json({msg: deleteCategory})
    }catch (error:any) {
        return c.text("sdfdfd", 500)
    }
}

export const filterCategoryInfo = async(c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const categoryInfo = await filterCategoryService(id);
    if (categoryInfo == undefined) {
        return c.text("Order not found", 404);
    }
    return c.json(categoryInfo, 200);
}
