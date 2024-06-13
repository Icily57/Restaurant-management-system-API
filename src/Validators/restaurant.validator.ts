import { z } from 'zod';

export const createRestaurantValidator = z.object({
    name: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    street_address: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    zip_code: z.number().min(3,{ message: "Must be 5 or more characters long" }),
    city_id: z.number().min(1,{ message: "Must be 5 or more characters long" })
    });

export const updateRestaurantValidator = z.object({
    name: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    street_address: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    zip_code: z.number().min(3,{ message: "Must be 5 or more characters long" }),
    city_id: z.number().min(1,{ message: "Must be 5 or more characters long" })
});