import { Context } from 'hono';

import { createStateService, deleteStateService, getAllStatesService, getMoreStateInfoService, getStateByIdService, updateStateService } from './state.service';

export const getAllStates = async (c:Context) => {
    try {
        const states = await getAllStatesService();
        if(states == null) return c.text('No states found', 404)
        return c.json(states, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
    }

export const createState = async (c:Context) => {
    try {
        let state = await c.req.json();
        let createState = await createStateService(state)
        if(!createState) {
            return c.json({message: 'State not created'})
        }
            return c.json({msg: createState})
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
 }

export const getStateById = async (c:Context) => {
    try {
        const id = parseInt(c.req.param("id"))
        if(isNaN(id)) return c.text('Invalid ID 😒', 400)
        const state = await getStateByIdService(id);
    if(state == undefined) return c.text('State not found 😒', 404)
    return c.json(state, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}

export const updateState = async (c:Context) => {
    try {
        const id = Number(c.req.param("id"))
        const state = await c.req.json();
        if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
        const existingState = await getStateByIdService(id);
        if(existingState == undefined) return c.text('State not found 😒', 404)    
        let updateState = await updateStateService(id,state)
        if(!updateState) {
            return c.json({message: 'State not updated'})
        }
            return c.json({msg: updateState})
    }catch (error:any) {
        return c.text("sdfdfd", 500)
    }
}

export const deleteState = async (c:Context) => {
    try {
        const id = Number(c.req.param("id"))
        if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
        const existingState = await getStateByIdService(id);
        if(existingState == undefined) return c.text('State not found 😒', 404)    
        let deleteState = await deleteStateService(id)
        if(!deleteState) {
            return c.json({message: 'State not deleted'})
        }
            return c.json({msg: deleteState})
    }catch (error:any) {
        return c.text("sdfdfd", 500)
    }
}

export const getMoreStateInfo = async(c:Context) => {

    const stateInfo = await getMoreStateInfoService();
    if (stateInfo == undefined) {
        return c.text("stateInfo not found", 404);
    }
    return c.json(stateInfo, 200);
}