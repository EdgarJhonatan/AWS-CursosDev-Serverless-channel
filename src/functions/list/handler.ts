import "source-map-support/register";
import { middyfy } from "@libs/lambda";
import * as aws from "aws-sdk";

import { formatJSONResponse } from "@libs/apiGateway";

//Instanciamos clase AWS Lambda
const lambda = new aws.Lambda();

const list = async () => {
  const results = await lambda
    .invoke({
      InvocationType: "RequestResponse",
      FunctionName: "group01-dev-bussines-list-medics",
    })
    .promise();

  return formatJSONResponse({
    results,
  });
};

export const main = middyfy(list);
