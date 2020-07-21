import { SNS } from 'aws-sdk'
import { createLogger } from '../utils/logger'

const logger = createLogger('esLogger')

export class SNSAccess {

    constructor(
      private readonly sns:SNS,
      private readonly snsArn:string,
      private readonly snsTopicName:string) {
    }

    async publishNewTodoMessage(message:string){
        var param = {
            Message: message,
            Subject: this.snsTopicName+ " - Created a new item",
            TopicArn: this.snsArn
        }

        this.sns.publish(param).promise()
        logger.info("New item has been published ",param)
    }
    
    async publishDoneTodoMessage(message:string){
        var param = {
            Message: message,
            Subject: this.snsTopicName+" - item has been done ",
            TopicArn: this.snsArn
        }

        this.sns.publish(param).promise()
        logger.info("Published the completed item ",param)
    }

  }