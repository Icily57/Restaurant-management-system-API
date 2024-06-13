import {Hono} from 'hono'
import { createUser, deleteUser, getAllUsers, getMoreUsersInfo, getUserById, updateUser} from './user.controller'
import { adminRoleAuth } from '../middleWare/bearAuth'

 export const userRouter = new Hono()


userRouter.get('/user', getAllUsers)
userRouter.get('/user/:id', getUserById)
userRouter.post('/user',adminRoleAuth, createUser)
userRouter.put('/user/:id',adminRoleAuth, updateUser)
userRouter.delete('/user/:id',adminRoleAuth, deleteUser)
userRouter.get("/usersInfo", getMoreUsersInfo)