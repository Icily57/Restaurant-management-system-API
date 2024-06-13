import {Hono} from 'hono';
import { zValidator } from '@hono/zod-validator';
import { loginValidator, registerValidator } from '../Validators/user.validator';
import { loginUser, registerUser } from './auth.controller';
import { adminRoleAuth, userRoleAuth } from '../middleWare/bearAuth';


export const authRouter = new Hono();

authRouter.post('/register', zValidator('json',registerValidator,(result,c)=>{    
    if(!result.success)
         return c.text( result.error.message + "😒",400)
}),registerUser);

authRouter.post('/login', zValidator('json',loginValidator,(result,c)=>{    
    if(!result.success) 
        return c.text( result.error.message + "😒",400)
}),loginUser);