import {
    Context,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Handler,
} from 'aws-lambda';
import { proxy } from 'aws-serverless-express';
import { bootstrap, NestServer } from './app';

let cachedServer: NestServer;

export const handler: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    if (!cachedServer) {
        cachedServer = await bootstrap();
    }
    return proxy(cachedServer.expressServer, event, context, 'PROMISE').promise;
};
