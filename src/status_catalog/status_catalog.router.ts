import { Hono } from "hono";

import { createStatusCatalog, deleteStatusCatalog, getAllStatusCatalogs, getMoreStatusCatalogInfo, getStatusCatalogById, updateStatusCatalog } from "./status_catalog.controller";
import { adminRoleAuth } from "../middleWare/bearAuth";

export const statusCatalogRouter = new Hono()

statusCatalogRouter.get('/status_catalog', getAllStatusCatalogs)
statusCatalogRouter.get('/status_catalog/:id', getStatusCatalogById)
statusCatalogRouter.post('/status_catalog',adminRoleAuth, createStatusCatalog)
statusCatalogRouter.put('/status_catalog/:id',adminRoleAuth, updateStatusCatalog)
statusCatalogRouter.delete('/status_catalog/:id',adminRoleAuth, deleteStatusCatalog)
statusCatalogRouter.get("/statusCatalog", getMoreStatusCatalogInfo)