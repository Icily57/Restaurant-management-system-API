import { Context } from 'hono';

import { createDriversService, deleteDriversService, getAllDriverssService, getDriversByIdService, getMoreDriverInfoService, updateDriversService } from './drivers.service';

export const getAllDrivers = async (c:Context) => {
    try {
        const drivers = await getAllDriverssService();
        if(drivers == null) return c.text('No drivers found', 404)
        return c.json(drivers, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
    }

    export const getDriversById = async (c:Context) => {
        try {
            const id = parseInt(c.req.param("id"))
            const drivers = await getDriversByIdService(id);
            if(drivers == undefined) return c.text('Drivers not found', 404)
            return c.json(drivers, 200)
        } catch (error:any) {
            return c.text(error?.message, 500)
        }
    }

    export const createDrivers = async (c:Context) => {
        try {
            let drivers = await c.req.json();
            let createDrivers = await createDriversService(drivers)
            if(!createDrivers) {
                return c.json({message: 'Drivers not created'})
            }
                return c.json({msg: createDrivers})
        } catch (error:any) {
            return c.text(error?.message, 500)
        }
     }

        export const updateDrivers = async (c:Context) => {
            try {
                const id = Number(c.req.param("id"))
                const drivers = await c.req.json();
                if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
                const existingDrivers = await getDriversByIdService(id);
                if(existingDrivers == undefined) return c.text('Drivers not found 😒', 404)    
                let updateDrivers = await updateDriversService(id,drivers)
                if(!updateDrivers) {
                    return c.json({message: 'Drivers not updated'})
                }
                    return c.json({msg: updateDrivers})
            }catch (error:any) {
                return c.text("sdfdfd", 500)
            }
        }

export const deleteDrivers = async (c:Context) => {
    try {
        const id = Number(c.req.param("id"))
        if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
        const drivers = await getDriversByIdService(id);
        if(drivers == undefined) return c.text('Drivers not found 😒', 404)
        let deleteDrivers = await deleteDriversService(id)
        if(!deleteDrivers) {
            return c.json({message: 'Drivers not deleted'})
        }
            return c.json({msg: deleteDrivers})
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}


export const getMoreDriverInfo = async(c:Context) => {

    const driversInfo = await getMoreDriverInfoService();
    if (driversInfo == undefined) {
        return c.text("driversInfo not found", 404);
    }
    return c.json(driversInfo, 200);
}