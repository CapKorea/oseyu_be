import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';
import { User } from 'src/domain/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: Repository<UserRepository>,
        private userService:UserService,
        private jwtService: JwtService,)
        {
            this.userRepository = userRepository
        }

    // 새로운 유저 등록
    async registerUser(newUser:UserDTO): Promise<UserDTO>{
        // 이미 등록되어 있는 이메일이 있는지 탐색
        const userFind: UserDTO = await await this.userService.findByFields({
            where: {user_id: newUser.user_id}
        });
        // 탐색되었다면, Bad Request 오류 처리 (HTTP상태 코드 400)
        if(userFind){
            throw new HttpException('이미 존재하는 유저 아이디입니다.', HttpStatus.BAD_REQUEST)
        }
        newUser.user_created = new Date();
        // 새로운 유저 정보 저장
        return await this.userService.save(newUser);
    }

    // 로그인
    async validateUser(userDTO: UserDTO): Promise<{accessToken: string} | undefined>{
        const userFind: User = await this.userService.findByFields({
            where: {user_id: userDTO.user_id}
        })
        const validatePassword = await bcrypt.compare(userDTO.password, userFind.password);

        // 사용자를 찾지 못한 경우와 비밀번호가 올바르지 않은 경우
        if(!userFind || !validatePassword ){
            throw new UnauthorizedException('로그인 실패');
        }

        const payload: Payload = { id: userFind.id, user_id: userFind.user_id, name: userFind.name, phone: userFind.phone};
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }

    // 로그아웃
    async logOut(){
        return 'Authentication=; HttpOnly; Path=/; Max-Age=0';
    }

    // 유저의 토큰 검증
    async tokenValidateUser(payload: Payload): Promise<User | undefined>{
        return await this.userService.findByFields({
            where: { user_id: payload.user_id }
        })
    }

    // 유저 정보들
    async findAllUsers() : Promise<UserRepository[]>{
        return this.userRepository.find();
    }
}
