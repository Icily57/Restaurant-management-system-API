import { Context } from 'hono';
import { createCommentsService, deleteCommentsService, getAllCommentsService, getCommentsByIdService, getMoreCommentsInfoService, updateCommentsService } from './comments.service';


export const getAllComments = async (c:Context) => {
    try {
        const comments = await getAllCommentsService();
        if(comments == null) return c.text('No comments found', 404)
        return c.json(comments, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}

export const getCommentById = async (c:Context) => {
    try {
        const id = parseInt(c.req.param("id"))
        const comment = await getCommentsByIdService(id);
        if(comment == undefined) return c.text('Comment not found', 404)
        return c.json(comment, 200)
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
}

export const createComment = async (c:Context) => {
    try {
        let comment = await c.req.json();
        let createComment = await createCommentsService(comment)
        if(!createComment) {
            return c.json({message: 'Comment not created'})
        }
            return c.json({msg: createComment})
    } catch (error:any) {
        return c.text(error?.message, 500)
    }
 }

    export const updateComment = async (c:Context) => {
        try {
            const id = Number(c.req.param("id"))
            const comment = await c.req.json();
            if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
            const existingComment = await getCommentsByIdService(id);
            if(existingComment == undefined) return c.text('Comment not found 😒', 404)    
            let updateComment = await updateCommentsService(id,comment)
            if(!updateComment) {
                return c.json({message: 'Comment not updated'})
            }
                return c.json({msg: updateComment})
        }catch (error:any) {
            return c.text("sdfdfd", 500)
        }
    }

export const deleteComment = async (c:Context) => {
    try {
        const id = Number(c.req.param("id"))
        if(isNaN(id)) return c.text('Invalid ID 😒', 400 )
        const comment = await getCommentsByIdService(id);
        if(comment == undefined) return c.text('Comment not found 😒', 404)    
        let deleteComment = await deleteCommentsService(id)
        if(!deleteComment) {
            return c.json({message: 'Comment not deleted'})
        }
            return c.json({msg: deleteComment})
    }catch (error:any) {
        return c.text("sdfdfd", 500)
    }
}

export const getMoreCommentsInfo = async(c:Context) => {

    const commentsInfo = await getMoreCommentsInfoService();
    if (commentsInfo == undefined) {
        return c.text("comments not found", 404);
    }
    return c.json(commentsInfo, 200);
}
