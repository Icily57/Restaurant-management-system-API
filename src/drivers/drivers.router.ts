import { Hono } from 'hono';

import { createDrivers, deleteDrivers, getAllDrivers, getDriversById,getMoreDriverInfo,updateDrivers } from './drivers.controller';
import { adminRoleAuth } from '../middleWare/bearAuth';

export const driversRouter = new Hono()

driversRouter.get('/drivers', getAllDrivers)
driversRouter.get('/drivers/:id', getDriversById)
driversRouter.post('/drivers',adminRoleAuth, createDrivers)
driversRouter.put('/drivers/:id',adminRoleAuth, updateDrivers)
driversRouter.delete('/drivers/:id',adminRoleAuth, deleteDrivers)
driversRouter.get("/driverInfo", getMoreDriverInfo)
