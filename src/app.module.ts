import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserRepository } from './auth/user.repository';
import { TypeOrmExModule } from './db/typeorm-ex.decorator';
import { RecruitModule } from './recruit/recruit.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ormConfig } from './config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'development' ? '.development.env' : '.test.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        NODE_ENV : Joi.string().valid('development', 'production').required(),
        DB_HOST: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PASS: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRootAsync({ useFactory: ormConfig}),
    TypeOrmExModule.forCustomRepository([UserRepository]),
    AuthModule,
    RecruitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
