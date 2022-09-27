import { BadRequestException, Body, Controller, Get, Post, Response, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { Request, Response } from 'express';
import { UserDTO } from './dto/user.dto';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { KakaoLoginService } from './kakaoLogin.service';

@Controller('auth')
export class AuthController {
constructor(
    private kakaoLoginService : KakaoLoginService){
        this.kakaoLoginService = kakaoLoginService
    }

    // 카카오 로그인
    @Post('/kakaoLogin')
    async login(@Body() body: any, @Response() res): Promise<any> {
        try {
        // 카카오 토큰 조회 후 계정 정보 가져오기
  
        const kakao = await this.kakaoLoginService.kakaoLogin();
    
        console.log(`kakaoUserInfo : ${JSON.stringify(kakao)}`);
        if (!kakao.id) {
            throw new BadRequestException('카카오 정보가 없습니다.');
        }
    
        res.send({
            user: kakao,
            message: 'success',
        });
        } catch (e) {
        console.log(e);
        throw new UnauthorizedException();
        }
    }

    /*
    // 회원가입
    @Post('/signup') 
    async signup(
        @Req() req: Request, @Body() UserDTO: UserDTO): Promise<UserDTO>{
            return await this.authService.registerUser(UserDTO);
        } 

    // 로그인
    @Post('/login')
    async signin(@Body() userDTO: UserDTO, @Res() resp: Response): Promise<Response>{
        const jwt = await this.authService.validateUser(userDTO);
        resp.setHeader('Authorization', 'Bearer '+jwt.accessToken);
        return resp.json(jwt); // 로그인 시 토큰 리턴
    }

    // 로그아웃
    @Post('/logout')
    @UseGuards(AuthGuard())
    async logout(@Req() req: Request, @Res() res: Response): Promise<Response>{
        res.setHeader('Set-Cookie', await this.authService.logOut());
        return res.sendStatus(200);
    }

    // 마이페이지 (작성한 글 포함)
    @Get('/mypage')
    @UseGuards(AuthGuard())
    isAuthenticated(@Req() req: Request): any{
        const user: any = req.user;
        if(!req.user){
            throw new UnauthorizedException({message: '존재하지 않는 사용자입니다.'});
        }
        return user;
    }
    // 프로필 정보
    @Get('/profile')
    @UseGuards(AuthGuard())
    getUser(@Req() req: Request, @Res() resp: Response): any {
        const user: any=req.user;
        if(!user){
            throw new UnauthorizedException('로그인 필요!');
        }
        return resp.json([{"user_id": user.user_id, "name": user.name, "image":user.image, "phone":user.phone}]);
    }

    // 전체 유저 정보
    @Get('/users')
    findAll(): Promise<UserRepository[]>{
        return this.authService.findAllUsers();
    }
    */
}
