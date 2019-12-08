import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

import {bootstrap} from './app';

const PORT = process.env.LISTEN_PORT || 3000;

async function startLocal() {
  const nestServer = await bootstrap();

  const document = SwaggerModule.createDocument(nestServer.nestApp,
    new DocumentBuilder()
      .setTitle('FooBar AWS Lambda Serverless')
      .setDescription('FooBar AWS Lambda Serverless')
      .setVersion('1.0')
      .setSchemes('http', 'https')
      .addBearerAuth('Authorization', 'header', 'apiKey')
      .build(),
  );

  SwaggerModule.setup('api-docs/swagger', nestServer.nestApp, document);

  await nestServer.nestApp.listen(PORT);
}

startLocal().then(() => console.log(`Server started at port ${PORT}`));
