import 'source-map-support/register'
import {generateUploadUrl} from '../../businesslogic/todos'
import { createLogger } from '../../utils/logger'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const logger = createLogger('generateUploadUrl')
  const todoId = event.pathParameters.todoId
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  logger.info('New upload Url is being generated for todoId:', todoId)
  const imageUrl= await generateUploadUrl(jwtToken, todoId)
  // Returning a presigned URL to upload a file for a TODO item with the provided id { uploadUrl :}
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(imageUrl)
  }
}
