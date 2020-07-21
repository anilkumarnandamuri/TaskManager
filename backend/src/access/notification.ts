import { SNSAccess } from "../dataLayer/snsAccess";
import { createTodosSNSInstance } from "../dataLayer/centralLayer";

const snsArn = process.env.SNS_ARN
const topic = process.env.TOPIC_NAME
// Using SNS service from AWS to send messages/email to users when tasks are marked as done
const snsHandler = new SNSAccess(
    createTodosSNSInstance(),
    snsArn,
    topic)

  export async function notifyForNewTodo(
    todoTitle:string
  ){
      await snsHandler.publishNewTodoMessage(todoTitle)
  }

  export async function notifyForDoneTodo(
    todoTitle:string
  ){
      await snsHandler.publishDoneTodoMessage(todoTitle)
  }