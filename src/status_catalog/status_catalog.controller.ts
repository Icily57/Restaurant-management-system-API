import { Context } from 'hono';

import { createStatusCatalogService, deleteStatusCatalogService, getAllStatusCatalogsService, getMoreStatusCatalogInfoService, getStatusCatalogByIdService, updateStatusCatalogService } from './status_catalog.service';

export const getAllStatusCatalogs = async (c:Context) => {
    try {
        const status_catalogs = await getAllStatusCatalogsService();
        if(status_catalogs == null) return c.text('No status_catalogs found', 404)
        return c.json(status_catalogs, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}

export const getStatusCatalogById = async (c:Context) => {
    try {
        const id = parseInt(c.req.param("id"))
        const status_catalog = await getStatusCatalogByIdService(id);
        if(status_catalog == undefined) return c.text('Status Catalog not found', 404)
        return c.json(status_catalog, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}

export const createStatusCatalog = async (c:Context) => {
    try {
        let status_catalog = await c.req.json();
        let createStatusCatalog = await createStatusCatalogService(status_catalog)
        if(!createStatusCatalog) {
            return c.json({message: 'Status Catalog not created'})
        }
            return c.json({msg: createStatusCatalog})
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
 }

    export const updateStatusCatalog = async (c:Context) => {
        try {
            const id = Number(c.req.param("id"))
            const status_catalog = await c.req.json();
            if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
            const existingStatusCatalog = await getStatusCatalogByIdService(id);
            if(existingStatusCatalog == undefined) return c.text('Status Catalog not found 😒', 404)    
            let updateStatusCatalog = await updateStatusCatalogService(id,status_catalog)
            if(!updateStatusCatalog) {
                return c.json({message: 'Status Catalog not updated'})
            }
                return c.json({msg: updateStatusCatalog})
        }catch (error:any) {
            return c.text("sdfdfd", 500)
        }
    }

export const deleteStatusCatalog = async (c:Context) => {
    try {
        const id = parseInt(c.req.param("id"))
        const status_catalog = await getStatusCatalogByIdService(id);
        if(status_catalog == undefined) return c.text('Status Catalog not found', 404)
        let deleteStatusCatalog = await deleteStatusCatalogService(id)
        if(!deleteStatusCatalog) {
            return c.json({message: 'Status Catalog not deleted'})
        }
            return c.json({msg: deleteStatusCatalog})
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}

export const getMoreStatusCatalogInfo = async(c:Context) => {

    const statusCatalogInfo = await getMoreStatusCatalogInfoService();
    if (statusCatalogInfo == undefined) {
        return c.text("statusCatalogInfo not found", 404);
    }
    return c.json(statusCatalogInfo, 200);
}