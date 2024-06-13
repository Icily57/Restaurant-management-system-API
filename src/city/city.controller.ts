import { Context } from 'hono';

import { createCityService, deleteCityService,  getAllCitiessService,  getCityByIdService, getCityInfoService, updateCityService } from './city.service';

export const getAllCities = async (c:Context) => {
    try {
        const cities = await getAllCitiessService();
        if(cities == null) return c.text('No cities found', 404)
        return c.json(cities, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
    }

    export const getCityById = async (c:Context) => {
        try {
            const id = parseInt(c.req.param("id"))
            const city = await getCityByIdService(id);
            if(city == undefined) return c.text('City not found', 404)
            return c.json(city, 200)
        } catch (error:any) {
            return c.text(error?.message, 500)
        }
    }

    export const createCity = async (c:Context) => {
        try {
            let city = await c.req.json();
            let createCity = await createCityService(city)
            if(!createCity) {
                return c.json({message: 'City not created'})
            }
                return c.json({msg: createCity})
        } catch (error:any) {
            return c.text(error?.message, 500)
        }
     }

        export const updateCity = async (c:Context) => {
            try {
                const id = Number(c.req.param("id"))
                const city = await c.req.json();
                if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
                const existingCity = await getCityByIdService(id);
                if(existingCity == undefined) return c.text('City not found 😒', 404)    
                let updateCity = await updateCityService(id,city)
                if(!updateCity) {
                    return c.json({message: 'City not updated'})
                }
                    return c.json({msg: updateCity})
            }catch (error:any) {
                return c.text("sdfdfd", 500)
            }
        }

export const deleteCity = async (c:Context) => {
    try {
        const id = Number(c.req.param("id"))
        if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
        const city = await getCityByIdService(id);
        if(city == undefined) return c.text('City not found 😒', 404)
        let deleteCity = await deleteCityService(id)
        return c.text("City deleted successfully 🎉")
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}

export const getMoreCityInfo = async(c:Context) => {
    // const id = parseInt(c.req.param("id"));
    // if (isNaN(id)) return c.text("Invalid ID", 400);

    const cityInfo = await getCityInfoService();
    if (cityInfo == undefined) {
        return c.text("city not found", 404);
    }
    return c.json(cityInfo, 200);
}