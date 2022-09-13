import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // 회원가입
  @Post("/signup")
  async signup(
    @Req() req: Request,
    @Body() userDto: CreateUserDto
  ): Promise<CreateUserDto> {
    return await this.authService.registerUser(userDto);
  }

  // 로그인
  @Post("/login")
  async signin(@Body() userDto, @Res() res: Response): Promise<Response> {
    const jwt = await this.authService.validateUser(userDto);
    res.setHeader("Authorization", "Bearer " + jwt.accessToken);
    return res.json(jwt); // 로그인 시 토큰 리턴
  }

  // 로그아웃
  // # 로그아웃? header값에 없어지지 않은것 같아 확인
  @Post("/logout")
  @UseGuards(AuthGuard())
  async logout(@Req() req: Request, @Res() res: Response): Promise<Response> {
    return res.status(200).json({ success: "true" });
  }

  // 마이페이지 (작성한 글 포함)
  // # user 데이터 전체가 나오는 상황 일부 데이터만 반환
  @Get("/mypage")
  @UseGuards(AuthGuard())
  isAuthenticated(@Req() req: Request): any {
    // 선택 데이터만 반환 의논
    const user: any = req.user;
    if (!req.user) {
      throw new UnauthorizedException({
        message: "존재하지 않는 사용자입니다.",
      });
    }
    return user;
  }
  // 프로필 정보
  @Get("/profile")
  @UseGuards(AuthGuard())
  getUser(@Req() req: Request, @Res() resp: Response): any {
    const user: any = req.user;
    if (!user) {
      throw new UnauthorizedException("로그인 필요!");
    }
    return resp.json([
      {
        user_id: user.user_id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    ]);
  }

  // 전체 유저 정보
  // # 선택 데이터 반환 의논
  @Get("/users")
  findAll(): Promise<UserRepository[]> {
    return this.authService.findAllUsers();
  }
}
