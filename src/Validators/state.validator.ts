import { z } from 'zod';

export const createStateValidator = z.object({
    name: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    code: z.string().max(3,{ message: "Must be 5 or more characters long" })
});

export const updateStateValidator = z.object({
    name: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    code: z.string().max(3,{ message: "Must be 5 or more characters long" })
});