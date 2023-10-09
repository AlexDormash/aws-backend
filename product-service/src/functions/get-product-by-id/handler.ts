import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { PRODUCT_LIST } from "@functions/mock-data/product-list";

export const getProduct: any = (id: string) => {
  return PRODUCT_LIST.find((el) => el.id === id);
};

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const id = event.body.id;
  const product = getProduct(id)

  return formatJSONResponse({
    response: product,
    event,
  });
};

export const main = middyfy(getProductById);
