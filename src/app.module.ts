import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

import { FooBarService } from './service/foo-bar.service';
import { FooBarController } from './controller/foo-bar.controller';

import { FooBar } from './model/foo-bar.model';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/foobar', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }),
    TypegooseModule.forFeature([
      FooBar,
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [
    FooBarController,
  ],
  providers: [
    JwtStrategy,
    FooBarService,
  ],
})
export class AppModule {}
