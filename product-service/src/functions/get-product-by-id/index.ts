import { handlerPath } from '@libs/handler-resolver';
import schema from "@functions/get-product-by-id/schema";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'getProductById',
        cors: true,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
