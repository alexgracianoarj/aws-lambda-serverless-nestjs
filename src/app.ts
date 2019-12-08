import {NestFactory} from '@nestjs/core';
import {Logger, ValidationPipe} from '@nestjs/common';
import {ExpressAdapter, NestExpressApplication} from '@nestjs/platform-express';
import {Express} from 'express-serve-static-core';
import * as express from 'express';
import {eventContext} from 'aws-serverless-express/middleware';
import {Server} from 'http';
import {createServer} from 'aws-serverless-express';

import {AppModule} from './app.module';

export interface NestServer {
    nestApp: NestExpressApplication;
    expressServer: Server;
}

export async function bootstrap(): Promise<NestServer> {
    const expressApp: Express = express();
    const env = process.env;
    const isLocal = !env.AWS_EXECUTION_ENV && !env.IS_LOCAL && !env.IS_OFFLINE;
    const nestApp = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(expressApp),
        {
            cors: true,
            logger: isLocal ? new Logger() : console,
        },
    );
    const expressServer = createServer(expressApp);

    nestApp.useGlobalPipes(new ValidationPipe());

    if (!isLocal) {
        nestApp.use(eventContext());
        await nestApp.init();
    }

    return {
        nestApp,
        expressServer,
    };
}
