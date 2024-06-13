import {Hono} from 'hono'

import { createState, deleteState, getAllStates, getMoreStateInfo, getStateById, updateState } from './state.controller'
import { adminRoleAuth } from '../middleWare/bearAuth'

    export const stateRouter = new Hono()

stateRouter.get('/state', getAllStates)
stateRouter.get('/state/:id', getStateById)
stateRouter.post('/state',adminRoleAuth, createState)
stateRouter.put('/state/:id',adminRoleAuth, updateState) 
stateRouter.delete('/state/:id',adminRoleAuth, deleteState)
stateRouter.get("/statesInfo", getMoreStateInfo)