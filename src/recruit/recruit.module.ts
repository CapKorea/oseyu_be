import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmExModule } from "src/db/typeorm-ex.decorator";
import { RecruitController } from "./recruit.controller";
import { RecruitRepository } from "./recruit.repository";
import { RecruitService } from "./recruit.service";

@Module({
  imports: [TypeOrmExModule.forCustomRepository([RecruitRepository])],
  exports: [],
  controllers: [RecruitController],
  providers: [RecruitService],
})
export class RecruitModule {}
