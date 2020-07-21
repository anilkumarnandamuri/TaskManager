import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Client } from "elasticsearch";
import * as elasticsearch from 'elasticsearch'
import * as httpAwsEs from 'http-aws-es'

export const INVOKE = AWSXRay.captureAWS(AWS)

export function createDynamoDBClient():DocumentClient {
  if (process.env.IS_OFFLINE) {
    return new INVOKE.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    });
  }
  return new INVOKE.DynamoDB.DocumentClient();
}

// Create a new elastic search client
export function createElasticSearchClient():Client {

  const esHost = process.env.ES_ENDPOINT
  
  return new elasticsearch.Client({
      hosts: [ esHost ],connectionClass: httpAwsEs})
}

// Create a new instance of AWS SNS service
export function createTodosSNSInstance():AWS.SNS {
  return new INVOKE.SNS()
}