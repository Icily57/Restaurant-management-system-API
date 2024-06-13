import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import {  stateTable, TSState,TIState } from "../drizzle/schema";

export const getAllStatesService = async ():Promise<TSState[] | null>=> {
    return await db.select().from(stateTable);
}

export const createStateService = async (state:TIState) => {
    await db.insert(stateTable).values(state)
    return "State created successfully ";
}

export const getStateByIdService = async (id:TSState["id"]):Promise<TSState[]> => {
    return await db.select().from(stateTable).where(eq(stateTable.id, id));
}

export const updateStateService = async (id:number,state:TIState) => {
 await db.update(stateTable).set(state).where(eq(stateTable.id, id))
 return "State updated successfully 🎉";
}

export const deleteStateService = async (id:number) => {
    await db.delete(stateTable).where(eq(stateTable.id, id))
    return "State deleted successfully 🎉";
}

export const getMoreStateInfoService = async () => {
    return await db.query.stateTable.findMany({
      columns: {
        name: true
      },
      with: {
        cities: {
          columns: {
            state_id: true,
            name: true
          }
        }
      },
    });
  }
