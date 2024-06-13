import   {stateRelations, TInsertUsers,TSelectUsers, usersTable}  from "../drizzle/schema";

import db from "../drizzle/db";
import { eq } from "drizzle-orm";


export const getAllUsersService = async ():Promise<TSelectUsers[] | null>=> {
    return await db.query.usersTable.findMany();
}

export const createUserService = async (user:TInsertUsers) => {
await db.insert(usersTable).values(user)
return "User created successfully ";
}

export const getUserByIdService = async (id:TSelectUsers["id"]):Promise<TSelectUsers[]> => {
    return await db.select().from(usersTable).where(eq(usersTable.id, id));
}

export const updateUserService = async (id:number,user:TInsertUsers) => {
 await db.update(usersTable).set(user).where(eq(usersTable.id, id))
 return "User updated successfully 🎉";
}

export const deleteUserService = async (id:number) => {
    await db.delete(usersTable).where(eq(usersTable.id, id))
    return "User deleted successfully 🎉";
}

export const getMoreUsersInfoService = async () => {
    return await db.query.usersTable.findMany({
        columns: {
            name: true,
            contact_phone: true
        },
        with: {
            restaurantOwners: {
                columns: {
                   owner_id: true
                },
                with: {
                    restaurant: {
                        columns: {
                          name: true,
                        }

                    },
                },
            },
        },
})
}
