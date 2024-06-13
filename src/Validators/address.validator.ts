import { z } from 'zod';

export const createAddressValidator = z.object({
    street_address_1: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    street_address_2: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    delivery_instructions: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    zip_code: z.number().min(3,{ message: "Must be 5 or more characters long" }),
    city_id: z.number().min(1,{ message: "Must be 5 or more characters long" }),
    user_id: z.number().min(1,{ message: "Must be 5 or more characters long" })
    });

export const updateAddressValidator = z.object({
    street_address_1: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    street_address_2: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    delivery_instructions: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    zip_code: z.number().min(3,{ message: "Must be 5 or more characters long" }),
    city_id: z.number().min(1,{ message: "Must be 5 or more characters long" }),
    user_id: z.number().min(1,{ message: "Must be 5 or more characters long" }),
});