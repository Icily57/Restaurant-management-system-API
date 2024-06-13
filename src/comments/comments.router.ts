import {Hono} from 'hono'
import { createComment, deleteComment, getAllComments, getCommentById, updateComment } from './comments.controller'
import { adminRoleAuth } from '../middleWare/bearAuth'



export const commentsRouter = new Hono()

commentsRouter.get('/comments', getAllComments)
commentsRouter.get('/comments/:id', getCommentById)
commentsRouter.post('/comments',adminRoleAuth, createComment)
commentsRouter.put('/comments/:id',adminRoleAuth, updateComment)
commentsRouter.delete('/comments/:id',adminRoleAuth, deleteComment)