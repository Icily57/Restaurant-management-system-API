import { z } from 'zod';

export const createMenuItemValidator = z.object({
    name: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    price: z.number().min(1,{ message: "Must be 5 or more characters long" }),
    description: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    ingredients: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    restaurant_id: z.number().min(1,{ message: "Must be 5 or more characters long" }),
    category_id: z.number().min(1,{ message: "Must be 5 or more characters long" })
    });

export const updateMenuItemValidator = z.object({
    name: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    price: z.number().min(1,{ message: "Must be 5 or more characters long" }),
    description: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    ingredients: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    restaurant_id: z.number().min(1,{ message: "Must be 5 or more characters long" }),
    category_id: z.number().min(1,{ message: "Must be 5 or more characters long" })
});