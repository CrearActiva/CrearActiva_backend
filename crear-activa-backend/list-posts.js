//This function is supposed to list all the posts queried within specified parameters i.e. this brings up the display for a single feed.
//It currently requires one parameter: the feedId (i.e. name of the feed requested).

import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "posts",
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    //KeyConditionExpression: "userId = :userId",
    KeyConditionExpression: "feedId = :feedId",
    ExpressionAttributeValues: {
      //"userId": event.requestContext.identity.cognitoIdentityId
      ":feedId": event.query.feedId
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    console.log(result.Items);
    return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
