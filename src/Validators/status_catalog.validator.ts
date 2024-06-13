import { z } from 'zod';

export const createStatusCatalogValidator = z.object({
    status: z.string().min(5,{ message: "Must be 5 or more characters long" })
});

export const updateStatusCatalogValidator = z.object({
    status: z.string().min(5,{ message: "Must be 5 or more characters long" })
});
