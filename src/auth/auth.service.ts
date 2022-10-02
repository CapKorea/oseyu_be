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

  async kakaoLogin(userInformation) {
    const user = userInformation;
    console.log(user);
    return user;
  }
}
