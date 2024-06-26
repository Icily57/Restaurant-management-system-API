import {Hono} from 'hono'

import {  addressInfo, createAddress, deleteAddress, getAddressById, getAllAddresses, updateAddress } from './address.controller'
import { adminRoleAuth, bothRoleAuth, userRoleAuth } from '../middleWare/bearAuth'

export const addressRouter = new Hono()

addressRouter.get('/address', bothRoleAuth,getAllAddresses)
addressRouter.get('/address/:id',userRoleAuth, getAddressById)
addressRouter.post('/address',adminRoleAuth, createAddress)
addressRouter.put('/address/:id',adminRoleAuth, updateAddress)
addressRouter.delete('/address/:id',adminRoleAuth, deleteAddress)
addressRouter.get("/addressInfo", addressInfo)