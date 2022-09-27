import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { Repository } from "typeorm";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: Repository<UserRepository>,
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

      console.log('유저 정보 : ', user);

      const createUser = await this.userRepository.create(user);
      await this.userRepository.save(createUser);
    });

    return true;
  }
}
