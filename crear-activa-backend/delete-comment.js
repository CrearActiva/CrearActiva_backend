//This method deletes an entire feed from the list of feeds available
//It requries two pathparameter: feedId, i.e. the name of the feed the post is in, and postId: the title of the post.

import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "comments",
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      postId: event.pathParameters.postId,
      commentId: event.pathParameters.commentId
    }
  };

  try {
    await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}

