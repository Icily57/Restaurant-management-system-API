import { Context } from 'hono';

import { createAddressService, deleteAddressService, getAddressByIdService, getAddressInfo, getAllAddressesService, updateAddressService } from './address.service';

export const getAllAddresses = async (c:Context) => {
    try {
        const addresses = await getAllAddressesService();
        if(addresses == null) return c.text('No addresses found', 404)
        return c.json(addresses, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}

export const getAddressById = async (c:Context) => {
    try {
        const id = parseInt(c.req.param("id"))
        const address = await getAddressByIdService(id);
        if(address == undefined) return c.text('Address not found', 404)
        return c.json(address, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}

export const createAddress = async (c:Context) => {
    try {
        let address = await c.req.json();
        let createAddress = await createAddressService(address)
        if(!createAddress) {
            return c.json({message: 'Address not created'})
        }
            return c.json({msg: createAddress})
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
 }

    export const updateAddress = async (c:Context) => {
        try {
            const id = Number(c.req.param("id"))
            const address = await c.req.json();
            if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
            const existingAddress = await getAddressByIdService(id);
            if(existingAddress == undefined) return c.text('Address not found 😒', 404)    
            let updateAddress = await updateAddressService(id,address)
            if(!updateAddress) {
                return c.json({message: 'Address not updated'})
            }
                return c.json({msg: updateAddress})
        }catch (error:any) {
            return c.text("sdfdfd", 500)
        }
    }

    export const deleteAddress = async (c:Context) => {
        try {
            const id = Number(c.req.param("id"))
            if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
            const existingAddress = await getAddressByIdService(id);
            if(existingAddress == undefined) return c.text('Address not found 😒', 404)    
            let deleteAddress = await deleteAddressService(id)
            if(!deleteAddress) {
                return c.json({message: 'Address not deleted'})
            }
                return c.json({msg: deleteAddress})
        }catch (error:any) {
            return c.text("sdfdfd", 500)
        }
    }

    export const addressInfo = async (c: Context) => {
        try {
        //   const id = parseInt(c.req.param("id"));
        //   if (isNaN(id)) return c.text("Invalid ID", 400);
      
          const address = await getAddressInfo();
          if (address == undefined) {
              return c.text("address info not found", 404);
          }
          return c.json(address, 200);
        } catch (error:any) {
          return c.json({error:error ?.message},400)
        }
      };