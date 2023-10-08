import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { PRODUCT_LIST } from "@functions/mock-data/product-list";

const getProductList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    request: PRODUCT_LIST,
    event,
  });
};

export const main = middyfy(getProductList);
