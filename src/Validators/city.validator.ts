import { z } from 'zod';

export const createCityValidator = z.object({
    city_name: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    state_id: z.number().min(1,{ message: "Must be 5 or more characters long" }),
    });

export const updateCityValidator = z.object({
    city_name: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    state_id: z.number().min(1,{ message: "Must be 5 or more characters long" }),
});