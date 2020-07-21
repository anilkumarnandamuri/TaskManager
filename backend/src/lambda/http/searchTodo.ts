import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { searchNewTodoInES, searchDoneTodoInES } from '../../access/search'
import { SearchOnTodoType } from '../../models/SearchOnTodoType'
import { extractToken } from '../../auth/utils'
import { createLogger } from '../../utils/logger'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const logger = createLogger('searchTodo')
  const request = JSON.parse(event.body)
  const jwtToken = extractToken(event.headers.Authorization)
  let results:any

  if(request.on === SearchOnTodoType.PENDING){
    logger.info('Searching for the task with state PENDING')
    results = await searchNewTodoInES(request.query,jwtToken)
  }else if(request.on =SearchOnTodoType.DONE){
    logger.info('Searching for the task with state DONE')
    results = await searchDoneTodoInES(request.query,jwtToken)
  }else{
    return {
      statusCode: 400,
      body: JSON.stringify({
        results:"Invalid param value for On parameter"
      })
    }
  }

  const resturnRes = JSON.parse(JSON.stringify(results)).hits

  return {
    statusCode: 200,
    body: JSON.stringify({
      resturnRes
    })
  }
})
// Handle CORS
handler.use(
  cors({
    credentials: true
  })
)