import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import {formatJSONError, formatJSONResponse} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { PRODUCT_LIST } from "@functions/mock-data/product-list";

export const getProduct: any = (id: string) => {
  return PRODUCT_LIST.find((el) => el.id === id);
};

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const id = event.pathParameters?.id;
  const product = getProduct(id);

  if (product) {
    return formatJSONResponse({
      response: product,
      event,
    });
  } else {
    return formatJSONError({
      error: 'Product Not Found',
      event,
    });
  }
};

export const main = middyfy(getProductById);
