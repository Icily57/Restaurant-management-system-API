import db from "../drizzle/db";
import { eq } from "drizzle-orm";

import { categoryTable, TSCategory, TICategory, menuItemsTable } from "../drizzle/schema";

export const getAllCategoriesService = async ():Promise<TSCategory[] | null>=> {
    return await db.select().from(categoryTable);
}

export const getCategoryByIdService = async (id:TSCategory["id"]):Promise<TSCategory[]> => {
    return await db.select().from(categoryTable).where(eq(categoryTable.id, id));
}

export const createCategoryService = async (category:TICategory) => {
    await db.insert(categoryTable).values(category)
    return "Category created successfully 🎉";
}

export const updateCategoryService = async (id:number, category:TICategory) => {
    await db.update(categoryTable).set(category).where(eq(categoryTable.id, id))
    return "Category updated successfully 🎉";
}

export const deleteCategoryService = async (id:number) => {
    await db.delete(categoryTable).where(eq(categoryTable.id, id))
    return "Category deleted successfully 🎉";
}

export const filterCategoryService = async (id: number) => {
    return await db.select({
        CategoryName: categoryTable.name,
        MenuItem: menuItemsTable.description
    }).from(categoryTable).rightJoin(menuItemsTable, eq(categoryTable.id, menuItemsTable.category_id))
}