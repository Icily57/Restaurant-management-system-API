import { sql } from "drizzle-orm";
import db from "../drizzle/db";
import { TIAuthOnUsers, TSAuthOnUsers,AuthOnUsersTable } from "../drizzle/schema";


// export {userExists} from "./auth.service";
export const createUserService = async (user: TIAuthOnUsers): Promise<string | null> => {
    await db.insert(AuthOnUsersTable).values(user)
    return "User Registered successfully 🎉";
}

export const loginUserService = async(user:TSAuthOnUsers) => {
    const {username,password} = user
    return await db.query.AuthOnUsersTable.findFirst({
        columns:{
            username:true,
            role:true,
            password:true
        }, where:sql`${AuthOnUsersTable.username} = ${username}`,
        with:{
            user:{
                columns:{
                  id:true,
                  email:true,
                  name:true,
                  contact_phone:true
            }
        }

        }
    })
}
