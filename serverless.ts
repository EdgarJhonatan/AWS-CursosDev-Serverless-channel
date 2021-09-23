import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import list from "@functions/list";

const serverlessConfiguration: AWS = {
  service:
    "${self:custom.channel.name}-medics-${self:custom.lambda.type}-${self:provider.stage}-cf",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: false,
    },
    channel: {
      name: "group01",
    },
    lambda: { type: "channel" },
    regionName: {
      dev: "us-east-2",
      qa: "us-east-2",
      prod: "us-east-1",
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    // TODO:region: '${self:custom.regionName.${self:provider.stage}}',
    region: "us-east-2",
    stage: '${opt:stage,"dev"}',
    apiGateway: {
      restApiId: "${ssm:/group01/${self:provider.stage}/api-gateway/restApiId}",
      restApiRootResourceId:
        "${ssm:/group01/${self:provider.stage}/api-gateway/restApiRootResourceId}",
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    deploymentBucket: {
      name: "group01-delga-${self:provider.stage}-lambda-${self:custom.lambda.type}",
      serverSideEncryption: "AES256",
    },
    iam: {
      role: "arn:aws:iam::431224282472:role/aws-group01-role-lambdas-${self:custom.lambda.type}-${self:provider.stage}",
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { hello, list },
};

module.exports = serverlessConfiguration;
