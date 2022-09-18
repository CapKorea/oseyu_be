import { JwtStrategy } from "./security/passport.strategy";
import { Module } from "@nestjs/common";
import { TypeOrmExModule } from "src/db/typeorm-ex.decorator";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { KakaoStrategy } from "./kakao.strategy";

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
    JwtModule.register({
      secret: "SECRET",
      signOptions: { expiresIn: "90d" },
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  exports: [],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}
