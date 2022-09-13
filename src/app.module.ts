import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { RecruitModule } from "./recruit/recruit.module";
import { ormConfig } from "./config/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    AuthModule,
    RecruitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
