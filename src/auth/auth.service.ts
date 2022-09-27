import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserService } from "./user.service";
import * as bcrypt from "bcrypt";
import { Payload } from "./security/payload.interface";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { Repository } from "typeorm";
import { User } from "src/domain/user.entity";
import axios, { HttpService } from "@nestjs/axios";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: Repository<UserRepository>,
    private userService: UserService,
    private jwtService: JwtService,
    private readonly httpService: HttpService
  ) {}

  async kakaoLogin(userAccessToken) {
    let user;
    const headersRequest = {
      Authorization: `Bearer ${userAccessToken}`,
    };
    const result = await this.httpService.get(
      "https://kapi.kakao.com/v2/user/me",
      { headers: headersRequest }
    );
    result.subscribe(async (res) => {
      const getUserData = res.data;

      user = {
        kakaoId: getUserData.id,
        name: getUserData.kakao_account.profile.nickname,
        email: getUserData.kakao_account.email,
      };
      const createUser = await this.userRepository.create(user);
      await this.userRepository.save(createUser);
    });

    return true;
  }
}
