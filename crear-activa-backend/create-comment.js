// import uuid from "uuid";

//The actual function that creates a single post. Needs to have a unique postId (i.e. The post title, as handled by the frontend)
//and also the feedId (i.e. the feed name).

//When the create-post function is called for a postId and feedId combination that already exists it overwrites it.
//This means that this function can be used for editing posts too for simpilicity.

import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = event.body;
  const params = {
    TableName: "comments",
    Item: {
      userId: data.pathParameters.userId,
      postId: data.pathParameters.postId,
      commentId: data.pathParameters.commentId,
      content: data.content,
      timestamp: Date.now()
    }
  };
  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return (e);
    return failure({ status: false });
  }
}
