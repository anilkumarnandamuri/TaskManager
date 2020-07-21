import { TodoItem } from "./TodoItem";

export interface LogNewTodoEventInES {
    todo:TodoItem
    index:string
    type:string
    id:string
  }
  