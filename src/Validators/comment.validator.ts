import { z } from 'zod';

export const createCommentValidator = z.object({
    user_id: z.number().min(1,{ message: "Must be 5 or more characters long" }),
    order_id: z.number().min(1,{ message: "Must be 5 or more characters long" }),
    comment_text: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    is_complaint: z.boolean(),
    is_praise: z.boolean(),
    });

export const updateCommentValidator = z.object({
   user_id: z.number().min(1,{ message: "Must be 5 or more characters long" }),
    order_id: z.number().min(1,{ message: "Must be 5 or more characters long" }),
    comment_text: z.string().min(3,{ message: "Must be 5 or more characters long" }),
    is_complaint: z.boolean(),
    is_praise: z.boolean(),
});