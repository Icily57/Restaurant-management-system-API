import { z } from 'zod';

export const createDriverValidator = z.object({
    car_make: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    car_model: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    car_year: z.number().min(1,{ message: "Must be 5 or more characters long" }),
    user_id: z.number().min(1,{ message: "Must be 5 or more characters long" }),
    online: z.boolean(),
    delivering: z.boolean()
    });

export const updateDriverValidator = z.object({
    car_make: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    car_model: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    car_year: z.number().min(1,{ message: "Must be 5 or more characters long" }),
    user_id: z.number().min(1,{ message: "Must be 5 or more characters long" }),
    online: z.boolean(),
    delivering: z.boolean()
});