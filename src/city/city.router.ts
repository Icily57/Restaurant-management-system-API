import {Hono} from 'hono'

import { createCity, deleteCity, getAllCities, getCityById, getMoreCityInfo, updateCity } from './city.controller'
import { adminRoleAuth } from '../middleWare/bearAuth'

export const cityRouter = new Hono()

cityRouter.get('/city', getAllCities)
cityRouter.get('/city/:id', getCityById)
cityRouter.post('/city',adminRoleAuth, createCity)
cityRouter.put('/city/:id',adminRoleAuth, updateCity)
cityRouter.delete('/city/:id',adminRoleAuth, deleteCity)
cityRouter.get("/cityInfo", getMoreCityInfo)