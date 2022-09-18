import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcrypt";
import { User } from "src/domain/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}
}
