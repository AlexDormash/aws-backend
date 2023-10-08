import { handlerPath } from '@libs/handler-resolver';
import schema from "@functions/hello/schema";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'getProductById',
        cors: false,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
