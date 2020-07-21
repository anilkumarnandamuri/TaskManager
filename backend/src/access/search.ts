import { ESAccess } from "../dataLayer/esAccess";
import { parseUserId } from "../auth/utils";
import { TodoItem } from "../models/TodoItem";
import { ElasticSearchLogCategory } from "../models/ElasticSearchLogCategory";
import { createElasticSearchClient } from "../dataLayer/centralLayer";

const esAccess = new ESAccess(createElasticSearchClient())

export async function logNewTodoItemInES(
    todo:TodoItem
  ){
      await esAccess.log({
          index: ElasticSearchLogCategory.NEW_TODO,
          type:'todos',
          id:todo.userId,
          todo:todo
      })
  }
  
export async function logDoneTodoItemInES(
    todo:TodoItem
  ){
      await esAccess.log({
          index:ElasticSearchLogCategory.DONE_TODO,
          type:'todos',
          id:todo.userId,
          todo:todo
      })
  }

export async function searchDoneTodoInES(
    query:string,
    jwtToken:string
  ):Promise<any>{
    const user = parseUserId(jwtToken)
    return await esAccess.searchDoneTodo(query,user)
  }


export async function searchNewTodoInES(
    query:string,
    jwtToken:string
  ):Promise<any>{
      const user = parseUserId(jwtToken)
      return await esAccess.searchNewTodo(query,user)
  }