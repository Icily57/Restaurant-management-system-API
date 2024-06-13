import { z } from 'zod';

export const createCategoryValidator = z.object({
    name: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    });

export const updateCategoryValidator = z.object({
    name: z.string().min(3,{ message: "Must be 5 or more characters long" }),
});