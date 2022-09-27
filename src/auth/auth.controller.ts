import {
  Controller,
  Get,
  HttpCode,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get("/kakao")
  @HttpCode(200)
  @UseGuards(AuthGuard("kakao"))
  async kakaoGetToken(@Req() req) {
    // console.log(req);
    return { sucess: true };
  }

  @Get("/kakao/redirect")
  @HttpCode(200)
  @UseGuards(AuthGuard("kakao"))
  async kakaoLoginCallback(@Req() req) {
    return this.authService.kakaoLogin(req.user);
  }

  @Get("kakao/login")
  @HttpCode(200)
  async kakaoLogin(@Req() req) {
    const userAccessToken = req.headers["authorization"].split(" ")[1];
    await this.authService.kakaoLogin(userAccessToken);
    return { sucess: true };
  }
}
