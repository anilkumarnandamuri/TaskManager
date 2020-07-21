import { createLogger } from '../utils/logger'
import { ElasticSearchLogCategory } from '../models/ElasticSearchLogCategory'
import { LogNewTodoEventInES } from '../models/LogNewTodoEventInES'
import { Client } from 'elasticsearch'

const logger = createLogger('esLogger')

export class ESAccess {
    constructor(
      private readonly es:Client) {
    }

    async log(logDetails:LogNewTodoEventInES) {
        logger.info('New Log is being created in ElasticSearch: ', logDetails)
  
        const body = {
          todoId: logDetails.todo.todoId,
          userid: logDetails.todo.userId,
          todoTitle: logDetails.todo.name,
          timestamp: logDetails.todo.createdAt
        }
    
        await this.es.index({
          index: logDetails.index,
          type: logDetails.type,
          id: logDetails.id,
          body
        })
      }

    async searchNewTodo(query:string,userId:String):Promise<any> {
      logger.info('Search ES for : ', query)
      const param = {
        "multi_match": {
          "query": query+ " "+userId,
          "type":       "cross_fields",
          "fields": ["todoTitle","userid"],
          "operator":   "and"
        }
      }
      logger.info("Search for the new todo list:",param)
      return await this.es.search({
        index: ElasticSearchLogCategory.NEW_TODO,
        type: 'todos',
        body:{
          "query": param
          }
      })
    }

    async searchDoneTodo(query:string,userId:String):Promise<any> {
      logger.info('Search Elastic Search for : ', query)

      const param = {
        "multi_match": {
          "query": query+ " "+userId,
          "type":       "cross_fields",
          "fields": ["todoTitle","userid"],
          "operator":   "and"
        }
      }

      logger.info("Search for the completed todo list:",param)
    
      return await this.es.search({
        index: ElasticSearchLogCategory.DONE_TODO,
        type: 'todos',
        body:{
          "query": param
        }
      })
    }
  }