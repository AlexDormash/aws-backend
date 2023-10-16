import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import getProductList from "@functions/get-product-list";
import getProductById from "@functions/get-product-by-id";
import createNewProduct from "@functions/createProduct";

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-openapi-documentation', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PRODUCT_TABLE_NAME: 'Products',
      STOCKS_TABLE_NAME: 'Stocks',
    },
    region: "eu-west-1",
    iam: {
      role: {
        statements: [{
          "Effect": "Allow",
          "Action": [
            "apigateway:GET",
            "cloudtrail:CreateTrail",
            "cloudtrail:StartLogging",
            "ec2:Describe*",
            "lambda:ListFunctions",
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:DescribeLogGroups",
            "logs:PutLogEvents",
            "sns:Get*",
            "sns:List*",
            "sns:Publish",
            "sns:Subscribe",
            "xray:Put*",

            "dynamodb:BatchGet*",
            "dynamodb:DescribeStream",
            "dynamodb:DescribeTable",
            "dynamodb:Get*",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:BatchWrite*",
            "dynamodb:CreateTable",
            "dynamodb:Delete*",
            "dynamodb:Update*",
            "dynamodb:PutItem",

            "dynamodb:List*",
            "dynamodb:DescribeReservedCapacity*",
            "dynamodb:DescribeLimits",
            "dynamodb:DescribeTimeToLive"
          ],
          "Resource": [
              "*"
          ]
        }]
      }
    }
  },
  // import the function via paths
  functions: { hello, getProductList, getProductById, createNewProduct},
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
