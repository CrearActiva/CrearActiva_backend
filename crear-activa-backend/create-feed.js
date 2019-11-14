//This method creates an entire feed
//It requries one pathparameter: feedId, i.e. the name of the feed

// import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const data = event.body;
    const params = {
        TableName: "feeds",
        Item: {
            feedId: data.pathParameters.feedId,
            description: data.description
        }
    };
    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        console.log(e);
        return failure({ status: false });
    }
}
