import "dotenv/config";
import { Context } from "hono";
import {  createUserService, loginUserService } from "./auth.service";
import bcrypt from 'bcrypt';
import { sign } from "hono/jwt";
import { adminRoleAuth, userRoleAuth } from '../middleWare/bearAuth';
// import {UserExists} from "./auth.service";

//register
export const registerUser = async (c: Context) => {
    try {
        const user =await c.req.json();
        const pass = user.password;
        const hashedPass = bcrypt.hashSync(pass, 10);
        user.password = hashedPass;
        const createdUser = await createUserService(user);
        if(!createdUser) return c.text("User not created 😒",400);
        return c.json({msg: createdUser}, 200);
    } catch (error:any) {
        return c.json({error: error.message},400);
    }
};

//login
export const loginUser = async (c: Context) => {
   try {
     const user = await c.req.json();
     //check if user exists
     const userExists = await loginUserService(user);
        if(!userExists) return c.text("User not found 😒",400); // not found
        //check if password is correct
        const pass = user.password;
        const hashedPass = userExists?.password;
        const isMatch = bcrypt.compareSync(pass, hashedPass as string);
        if(!isMatch) {
            return c.text("Invalid Login Credentials!! 😒",400); // unauthorized
        }else{
        // return c.json({msg: userExists}, 200);
        //Create a payload
        //generate token
        let payload = {
            role: userExists.role,
            username:userExists.username,
            // userId: userExists.id,
            exp: Math.floor(Date.now() / 1000) + (60 * 180) // 3 hours
        }
        let secret = process.env.JWT_SECRET as string;  // secret key
            const token = await sign(payload, secret);   // create a JWT token
            let user = userExists?.user;
            let role = userExists?.role;
            return c.json({ token, user: { role, ...user } }, 200);  // return token and user details
        }
        
   } catch (error:any) {
    return c.text(error?.message,500);
   }
};
