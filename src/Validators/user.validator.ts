import { z } from 'zod';

export const createUserValidator = z.object({
    fullname: z.string().min(5,{ message: "Must be 8 or more characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.number()
});

export const updateUserValidator = z.object({
    fullname: z.string().min(5,{ message: "Must be 6 or more characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(4,{ message: "Must be 8 or more characters long" }),
});

//login validator
export const loginValidator = z.object({
    username: z.string().min(4,{ message: "Must be 8 or more characters long" }),
    password: z.string().min(4,{ message: "Must be 8 or more characters long" }),
});

//register validator
export const registerValidator = z.object({
    user_id:z.number(),
    username: z.string().min(4,{ message: "Must be 4 or more characters long" }),
    password: z.string().min(4,{ message: "Must be 4 or more characters long" }),
    role: z.string().optional(),
});
